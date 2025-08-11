-- Safe table creation script that checks existing structure first

-- Drop existing tables if they exist (be careful with this in production)
DROP TABLE IF EXISTS service_images CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS providers CASCADE;

-- Create providers table with correct structure
CREATE TABLE providers (
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
CREATE TABLE services (
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
CREATE TABLE service_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the specific provider you're testing
INSERT INTO providers (id, name, slug, address, distance, hero_image, phone, email, rating, total_reviews, specialty) VALUES 
(
  '288ae309-be66-4d2e-a1ee-41602213ab28',
  'Premium Auto Detailing',
  '288ae309-be66-4d2e-a1ee-41602213ab28',
  '1234 Main St, Anytown, MD 20001',
  '1.5 mi',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '(301) 555-0199',
  'info@premiumautodetailing.com',
  4.9,
  156,
  'Premium Vehicle Detailing'
),
(
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  'Splash Super Wash Services',
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  '1703 Ritchi Ct. Capital Heights, Maryland, 20373',
  '0.9 mi',
  'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '(301) 555-0123',
  'info@splashsuperwash.com',
  4.8,
  127,
  'Basic Car Wash & Quick Services'
);

-- Insert services for the test provider
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('service-1', '288ae309-be66-4d2e-a1ee-41602213ab28', 'Basic Wash', 'Interior and exterior wash with vacuuming', 25.00, 45, 'wash'),
('service-2', '288ae309-be66-4d2e-a1ee-41602213ab28', 'Premium Detail', 'Complete interior and exterior detailing with wax', 85.00, 120, 'detailing'),
('service-3', '288ae309-be66-4d2e-a1ee-41602213ab28', 'Full Service Package', 'Everything included - wash, detail, engine clean, and protection', 150.00, 180, 'premium'),
('service-4', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Basic Wash', 'Interior and exterior wash with vacuuming', 10.00, 30, 'wash'),
('service-5', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Engine Wash', 'Engine bay cleaning and degreasing', 25.00, 45, 'engine');

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

-- Verify the data was inserted
SELECT 'Providers created:' as status, COUNT(*) as count FROM providers;
SELECT 'Services created:' as status, COUNT(*) as count FROM services;
