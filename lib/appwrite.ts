import { Client, Databases, Account } from 'node-appwrite';

// Server-side Appwrite client
export const createAdminClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

  return {
    client,
    databases: new Databases(client),
    account: new Account(client),
  };
};

// Client-side Appwrite client
export const createSessionClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

  return {
    client,
  };
};

// Appwrite configuration constants
export const APPWRITE_CONFIG = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  waitlistCollectionId: process.env.NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID || '',
};
