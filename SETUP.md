# Database Setup Guide

## Quick Setup

1. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and set your environment variables**:
   ```
   # Required
   DATABASE_URL="postgresql://user:password@localhost:5432/sphere?schema=public"
   NEXTAUTH_SECRET="your-secret-here"
   RIFT_API_KEY="your-rift-api-key"
   CRADLE_TOKEN="your-cradle-token-for-email-sending"
   
   # Optional
   RIFT_ENVIRONMENT="PRODUCTION"  # or "SANDBOX" for testing
   CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   ```
   
   See `.env.example` for a complete template.

3. **Push schema to database**:
   ```bash
   npm run db:push
   ```

4. **Generate Prisma Client** (already done):
   ```bash
   npm run db:generate
   ```

5. **Seed the database** (optional):
   ```bash
   npm run db:seed
   ```

## Test Credentials (after seeding)

- **User**: `john@example.com` / `password123`
- **Organizer**: `organizer@example.com` / `password123`
