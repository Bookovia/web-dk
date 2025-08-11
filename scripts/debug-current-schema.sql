-- Debug script to check the actual current database structure

-- 1. Check what columns exist in providers table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'providers' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check what columns exist in services table  
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'services' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Show sample data from providers table
SELECT * FROM providers LIMIT 3;

-- 4. Show sample data from services table
SELECT * FROM services LIMIT 3;

-- 5. Check if the specific provider exists by provider_id
SELECT * FROM providers WHERE provider_id = '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9';

-- 6. Check all available providers to see what columns actually exist
SELECT provider_id, business_name FROM providers LIMIT 5;
