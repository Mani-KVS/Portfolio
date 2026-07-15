# Portfolio — Konjeti Venkata Sai Manikanta

A premium, glassmorphic, dark/light-mode portfolio built with Next.js (App
Router), TypeScript, and Tailwind CSS — content-managed with TinaCMS,
comments and messages backed by Firebase Firestore, and deployed on Vercel.

Everything (projects, certifications, skills, resume, contact info, images)
is editable from `/admin` without touching code, once you've done the
one-time setup below.

> **v2 redesign notes:** This is a visual + UX redesign on top of the same
> stack (Next.js, TypeScript, Tailwind, Firebase, Firestore, TinaCMS). No
> backend was replaced. What's new:
> - Purple/blue glassmorphic design system, animated with Framer Motion
> - Animated stat counters, tilt-hover project cards, a certificate modal
>   gallery, an admin SaaS-style sidebar dashboard
> - New sections: **Achievements** (animated counters) and **Experience**
>   (empty-state ready — add roles via TinaCMS once you have them)
> - Section number labels removed sitewide
> - Guestbook comments now support an optional star rating + pagination
> - Contact form messages are now also stored in Firestore (`messages`
>   collection) and viewable in Admin → Messages, in addition to the
>   existing email notification
> - Comment moderation moved from `/admin/comments` to
>   `/admin/dashboard/comments` (old URL still redirects there)
> - Third project "AI Cricket Match Analyzer" added as a placeholder per
>   your brief — replace its description/links/image via TinaCMS or the
>   Admin → Projects page

---

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # fill in the values as you complete steps below
npm run dev
```

Visit `http://localhost:3000`. The portfolio works immediately with the
placeholder content already in `/content` and `/public/images` — you don't
need any of the accounts below just to preview it.

**Your real resume is already loaded** at `/public/resume/resume.pdf`
(the file you uploaded). Swap in your real profile photo, project
screenshots, and certificate images in `/public/images` when ready — or do
it later from the Admin Panel once TinaCMS is connected (step 3).

> ⚠️ One thing I couldn't pull from your resume: it lists "Mail" and
> "LinkedIn" as icon links, but not the actual addresses/URLs. I put in a
> placeholder email and LinkedIn URL in `content/site.json` — update those
> with your real ones before you deploy.

---

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
gh repo create your-username/portfolio --private --source=. --push
# or create the repo on github.com and:
# git remote add origin https://github.com/your-username/portfolio.git
# git push -u origin main
```

---

## 3. Connect TinaCMS (the Admin Panel)

TinaCMS is what lets you edit content at `/admin` and have it commit +
push to GitHub automatically.

1. Run `npx tinacms init` inside the project (or sign up free at
   [app.tina.io](https://app.tina.io)) and connect it to your GitHub repo.
2. Copy the **Client ID** and **Token** it gives you into `.env.local`:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID=...
   TINA_TOKEN=...
   ```
3. Add the same two variables in **Vercel → Project → Settings →
   Environment Variables** once you've deployed (step 5).

Once connected, visiting `/admin` on your live site lets you edit every
section (Hero, About, Skills, Education, Projects, Certifications,
Contact) and upload images. Hitting **Save** commits the change to GitHub
directly — no local git commands needed.

To add/remove projects or certifications, use the Projects / Certifications
collections in the Admin Panel — each save creates or updates a JSON file
under `content/projects` or `content/certifications`, so you can add as
many as you like.

---

## 4. Connect Firebase (comments + guestbook)

1. Create a free project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Firestore Database** (start in production mode).
3. Project Settings → General → "Your apps" → add a Web app → copy the
   config values into `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```
4. Project Settings → Service Accounts → **Generate new private key** →
   paste the full JSON contents as one line into `.env.local`:
   ```
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   ```
5. Deploy the Firestore security rules already written for you:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add        # pick your Firebase project
   firebase deploy --only firestore:rules,firestore:indexes
   ```
6. Set an admin password for the comment-moderation page:
   ```
   ADMIN_PASSWORD=choose-a-strong-password
   ```

Visitors' comments are stored as `pending` and only show publicly once you
approve them at `/admin/comments` (protected by `ADMIN_PASSWORD`).

---

## 5. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Add **all** the environment variables from `.env.local` in Vercel's
   project settings (Settings → Environment Variables).
3. Deploy.

From then on: **every push to `main` on GitHub redeploys automatically** —
that includes the commits TinaCMS makes when you hit Save in the Admin
Panel. That's the whole pipeline:

```
Admin Panel → Save → TinaCMS commits & pushes to GitHub → Vercel redeploys → Live
```

---

## 6. Email notifications (new comments + contact form)

Both the guestbook and the contact form email you using
[Resend](https://resend.com) (free tier: 100 emails/day).

1. Sign up at resend.com, verify your account, create an API key.
2. Add to `.env.local` / Vercel env vars:
   ```
   RESEND_API_KEY=re_...
   NOTIFY_EMAIL=you@example.com
   ```
3. The contact form (`/api/contact`) emails you directly — no extra setup.
4. For the guestbook, deploy the Cloud Function that fires on every new
   comment:
   ```bash
   cd functions
   npm install
   firebase functions:secrets:set RESEND_API_KEY
   firebase functions:secrets:set NOTIFY_EMAIL
   npm run deploy
   ```

> Resend's free plan sends from `onboarding@resend.dev` by default, which
> works out of the box. To send from your own domain, verify it in Resend
> and update the `from` field in `functions/src/index.ts` and
> `app/api/contact/route.ts`.

---

## Project structure

```
app/            Routes (pages + API routes)
  admin/dashboard/   Sidebar-based admin (Dashboard, About, Skills,
                      Projects, Certificates, Resume, Messages, Comments,
                      Settings) — password-gated via ADMIN_PASSWORD
components/     UI components, organized as sections/, ui/, and admin/
content/        JSON content edited via TinaCMS (site, skills, education,
                experience, projects/*, certifications/*)
firebase/       Firebase client + admin SDK setup, Firestore helpers
functions/      Firebase Cloud Function — emails you on new comments
lib/            Content loaders, admin-auth helper
public/         Images, resume PDF
tina/           TinaCMS schema (defines what's editable in /admin)
```

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · TinaCMS · Firebase
Firestore · Resend · Vercel

## What's already done vs. what needs your accounts

**Already built and working:**
- Full responsive site with all 8 sections, dark/light mode, your real
  resume, and content pre-filled from your resume
- TinaCMS schema wired to every editable field
- Firestore-backed guestbook with moderation queue
- Password-protected `/admin/comments` moderation page
- Contact form + Cloud Function email notifications, ready to send
- CI workflow that lints and type-checks every push

**Needs your own free accounts (5–10 min each, one-time):**
- TinaCloud (Admin Panel editing on the live site)
- Firebase (Firestore + Cloud Functions)
- Resend (email notifications)
- Vercel (hosting)

I can't create these accounts for you since they require your own login
and API keys — but every line of code that talks to them is already
written and waiting for the keys.
