-- Debug script to check if the specific provider exists and what the actual column names are

-- 1. Check if the provider exists by provider_id
SELECT * FROM providers WHERE provider_id = '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9';

-- 2. Check if the provider exists by any UUID-like column
SELECT * FROM providers WHERE 
  provider_id::text LIKE '%144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9%' OR
  business_name LIKE '%144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9%';

-- 3. Show all providers to see what IDs actually exist
SELECT provider_id, business_name FROM providers ORDER BY business_name;

-- 4. Check the exact column structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'providers' 
ORDER BY ordinal_position;

-- 5. Check if there are any providers at all
SELECT COUNT(*) as total_providers FROM providers;

-- 6. Show first few providers with all their data
SELECT * FROM providers LIMIT 3;
