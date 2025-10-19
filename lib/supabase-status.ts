// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const awsAccessKey = process.env.REMOTION_AWS_ACCESS_KEY_ID;
const awsSecretKey = process.env.REMOTION_AWS_SECRET_ACCESS_KEY;

const urlAvailable = supabaseUrl && supabaseUrl.trim() !== '';
const keyAvailable = supabaseKey && supabaseKey.trim() !== '';
const bothAvailable = urlAvailable && keyAvailable;

const awsAccessAvailable = awsAccessKey && awsAccessKey.trim() !== '';
const awsSecretAvailable = awsSecretKey && awsSecretKey.trim() !== '';
const awsBothAvailable = awsAccessAvailable && awsSecretAvailable;

// Mask the keys - show first 8 characters + asterisks, trim to URL length
const urlLength = (supabaseUrl || '').length;
const maskedKey = keyAvailable 
  ? `${supabaseKey.substring(0, 8)}${'*'.repeat(Math.max(0, urlLength - 8))}`
  : supabaseKey || '';

const maskedAwsAccess = awsAccessAvailable 
  ? `${awsAccessKey.substring(0, 8)}${'*'.repeat(Math.max(0, urlLength - 8))}`
  : awsAccessKey || '';

const maskedAwsSecret = awsSecretAvailable 
  ? `${awsSecretKey.substring(0, 8)}${'*'.repeat(Math.max(0, urlLength - 8))}`
  : awsSecretKey || '';

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
