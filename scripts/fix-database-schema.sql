-- First, let's check what providers actually exist
SELECT 
  id,
  provider_id,
  name,
  business_name,
  slug,
  address
FROM providers 
ORDER BY created_at DESC;

-- Check if the specific provider exists
SELECT * FROM providers 
WHERE id = 'f54e9663-bece-4063-b966-383c94f06f3d' 
   OR provider_id = 'f54e9663-bece-4063-b966-383c94f06f3d'
   OR slug = 'f54e9663-bece-4063-b966-383c94f06f3d';

-- If the provider doesn't exist, let's add it
INSERT INTO providers (
  id, 
  name, 
  slug, 
  address, 
  distance, 
  hero_image, 
  phone, 
  email, 
  rating, 
  total_reviews, 
  specialty
) VALUES (
  'f54e9663-bece-4063-b966-383c94f06f3d',
  'Auto Care Express',
  'f54e9663-bece-4063-b966-383c94f06f3d',
  '4521 Baltimore Ave, College Park, MD 20740',
  '2.3 mi',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '(301) 555-0892',
  'info@autocareexpress.com',
  4.6,
  178,
  'Quick Service & Express Detailing'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  distance = EXCLUDED.distance,
  hero_image = EXCLUDED.hero_image,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  rating = EXCLUDED.rating,
  total_reviews = EXCLUDED.total_reviews,
  specialty = EXCLUDED.specialty;

-- Add some services for this provider
INSERT INTO services (
  id,
  provider_id,
  name,
  description,
  price,
  duration_minutes,
  category
) VALUES 
(
  'autocare-quick-wash',
  'f54e9663-bece-4063-b966-383c94f06f3d',
  'Quick Wash',
  'Fast exterior wash and dry',
  15.00,
  20,
  'wash'
),
(
  'autocare-interior-clean',
  'f54e9663-bece-4063-b966-383c94f06f3d',
  'Interior Clean',
  'Complete interior vacuuming and wipe down',
  35.00,
  45,
  'interior'
),
(
  'autocare-express-detail',
  'f54e9663-bece-4063-b966-383c94f06f3d',
  'Express Detail',
  'Quick interior and exterior cleaning',
  65.00,
  75,
  'detailing'
),
(
  'autocare-premium-wash',
  'f54e9663-bece-4063-b966-383c94f06f3d',
  'Premium Wash & Wax',
  'Complete wash with hand wax application',
  45.00,
  60,
  'premium'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  duration_minutes = EXCLUDED.duration_minutes,
  category = EXCLUDED.category;

-- Add service images
INSERT INTO service_images (service_id, image_url, is_primary, alt_text) VALUES
('autocare-quick-wash', 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Quick wash service'),
('autocare-interior-clean', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Interior cleaning service'),
('autocare-express-detail', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Express detailing service'),
('autocare-premium-wash', 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', true, 'Premium wash and wax service')
ON CONFLICT (service_id, image_url) DO NOTHING;

-- Verify the data was added
SELECT 'Provider added/updated:' as status, name FROM providers WHERE id = 'f54e9663-bece-4063-b966-383c94f06f3d';
SELECT 'Services added:' as status, COUNT(*) as count FROM services WHERE provider_id = 'f54e9663-bece-4063-b966-383c94f06f3d';
SELECT 'Images added:' as status, COUNT(*) as count FROM service_images WHERE service_id IN (
  SELECT id FROM services WHERE provider_id = 'f54e9663-bece-4063-b966-383c94f06f3d'
);
