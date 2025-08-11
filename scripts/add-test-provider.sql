-- Add the specific provider you're testing
INSERT INTO providers (provider_id, business_name, address, distance, hero_image, phone, email, rating, total_reviews, specialty) VALUES 
(
  '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9',
  'Crystal Clear Auto Detailing',
  '2847 University Blvd. College Park, Maryland, 20740',
  '1.8 mi',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '(301) 555-0847',
  'info@crystalclearauto.com',
  4.9,
  234,
  'Premium Paint Correction & Ceramic Coating'
) ON CONFLICT (provider_id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  address = EXCLUDED.address,
  distance = EXCLUDED.distance,
  hero_image = EXCLUDED.hero_image,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  rating = EXCLUDED.rating,
  total_reviews = EXCLUDED.total_reviews,
  specialty = EXCLUDED.specialty;

-- Add services for this provider
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category) VALUES 
('crystal-paint-correction', '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9', 'Paint Correction', 'Multi-stage paint correction to remove swirls and scratches', 299.00, 240, 'paint'),
('crystal-ceramic-coating', '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9', 'Ceramic Coating', '9H ceramic coating with 3-year warranty', 599.00, 360, 'protection'),
('crystal-premium-detail', '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9', 'Premium Detail', 'Complete interior and exterior detailing', 189.00, 180, 'detailing'),
('crystal-maintenance-wash', '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9', 'Maintenance Wash', 'Regular maintenance wash for detailed vehicles', 49.00, 60, 'maintenance'),
('crystal-headlight-restore', '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9', 'Headlight Restoration', 'Professional headlight restoration and UV protection', 89.00, 90, 'restoration')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  duration_minutes = EXCLUDED.duration_minutes,
  category = EXCLUDED.category;

-- Add service images
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('crystal-paint-correction', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Paint correction service'),
('crystal-ceramic-coating', 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Ceramic coating application'),
('crystal-premium-detail', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Premium detailing service'),
('crystal-maintenance-wash', 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Maintenance wash service'),
('crystal-headlight-restore', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Headlight restoration service')
ON CONFLICT (service_id, image_url) DO NOTHING;

-- Verify the data was inserted
SELECT 'Provider added:' as status, business_name FROM providers WHERE provider_id = '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9';
SELECT 'Services added:' as status, COUNT(*) as count FROM services WHERE provider_id = '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9';
