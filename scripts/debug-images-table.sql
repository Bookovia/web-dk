-- Debug script to check the images table structure

-- 1. Check what image-related tables exist
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%image%'
ORDER BY table_name;

-- 2. Check for tables that might contain provider images
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND (table_name LIKE '%provider%' OR table_name LIKE '%image%' OR table_name LIKE '%photo%')
ORDER BY table_name;

-- 3. If provider_images table exists, check its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'provider_images' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. If images table exists, check its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'images' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Show sample data from provider_images table (if it exists)
-- Uncomment the line below if the table exists
-- SELECT * FROM provider_images LIMIT 5;

-- 6. Show sample data from images table (if it exists)
-- Uncomment the line below if the table exists
-- SELECT * FROM images LIMIT 5;

-- 7. Check for any tables with provider_id column that might contain images
SELECT DISTINCT table_name
FROM information_schema.columns
WHERE column_name = 'provider_id' AND table_schema = 'public';
