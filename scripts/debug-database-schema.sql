-- Debug script to check the actual database schema

-- 1. Check what tables exist
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Check the exact column names in the providers table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'providers' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check the exact column names in the services table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'services' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Check the exact column names in the service_images table (if it exists)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'service_images' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Show a sample of data from providers table
SELECT * FROM providers LIMIT 3;

-- 6. Show a sample of data from services table
SELECT * FROM services LIMIT 3;

-- 7. Count total records
SELECT 
  (SELECT COUNT(*) FROM providers) as provider_count,
  (SELECT COUNT(*) FROM services) as service_count;
