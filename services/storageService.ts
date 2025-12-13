import { User, UserRole, PortfolioItem } from '../types';

// Keys for LocalStorage
const USERS_KEY = 'sazeyar_users';
const CURRENT_USER_KEY = 'sazeyar_current_user';
const PORTFOLIO_KEY = 'sazeyar_portfolio';

// Mock DB latency helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const StorageService = {
  // --- Auth & User Management ---

  async registerUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await delay(600); // Simulate network
    const users = this.getUsers();
    
    // Check if email exists
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
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  },

  async loginUser(email: string, passwordHash: string): Promise<User> {
    await delay(600);
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === email && u.passwordHash === passwordHash);

    if (userIndex === -1) {
      throw new Error('نام کاربری یا رمز عبور اشتباه است.');
    }

    // Update lastLogin
    const user = users[userIndex];
    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    
    // Save updated user list back to storage
    users[userIndex] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    this.setCurrentUser(updatedUser);
    return updatedUser;
  },

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser(): User | null {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Private helpers
  setCurrentUser(user: User) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  getUsers(): User[] {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // --- Portfolio Management ---

  getPortfolioItems(): PortfolioItem[] {
    const data = localStorage.getItem(PORTFOLIO_KEY);
    return data ? JSON.parse(data) : [];
  },

  async addPortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt'>): Promise<PortfolioItem> {
    await delay(500);
    const items = this.getPortfolioItems();
    
    const newItem: PortfolioItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    items.unshift(newItem); // Add to beginning
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
    return newItem;
  },

  async updatePortfolioItem(updatedItem: PortfolioItem): Promise<void> {
    await delay(400);
    const items = this.getPortfolioItems();
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
    }
  },

  async deletePortfolioItem(id: string): Promise<void> {
    await delay(300);
    let items = this.getPortfolioItems();
    items = items.filter(item => item.id !== id);
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
  }
};