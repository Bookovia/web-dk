-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT,
  distance TEXT,
  hero_image TEXT,
  phone TEXT,
  email TEXT,
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_reviews INTEGER DEFAULT 0,
  specialty TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  category TEXT DEFAULT 'detailing',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_images table
CREATE TABLE IF NOT EXISTS service_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing data
DELETE FROM service_images;
DELETE FROM services;
DELETE FROM providers;

-- Insert providers with their specialties
INSERT INTO providers (id, name, slug, address, distance, hero_image, phone, email, rating, total_reviews, specialty) VALUES 

-- Provider 1: Splash Super Wash Services (Budget-friendly basic services)
(
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  'Splash Super Wash Services',
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  '1703 Ritchi Ct. Capital Heights, Maryland, 20373',
  '0.9 mi',
  '/placeholder.svg?height=280&width=400',
  '(301) 555-0123',
  'info@splashsuperwash.com',
  4.8,
  127,
  'Basic Car Wash & Quick Services'
),

-- Provider 2: Elite Auto Detailing (Premium detailing specialist)
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Elite Auto Detailing',
  'elite-auto-detailing',
  '2450 University Blvd. Hyattsville, Maryland, 20783',
  '1.2 mi',
  '/placeholder.svg?height=280&width=400',
  '(301) 555-0456',
  'contact@eliteautodetailing.com',
  4.9,
  89,
  'Premium Paint & Interior Detailing'
),

-- Provider 3: Quick Clean Mobile (Mobile convenience services)
(
  'b2c3d4e5-f6g7-8901-bcde-f23456789012',
  'Quick Clean Mobile',
  'quick-clean-mobile',
  '3721 Hamilton St. Hyattsville, Maryland, 20781',
  '2.1 mi',
  '/placeholder.svg?height=280&width=400',
  '(301) 555-0789',
  'book@quickcleanmobile.com',
  4.7,
  203,
  'Mobile Car Cleaning & Convenience'
),

-- Provider 4: Luxury Car Spa (High-end luxury vehicle specialist)
(
  'c3d4e5f6-g7h8-9012-cdef-345678901234',
  'Luxury Car Spa',
  'luxury-car-spa',
  '5612 Baltimore Ave. Hyattsville, Maryland, 20781',
  '3.4 mi',
  '/placeholder.svg?height=280&width=400',
  '(301) 555-0321',
  'service@luxurycarspa.com',
  5.0,
  45,
  'Luxury & Exotic Vehicle Care'
);

