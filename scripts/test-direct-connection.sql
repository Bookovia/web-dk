-- Simple test to verify the database is accessible
-- This should work if the connection is properly established

-- 1. Basic connection test
SELECT 'Connection successful' as status, NOW() as timestamp;

-- 2. Check if providers table exists
SELECT COUNT(*) as provider_count FROM providers;

-- 3. List first 3 providers
SELECT id, name, slug FROM providers LIMIT 3;

-- 4. Check if we can access the specific provider
SELECT 
  id, 
  name, 
  slug, 
  address 
FROM providers 
WHERE slug = '4e15806e-d162-4e29-a658-631f5dd40f02' 
   OR id = '4e15806e-d162-4e29-a658-631f5dd40f02';
