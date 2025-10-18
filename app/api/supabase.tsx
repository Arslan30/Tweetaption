import { createClient } from "@supabase/supabase-js";
import { SUPABASE_VARS } from "../../lib/supabase-status";

export const supabase = createClient(
  SUPABASE_VARS?.url ?? "", 
  SUPABASE_VARS?.key ?? ""
)
