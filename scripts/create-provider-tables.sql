-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT,
  distance TEXT,
  hero_image TEXT,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_images table
CREATE TABLE IF NOT EXISTS service_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample provider data
INSERT INTO providers (id, name, slug, address, distance, hero_image) VALUES 
(
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  'Splash Super Wash Services',
  '4e15806e-d162-4e29-a658-631f5dd40f02',
  '1703 Ritchi Ct. Capital Heights, Maryland, 20373',
  '0.9 mi',
  '/placeholder.svg?height=280&width=400'
) ON CONFLICT (slug) DO NOTHING;

-- Insert sample services
INSERT INTO services (id, provider_id, name, description, price) VALUES 
('11111111-1111-1111-1111-111111111111', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Basic Wash', 'Interior and exterior wash with vacuuming', 10.00),
('22222222-2222-2222-2222-222222222222', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Engine Wash', 'Engine wash only', 25.00),
('33333333-3333-3333-3333-333333333333', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Mini Detail', 'Basic details of interior and exterior', 85.00),
('44444444-4444-4444-4444-444444444444', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Interior Detail', 'Full interior detailing', 100.00),
('55555555-5555-5555-5555-555555555555', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Exterior Detail', 'Full exterior detailing', 100.00),
('66666666-6666-6666-6666-666666666666', '4e15806e-d162-4e29-a658-631f5dd40f02', 'Full Service Wash', 'Interior and exterior wash with detailing and engine wash', 135.00);

-- Insert sample service images
INSERT INTO service_images (service_id, image_url, is_primary) VALUES
('11111111-1111-1111-1111-111111111111', '/placeholder.svg?height=100&width=100', true),
('22222222-2222-2222-2222-222222222222', '/placeholder.svg?height=100&width=100', true),
('33333333-3333-3333-3333-333333333333', '/placeholder.svg?height=100&width=100', true),
('44444444-4444-4444-4444-444444444444', '/placeholder.svg?height=100&width=100', true),
('55555555-5555-5555-5555-555555555555', '/placeholder.svg?height=100&width=100', true),
('66666666-6666-6666-6666-666666666666', '/placeholder.svg?height=100&width=100', true);

-- Add additional images for some services
INSERT INTO service_images (service_id, image_url, is_primary) VALUES
('11111111-1111-1111-1111-111111111111', '/placeholder.svg?height=100&width=100', false),
('44444444-4444-4444-4444-444444444444', '/placeholder.svg?height=100&width=100', false);

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
