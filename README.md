# Hostillam

Official website for **Hostillam** — hosting beautiful minds. A soulful homestay and camping experience in Kodaikanal, with anonymous visitor tracking and secure lead capture.

## Stack

- React + Vite (frontend)
- Express lead API (backend)
- JavaScript
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

This starts:

- Frontend: http://localhost:5173
- Lead API: http://localhost:3001

Production frontend build:

```bash
npm run build
npm run preview
```

API only:

```bash
npm run start:api
```

## Configuration

Website content:

- `src/config/site.js`
- `src/data/content.js`

Host notification credentials (server-side only):

- Copy `.env.example` → `.env`
- Set WhatsApp Cloud API and/or SMTP values
- Never put tokens in frontend code

## Lead capture flow

1. Anonymous `visitor_id` is created in localStorage
2. Browsing actions are tracked without asking for personal details
3. High-intent CTAs (Book Now, WhatsApp, Contact Host) request Name / Phone / Email
4. Backend stores the lead, associates activity, and notifies the host
5. Returning visitors are not asked again in the same recognized session

Lead statuses: `NEW`, `CONTACTED`, `BOOKING_ENQUIRY`, `CONFIRMED`, `CANCELLED`
