import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CREDENTIALS } from "../../lib/supabase-status";

export const supabase = SUPABASE_CREDENTIALS 
  ? createClient(SUPABASE_CREDENTIALS.url, SUPABASE_CREDENTIALS.key)
  : null;
