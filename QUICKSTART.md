# Quick Start Guide - Waitlist Backend

## Architecture Overview

**Important:** The backend API **runs inside the same Next.js application**, not as a separate server!

```
┌─────────────────────────────────────┐
│   Docker Container (Port 3002)      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Next.js Application        │ │
│  │                               │ │
│  │  ├─ Frontend (/)              │ │
│  │  │   └─ Waitlist Form         │ │
│  │  │                            │ │
│  │  └─ Backend API Routes        │ │
│  │      └─ /api/waitlist         │ │
│  │          ├─ POST (submit)     │ │
│  │          └─ GET (count)       │ │
│  └───────────────────────────────┘ │
│              ↓                      │
└──────────────┼──────────────────────┘
               ↓
    ┌──────────────────────┐
    │  Appwrite Cloud      │
    │  (External Service)  │
    └──────────────────────┘
```

## Setup Steps (Docker)

### 1. Set Up Appwrite (One-Time Setup)

Follow the detailed instructions in [APPWRITE_SETUP.md](./APPWRITE_SETUP.md) to:
- Create an Appwrite project
- Set up database and collection
- Generate API key

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your Appwrite credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_secret_api_key
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID=your_collection_id
```

### 3. Build and Run with Docker

```bash
# Build and start the container
docker-compose up --build -d

# Check logs to ensure it's running
docker-compose logs -f web
```

### 4. Test the Integration

**Test the frontend:**
- Open your browser to `http://localhost:3002` (or your configured domain)
- Submit an email through the waitlist form
- Check for success message

**Test the API directly:**
```bash
# Submit an email
curl -X POST http://localhost:3002/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get waitlist count
curl http://localhost:3002/api/waitlist
```

**Verify in Appwrite:**
- Log into your Appwrite console
- Navigate to your database → waitlist collection
- You should see the submitted email

## Common Issues

### ❌ "Failed to join waitlist" Error

**Cause:** Environment variables not loaded in Docker container

**Solution:**
```bash
# 1. Make sure .env file exists in project root
ls -la .env

# 2. Rebuild the container to pick up environment variables
docker-compose down
docker-compose up --build -d

# 3. Check if environment variables are set in container
docker-compose exec web env | grep APPWRITE
```

### ❌ "Appwrite authentication failed"

**Cause:** Invalid or missing API key

**Solution:**
- Verify `APPWRITE_API_KEY` in `.env` is correct
- Ensure the API key has `databases.read` and `databases.write` scopes
- Generate a new API key if needed

### ❌ "Database or collection not found"

**Cause:** Incorrect database/collection IDs

**Solution:**
- Double-check IDs in your Appwrite console
- Copy-paste IDs directly to avoid typos
- Ensure collection is created and has required attributes

### ❌ Frontend form submits but nothing happens

**Cause:** JavaScript errors or CORS issues

**Solution:**
```bash
# Check browser console for errors
# Check Docker logs for API errors
docker-compose logs web

# Ensure build was successful
docker-compose exec web ls -la .next
```

## File Structure

```
boboyii_prelaunch/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # API endpoint (POST & GET)
│   └── page.tsx                  # Frontend with waitlist form
├── lib/
│   └── appwrite.ts               # Appwrite client configuration
├── types/
│   └── waitlist.ts               # TypeScript types
├── .env                          # Your credentials (DO NOT COMMIT)
├── .env.example                  # Template for .env
├── docker-compose.yml            # Docker configuration
├── APPWRITE_SETUP.md            # Detailed Appwrite setup
└── QUICKSTART.md                # This file
```

## Environment Variables Explained

| Variable | Purpose | Where to Find |
|----------|---------|---------------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API URL | Use `https://cloud.appwrite.io/v1` for Appwrite Cloud |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your project ID | Appwrite Console → Project Settings |
| `APPWRITE_API_KEY` | Server-side auth | Appwrite Console → API Keys (generate new) |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Database ID | Appwrite Console → Databases → Your Database |
| `NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID` | Collection ID | Appwrite Console → Collections → waitlist |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are accessible in the browser. The `APPWRITE_API_KEY` is only used server-side and should never be exposed to the client.

## API Endpoints

### POST /api/waitlist
Submit an email to the waitlist

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (201):**
```json
{
  "message": "Successfully joined the waitlist!",
  "success": true,
  "data": {
    "id": "document_id",
    "email": "user@example.com"
  }
}
```

**Duplicate Email Response (200):**
```json
{
  "message": "You are already on the waitlist!",
  "alreadyExists": true
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message here"
}
```

### GET /api/waitlist
Get the total number of waitlist submissions

**Success Response (200):**
```json
{
  "count": 42
}
```

## Development vs Production

**Development (without Docker):**
```bash
# Use .env.local for development
cp .env.local.example .env.local
# Fill in credentials
npm run dev
```

**Production (with Docker):**
```bash
# Use .env for production
cp .env.example .env
# Fill in credentials
docker-compose up --build -d
```

## Next Steps

1. ✅ Set up Appwrite project
2. ✅ Configure environment variables
3. ✅ Build and run with Docker
4. ✅ Test the integration
5. 🔄 Monitor submissions in Appwrite console
6. 📧 (Optional) Add email notifications
7. 📊 (Optional) Add analytics tracking
8. 🎨 (Optional) Customize success messages

For detailed setup instructions, see [APPWRITE_SETUP.md](./APPWRITE_SETUP.md)
