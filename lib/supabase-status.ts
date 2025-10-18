import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const urlAvailable = supabaseUrl && supabaseUrl.trim() !== '';
const keyAvailable = supabaseKey && supabaseKey.trim() !== '';
const bothAvailable = urlAvailable && keyAvailable;

// Mask the key - show first 8 characters + asterisks, trim to URL length
const urlLength = (supabaseUrl || '').length;
const maskedKey = keyAvailable 
  ? `${supabaseKey.substring(0, 8)}${'*'.repeat(Math.max(0, urlLength - 8))}`
  : supabaseKey || '';

// Display status check
console.log(`
┌────────────────────────────────────────────────────────────┐
│                    SUPABASE CACHING                        │
├────────────────────────────────────────────────────────────┤
│ ${bothAvailable ? '✓' : '✗'} ${bothAvailable ? 'AVAILABLE'.padEnd(57) : 'NOT AVAILABLE'.padEnd(57)}│
│ - SUPABASE_URL: ${(supabaseUrl || '').padEnd(43)}│
│ - SUPABASE_KEY: ${maskedKey.padEnd(43)}│
└────────────────────────────────────────────────────────────┘
`);

// Create and export Supabase client instance (optionally null)
export const supabase = bothAvailable 
  ? createClient(supabaseUrl, supabaseKey)
  : null;
