-- Debug script to check the actual database structure

-- 1. Check if providers table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'providers';

-- 2. Check the actual column structure of providers table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'providers' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if services table exists and its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'services' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Show sample data if tables exist
-- Uncomment these if tables exist:
-- SELECT * FROM providers LIMIT 3;
-- SELECT * FROM services LIMIT 3;

-- 5. Check all tables in public schema
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
