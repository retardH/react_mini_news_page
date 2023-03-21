import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qmxepoztadtknczamzer.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFteGVwb3p0YWR0a25jemFtemVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0MTc0NjYsImV4cCI6MTk5Mjk5MzQ2Nn0.852beillFNRHkqzI2lHg9Nt-9nGb_fAa5kzx9Pm7-Cg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;