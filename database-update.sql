-- =====================================================
-- Gallatin CDJR Review System - DATABASE UPDATE
-- Run this in Supabase SQL Editor TOMORROW MORNING
-- =====================================================

-- =====================================================
-- STEP 1: Add email column and update all salespeople
-- =====================================================
ALTER TABLE salespeople ADD COLUMN IF NOT EXISTS email TEXT;

UPDATE salespeople SET email = 'cheney.f@gallatincdjr.com' WHERE slug = 'cheney';
UPDATE salespeople SET email = 'dj.rogers@gallatincdjr.com' WHERE slug = 'dj';
UPDATE salespeople SET email = 'vedant.p@gallatincdjr.com' WHERE slug = 'vedant';
UPDATE salespeople SET email = 'kody.m@gallatincdjr.com' WHERE slug = 'kody';
UPDATE salespeople SET email = 'cody.b@gallatincdjr.com' WHERE slug = 'cody-brown';
UPDATE salespeople SET email = 'a.kirk@gallatincdjr.com' WHERE slug = 'andrew';
UPDATE salespeople SET email = 'braedan.t@gallatincdjr.com' WHERE slug = 'braedan';
UPDATE salespeople SET email = 'tim.c@gallatincdjr.com' WHERE slug = 'tim';
UPDATE salespeople SET email = 'ethan.w@gallatincdjr.com' WHERE slug = 'ethan';
UPDATE salespeople SET email = 'tyler.d@gallatincdjr.com' WHERE slug = 'tyler';
UPDATE salespeople SET email = 'joe.s@gallatincdjr.com' WHERE slug = 'joe';
UPDATE salespeople SET email = 'dominick.f@gallatincdjr.com' WHERE slug = 'dominick';
UPDATE salespeople SET email = 'mich.s@gallatincdjr.com' WHERE slug = 'mich';
UPDATE salespeople SET email = 'wesley.u@gallatincdjr.com' WHERE slug = 'wesley';
UPDATE salespeople SET email = 'tamara.b@gallatincdjr.com' WHERE slug = 'tamara';
UPDATE salespeople SET email = 'mike.o@gallatincdjr.com' WHERE slug = 'mike';
UPDATE salespeople SET email = 'rob.l@gallatincdjr.com' WHERE slug = 'robert';

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';

-- =====================================================
-- STEP 2: Add social media click tracking
-- =====================================================
-- Add new event types: 'facebook_click', 'instagram_click', 'tiktok_click',
-- 'save_contact', 'save_service_contact', 'save_accessories_contact',
-- 'schedule_service_click', 'referral_share', 'calendar_download'
-- (These work with existing event_type column - no schema change needed)

-- =====================================================
-- STEP 3: Create referrals table
-- =====================================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referral_code TEXT UNIQUE NOT NULL,
  referrer_name TEXT,
  referrer_phone TEXT,
  referrer_email TEXT,
  salesperson_id UUID REFERENCES salespeople(id),
  salesperson_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_salesperson ON referrals(salesperson_id);

-- =====================================================
-- STEP 4: Create referral events table
-- =====================================================
CREATE TABLE IF NOT EXISTS referral_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referral_code TEXT NOT NULL,
  event_type TEXT NOT NULL,  -- 'page_view', 'contact_click', 'converted'
  created_at TIMESTAMPTZ DEFAULT now(),
  user_agent TEXT,
  referrer TEXT,
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_referral_events_code ON referral_events(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_events_type ON referral_events(event_type);

-- =====================================================
-- STEP 5: Update review_scoreboard with new metrics
-- =====================================================
DROP VIEW IF EXISTS review_scoreboard;

CREATE VIEW review_scoreboard AS
SELECT 
  s.slug,
  s.display_name,
  s.title,
  s.email,
  'https://gallatincdjr.reviews/review/' || s.slug AS review_link,
  COUNT(CASE WHEN re.event_type = 'page_view' THEN 1 END) AS page_views,
  COUNT(CASE WHEN re.event_type = 'cta_click' THEN 1 END) AS cta_clicks,
  COUNT(CASE WHEN re.event_type = 'facebook_click' THEN 1 END) AS facebook_clicks,
  COUNT(CASE WHEN re.event_type = 'instagram_click' THEN 1 END) AS instagram_clicks,
  COUNT(CASE WHEN re.event_type = 'tiktok_click' THEN 1 END) AS tiktok_clicks,
  COUNT(CASE WHEN re.event_type = 'save_contact' THEN 1 END) AS contact_saves,
  COUNT(CASE WHEN re.event_type = 'schedule_service_click' THEN 1 END) AS service_clicks,
  COUNT(CASE WHEN re.event_type = 'referral_share' THEN 1 END) AS referrals_shared,
  COUNT(CASE WHEN re.event_type = 'calendar_download' THEN 1 END) AS calendar_downloads,
  ROUND(
    CASE 
      WHEN COUNT(CASE WHEN re.event_type = 'page_view' THEN 1 END) > 0 
      THEN COUNT(CASE WHEN re.event_type = 'cta_click' THEN 1 END)::NUMERIC / 
           COUNT(CASE WHEN re.event_type = 'page_view' THEN 1 END) * 100
      ELSE 0 
    END, 1
  ) AS review_click_rate
FROM salespeople s
LEFT JOIN review_events re ON re.slug = s.slug
WHERE s.is_active = true
GROUP BY s.id, s.slug, s.display_name, s.title, s.email
ORDER BY cta_clicks DESC, page_views DESC;

-- =====================================================
-- STEP 6: Create referral scoreboard view
-- =====================================================
CREATE OR REPLACE VIEW referral_scoreboard AS
SELECT 
  s.slug,
  s.display_name,
  COUNT(DISTINCT r.id) AS total_referrals_created,
  COUNT(CASE WHEN rfe.event_type = 'page_view' THEN 1 END) AS referral_page_views,
  COUNT(CASE WHEN rfe.event_type = 'contact_click' THEN 1 END) AS referral_contacts,
  COUNT(CASE WHEN rfe.event_type = 'converted' THEN 1 END) AS referral_conversions
FROM salespeople s
LEFT JOIN referrals r ON r.salesperson_slug = s.slug
LEFT JOIN referral_events rfe ON rfe.referral_code = r.referral_code
WHERE s.is_active = true
GROUP BY s.id, s.slug, s.display_name
ORDER BY referral_conversions DESC, referral_contacts DESC;

-- =====================================================
-- STEP 7: Update salesperson_links view with email
-- =====================================================
DROP VIEW IF EXISTS salesperson_links;

CREATE VIEW salesperson_links AS
SELECT 
  display_name,
  slug,
  title,
  phone,
  email,
  'https://gallatincdjr.reviews/review/' || slug AS review_link
FROM salespeople
WHERE is_active = true
ORDER BY display_name;

-- =====================================================
-- STEP 8: RLS for new tables
-- =====================================================
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access referrals" ON referrals
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public can view active referrals" ON referrals
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can insert referrals" ON referrals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access referral_events" ON referral_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Anyone can insert referral_events" ON referral_events
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- DONE! Verify with these queries:
-- =====================================================
-- SELECT * FROM salesperson_links;
-- SELECT * FROM review_scoreboard;
-- SELECT * FROM referral_scoreboard;
