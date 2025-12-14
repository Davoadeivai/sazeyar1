import { User, UserRole, PortfolioItem, UserChatSession, ChatMessage, ActivityLog, SiteSettings, ServiceOrder, OrderStatus } from '../types';

// Keys for LocalStorage
const DB_USERS = 'sazeyar_db_users';
const DB_CURRENT_USER = 'sazeyar_db_current_session';
const DB_PORTFOLIO = 'sazeyar_db_portfolio';
const DB_CHATS = 'sazeyar_db_chats';
const DB_LOGS = 'sazeyar_db_logs';
const DB_SETTINGS = 'sazeyar_db_settings';
const DB_ORDERS = 'sazeyar_db_orders';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DEFAULT_SETTINGS: SiteSettings = {
    instagramUrl: 'https://instagram.com',
    telegramUrl: 'https://t.me',
    whatsappUrl: 'https://wa.me',
    enamadUrl: 'https://trustseal.enamad.ir/logo.aspx?id=YOUR_ID',
    phoneNumber: '021-88888888',
    address: 'تهران، ونک، برج همراه، طبقه ۱۰'
};

const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'sample-1',
    title: 'بازسازی آپارتمان ۱۸۰ متری فرمانیه',
    description: 'اجرای کامل دکوراسیون داخلی شامل کابینت ممبران، سنگ اسلب کف، سیستم هوشمند BMS و بازسازی کامل سرویس‌های بهداشتی.',
    location: 'تهران، فرمانیه',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=2000&auto=format&fit=crop'
    ],
    beforeVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    afterVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    createdAt: new Date().toISOString()
  }
];

export const StorageService = {
  // --- Auth & User Management ---

  async registerUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await delay(600);
    const users = this.getUsers();
    
    if (users.find(u => u.email === userData.email)) {
      throw new Error('این ایمیل قبلاً ثبت شده است.');
    }

    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    users.push(newUser);
    this.saveData(DB_USERS, users);
    this.setCurrentUser(newUser);
    this.logActivity(newUser.id, 'REGISTER', 'User created account');
    
    return newUser;
  },

  async loginUser(email: string, passwordHash: string): Promise<User> {
    await delay(600);
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === email && u.passwordHash === passwordHash);

    if (userIndex === -1) {
      throw new Error('نام کاربری یا رمز عبور اشتباه است.');
    }

    const user = users[userIndex];
    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    
    users[userIndex] = updatedUser;
    this.saveData(DB_USERS, users);
    this.setCurrentUser(updatedUser);
    this.logActivity(updatedUser.id, 'LOGIN', 'User logged in');

    return updatedUser;
  },

  async logout(): Promise<void> {
    const user = this.getCurrentUser();
    if (user) {
        this.logActivity(user.id, 'LOGOUT', 'User logged out');
    }
    await delay(300);
    localStorage.removeItem(DB_CURRENT_USER);
  },

  getCurrentUser(): User | null {
    const data = localStorage.getItem(DB_CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  // --- Database Helpers ---
  
  saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  setCurrentUser(user: User) {
    localStorage.setItem(DB_CURRENT_USER, JSON.stringify(user));
  },

  getUsers(): User[] {
    const data = localStorage.getItem(DB_USERS);
    return data ? JSON.parse(data) : [];
  },

  // --- Portfolio (Projects) ---

  getPortfolioItems(): PortfolioItem[] {
    const data = localStorage.getItem(DB_PORTFOLIO);
    if (data) {
        return JSON.parse(data);
    } else {
        // Initialize with default data if empty
        this.saveData(DB_PORTFOLIO, INITIAL_PORTFOLIO);
        return INITIAL_PORTFOLIO;
    }
  },

  async addPortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt'>): Promise<PortfolioItem> {
    await delay(500);
    const items = this.getPortfolioItems();
    
    const newItem: PortfolioItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    items.unshift(newItem);
    this.saveData(DB_PORTFOLIO, items);
    
    const currentUser = this.getCurrentUser();
    if (currentUser) {
        this.logActivity(currentUser.id, 'CREATE_PROJECT', `Created project: ${item.title}`);
    }

    return newItem;
  },

  async updatePortfolioItem(updatedItem: PortfolioItem): Promise<void> {
    await delay(400);
    const items = this.getPortfolioItems();
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      this.saveData(DB_PORTFOLIO, items);
    }
  },

  async deletePortfolioItem(id: string): Promise<void> {
    await delay(300);
    let items = this.getPortfolioItems();
    items = items.filter(item => item.id !== id);
    this.saveData(DB_PORTFOLIO, items);
  },

  // --- Orders (CRM) ---
  
  getOrders(): ServiceOrder[] {
      const data = localStorage.getItem(DB_ORDERS);
      return data ? JSON.parse(data) : [];
  },

  async addOrder(orderData: Omit<ServiceOrder, 'id' | 'createdAt' | 'status'>): Promise<ServiceOrder> {
      await delay(500);
      const orders = this.getOrders();
      
      const newOrder: ServiceOrder = {
          ...orderData,
          id: crypto.randomUUID(),
          status: 'PENDING',
          createdAt: new Date().toISOString()
      };
      
      orders.unshift(newOrder);
      this.saveData(DB_ORDERS, orders);
      
      const currentUser = this.getCurrentUser();
      if (currentUser) {
          this.logActivity(currentUser.id, 'CREATE_ORDER', `Request service: ${orderData.serviceTitle}`);
      }
      
      return newOrder;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
      await delay(300);
      const orders = this.getOrders();
      const index = orders.findIndex(o => o.id === orderId);
      if (index !== -1) {
          orders[index].status = status;
          this.saveData(DB_ORDERS, orders);
      }
  },

  // --- Chat Persistence ---

  getChatHistory(userId: string): ChatMessage[] {
    const allChats = localStorage.getItem(DB_CHATS);
    if (!allChats) return [];
    
    const parsedChats: UserChatSession[] = JSON.parse(allChats);
    const userSession = parsedChats.find(c => c.userId === userId);
    return userSession ? userSession.messages : [];
  },

  // Added for Admin to see all chats
  getAllChatSessions(): UserChatSession[] {
      const allChats = localStorage.getItem(DB_CHATS);
      return allChats ? JSON.parse(allChats) : [];
  },

  async saveChatHistory(userId: string, messages: ChatMessage[]): Promise<void> {
    const allChatsStr = localStorage.getItem(DB_CHATS);
    let allChats: UserChatSession[] = allChatsStr ? JSON.parse(allChatsStr) : [];
    
    const existingIndex = allChats.findIndex(c => c.userId === userId);
    if (existingIndex !== -1) {
        allChats[existingIndex].messages = messages;
        allChats[existingIndex].lastUpdated = new Date().toISOString();
    } else {
        allChats.push({
            userId,
            messages,
            lastUpdated: new Date().toISOString()
        });
    }
    
    this.saveData(DB_CHATS, allChats);
  },

  // --- Site Settings (Admin) ---
  
  getSettings(): SiteSettings {
      const data = localStorage.getItem(DB_SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
      await delay(200);
      this.saveData(DB_SETTINGS, settings);
  },

  // --- Activity Logging ---

  logActivity(userId: string, action: string, details?: string) {
      const logsStr = localStorage.getItem(DB_LOGS);
      const logs: ActivityLog[] = logsStr ? JSON.parse(logsStr) : [];
      
      const newLog: ActivityLog = {
          id: crypto.randomUUID(),
          userId,
          action,
          details,
          timestamp: new Date().toISOString()
      };
      
      logs.push(newLog);
      if (logs.length > 1000) logs.shift();
      
      this.saveData(DB_LOGS, logs);
  }
};