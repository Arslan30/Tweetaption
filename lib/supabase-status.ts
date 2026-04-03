// @ts-nocheck
// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const urlAvailable = supabaseUrl && supabaseUrl.trim() !== '';
const keyAvailable = supabaseKey && supabaseKey.trim() !== '';
const bothAvailable = urlAvailable && keyAvailable;


// Mask the keys - show first 8 characters + asterisks, trim to URL length
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
┌────────────────────────────────────────────────────────────┐
│           MANDATORY - REMOTION LAMBDA (AWS)                │
├────────────────────────────────────────────────────────────┤
│ ${awsBothAvailable ? '✓' : '✗'} ${awsBothAvailable ? 'AVAILABLE'.padEnd(57) : 'NOT AVAILABLE'.padEnd(57)}│
│ - AWS_ACCESS_KEY: ${maskedAwsAccess.padEnd(41)}│
│ - AWS_SECRET_KEY: ${maskedAwsSecret.padEnd(41)}│
└────────────────────────────────────────────────────────────┘
`);

// Export Supabase credentials (optionally null)
export const SUPABASE_CREDENTIALS = bothAvailable 
  ? {
      url: supabaseUrl,
      key: supabaseKey
    }
  : null;
