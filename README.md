# Gallatin CDJR Review Link System

A personalized, trackable review link system for Gallatin CDJR that generates unique per-sale links, tracks engagement, and provides beautiful link previews for iMessage/SMS.

**Live URL:** `gallatincdjr.reviews/review/<token>`

## Features

- **Per-Sale Token Links**: Each customer gets a unique `gallatincdjr.reviews/review/abc123` link
- **Rich Link Previews**: OG tags work with iMessage, Android Messages, Facebook, etc.
- **Full Tracking**: Page views, CTA clicks, UTM parameters, and attribution
- **Scoreboard Ready**: Built-in views for leaderboards and daily metrics
- **CRM-Ready API**: Create links programmatically for DriveCentric automation

---

## Quick Start

### 1. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy and paste the contents of `supabase-seed.sql`
4. Click **Run** to create all tables and seed your roster

### 2. Set Up Vercel

1. Push this code to a GitHub repo
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables (see `.env.example`):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_BASE_URL` → `https://gallatincdjr.reviews`
   - `NEXT_PUBLIC_GOOGLE_REVIEW_URL` → Your Google Review link
   - `NEXT_PUBLIC_OG_IMAGE_URL` → Your OG image URL

4. Deploy!

### 3. Configure Custom Domain

In Vercel:
1. Go to **Settings** → **Domains**
2. Add `gallatincdjr.reviews`
3. Update DNS as instructed

---

## Usage

### Creating Review Links

#### Option A: Via Supabase SQL

```sql
SELECT * FROM create_review_link('cheney', 'John', 'DEAL-12345');
-- Returns: token, full_url
```

#### Option B: Via API

```bash
curl -X POST https://gallatincdjr.reviews/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "salesperson_slug": "cheney",
    "customer_first_name": "John",
    "deal_id": "DEAL-12345"
  }'
```

Response:
```json
{
  "ok": true,
  "data": {
    "token": "abc123xy",
    "url": "https://gallatincdjr.reviews/review/abc123xy",
    "salesperson": { "slug": "cheney", "name": "Cheney Freewalt" },
    "customer_first_name": "John"
  }
}
```

### Viewing the Scoreboard

In Supabase SQL Editor:

```sql
-- Overall scoreboard
SELECT * FROM review_scoreboard;

-- Daily breakdown
SELECT * FROM daily_metrics WHERE date >= CURRENT_DATE - INTERVAL '7 days';
```

---

## File Structure

```
├── app/
│   ├── api/
│   │   ├── links/route.ts      # Create/list review links
│   │   └── track/route.ts      # Log page views & clicks
│   └── review/
│       └── [token]/
│           ├── page.tsx        # Server component (OG tags)
│           └── ReviewPageClient.tsx  # Client component (tracking)
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── getBaseUrl.ts           # Environment-aware URL helper
├── supabase-seed.sql           # Database schema + seed data
├── .env.example                # Environment variables template
└── README.md
```

---

## API Reference

### `POST /api/links`

Create a new review link.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `salesperson_slug` | string | ✅ | Salesperson's URL slug |
| `customer_first_name` | string | | Customer's first name (for personalization) |
| `deal_id` | string | | DMS/CRM deal ID |
| `ro_number` | string | | Service repair order number |

### `GET /api/links`

List recent links.

| Param | Description |
|-------|-------------|
| `limit` | Max results (default: 20) |
| `salesperson` | Filter by salesperson slug |

### `POST /api/track`

Log an event (called automatically by the landing page).

| Field | Type | Description |
|-------|------|-------------|
| `event_type` | string | `page_view` or `cta_click` |
| `token` | string | Review link token |
| `salesperson_id` | string | Salesperson UUID |
| `utm` | object | `{ source, medium, campaign }` |

---

## Salespeople Roster

| Name | Slug | Title |
|------|------|-------|
| Cheney Freewalt | `cheney` | Product Specialist |
| DJ Rogers | `dj` | Product Specialist |
| Vedant Patel | `vedant` | Product Specialist |
| Kody McCann | `kody` | Product Specialist |
| Cody Brown | `cody-brown` | Product Specialist |
| Andrew Kirk | `andrew` | Product Specialist |
| Braedan Thaprasop | `braedan` | Product Specialist |
| Tim Campbell | `tim` | Product Specialist |
| Ethan Wright | `ethan` | Product Specialist |
| Tyler Doyle | `tyler` | Sales Leader |
| Joe Smith | `joe` | Sales Leader |
| Dominick Ferrara | `dominick` | Sales Leader |
| Mich Shelton | `mich` | Internet Sales Leader |
| Wesley Upchurch | `wesley` | Accessory Manager |
| Tamara Brunt | `tamara` | Service to Sales |
| Mike Olari | `mike` | Fleet Manager |

---

## Testing Link Previews

### iMessage
- iMessage caches aggressively
- Add a query param to force refresh: `/review/abc123?v=2`
- Or send to a different phone number

### Facebook Debugger
- Use [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug)
- Click "Scrape Again" to refresh cache

### Common Preview Issues
- ❌ Relative image URL → Use absolute URL starting with `https://`
- ❌ OG tags in client JS → Must be server-rendered
- ❌ Slow response → Keep page lightweight
- ❌ Image too large → Keep under 300KB

---

## Next Steps (Phase 2)

1. **Dashboard UI**: Build a visual scoreboard at `/admin/scoreboard`
2. **CRM Integration**: Webhook from DriveCentric → `POST /api/links`
3. **Personalized OG Images**: Cloudinary text overlays with salesperson name
4. **SMS Automation**: Auto-text customer after delivery status change

---

## Support

Built by your team. Questions? Check the code comments or reach out.
