-- =====================================================
-- Gallatin CDJR Review System - Supabase Schema & Seed
-- SIMPLIFIED VERSION: Per-salesperson links (no tokens)
-- =====================================================
-- Run this in your Supabase SQL Editor to set up all tables
-- and seed your salesperson roster.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE 1: salespeople
-- =====================================================
CREATE TABLE IF NOT EXISTS salespeople (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  title TEXT,
  phone TEXT,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_salespeople_slug ON salespeople(slug);
CREATE INDEX IF NOT EXISTS idx_salespeople_active ON salespeople(is_active);

-- =====================================================
-- TABLE 2: review_events (tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS review_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT now(),
  event_type TEXT NOT NULL,  -- 'page_view' | 'cta_click'
  slug TEXT NOT NULL,        -- salesperson slug
  salesperson_id UUID REFERENCES salespeople(id),
  user_agent TEXT,
  referrer TEXT,
  ip_hash TEXT,              -- privacy-safe hashed IP (optional)
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_review_events_slug ON review_events(slug);
CREATE INDEX IF NOT EXISTS idx_review_events_salesperson ON review_events(salesperson_id);
CREATE INDEX IF NOT EXISTS idx_review_events_type ON review_events(event_type);
CREATE INDEX IF NOT EXISTS idx_review_events_created ON review_events(created_at);

-- =====================================================
-- SEED DATA: Gallatin CDJR Sales Roster
-- =====================================================
INSERT INTO salespeople (slug, display_name, title, phone) VALUES
  ('cheney', 'Cheney Freewalt', 'Product Specialist', '630-414-3647'),
  ('dj', 'DJ Rogers', 'Product Specialist', '615-913-0327'),
  ('vedant', 'Vedant Patel', 'Product Specialist', '615-332-5691'),
  ('kody', 'Kody McCann', 'Product Specialist', '805-660-3385'),
  ('cody-brown', 'Cody Brown', 'Product Specialist', '615-925-2556'),
  ('andrew', 'Andrew Kirk', 'Product Specialist', '423-315-0819'),
  ('braedan', 'Braedan Thaprasop', 'Product Specialist', '562-455-6246'),
  ('tim', 'Tim Campbell', 'Product Specialist', '615-485-3344'),
  ('ethan', 'Ethan Wright', 'Product Specialist', '615-948-3717'),
  ('tyler', 'Tyler Doyle', 'Sales Leader', '815-271-1976'),
  ('joe', 'Joe Smith', 'Sales Leader', '615-440-3660'),
  ('dominick', 'Dominick Ferrara', 'Sales Leader', '813-325-6690'),
  ('mich', 'Mich Shelton', 'Internet Sales Leader', '615-473-9837'),
  ('wesley', 'Wesley Upchurch', 'Accessory Manager', '615-626-1274'),
  ('tamara', 'Tamara Brunt', 'Service to Sales', '949-312-8181'),
  ('mike', 'Mike Olari', 'Fleet Manager', '615-922-9078')
ON CONFLICT (slug) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  title = EXCLUDED.title,
  phone = EXCLUDED.phone,
  updated_at = now();

-- =====================================================
-- VIEW: Scoreboard (reviews by salesperson)
-- =====================================================
CREATE OR REPLACE VIEW review_scoreboard AS
SELECT 
  s.slug,
  s.display_name,
  s.title,
  'https://gallatincdjr.reviews/review/' || s.slug AS review_link,
  COUNT(CASE WHEN re.event_type = 'page_view' THEN 1 END) AS page_views,
  COUNT(CASE WHEN re.event_type = 'cta_click' THEN 1 END) AS cta_clicks,
  ROUND(
    CASE 
      WHEN COUNT(CASE WHEN re.event_type = 'page_view' THEN 1 END) > 0 
      THEN COUNT(CASE WHEN re.event_type = 'cta_click' THEN 1 END)::NUMERIC / 
           COUNT(CASE WHEN re.event_type = 'page_view' THEN 1 END) * 100
      ELSE 0 
    END, 1
  ) AS click_through_rate
FROM salespeople s
LEFT JOIN review_events re ON re.slug = s.slug
WHERE s.is_active = true
GROUP BY s.id, s.slug, s.display_name, s.title
ORDER BY cta_clicks DESC, page_views DESC;

-- =====================================================
-- VIEW: Daily metrics
-- =====================================================
CREATE OR REPLACE VIEW daily_metrics AS
SELECT 
  DATE(re.created_at) AS date,
  s.slug,
  s.display_name,
  COUNT(CASE WHEN re.event_type = 'page_view' THEN 1 END) AS views,
  COUNT(CASE WHEN re.event_type = 'cta_click' THEN 1 END) AS clicks
FROM review_events re
JOIN salespeople s ON s.slug = re.slug
GROUP BY DATE(re.created_at), s.slug, s.display_name
ORDER BY date DESC, clicks DESC;

-- =====================================================
-- VIEW: All salesperson links (easy reference)
-- =====================================================
CREATE OR REPLACE VIEW salesperson_links AS
SELECT 
  display_name,
  slug,
  title,
  phone,
  'https://gallatincdjr.reviews/review/' || slug AS review_link
FROM salespeople
WHERE is_active = true
ORDER BY display_name;

-- =====================================================
-- ROW LEVEL SECURITY (optional but recommended)
-- =====================================================
-- Enable RLS
ALTER TABLE salespeople ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_events ENABLE ROW LEVEL SECURITY;

-- Public read access for salespeople (needed for the landing page)
CREATE POLICY "Public can view active salespeople" ON salespeople
  FOR SELECT USING (is_active = true);

-- Service role can do everything (your API)
CREATE POLICY "Service role full access salespeople" ON salespeople
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access review_events" ON review_events
  FOR ALL USING (auth.role() = 'service_role');

-- Allow anonymous inserts to review_events (for tracking)
CREATE POLICY "Anyone can insert review events" ON review_events
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- DONE! Your database is ready.
-- =====================================================
-- 
-- Quick queries:
-- 
-- View all salesperson links:
--   SELECT * FROM salesperson_links;
--
-- View scoreboard:
--   SELECT * FROM review_scoreboard;
--
-- View daily metrics:
--   SELECT * FROM daily_metrics;
