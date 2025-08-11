-- Create the provider tables and sample data
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

-- Insert sample providers
INSERT INTO providers (id, name, slug, address, distance, hero_image, phone, email, rating, total_reviews, specialty) VALUES 
(
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  'Splash Super Wash Services',
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  '1703 Ritchi Ct. Capital Heights, Maryland, 20373',
  '0.9 mi',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '(301) 555-0123',
  'info@splashsuperwash.com',
  4.8,
  127,
  'Basic Car Wash & Quick Services'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Elite Auto Detailing',
  'elite-auto-detailing',
  '2450 University Blvd. Hyattsville, Maryland, 20783',
  '1.2 mi',
  'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '(301) 555-0456',
  'contact@eliteautodetailing.com',
  4.9,
  89,
  'Premium Paint & Interior Detailing'
),
(
  'b2c3d4e5-f6g7-8901-bcde-f23456789012',
  'Quick Clean Mobile',
  'quick-clean-mobile',
  '3721 Hamilton St. Hyattsville, Maryland, 20781',
  '2.1 mi',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '(301) 555-0789',
  'book@quickcleanmobile.com',
  4.7,
  203,
  'Mobile Car Cleaning & Convenience'
);

-- Insert services for Splash Super Wash Services
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('splash-basic-wash', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Basic Wash', 'Interior and exterior wash with vacuuming', 10.00, 30, 'wash'),
('splash-engine-wash', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Engine Wash', 'Engine bay cleaning and degreasing', 25.00, 45, 'engine'),
('splash-mini-detail', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Mini Detail', 'Basic interior and exterior detailing', 85.00, 90, 'detailing'),
('splash-interior-detail', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Interior Detail', 'Complete interior cleaning and protection', 100.00, 120, 'interior'),
('splash-exterior-detail', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Exterior Detail', 'Full exterior wash, wax, and protection', 100.00, 120, 'exterior'),
('splash-full-service', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Full Service Wash', 'Complete interior, exterior, and engine cleaning', 135.00, 180, 'premium');

-- Insert services for Elite Auto Detailing
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('elite-paint-correction', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Paint Correction', 'Multi-stage paint correction and polishing', 350.00, 300, 'paint'),
('elite-ceramic-coating', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ceramic Coating', '9H ceramic coating with 5-year warranty', 650.00, 360, 'protection'),
('elite-leather-restoration', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Leather Restoration', 'Professional leather cleaning and conditioning', 180.00, 150, 'interior');

-- Insert services for Quick Clean Mobile
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('mobile-express-wash', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Express Mobile Wash', 'Quick exterior wash at your location', 25.00, 30, 'mobile'),
('mobile-interior-clean', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Mobile Interior Clean', 'Complete interior cleaning service', 65.00, 75, 'interior'),
('mobile-full-detail', 'b2c3d4e5-f6g7-8901-bcde-f23456789012', 'Mobile Full Detail', 'Complete detailing at your location', 140.00, 150, 'detailing');

-- Insert service images
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('splash-basic-wash', 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Basic car wash service'),
('splash-engine-wash', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Engine wash and degreasing'),
('elite-paint-correction', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Professional paint correction'),
('mobile-express-wash', 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Express mobile wash');

-- Enable Row Level Security
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on providers" ON providers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on service_images" ON service_images FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_providers_slug ON providers(slug);
CREATE INDEX IF NOT EXISTS idx_services_provider_id ON services(provider_id);
CREATE INDEX IF NOT EXISTS idx_service_images_service_id ON service_images(service_id);
