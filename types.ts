export enum UserRole {
  HOMEOWNER = 'HOMEOWNER',
  PROFESSIONAL = 'PROFESSIONAL',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  passwordHash: string; // In real app, never store plain text, even in mock we pretend
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Kept for backward compatibility if needed
  category: string;
  imageUrl?: string; // New field for rich UI
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  coverImage?: string; // Base64 string for the main project image
  galleryImages?: string[]; // Array of Base64 strings for project gallery
  beforeVideoUrl: string;
  afterVideoUrl: string;
  location?: string;
  completionDate?: string;
  createdAt: string;
  updatedAt?: string;
}