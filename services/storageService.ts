
import { User, UserRole, PortfolioItem, UserChatSession, ChatMessage, ActivityLog, SiteSettings, ServiceOrder, OrderStatus } from '../types';

// Use environment variable with fallback for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const StorageService = {

  async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'خطای شبکه');
    }
    return response.json();
  },

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return this.fetchWithAuth('/portfolio/');
  },

  async getSettings(): Promise<SiteSettings> {
    return this.fetchWithAuth('/settings/default/');
  },

  // Added missing method: saveSettings
  async saveSettings(settings: SiteSettings): Promise<void> {
    return this.fetchWithAuth('/settings/default/', {
      method: 'POST',
      body: JSON.stringify(settings)
    });
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async loginUser(email: string, passwordHash: string): Promise<User> {
    const data = await this.fetchWithAuth('/token/', {
      method: 'POST',
      body: JSON.stringify({ username: email, password: passwordHash })
    });

    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    const user = await this.fetchWithAuth('/users/me/');
    localStorage.setItem('current_user', JSON.stringify(user));
    return user;
  },

  async registerUser(userData: any): Promise<User> {
    return this.fetchWithAuth('/users/register/', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Added missing method: getUsers
  async getUsers(): Promise<User[]> {
    return this.fetchWithAuth('/users/');
  },

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
  },

  async addOrder(orderData: any): Promise<ServiceOrder> {
    return this.fetchWithAuth('/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Added missing method: getOrders
  async getOrders(): Promise<ServiceOrder[]> {
    return this.fetchWithAuth('/orders/');
  },

  async addPortfolioItem(item: any): Promise<PortfolioItem> {
    return this.fetchWithAuth('/portfolio/', {
      method: 'POST',
      body: JSON.stringify(item)
    });
  },

  // Added missing method: updatePortfolioItem
  async updatePortfolioItem(item: PortfolioItem): Promise<PortfolioItem> {
    return this.fetchWithAuth(`/portfolio/${item.id}/`, {
      method: 'PATCH',
      body: JSON.stringify(item)
    });
  },

  // Added missing method: deletePortfolioItem
  async deletePortfolioItem(id: string): Promise<void> {
    return this.fetchWithAuth(`/portfolio/${id}/`, {
      method: 'DELETE'
    });
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    return this.fetchWithAuth(`/orders/${orderId}/`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  // Mock functions for logs and chats - can be migrated to full DB later
  logActivity(userId: string, action: string, details?: string) {
    console.log(`Activity logged: ${action}`, details);
  },

  async getChatHistory(userId: string): Promise<ChatMessage[]> {
    return this.fetchWithAuth(`/chats/${userId}/`);
  },

  // Added missing method: getAllChatSessions
  async getAllChatSessions(): Promise<UserChatSession[]> {
    return this.fetchWithAuth('/chats/');
  },

  async saveChatHistory(userId: string, messages: ChatMessage[]): Promise<void> {
    return this.fetchWithAuth(`/chats/${userId}/`, {
      method: 'POST',
      body: JSON.stringify({ messages })
    });
  }
};
