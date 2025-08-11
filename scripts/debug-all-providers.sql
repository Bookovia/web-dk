-- Comprehensive debug script to check database connectivity and data

-- 1. Check if we can connect to the database at all
SELECT NOW() as current_time, version() as postgres_version;

-- 2. Check if providers table exists and has data
SELECT 
  COUNT(*) as total_providers,
  MIN(created_at) as oldest_provider,
  MAX(created_at) as newest_provider
FROM providers;

-- 3. Show all providers with their basic info
SELECT 
  id,
  name,
  slug,
  address,
  created_at
FROM providers 
ORDER BY created_at DESC;

-- 4. Check services table
SELECT 
  COUNT(*) as total_services,
  COUNT(DISTINCT provider_id) as providers_with_services
FROM services;

-- 5. Check if RLS is enabled and what policies exist
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename IN ('providers', 'services', 'service_images');

-- 6. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('providers', 'services', 'service_images');

-- 7. Test a simple query that should work
SELECT 'Database connection working' as status;

-- 8. Show sample provider data
SELECT 
  p.id,
  p.name,
  p.slug,
  COUNT(s.id) as service_count
FROM providers p
LEFT JOIN services s ON p.id = s.provider_id
GROUP BY p.id, p.name, p.slug
ORDER BY p.name
LIMIT 5;
