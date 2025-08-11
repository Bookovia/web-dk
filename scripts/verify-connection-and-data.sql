-- Verification script to ensure everything is working after environment variable sync

-- 1. Test basic connection
SELECT 'Database connection successful' as status, NOW() as timestamp;

-- 2. Check providers table exists and has data
SELECT 
  COUNT(*) as total_providers,
  MIN(created_at) as oldest_record,
  MAX(created_at) as newest_record
FROM providers;

-- 3. List all available providers
SELECT 
  id,
  name,
  slug,
  address,
  specialty,
  rating,
  total_reviews
FROM providers 
ORDER BY name;

-- 4. Check services count per provider
SELECT 
  p.name as provider_name,
  p.slug,
  COUNT(s.id) as service_count,
  MIN(s.price) as min_price,
  MAX(s.price) as max_price
FROM providers p
LEFT JOIN services s ON p.id = s.provider_id
GROUP BY p.id, p.name, p.slug
ORDER BY service_count DESC;

-- 5. Check service images
SELECT 
  COUNT(*) as total_images,
  COUNT(DISTINCT service_id) as services_with_images
FROM service_images;

-- 6. Test specific provider that was having issues
SELECT 
  p.*,
  COUNT(s.id) as service_count
FROM providers p
LEFT JOIN services s ON p.id = s.provider_id
WHERE p.slug = '4e15806e-d162-4e29-a658-631f5dd40f02' 
   OR p.id = '4e15806e-d162-4e29-a658-631f5dd40f02'
GROUP BY p.id;

-- 7. Verify RLS policies are working
SELECT 
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies 
WHERE tablename IN ('providers', 'services', 'service_images')
ORDER BY tablename, policyname;
