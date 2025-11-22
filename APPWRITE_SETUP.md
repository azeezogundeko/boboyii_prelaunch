# Appwrite Backend Setup Guide

This guide will help you set up Appwrite as the backend for the waitlist functionality.

## Prerequisites

- An Appwrite account (sign up at [https://cloud.appwrite.io](https://cloud.appwrite.io))
- Node.js 18+ installed
- Access to this project's codebase

## Step 1: Create an Appwrite Project

1. Go to [https://cloud.appwrite.io](https://cloud.appwrite.io) and sign in
2. Click **"Create Project"**
3. Enter a project name (e.g., "Boboyii Waitlist")
4. Copy your **Project ID** - you'll need this later

## Step 2: Create a Database and Collection

### Create Database

1. In your Appwrite project, navigate to **Databases** in the left sidebar
2. Click **"Create Database"**
3. Name it `waitlist-db` (or any name you prefer)
4. Copy the **Database ID** - you'll need this later

### Create Collection

1. Inside your database, click **"Create Collection"**
2. Name it `waitlist` (or any name you prefer)
3. Copy the **Collection ID** - you'll need this later

### Configure Collection Attributes

Add the following attributes to your collection:

| Attribute Key | Type     | Size | Required | Array | Default |
|--------------|----------|------|----------|-------|---------|
| `email`      | String   | 255  | Yes      | No    | -       |
| `createdAt`  | String   | 50   | Yes      | No    | -       |
| `status`     | String   | 50   | Yes      | No    | pending |

**Steps to add attributes:**
1. Click on your collection
2. Go to the **Attributes** tab
3. Click **"Create Attribute"**
4. Select **"String"**
5. Fill in the details for each attribute as shown above
6. Click **"Create"**

### Configure Collection Permissions

1. Go to the **Settings** tab of your collection
2. Under **Permissions**, add the following:
   - **Read access**: `Any` (optional, for public access to count)
   - **Create access**: `Any` (allows anyone to join the waitlist)
   - **Update access**: Remove or restrict to admin only
   - **Delete access**: Remove or restrict to admin only

**Note:** For production, you may want to restrict permissions and use server-side validation only.

### Create Index (Optional but Recommended)

To prevent duplicate emails and improve query performance:

1. Go to the **Indexes** tab
2. Click **"Create Index"**
3. Configure:
   - **Index Key**: `email_unique`
   - **Type**: Unique
   - **Attributes**: `email` (ascending)
4. Click **"Create"**

## Step 3: Generate API Key

1. In your Appwrite project, go to **Overview** or **Settings**
2. Navigate to **API Keys** section
3. Click **"Create API Key"**
4. Configure:
   - **Name**: `Waitlist Backend`
   - **Expiration**: Never (or set appropriate expiration)
   - **Scopes**: Check the following:
     - `databases.read`
     - `databases.write`
5. Click **"Create"**
6. **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!

## Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your Appwrite credentials:

   ```env
   # Your Appwrite endpoint (use cloud.appwrite.io for cloud version)
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

   # Your Project ID from Step 1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here

   # Your API Key from Step 3
   APPWRITE_API_KEY=your_api_key_here

   # Your Database ID from Step 2
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here

   # Your Collection ID from Step 2
   NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID=your_collection_id_here
   ```

3. **Security**: Never commit `.env.local` to git! It's already in `.gitignore`.

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Try submitting an email through the waitlist form

4. Check your Appwrite console:
   - Go to **Databases** → Your Database → `waitlist` collection
   - You should see a new document with the submitted email

## Step 6: Verify API Endpoints

### Test Waitlist Submission

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected response:
```json
{
  "message": "Successfully joined the waitlist!",
  "success": true,
  "data": {
    "id": "...",
    "email": "test@example.com"
  }
}
```

### Test Waitlist Count

```bash
curl http://localhost:3000/api/waitlist
```

Expected response:
```json
{
  "count": 1
}
```

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add all environment variables to your hosting platform's environment settings
2. Ensure `APPWRITE_API_KEY` is kept secret (server-side only)
3. Update CORS settings in Appwrite:
   - Go to **Settings** → **Platforms** in your Appwrite project
   - Add your production domain
4. Consider adding rate limiting to prevent abuse

## Docker Deployment

If using Docker (as configured in this project):

1. Create a `.env` file for Docker with the same variables
2. Update `docker-compose.yml` to include environment variables:
   ```yaml
   environment:
     - NEXT_PUBLIC_APPWRITE_ENDPOINT=${NEXT_PUBLIC_APPWRITE_ENDPOINT}
     - NEXT_PUBLIC_APPWRITE_PROJECT_ID=${NEXT_PUBLIC_APPWRITE_PROJECT_ID}
     - APPWRITE_API_KEY=${APPWRITE_API_KEY}
     - NEXT_PUBLIC_APPWRITE_DATABASE_ID=${NEXT_PUBLIC_APPWRITE_DATABASE_ID}
     - NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID=${NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID}
   ```

## Troubleshooting

### Error: "Appwrite authentication failed"
- Check that your `APPWRITE_API_KEY` is correct
- Verify the API key has the necessary scopes

### Error: "Database or collection not found"
- Verify `NEXT_PUBLIC_APPWRITE_DATABASE_ID` matches your database ID
- Verify `NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID` matches your collection ID

### Error: "Invalid email format"
- The API validates email format on the server side
- Ensure you're sending a valid email address

### Duplicate Email Submissions
- If you created a unique index on the `email` field, duplicates will be prevented
- The API checks for existing emails before creating a new document

## Additional Features (Optional)

### Email Notifications
Consider integrating with email services like:
- SendGrid
- Mailgun
- Resend
- AWS SES

### Analytics
Track waitlist submissions with:
- Google Analytics
- Mixpanel
- Segment

### Admin Dashboard
Create an admin page to:
- View all waitlist submissions
- Export to CSV
- Send bulk emails
- Manage waitlist status

## Support

For issues related to:
- **Appwrite**: [Appwrite Documentation](https://appwrite.io/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **This Project**: Create an issue in the repository

## Security Best Practices

1. **Never expose your API key** in client-side code
2. **Use environment variables** for all sensitive data
3. **Implement rate limiting** to prevent abuse
4. **Validate all inputs** on the server side
5. **Use HTTPS** in production
6. **Regularly rotate API keys**
7. **Monitor for suspicious activity** in Appwrite console

---

**Congratulations!** Your Appwrite backend is now configured and ready to collect waitlist signups.
