-- Query to map provider_id and business name from providers table
SELECT 
  id as provider_id,
  name as business_name,
  slug,
  specialty,
  address,
  distance,
  rating,
  total_reviews
FROM providers
ORDER BY name;

-- Also create a simple mapping view for easy reference
CREATE OR REPLACE VIEW provider_mapping AS
SELECT 
  id as provider_id,
  name as business_name,
  slug
FROM providers
ORDER BY name;

-- Query the mapping view
SELECT * FROM provider_mapping;

-- Count total providers
SELECT COUNT(*) as total_providers FROM providers;

-- Show providers with their service counts
SELECT 
  p.id as provider_id,
  p.name as business_name,
  p.slug,
  COUNT(s.id) as service_count
FROM providers p
LEFT JOIN services s ON p.id = s.provider_id
GROUP BY p.id, p.name, p.slug
ORDER BY p.name;
