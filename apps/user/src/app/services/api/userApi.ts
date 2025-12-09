// API service functions for user-related endpoints
// These will be used by TanStack Query hooks

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
}

export interface Document {
  id: string;
  name: string;
  type: 'cv' | 'cover-letter' | 'other';
  createdAt: string;
  updatedAt: string;
  templateId?: string;
}

export interface Subscription {
  id: string;
  plan: 'free' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
}

// API functions (mock implementations - will be replaced with real API calls)
export const fetchUserProfile = async (): Promise<UserProfile> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 500);
  });
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<UserProfile> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        email: profile.email || 'user@example.com',
        firstName: profile.firstName,
        lastName: profile.lastName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 500);
  });
};

export const fetchUserSettings = async (): Promise<UserSettings> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        language: 'es-ES',
        timezone: 'Europe/Madrid',
        notifications: {
          email: true,
          push: false,
        },
      });
    }, 500);
  });
};

export const updateUserSettings = async (settings: Partial<UserSettings>): Promise<UserSettings> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        language: settings.language || 'es-ES',
        timezone: settings.timezone || 'Europe/Madrid',
        notifications: settings.notifications || {
          email: true,
          push: false,
        },
      });
    }, 500);
  });
};

export const fetchDocuments = async (): Promise<Document[]> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'My CV',
          type: 'cv',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Cover Letter',
          type: 'cover-letter',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }, 500);
  });
};

export const fetchDocument = async (id: string): Promise<Document> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: 'My CV',
        type: 'cv',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 500);
  });
};

export const fetchSubscription = async (): Promise<Subscription> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        plan: 'premium',
        status: 'active',
        startDate: new Date().toISOString(),
        autoRenew: true,
      });
    }, 500);
  });
};

