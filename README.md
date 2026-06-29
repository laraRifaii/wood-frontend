# BioWood — Frontend

A production-quality web application for **BioWood**, a solid wood products company. Built with Next.js 16 and Tailwind CSS v4, fully connected to a NestJS backend CMS.

**Live demo:** [https://wood-frontend-opal.vercel.app](https://wood-frontend-opal.vercel.app)

**Admin dashboard:** [https://wood-frontend-opal.vercel.app/admin/dashboard](https://wood-frontend-opal.vercel.app/admin/dashboard)
- Email: `admin@biowood.com`
- Password: `Admin123!`

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript | Language |
| Tailwind CSS v4 | Styling |
| Axios | HTTP client |
| Lucide React | Icons |
| JWT + Refresh Token | Authentication |
| KyivType Sans + Inter | Typography |
| Vercel | Deployment |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm
- BioWood backend running (see backend repo)

### Installation

```bash
git clone https://github.com/laraRifaii/wood-frontend.git
cd biowood-frontend
npm install
```

### Environment Variables

```bash
cp .env.example .env
```

Fill in the values — see [Environment Variables](#environment-variables) below.

### Custom Font

Place `KyivTypeSans-Medium.woff2` in `public/fonts/`:

```
public/
└── fonts/
    └── KyivTypeSans-Medium.woff2
```

> Download the font from [befonts.com](https://befonts.com/kyivtype-sans-serif-font.html), convert `.otf` → `.woff2` using [cloudconvert.com](https://cloudconvert.com/otf-to-woff2)

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API base URL — must include `/api` suffix |
| `API_URL` | ✅ | Same as above — used by server-side components |

> See `.env.example` for the exact format.

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with AuthProvider
│   ├── page.tsx                  # Homepage — server component  
│   ├── global-error.tsx         # Global error boundary
│   ├── login/                   # Admin login page
│   ├── gallery/                 # Public gallery page
│   ├── about/                   # Public about page
│   ├── contact/                 # Public contact page
│   ├── price-list/              # Public price list page
│   └── admin/                   # Protected CMS dashboard
│       ├── layout.tsx           # Sidebar + auth guard
│       ├── dashboard/           # Overview
│       ├── hero/                # Hero section editor
│       ├── products/            # Wood types CRUD + image upload
│       ├── services/            # Services CRUD
│       ├── gallery/             # Gallery upload + drag reorder
│       ├── about/               # About section editor
│       ├── advantages/          # Advantages editor (max 5 items)
│       └── inquiries/           # Contact form submissions
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Fixed navbar with scroll blur
│   │   ├── Footer.tsx           # Footer 
│   │   └── LayoutWrapper.tsx    # Hides Navbar/Footer on admin routes
│   ├── sections/
│   │   ├── HeroSection.tsx      # Responsive hero (card mobile / full desktop)
│   │   ├── WoodSection.tsx      # Wood types grid with pros/cons
│   │   ├── GallerySection.tsx   # Image carousel with arrows + dots
│   │   ├── AdvantagesSection.tsx
│   │   ├── AboutSection.tsx     # 3 staggered overlapping images
│   │   └── ContactSection.tsx   # Form with validation
│   ├── admin/
│   │   └── AdminUI.tsx          # Shared UI components (Card, Field, Toast…)
│   └── button/
│       └── Button.tsx           # Reusable steel-colored button
│
├── context/
│   └── AuthContext.tsx          # JWT auth + automatic token refresh + storing user in local storage
│
├── lib/
│   ├── api.ts                   # Axios + request/response interceptors
│   ├── content.api.ts           # Typed server-side data fetchers
│   └── utils.ts                 # getImageUrl, stripMeta
│
└── types/
    └── index.ts                 # Shared TypeScript interfaces
```

---

## Authentication

The auth system uses a dual-token JWT strategy:

- **Access token** (15 min) — stored in `localStorage`, attached to every API request via Axios interceptor
- **Refresh token** (7 days) — stored in `localStorage` + `httpOnly`-style cookie for middleware

**Auto-refresh flow:**
1. API call returns `401` → interceptor catches it
2. Calls `POST /auth/refresh` automatically
3. Retries the original request with the new token
4. Concurrent failed requests are queued and retried together
5. If refresh also fails → clears storage and redirects to `/login`

**Route protection:**
`middleware.ts` reads the cookie server-side and redirects unauthenticated users away from `/admin/*` before the page renders — preventing 404 flashes.

---

## Image Strategy

```typescript
// src/lib/utils.ts
export function getImageUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('blob:')) return path;
  if (path.startsWith('/uploads/')) return `${BACKEND_URL}${path}`;
  return path; // static files served by Vercel from /public
}
```

| Image type | Source | Example |
|------------|--------|---------|
| Static assets | Vercel (`/public`) | `/images/background.jpg` |
| Admin uploads | Uploadcare CDN | `https://ucarecdn.com/uuid/` |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variables:
```
NEXT_PUBLIC_API_URL = https://your-backend.up.railway.app/api
API_URL             = https://your-backend.up.railway.app/api
```
4. Deploy

> **Important:** Add `export const dynamic = 'force-dynamic'` in `src/app/layout.tsx` to prevent build-time prerendering errors when the backend is unreachable during Vercel builds.

---

## AI Tools Used

| Tool | Usage |
|------|-------|
| Claude (Anthropic) | Component architecture, auth system, API integration, responsive layouts, admin dashboard, deployment debugging |
| GitHub Copilot | Inline code completion |

> All code was reviewed and understood before use. AI tools accelerated implementation; all architectural decisions were made by the developer.

---

## Time Spent

| Area | Hours |
|------|-------|
| Design system setup (Tailwind, fonts, CSS variables) | 3h |
| Public pages + sections | 12h |
| Authentication (JWT, refresh, middleware) | 4h |
| Admin dashboard (7 pages + shared UI) | 10h |
| API integration + image handling | 4h |
| Responsive design + pixel-perfect polish | 5h |
| Deployment + debugging | 4h |
| Documentation | 2h |
| **Total** | **~44h** |