import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, APPWRITE_CONFIG } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Create Appwrite client
    const { databases } = createAdminClient();

    // Check if email already exists
    try {
      const existingUsers = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.waitlistCollectionId,
        [
          // Query to find existing email
        ]
      );

      // Check manually if email exists (since Appwrite query might need adjustment)
      const emailExists = existingUsers.documents.some(
        (doc) => (doc as unknown as { email: string }).email === normalizedEmail
      );

      if (emailExists) {
        return NextResponse.json(
          {
            message: 'You are already on the waitlist!',
            alreadyExists: true
          },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error('Error checking existing email:', error);
      // Continue with creation if check fails
    }

    // Create document in Appwrite
    const document = await databases.createDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.waitlistCollectionId,
      ID.unique(),
      {
        email: normalizedEmail,
        createdAt: new Date().toISOString(),
        status: 'pending',
      }
    );

    return NextResponse.json(
      {
        message: 'Successfully joined the waitlist!',
        success: true,
        data: {
          id: document.$id,
          email: document.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);

    // Handle specific Appwrite errors
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 401) {
        return NextResponse.json(
          { error: 'Appwrite authentication failed. Check your API key.' },
          { status: 500 }
        );
      }

      if (error.code === 404) {
        return NextResponse.json(
          { error: 'Appwrite database or collection not found. Please check your configuration.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to join waitlist. Please try again later.',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve waitlist count (for admin purposes)
export async function GET() {
  try {
    const { databases } = createAdminClient();

    const response = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.waitlistCollectionId
    );

    return NextResponse.json(
      {
        count: response.total,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist GET error:', error);

    return NextResponse.json(
      {
        error: 'Failed to retrieve waitlist count.',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
