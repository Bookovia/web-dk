-- This script helps debug provider and service relationships

-- 1. Show all providers with their service counts
SELECT 
  p.id as provider_id,
  p.name as provider_name,
  p.slug,
  p.address,
  COUNT(s.id) as service_count
FROM providers p
LEFT JOIN services s ON p.id = s.provider_id
GROUP BY p.id, p.name, p.slug, p.address
ORDER BY service_count DESC;

-- 2. Show services for a specific provider (replace with actual ID)
SELECT 
  s.id as service_id,
  s.name as service_name,
  s.description,
  s.price,
  s.duration_minutes,
  s.category,
  COUNT(si.id) as image_count
FROM services s
LEFT JOIN service_images si ON s.id = si.service_id
WHERE s.provider_id = 'f8503ac2-6b9c-4917-a759-489264ec6980'
GROUP BY s.id, s.name, s.description, s.price, s.duration_minutes, s.category
ORDER BY s.price;

-- 3. Check for orphaned services (services with non-existent provider_id)
SELECT 
  s.id as service_id,
  s.name as service_name,
  s.provider_id
FROM services s
LEFT JOIN providers p ON s.provider_id = p.id
WHERE p.id IS NULL;

-- 4. Check for services without images
SELECT 
  s.id as service_id,
  s.name as service_name,
  s.provider_id,
  p.name as provider_name
FROM services s
JOIN providers p ON s.provider_id = p.id
LEFT JOIN service_images si ON s.id = si.service_id
WHERE si.id IS NULL;

-- 5. Show all data for a specific provider by ID
SELECT 
  p.id as provider_id,
  p.name as provider_name,
  p.slug,
  p.address,
  p.distance,
  p.hero_image,
  p.specialty,
  p.rating,
  p.total_reviews,
  s.id as service_id,
  s.name as service_name,
  s.description,
  s.price,
  s.duration_minutes,
  s.category,
  si.id as image_id,
  si.image_url,
  si.is_primary
FROM providers p
LEFT JOIN services s ON p.id = s.provider_id
LEFT JOIN service_images si ON s.id = si.service_id
WHERE p.id = 'f8503ac2-6b9c-4917-a759-489264ec6980'
ORDER BY s.price, si.is_primary DESC;

-- 6. Insert sample data for a specific provider if needed
-- Uncomment and modify as needed
/*
INSERT INTO services (id, provider_id, name, description, price, duration_minutes, category)
VALUES 
('service-1', 'f8503ac2-6b9c-4917-a759-489264ec6980', 'Express Wash', 'Quick exterior wash', 19.99, 30, 'wash'),
('service-2', 'f8503ac2-6b9c-4917-a759-489264ec6980', 'Full Detail', 'Complete interior and exterior detailing', 149.99, 180, 'detailing'),
('service-3', 'f8503ac2-6b9c-4917-a759-489264ec6980', 'Ceramic Coating', 'Long-lasting paint protection', 299.99, 240, 'protection');

INSERT INTO service_images (service_id, image_url, is_primary)
VALUES
('service-1', '/placeholder.svg?height=100&width=100', true),
('service-2', '/placeholder.svg?height=100&width=100', true),
('service-3', '/placeholder.svg?height=100&width=100', true);
*/
