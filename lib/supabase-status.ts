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
│ ${bothAvailable ? '✓' : '✗'} ${bothAvailable ? 'AVAILABLE'.padEnd(57) : 'NOT AVAILABLE'.padEnd(59)}|
│ - SUPABASE_URL: ${(supabaseUrl || '').padEnd(40)}   │
│ - SUPABASE_KEY: ${maskedKey.padEnd(40)}   │
└────────────────────────────────────────────────────────────┘
`);

// Export SUPABASE_VARS directly
export const SUPABASE_VARS = bothAvailable 
  ? {
      url: supabaseUrl,
      key: supabaseKey
    }
  : null;
