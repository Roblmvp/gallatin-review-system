-- =====================================================
-- Gallatin CDJR Review System - Supabase Schema & Seed
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
-- TABLE 2: review_links (per-sale tokens)
-- =====================================================
CREATE TABLE IF NOT EXISTS review_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  salesperson_id UUID NOT NULL REFERENCES salespeople(id),
  customer_first_name TEXT,  -- optional, for personalization
  deal_id TEXT,              -- optional, link to your DMS/CRM
  ro_number TEXT,            -- optional, repair order for service
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,    -- optional expiration
  is_active BOOLEAN DEFAULT true
);

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_review_links_token ON review_links(token);
CREATE INDEX IF NOT EXISTS idx_review_links_salesperson ON review_links(salesperson_id);

-- =====================================================
-- TABLE 3: review_events (tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS review_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT now(),
  event_type TEXT NOT NULL,  -- 'page_view' | 'cta_click'
  token TEXT,                -- links to review_links.token
  salesperson_id UUID REFERENCES salespeople(id),
  user_agent TEXT,
  referrer TEXT,
  ip_hash TEXT,              -- privacy-safe hashed IP (optional)
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_review_events_token ON review_events(token);
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
-- HELPER FUNCTION: Generate short token
-- =====================================================
CREATE OR REPLACE FUNCTION generate_short_token(length INT DEFAULT 8)
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghjkmnpqrstuvwxyz23456789';  -- no confusing chars (0,o,1,l,i)
  result TEXT := '';
  i INT;
BEGIN
  FOR i IN 1..length LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- HELPER FUNCTION: Create review link for a sale
-- =====================================================
-- Usage: SELECT create_review_link('cheney', 'John', 'DEAL-12345');
CREATE OR REPLACE FUNCTION create_review_link(
  p_salesperson_slug TEXT,
  p_customer_first_name TEXT DEFAULT NULL,
  p_deal_id TEXT DEFAULT NULL,
  p_ro_number TEXT DEFAULT NULL
)
RETURNS TABLE(token TEXT, full_url TEXT) AS $$
DECLARE
  v_token TEXT;
  v_salesperson_id UUID;
BEGIN
  -- Get salesperson ID
  SELECT id INTO v_salesperson_id 
  FROM salespeople 
  WHERE slug = p_salesperson_slug AND is_active = true;
  
  IF v_salesperson_id IS NULL THEN
    RAISE EXCEPTION 'Salesperson with slug "%" not found or inactive', p_salesperson_slug;
  END IF;
  
  -- Generate unique token
  LOOP
    v_token := generate_short_token(8);
    EXIT WHEN NOT EXISTS (SELECT 1 FROM review_links WHERE review_links.token = v_token);
  END LOOP;
  
  -- Insert the link
  INSERT INTO review_links (token, salesperson_id, customer_first_name, deal_id, ro_number)
  VALUES (v_token, v_salesperson_id, p_customer_first_name, p_deal_id, p_ro_number);
  
  RETURN QUERY SELECT v_token, 'https://gallatincdjr.reviews/review/' || v_token;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEW: Scoreboard (reviews by salesperson)
-- =====================================================
CREATE OR REPLACE VIEW review_scoreboard AS
SELECT 
  s.slug,
  s.display_name,
  s.title,
  COUNT(DISTINCT rl.id) AS links_created,
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
LEFT JOIN review_links rl ON rl.salesperson_id = s.id
LEFT JOIN review_events re ON re.token = rl.token
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
JOIN review_links rl ON rl.token = re.token
JOIN salespeople s ON s.id = rl.salesperson_id
GROUP BY DATE(re.created_at), s.slug, s.display_name
ORDER BY date DESC, clicks DESC;

-- =====================================================
-- ROW LEVEL SECURITY (optional but recommended)
-- =====================================================
-- Enable RLS
ALTER TABLE salespeople ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_events ENABLE ROW LEVEL SECURITY;

-- Public read access for salespeople (needed for the landing page)
CREATE POLICY "Public can view active salespeople" ON salespeople
  FOR SELECT USING (is_active = true);

-- Public read access for review links (needed for the landing page)
CREATE POLICY "Public can view active review links" ON review_links
  FOR SELECT USING (is_active = true);

-- Service role can do everything (your API)
CREATE POLICY "Service role full access salespeople" ON salespeople
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access review_links" ON review_links
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
-- Quick test queries:
-- 
-- View all salespeople:
--   SELECT * FROM salespeople;
--
-- Create a review link:
--   SELECT * FROM create_review_link('cheney', 'John', 'DEAL-12345');
--
-- View scoreboard:
--   SELECT * FROM review_scoreboard;
--
-- View daily metrics:
--   SELECT * FROM daily_metrics;
