# Aryan Angral — Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. Includes dark mode, animated sections, and a contact form that emails you directly — no backend server required.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

All resume content (experience, projects, skills, certifications) lives in one place: [src/lib/data.ts](src/lib/data.ts). Edit that file to update the site — no need to touch the components.

## Setting up the contact form (EmailJS — free)

The contact form uses [EmailJS](https://www.emailjs.com) to send you an email directly from the browser, with no backend/server code and no cost on the free tier (200 emails/month).

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an **Email Service** (e.g. connect your Gmail) — note the **Service ID**.
3. Create an **Email Template** with these variable placeholders in the body: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}` — note the **Template ID**.
4. Go to **Account → General** and copy your **Public Key**.
5. Copy `.env.local.example` to `.env.local` and fill in the three values:

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

6. Restart the dev server. Submitting the form now sends you an email directly.

Until these are set, the form will show a friendly message pointing visitors to your email address instead of failing silently.

## Updating your resume file

Replace [public/Aryan_Angral_Resume.pdf](public/Aryan_Angral_Resume.pdf) with an updated export whenever your resume changes — the "Resume" button in the hero section always links to this file.

## Deploying for free (Vercel)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository (free Hobby plan).
3. In the Vercel project's **Settings → Environment Variables**, add the same three `NEXT_PUBLIC_EMAILJS_*` variables from your `.env.local`.
4. Deploy. Vercel auto-detects Next.js — no extra config needed.
5. (Optional) Add a custom domain for free under **Settings → Domains**.

Every push to your main branch redeploys automatically.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for scroll/entrance animations
- **EmailJS** for the contact form
- **react-icons** for icons
