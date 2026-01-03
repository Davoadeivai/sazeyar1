
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
    passwordHash: string;
    role: UserRole;
    createdAt: string;
    lastLogin?: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    iconName: string;
    category: string;
    imageUrl?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export interface UserChatSession {
    userId: string;
    messages: ChatMessage[];
    lastUpdated: string;
}

export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    coverImage?: string;
    galleryImages?: string[];
    beforeVideoUrl: string;
    afterVideoUrl: string;
    location?: string;
    completionDate?: string;
    createdAt: string;
    updatedAt?: string;
}

export type OrderStatus = 'PENDING' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ServiceOrder {
    id: string;
    userId?: string; // Optional, helpful if logged in
    serviceTitle: string;
    fullName: string;
    phone: string;
    description: string;
    status: OrderStatus;
    createdAt: string;
}

export interface RoadmapStep {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
    icon: string;
}

export interface ActivityLog {
    id: string;
    userId: string;
    action: string;
    details?: string;
    timestamp: string;
}

// New: Site Settings for Admin to control footer links
export interface SiteSettings {
    instagramUrl: string;
    telegramUrl: string;
    whatsappUrl: string;
    enamadUrl: string; // URL for the image or the link
    phoneNumber: string;
    address: string;
}
