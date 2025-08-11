-- Search for the provider in multiple ways to see what's actually in the database

-- 1. Check if provider exists by any ID-like column
SELECT * FROM providers WHERE 
  id::text = '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9' OR
  provider_id::text = '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9' OR
  slug = '144c64d0-ffc1-4a63-a5c7-7b3c6123d4c9';

-- 2. Show all providers to see what IDs actually exist
SELECT * FROM providers ORDER BY created_at DESC LIMIT 10;

-- 3. Check the exact column structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'providers' 
ORDER BY ordinal_position;

-- 4. Count total providers
SELECT COUNT(*) as total_providers FROM providers;