-- Services for Provider 1: Splash Super Wash Services (Basic wash services)
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('splash-basic-wash', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Basic Wash', 'Interior and exterior wash with vacuuming', 10.00, 30, 'wash'),
('splash-engine-wash', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Engine Wash', 'Engine bay cleaning and degreasing', 25.00, 45, 'engine'),
('splash-mini-detail', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Mini Detail', 'Basic interior and exterior detailing', 85.00, 90, 'detailing'),
('splash-interior-detail', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Interior Detail', 'Complete interior cleaning and protection', 100.00, 120, 'interior'),
('splash-exterior-detail', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Exterior Detail', 'Full exterior wash, wax, and protection', 100.00, 120, 'exterior'),
('splash-full-service', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Full Service Wash', 'Complete interior, exterior, and engine cleaning', 135.00, 180, 'premium');

-- Services for Provider 2: Elite Auto Detailing (Premium detailing services)
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('elite-paint-correction', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Paint Correction', 'Multi-stage paint correction and polishing', 350.00, 300, 'paint'),
('elite-ceramic-coating', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ceramic Coating', '9H ceramic coating with 5-year warranty', 650.00, 360, 'protection'),
('elite-leather-restoration', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Leather Restoration', 'Professional leather cleaning and conditioning', 180.00, 150, 'interior'),
('elite-headlight-restoration', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Headlight Restoration', 'UV damage repair and protective coating', 120.00, 90, 'restoration'),
('elite-premium-detail', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Premium Detail Package', 'Complete premium detailing experience', 450.00, 480, 'premium'),
('elite-maintenance-wash', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Maintenance Wash', 'Weekly maintenance for detailed vehicles', 75.00, 60, 'maintenance');

-- Services for Provider 3: Quick Clean Mobile (Mobile convenience services)
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('mobile-express-wash', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Express Mobile Wash', 'Quick exterior wash at your location', 25.00, 30, 'mobile'),
('mobile-interior-clean', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Mobile Interior Clean', 'Complete interior cleaning service', 65.00, 75, 'interior'),
('mobile-full-detail', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Mobile Full Detail', 'Complete detailing at your location', 140.00, 150, 'detailing'),
('mobile-fleet-service', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Fleet Cleaning', 'Multiple vehicle cleaning packages', 45.00, 45, 'fleet'),
('mobile-emergency-clean', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Emergency Clean', 'Same-day urgent cleaning service', 95.00, 60, 'emergency'),
('mobile-weekly-service', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Weekly Mobile Service', 'Regular weekly cleaning subscription', 55.00, 45, 'subscription');

-- Services for Provider 4: Luxury Car Spa (High-end luxury services)
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('luxury-concierge-detail', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Concierge Detail', 'White-glove luxury vehicle detailing', 500.00, 360, 'luxury'),
('luxury-exotic-care', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Exotic Car Care', 'Specialized care for supercars and classics', 750.00, 480, 'exotic'),
('luxury-interior-restoration', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Interior Restoration', 'Complete luxury interior restoration', 600.00, 420, 'restoration'),
('luxury-show-prep', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Show Car Preparation', 'Concours-level preparation service', 900.00, 600, 'show'),
('luxury-ppf-installation', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Paint Protection Film', 'Full vehicle PPF installation', 2500.00, 720, 'protection'),
('luxury-monthly-care', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Monthly Luxury Care', 'Premium monthly maintenance package', 350.00, 180, 'maintenance');

-- Insert service images for Splash Super Wash Services
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('splash-basic-wash', '/placeholder.svg?height=100&width=100', true, 'Basic car wash service'),
('splash-engine-wash', '/placeholder.svg?height=100&width=100', true, 'Engine wash and degreasing'),
('splash-mini-detail', '/placeholder.svg?height=100&width=100', true, 'Mini detail service'),
('splash-interior-detail', '/placeholder.svg?height=100&width=100', true, 'Interior detail service'),
('splash-exterior-detail', '/placeholder.svg?height=100&width=100', true, 'Exterior detail service'),
('splash-full-service', '/placeholder.svg?height=100&width=100', true, 'Full service wash package');

-- Insert service images for Elite Auto Detailing
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('elite-paint-correction', '/placeholder.svg?height=100&width=100', true, 'Professional paint correction'),
('elite-ceramic-coating', '/placeholder.svg?height=100&width=100', true, 'Ceramic coating application'),
('elite-leather-restoration', '/placeholder.svg?height=100&width=100', true, 'Leather restoration service'),
('elite-headlight-restoration', '/placeholder.svg?height=100&width=100', true, 'Headlight restoration'),
('elite-premium-detail', '/placeholder.svg?height=100&width=100', true, 'Premium detail package'),
('elite-maintenance-wash', '/placeholder.svg?height=100&width=100', true, 'Maintenance wash service');

-- Insert service images for Quick Clean Mobile
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('mobile-express-wash', '/placeholder.svg?height=100&width=100', true, 'Express mobile wash'),
('mobile-interior-clean', '/placeholder.svg?height=100&width=100', true, 'Mobile interior cleaning'),
('mobile-full-detail', '/placeholder.svg?height=100&width=100', true, 'Mobile full detail service'),
('mobile-fleet-service', '/placeholder.svg?height=100&width=100', true, 'Fleet cleaning service'),
('mobile-emergency-clean', '/placeholder.svg?height=100&width=100', true, 'Emergency cleaning service'),
('mobile-weekly-service', '/placeholder.svg?height=100&width=100', true, 'Weekly mobile service');

-- Insert service images for Luxury Car Spa
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('luxury-concierge-detail', '/placeholder.svg?height=100&width=100', true, 'Concierge detail service'),
('luxury-exotic-care', '/placeholder.svg?height=100&width=100', true, 'Exotic car care service'),
('luxury-interior-restoration', '/placeholder.svg?height=100&width=100', true, 'Luxury interior restoration'),
('luxury-show-prep', '/placeholder.svg?height=100&width=100', true, 'Show car preparation'),
('luxury-ppf-installation', '/placeholder.svg?height=100&width=100', true, 'Paint protection film installation'),
('luxury-monthly-care', '/placeholder.svg?height=100&width=100', true, 'Monthly luxury care package');

-- Add some additional non-primary images for variety
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('splash-basic-wash', '/placeholder.svg?height=100&width=100', false, 'Before and after basic wash'),
('elite-paint-correction', '/placeholder.svg?height=100&width=100', false, 'Paint correction results'),
('mobile-full-detail', '/placeholder.svg?height=100&width=100', false, 'Mobile detailing service van'),
('luxury-exotic-care', '/placeholder.svg?height=100&width=100', false, 'Luxury car detail results');

-- Enable Row Level Security (RLS)
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_images ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on providers" ON providers
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on service_images" ON service_images
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_provider_id ON services(provider_id);
CREATE INDEX IF NOT EXISTS idx_service_images_service_id ON service_images(service_id);
CREATE INDEX IF NOT EXISTS idx_providers_slug ON providers(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_service_images_primary ON service_images(is_primary);

-- Verify the data relationships
SELECT 
  p.name as provider_name,
  p.specialty,
  s.name as service_name,
  s.price,
  s.category
FROM providers p
JOIN services s ON p.id = s.provider_id
ORDER BY p.name, s.price;
