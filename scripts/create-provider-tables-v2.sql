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

-- Insert multiple providers
INSERT INTO providers (id, name, slug, address, distance, hero_image, phone, email, rating, total_reviews) VALUES 
-- Provider 1: Splash Super Wash Services
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
  127
),
-- Provider 2: Elite Auto Detailing
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
  89
),
-- Provider 3: Quick Clean Mobile
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
  203
),
-- Provider 4: Luxury Car Spa
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
  45
);

-- Insert services for Provider 1: Splash Super Wash Services
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('11111111-1111-1111-1111-111111111111', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Basic Wash', 'Interior and exterior wash with vacuuming', 10.00, 30, 'wash'),
('22222222-2222-2222-2222-222222222222', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Engine Wash', 'Engine wash only', 25.00, 45, 'engine'),
('33333333-3333-3333-3333-333333333333', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Mini Detail', 'Basic details of interior and exterior', 85.00, 90, 'detailing'),
('44444444-4444-4444-4444-444444444444', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Interior Detail', 'Full interior detailing', 100.00, 120, 'interior'),
('55555555-5555-5555-5555-555555555555', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Exterior Detail', 'Full exterior detailing', 100.00, 120, 'exterior'),
('66666666-6666-6666-6666-666666666666', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Full Service Wash', 'Interior and exterior wash with detailing and engine wash', 135.00, 180, 'premium');

-- Insert services for Provider 2: Elite Auto Detailing
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('77777777-7777-7777-7777-777777777777', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Premium Wash & Wax', 'Hand wash with premium wax application', 45.00, 60, 'wash'),
('88888888-8888-8888-8888-888888888888', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Paint Correction', 'Professional paint correction and polishing', 250.00, 240, 'paint'),
('99999999-9999-9999-9999-999999999999', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ceramic Coating', 'Long-lasting ceramic coating protection', 400.00, 300, 'protection'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Leather Treatment', 'Deep cleaning and conditioning of leather seats', 120.00, 90, 'interior'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Headlight Restoration', 'Professional headlight restoration service', 80.00, 60, 'restoration');

-- Insert services for Provider 3: Quick Clean Mobile
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Express Wash', 'Quick exterior wash and dry', 15.00, 20, 'wash'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Mobile Interior Clean', 'Complete interior cleaning at your location', 60.00, 75, 'interior'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'On-Site Detail', 'Full detailing service at your location', 120.00, 150, 'detailing'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Fleet Cleaning', 'Special rates for multiple vehicles', 35.00, 45, 'fleet'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Emergency Clean', 'Same-day cleaning service', 80.00, 60, 'emergency');

-- Insert services for Provider 4: Luxury Car Spa
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Concierge Detail', 'White-glove detailing service for luxury vehicles', 300.00, 240, 'luxury'),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Exotic Car Care', 'Specialized care for exotic and vintage cars', 500.00, 360, 'exotic'),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Interior Restoration', 'Complete interior restoration and protection', 450.00, 300, 'restoration'),
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Show Car Prep', 'Professional preparation for car shows', 600.00, 480, 'show'),
('llllllll-llll-llll-llll-llllllllllll', 'c3d4e5f6-g7h8-9012-cdef-345678901234', 'Monthly Maintenance', 'Regular maintenance package for luxury vehicles', 200.00, 120, 'maintenance');

-- Insert service images for Provider 1 services
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('11111111-1111-1111-1111-111111111111', '/placeholder.svg?height=100&width=100', true, 'Basic car wash service'),
('22222222-2222-2222-2222-222222222222', '/placeholder.svg?height=100&width=100', true, 'Engine wash service'),
('33333333-3333-3333-3333-333333333333', '/placeholder.svg?height=100&width=100', true, 'Mini detail service'),
('44444444-4444-4444-4444-444444444444', '/placeholder.svg?height=100&width=100', true, 'Interior detail service'),
('55555555-5555-5555-5555-555555555555', '/placeholder.svg?height=100&width=100', true, 'Exterior detail service'),
('66666666-6666-6666-6666-666666666666', '/placeholder.svg?height=100&width=100', true, 'Full service wash');

-- Insert service images for Provider 2 services
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('77777777-7777-7777-7777-777777777777', '/placeholder.svg?height=100&width=100', true, 'Premium wash and wax'),
('88888888-8888-8888-8888-888888888888', '/placeholder.svg?height=100&width=100', true, 'Paint correction service'),
('99999999-9999-9999-9999-999999999999', '/placeholder.svg?height=100&width=100', true, 'Ceramic coating application'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '/placeholder.svg?height=100&width=100', true, 'Leather treatment service'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '/placeholder.svg?height=100&width=100', true, 'Headlight restoration');

-- Insert service images for Provider 3 services
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', '/placeholder.svg?height=100&width=100', true, 'Express wash service'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '/placeholder.svg?height=100&width=100', true, 'Mobile interior cleaning'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '/placeholder.svg?height=100&width=100', true, 'On-site detail service'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '/placeholder.svg?height=100&width=100', true, 'Fleet cleaning service'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', '/placeholder.svg?height=100&width=100', true, 'Emergency clean service');

-- Insert service images for Provider 4 services
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '/placeholder.svg?height=100&width=100', true, 'Concierge detail service'),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', '/placeholder.svg?height=100&width=100', true, 'Exotic car care'),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', '/placeholder.svg?height=100&width=100', true, 'Interior restoration'),
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', '/placeholder.svg?height=100&width=100', true, 'Show car preparation'),
('llllllll-llll-llll-llll-llllllllllll', '/placeholder.svg?height=100&width=100', true, 'Monthly maintenance');

-- Add some additional non-primary images for variety
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('11111111-1111-1111-1111-111111111111', '/placeholder.svg?height=100&width=100', false, 'Before and after basic wash'),
('44444444-4444-4444-4444-444444444444', '/placeholder.svg?height=100&width=100', false, 'Clean interior result'),
('99999999-9999-9999-9999-999999999999', '/placeholder.svg?height=100&width=100', false, 'Ceramic coating result'),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', '/placeholder.svg?height=100&width=100', false, 'Luxury car detail result');

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
