# Sanjivani Apothecary & Chemist

A full-featured, production-style **24×7 pharmacy & wellness e-commerce web app** for *Sanjivani Apothecary & Chemist* — a licensed chemist and druggist based in Pune, India. Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**, the app covers the complete pharmacy shopping journey: browsing medicines, uploading prescriptions, ordering lab tests, consulting doctors, health tracking, checkout with delivery slots, order tracking, and more — with light/dark themes and trilingual (English / हिन्दी / मराठी) content.

> **Live demo / AI Studio app:** https://ai.studio/apps/e1601e7e-b45d-49d8-be1b-9732f7509986

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [State Management](#state-management)
- [Data Layer](#data-layer)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 🛒 Shopping & Commerce
- Product catalog with categories, health concerns, and brand filters
- Search, sorting, and faceted filtering across the shop
- Product detail pages with dosage info, side effects, precautions, storage, and **substitute/alternate medicine** suggestions
- Quick-view and product-compare modals
- Shopping cart drawer with coupon/discount application
- Wishlist support
- Pincode serviceability check with **Express (90 min)**, **Standard**, and **Store Pickup** delivery options with slot selection
- Full checkout flow → order confirmation with tracking steps
- Loyalty points and tier system (Silver / Gold / Platinum)

### 💊 Prescription & Pharmacy Services
- Prescription upload flow with pharmacist verification status pipeline (`Received → Verifying → Quote Ready → Confirmed`)
- Rx / Schedule H / OTC drug-scheduling badges and prescription-required gating
- WhatsApp order integration view

### 🏥 Health Services
- **Lab test packages** — full-body checkups, fasting requirements, report turnaround, test lists, home sample collection
- **Doctor consultation** — specialist profiles, fees, ratings, available slots, and languages
- **Health tools** — blood-sugar & blood-pressure logging with status classification (Normal / Elevated / High / Low)
- **Medicine reminders** — dosage timing, with/without food, refill alerts, per family member
- Family member profiles with allergies & chronic conditions

### 📦 Orders & Account
- Order history with live-style tracking timeline (Placed → Verified → Packed → Out for Delivery → Delivered)
- Saved addresses (Home / Work / Parents) with default-address support
- User profile with loyalty tier and member-since info
- Auth modal (sign-in / sign-up flow)

### 📝 Content & Marketing
- Health blog with categories, read-time, tags, and full article view
- Coupons & offers engine
- Reviews with verified badges
- About page with store details

### 🎨 UX / Platform
- **Dark / light theme** persisted across sessions
- **Trilingual i18n** — English, Hindi, Marathi (category/concern names localized)
- Toast notification system
- Animated UI via `motion` (Framer Motion successor) and `canvas-confetti` celebrations
- **PWA-ready** — web app manifest, theme-color, apple touch meta tags
- **SEO** — Open Graph & Twitter card meta tags, JSON-LD `Pharmacy` structured data (address, geo, 24×7 opening hours, departments)
- Responsive, mobile-first layout with Google Fonts (Fraunces + Manrope)
- SVG-generated product art (no external image dependencies)

### 🛠 Admin
- Admin view for store/product/order management (demo data driven)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| State management | Zustand (with `persist` middleware → localStorage) |
| Animations | `motion`, `canvas-confetti` |
| Charts | Recharts |
| Icons | lucide-react |
| AI (optional) | `@google/genai` (Gemini) |
| Server (optional) | Express |
| Runtime scripts | tsx, esbuild |
| Package manager | npm (or Bun — `bun.lock` included) |

---

## Project Structure

```
.
├── index.html                 # Entry HTML: SEO meta, OG/Twitter, JSON-LD, fonts, PWA links
├── package.json
├── tsconfig.json
├── vite.config.ts             # React + Tailwind plugins, '@' path alias, HMR config
├── .env.example               # GEMINI_API_KEY, APP_URL template
├── metadata.json              # AI Studio app metadata
├── public/
│   ├── icon.svg               # App icon
│   └── manifest.json          # PWA manifest
└── src/
    ├── main.tsx               # React bootstrap
    ├── App.tsx                # Root layout + view switcher + global modals
    ├── index.css              # Tailwind entry + design tokens
    ├── store/
    │   └── useStore.ts        # Zustand store: cart, auth, orders, health logs, i18n, theme…
    ├── types/
    │   └── index.ts           # Product, Order, Prescription, LabPackage, Doctor, etc.
    ├── data/                  # Seed/demo data
    │   ├── products.ts        # Medicine & wellness catalog
    │   ├── categories.ts      # Categories + health concerns (i18n names)
    │   ├── brands.ts          # Manufacturer brands
    │   ├── doctors.ts         # Doctor profiles
    │   ├── labTests.ts        # Lab test packages
    │   ├── coupons.ts         # Discount coupons
    │   ├── orders.ts          # Initial/demo orders
    │   ├── reviews.ts         # Product & service reviews
    │   ├── blogs.ts           # Health blog posts
    │   └── i18n.ts            # Translation strings (en/hi/mr)
    ├── components/
    │   ├── common/            # Header, Footer, ToastContainer, ProductArt
    │   ├── cart/              # CartDrawer
    │   ├── auth/              # AuthModal
    │   └── product/           # ProductCard, QuickViewModal, CompareModal
    └── views/                 # Route-level screens
        ├── HomeView.tsx
        ├── ShopView.tsx
        ├── ProductDetailView.tsx
        ├── PrescriptionUploadView.tsx
        ├── CheckoutView.tsx / CheckoutSuccessView.tsx
        ├── AccountView.tsx
        ├── HealthToolsView.tsx
        ├── LabTestsView.tsx
        ├── DoctorConsultView.tsx
        ├── BlogView.tsx
        ├── AboutView.tsx
        ├── AdminView.tsx
        └── WhatsAppView.tsx
```

Navigation is **state-driven** (no router library): `App.tsx` switches on `currentView` from the Zustand store, and `Header`/`Footer` dispatch view changes.

---

## Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** (or Bun / yarn / pnpm)
- A **Gemini API key** from [Google AI Studio](https://aistudio.google.com/apikey) — only required if you enable Gemini-powered features

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/sanjivani-apothecary-chemist.git
   cd sanjivani-apothecary-chemist
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and set your `GEMINI_API_KEY` (and `APP_URL` if needed).

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app runs at **http://localhost:3000** (bound to `0.0.0.0` for LAN/device testing).

5. **(Optional) Type-check**

   ```bash
   npm run lint
   ```

---

## Environment Variables

Create a `.env.local` file (see `.env.example`):

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Optional* | Google Gemini API key for AI-powered features (`@google/genai`). *Required only when calling the Gemini API.* |
| `APP_URL` | Optional | Public URL where the app is hosted (self-referential links, OAuth callbacks, API endpoints). |

> In Google AI Studio, secrets are injected at runtime via the Secrets panel. Locally, Vite loads them from `.env.local`.
> `.env*` files are git-ignored; only `.env.example` is committed.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port **3000** (`--host 0.0.0.0`) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check with `tsc --noEmit` (no emit) |
| `npm run clean` | Remove `dist/` and `server.js` |

---

## State Management

All application state lives in a single Zustand store (`src/store/useStore.ts`) persisted to `localStorage` via `persist` middleware. Key slices:

- **Navigation** — `currentView`, selected product/blog, search query, filters
- **UI** — theme (light/dark), language (`en` / `hi` / `mr`), toasts, open drawers/modals
- **Commerce** — cart, wishlist, applied coupon, delivery method/slot, pincode status
- **Orders** — placed orders with tracking steps
- **Account** — user profile, addresses, family members
- **Health** — medicine reminders, health logs (sugar/BP), prescriptions

This makes the demo fully client-side — no backend or database is required to run it.

---

## Data Layer

Seed data lives under `src/data/` and is imported directly into the store. Products include rich pharmacy-specific fields: generic/salt name, drug schedule (`OTC`/`Rx`/`Schedule H`), dosage form, substitutes with savings %, batch/expiry placeholders, uses, side effects, precautions, and storage instructions. Swap these modules for API calls when integrating a real backend.

---

## Deployment

Any static host works, since the app builds to plain HTML/JS/CSS:

```bash
npm run build   # outputs dist/
```

- **Vercel:** framework preset *Vite*, build command `npm run build`, output `dist`
- **Netlify:** build command `npm run build`, publish directory `dist`
- **GitHub Pages / Cloudflare Pages / S3:** serve the `dist/` folder

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please run `npm run lint` before submitting.

---

## License

This project is provided as an example/demo application. Add a `LICENSE` file of your choice if you plan to distribute it.

---

<p align="center">
  <strong>Built by <a href="https://github.com/girishlade111">Girish Lade</a></strong> • Part of <a href="https://ladestack.in">LadeStack</a>
</p>
