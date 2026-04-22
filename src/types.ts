export type Role = 'OWNER' | 'ADMIN' | 'AGENT';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: any;
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  createdAt: any;
  inviteCode?: string;
}

export interface OrgMember {
  id: string;
  orgId: string;
  userId: string;
  role: Role;
  email: string;
  joinedAt: any;
}

export interface Document {
  id: string;
  orgId: string;
  filename: string;
  status: 'processing' | 'done' | 'failed';
  storagePath: string;
  fileSize: number;
  createdAt: any;
}

export interface Conversation {
  id: string;
  orgId: string;
  visitorId: string;
  visitorName?: string;
  status: 'open' | 'pending' | 'closed';
  lastMessageAt: any;
  createdAt: any;
}

export interface Message {
  id: string;
  conversationId: string;
  orgId: string;
  sender: 'visitor' | 'ai' | 'agent';
  text: string;
  citations?: string[];
  confidence?: number;
  createdAt: any;
}

export interface WidgetSettings {
  id: string;
  orgId: string;
  themeColor: string;
  welcomeMessage: string;
  isEnabled: boolean;
}
