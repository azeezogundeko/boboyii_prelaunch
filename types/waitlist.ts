// Waitlist types

export interface WaitlistEntry {
  $id: string;
  email: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'converted';
  $createdAt?: string;
  $updatedAt?: string;
}

export interface WaitlistSubmission {
  email: string;
}

export interface WaitlistResponse {
  message: string;
  success: boolean;
  data?: {
    id: string;
    email: string;
  };
  alreadyExists?: boolean;
}

export interface WaitlistError {
  error: string;
  details?: string;
}

export interface WaitlistCountResponse {
  count: number;
}
