# KhetConnect Deployment Guide

KhetConnect is a farm-to-student application built with Next.js (App Router), Prisma, MongoDB, NextAuth, and Tailwind CSS. Use this guide to deploy it directly to Vercel.

## 1. Prerequisites
- A GitHub account and repo where the KhetConnect code is pushed.
- A MongoDB cluster (e.g., MongoDB Atlas free tier).
- A Vercel account.

## 2. Environment Variables (.env)
You must set up the following environment variables on your local machine and in Vercel.

Create a `.env` in the root of the project:
```env
# Database connection string
DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.mongodb.net/khetconnect"

# NextAuth secrets (run `openssl rand -base64 32` to generate a random string)
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000" # Use your Vercel URL when deployed

# Razorpay Test Keys (Available from Razorpay Dashboard -> Settings -> API Keys)
RAZORPAY_KEY_ID="rzp_test_xxxxxx"
RAZORPAY_KEY_SECRET="your_test_secret"
```

## 3. Local Setup & Seeding
Before deploying to production, initialize your MongoDB database with the seed data.

1. Ensure the `DATABASE_URL` is set in your `.env`.
2. Run Prisma push to sync the schema:
   ```bash
   npx prisma db push
   ```
3. Run the seed script to populate villages, users, and dummy products:
   ```bash
   npm run prisma seed
   ```
4. Verify local application runs correctly:
   ```bash
   npm run dev
   ```

## 4. Deploying to Vercel
1. Log in to [Vercel](https://vercel.com) and click **Add New... > Project**.
2. Import the KhetConnect repository from your GitHub account.
3. In the **Configure Project** step:
   - **Framework Preset**: Ensure "Next.js" is selected.
   - **Build Command**: `npm run build` (Vercel overrides this automatically but ensure it is standard).
   - **Environment Variables**: Add all variables from the `.env` section above. **Important**: Set `NEXTAUTH_URL` to your production URL (e.g. `https://khetconnect.vercel.app`), otherwise NextAuth will fail.
4. Click **Deploy**.

Vercel will build the application, install dependencies, and run the Prisma client generation automatically (since `@prisma/client` triggers `prisma generate` post-install).

## 5. Scaling Strategy
As KhetConnect grows across multiple villages and campuses:
1. **Migration to PostgreSQL**: If analytical queries per-village scale up, PostgreSQL combined with PostGIS for spatial village clustering can replace MongoDB using Prisma.
2. **Redis Caching**: Utilize Redis (e.g. Upstash) to cache product listings for faster response times.
3. **Webhooks for WebSockets**: Implement real-time notifications for delivery assignments using Pusher or Socket.io.
