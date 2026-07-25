# BrightPath Consulting Website

A complete business website with a customer enquiry form and a protected lead dashboard, built for the AI Business Website Builder workshop.

## Project overview

This application helps **BrightPath Consulting** present their services online and collect customer enquiries. Submitted enquiries are saved to MongoDB and can be reviewed in a private dashboard.

## Business information

- **Business:** BrightPath Consulting
- **Focus:** Helping small and medium-sized businesses improve operations and adopt practical digital tools
- **Location:** Bangkok, Thailand
- **Contact:** hello@brightpath.example | 02-000-0000

## Pages

### Home (`/`)

The public website includes these sections in order:

1. Navigation
2. Hero
3. Customer Problem
4. Benefits
5. Services
6. How It Works
7. Customer Enquiry form
8. Footer

### Dashboard Login (`/dashboard/login`)

Password-protected login for the business owner.

### Lead Dashboard (`/dashboard`)

Review customer enquiries, search leads, filter by status, and update lead status.

## Main features

- Responsive, professional business website
- Customer enquiry form with validation
- Enquiries saved to MongoDB Atlas
- Protected lead dashboard
- Search and filter leads
- Update lead status (new, contacted, qualified, closed)
- Loading, success, and error states

## Technology stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- Mongoose
- Zod
- Lucide React icons

## Local setup

### 1. Install dependencies

Dependencies should already be installed. If needed, run:

```bash
npm install
```

### 2. Configure environment variables

Two environment files are included:

- `.env.example` — safe placeholders (can be committed to Git)
- `.env.local` — your local secrets (never commit this file)

Your `.env.local` file has already been created with:

- A secure random `AUTH_SECRET`
- A workshop dashboard password (`admin123`)
- A placeholder for your MongoDB connection string

**Important:** The default dashboard password is for local workshop use only. Change it before publishing a real application.

### 3. Add your MongoDB connection string

1. Open `.env.local` in your project folder.
2. Find the line that starts with `MONGODB_URI=`.
3. Replace `PASTE_YOUR_MONGODB_CONNECTION_STRING_HERE` with your connection string from MongoDB Atlas.
4. Save the file.

Example:

```env
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/brightpath
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## MongoDB Atlas setup

Follow these steps to connect your application to MongoDB Atlas:

1. **Create an account** at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. **Create a free cluster** (M0 tier is fine for this workshop).
3. **Create a database user** with a username and password. Save these credentials.
4. **Configure network access:**
   - For local development, add your current IP address, or
   - Allow access from anywhere (`0.0.0.0/0`) for testing only.
5. **Get your connection string:**
   - Click **Connect** on your cluster
   - Choose **Drivers**
   - Copy the connection string
6. **Update the connection string:**
   - Replace `<username>` and `<password>` with your database user credentials
   - Add a database name at the end (for example: `brightpath`)
7. **Save it in `.env.local`** as `MONGODB_URI`.
8. **Restart the development server** after saving.

## Required environment variables

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DASHBOARD_PASSWORD` | Password for dashboard login |
| `AUTH_SECRET` | Secret used to sign session cookies |

## How to test the enquiry form

1. Make sure your MongoDB connection string is saved in `.env.local`.
2. Start the dev server with `npm run dev`.
3. Open [http://localhost:3000](http://localhost:3000).
4. Scroll to **Book a Free Consultation**.
5. Fill in the form and click **Submit Enquiry**.
6. You should see: *"Thank you for your enquiry. We will contact you shortly."*

## How to access the dashboard

1. Open [http://localhost:3000/dashboard/login](http://localhost:3000/dashboard/login).
2. Enter the dashboard password from `.env.local` (default workshop password: `admin123`).
3. Click **Sign in**.
4. You will see all submitted enquiries.

## How to change the dashboard password

1. Open `.env.local`.
2. Change the value of `DASHBOARD_PASSWORD`.
3. Save the file.
4. Restart the development server.

## How to deploy to Vercel

1. Push your project to GitHub (do not commit `.env.local`).
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. Add these environment variables in Vercel project settings:
   - `MONGODB_URI`
   - `DASHBOARD_PASSWORD` (use a strong password, not `admin123`)
   - `AUTH_SECRET` (use a long random value)
4. Deploy the project.
5. In MongoDB Atlas, add Vercel's IP addresses or allow access from anywhere for the deployed app.

## Production authentication warning

This workshop uses a simple password-based login suitable for learning and prototyping.

For a real production application, use a complete authentication solution such as:

- [Auth.js](https://authjs.dev/)
- [Clerk](https://clerk.com/)
- [Keycloak](https://www.keycloak.org/)
- Your organization's identity provider

## Editing business content

Most website text is stored in one file:

```text
config/business.ts
```

Edit this file to change headlines, services, contact details, and other content without searching through many components.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
