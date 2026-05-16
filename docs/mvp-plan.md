# MVP Plan

## In Scope

- Bilingual public website (Arabic RTL + English LTR) with language toggle
- Services catalog: categorized, browsable, no pricing
- Service request form: visitor submits contact info + service details
- Admin dashboard: view, filter, update, delete requests; manage services
- Single admin account with JWT auth
- WhatsApp and email CTA buttons
- Mobile-responsive, SEO meta tags

## Out of Scope

- Payment processing
- Visitor accounts or request tracking portal
- File uploads
- Email notifications
- Blog section
- Multi-admin roles

---

## Pages

### Public

| Route | Arabic | English |
|---|---|---|
| `/` | الرئيسية | Home |
| `/services` | خدماتنا | Our Services |
| `/services/[slug]` | تفاصيل الخدمة | Service Detail |
| `/request` | طلب خدمة | Request a Service |
| `/about` | من نحن | About Us |
| `/contact` | تواصل معنا | Contact Us |

### Admin (protected)

| Route | Purpose |
|---|---|
| `/admin/login` | Admin sign-in |
| `/admin/dashboard` | Stats overview + recent requests |
| `/admin/requests` | Full requests table |
| `/admin/requests/[id]` | View + update single request |
| `/admin/services` | Manage services list |
| `/admin/services/new` | Add service |
| `/admin/services/[id]/edit` | Edit service |

---

## Database Schema

### `admins`
```
id            UUID PK
email         VARCHAR UNIQUE NOT NULL
password_hash VARCHAR NOT NULL
created_at    TIMESTAMPTZ
```

### `categories`
```
id         UUID PK
slug       VARCHAR UNIQUE NOT NULL
name_ar    VARCHAR NOT NULL
name_en    VARCHAR NOT NULL
order      INT
created_at TIMESTAMPTZ
```

### `services`
```
id          UUID PK
category_id UUID FK → categories
slug        VARCHAR UNIQUE NOT NULL
name_ar     VARCHAR NOT NULL
name_en     VARCHAR NOT NULL
desc_ar     TEXT
desc_en     TEXT
is_active   BOOLEAN DEFAULT true
order       INT
created_at  TIMESTAMPTZ
updated_at  TIMESTAMPTZ
```

### `service_requests`
```
id                 UUID PK
service_id         UUID FK → services (nullable)
category_id        UUID FK → categories
full_name          VARCHAR NOT NULL
whatsapp           VARCHAR NOT NULL
email              VARCHAR
university         VARCHAR
degree_level       ENUM('bachelor','master','phd','other')
preferred_language ENUM('ar','en')
details            TEXT NOT NULL
referral_source    VARCHAR
status             ENUM('new','in_review','in_progress','completed','cancelled') DEFAULT 'new'
admin_notes        TEXT
contacted          BOOLEAN DEFAULT false
created_at         TIMESTAMPTZ
updated_at         TIMESTAMPTZ
```

---

## API Endpoints

### Public (no auth)

| Method | Path | Description |
|---|---|---|
| GET | `/api/categories` | All active categories with their services |
| GET | `/api/services` | All active services (`?category=slug`) |
| GET | `/api/services/:slug` | Single service detail |
| POST | `/api/requests` | Submit service request |

### Admin (JWT required)

| Method | Path | Description |
|---|---|---|
| POST | `/api/admin/auth/login` | Login → JWT |
| POST | `/api/admin/auth/logout` | Logout |
| GET | `/api/admin/requests` | List requests (filter: status, category, date, degree) |
| GET | `/api/admin/requests/:id` | Single request |
| PATCH | `/api/admin/requests/:id` | Update status / notes / contacted |
| DELETE | `/api/admin/requests/:id` | Delete request |
| GET | `/api/admin/services` | All services including inactive |
| POST | `/api/admin/services` | Create service |
| PUT | `/api/admin/services/:id` | Update service |
| DELETE | `/api/admin/services/:id` | Delete service |
| GET | `/api/admin/categories` | List categories |
| POST | `/api/admin/categories` | Create category |
| PUT | `/api/admin/categories/:id` | Update category |
| DELETE | `/api/admin/categories/:id` | Delete category |
| GET | `/api/admin/stats` | Dashboard stats |

---

## Folder Structure

```
student-services-platform/
├── docs/
├── frontend/
│   ├── public/
│   │   └── locales/
│   │       ├── ar/common.json
│   │       └── en/common.json
│   └── src/
│       ├── app/
│       │   ├── [locale]/
│       │   │   ├── page.tsx
│       │   │   ├── services/page.tsx
│       │   │   ├── services/[slug]/page.tsx
│       │   │   ├── request/page.tsx
│       │   │   ├── about/page.tsx
│       │   │   └── contact/page.tsx
│       │   └── admin/
│       │       ├── login/page.tsx
│       │       ├── dashboard/page.tsx
│       │       ├── requests/page.tsx
│       │       ├── requests/[id]/page.tsx
│       │       ├── services/page.tsx
│       │       ├── services/new/page.tsx
│       │       └── services/[id]/edit/page.tsx
│       ├── components/
│       │   ├── layout/
│       │   ├── ui/
│       │   ├── public/
│       │   └── admin/
│       ├── hooks/
│       ├── lib/
│       │   ├── api.ts
│       │   └── i18n.ts
│       └── types/index.ts
├── backend/
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── routes/
│       │   ├── public/
│       │   └── admin/
│       └── db/
│           ├── migrations/
│           └── seed.ts
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Development Stages

| Stage | Deliverables |
|---|---|
| 1 (current) | README, docs, .gitignore, .env.example |
| 2 | Docker Compose, DB migrations, seed data |
| 3 | Express API — public routes |
| 4 | Express API — admin routes |
| 5 | Next.js public frontend |
| 6 | Next.js admin dashboard |
| 7 | Polish, SEO, testing, deployment |
