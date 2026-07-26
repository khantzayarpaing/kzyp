# Khant Zayar Paing — Personal Portfolio

A personal portfolio website for **Khant Zayar Paing**, Digital Media Buying & Planning Manager, with a contact form and a private inbox for reviewing the messages it collects.

## Project overview

The site works as a living résumé and portfolio: it presents Khant's experience, selected work, awards, and skills, and makes it easy for recruiters and clients to get in touch. Messages sent through the contact form are saved to MongoDB and can be reviewed in a password-protected dashboard.

## Who it's for

- **Recruiters and hiring managers** looking for a paid media / performance marketing specialist
- **Clients** looking for freelance media buying and planning support
- **Khant**, who uses the private dashboard to read and track incoming messages

## Pages

### Home (`/`)

One long page with a sticky navigation bar. Sections, in order:

1. Navigation
2. Hero (name, title, tagline, headshot, calls to action)
3. Brands & organizations I've worked with
4. About (long-form bio, smaller headshot, key numbers)
5. What I Do (expertise cards with tools)
6. Skills & Tools (skill bars + MarTech stack)
7. Experience (timeline with achievements)
8. Selected Work (filterable project grid)
9. Awards & Recognition
10. Education & Certifications
11. Testimonials — *hidden until real quotes are added; nothing is invented*
12. Let's Work Together (contact details + message form)
13. Closing call to action and footer

### Dashboard login (`/dashboard/login`)

Password gate for the private inbox.

### Messages dashboard (`/dashboard`)

Private inbox showing every contact-form message, newest first.

## Main features

- Fully responsive, Apple-inspired design (light sections with black feature bands)
- Contact form with name, email, company, subject, and message fields
- Validation on both the browser and the server, with clear loading, success, and error states
- Messages saved to MongoDB Atlas
- Private dashboard with total / new / replied summary cards
- Search by name, email, or company; filter by status
- Update a message's status (new, read, replied, archived)
- Subtle scroll animations that switch off for visitors who prefer reduced motion
- Keyboard-accessible navigation with visible focus outlines

Messages are never deleted from the dashboard by design — archiving keeps a record.

## Technology stack

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS v4
- MongoDB Atlas with Mongoose
- Zod for validation
- Lucide React icons

## Where the content lives

Every editable piece of text, along with the design tokens, sits in one file:

```text
config/portfolio.ts
```

Edit that file to change the bio, stats, experience, projects, awards, education, contact details, or form copy — no need to hunt through components.

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment files

Two files are used:

- `.env.example` — safe placeholders, committed to Git
- `.env.local` — your real secrets, never committed

If `.env.local` is missing, copy the example and fill it in:

```bash
cp .env.example .env.local
```

Generate a long random `AUTH_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Start the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## MongoDB Atlas setup

1. **Create an account** at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. **Create a free cluster** (the M0 free tier is enough).
3. **Create a database user** with a username and password, and save both.
4. **Configure network access** — add the IP address of the computer or server that will connect. Nothing can reach the database until its IP is on this list.
5. **Get the connection string** — click **Connect**, choose **Drivers**, and copy the string.
6. **Fill in the string** — replace the username and password placeholders with your database user's details, and add a database name at the end, for example `portfolio`.
7. **Save it in `.env.local`** as the value of `MONGODB_URI`.
8. **Restart the development server** so the new value is picked up.

## Required environment variables

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DASHBOARD_PASSWORD` | Password for the dashboard login |
| `AUTH_SECRET` | Long random secret used to sign the session cookie |
| `NEXT_PUBLIC_SITE_URL` | Optional. The site's public address, used for link previews. Defaults to `https://kzyp.vercel.app`. |

These values stay on the server. They are never sent to the browser.

## How the contact form works

1. A visitor fills in the form in the **Let's Work Together** section and clicks **Send Message**.
2. The browser checks that name, email, and message are filled in correctly.
3. The details are sent to the site's own API, which validates them again on the server.
4. The message is saved to MongoDB with the status `new`.
5. The visitor sees: *"Thanks — your message has been sent. I'll be in touch soon."*

To test it locally, make sure `MONGODB_URI` is set, run `npm run dev`, submit the form, then open the dashboard to see the message.

## How to open the dashboard

1. Go to [http://localhost:3000/dashboard/login](http://localhost:3000/dashboard/login) (or `/dashboard/login` on the live site).
2. Enter the password from `DASHBOARD_PASSWORD`.
3. Click **Sign in**.

Visiting `/dashboard` without signing in redirects to the login page. **Log out** ends the session.

## How to change the dashboard password

1. Open `.env.local`.
2. Change the value of `DASHBOARD_PASSWORD`.
3. Save the file and restart the development server.

On Vercel, change it in the project's environment variables and redeploy.

## How to deploy to Vercel

1. Push the project to GitHub. `.env.local` is git-ignored and must never be committed.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Add the same environment variables in the Vercel project settings: `MONGODB_URI`, `DASHBOARD_PASSWORD` (use a strong password), and `AUTH_SECRET` (a long random value).
4. Deploy.
5. In MongoDB Atlas, make sure network access allows connections from the deployed app.

## Production authentication warning

The dashboard uses a single shared password and a signed session cookie. That is fine for a personal inbox, but for anything with multiple users or sensitive data, use a full authentication solution such as [Auth.js](https://authjs.dev/), [Clerk](https://clerk.com/), or your organization's identity provider.

## Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```
