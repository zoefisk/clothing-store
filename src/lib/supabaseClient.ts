import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? (() => { throw new Error("Environment variable SUPABASE_URL not found"); })();
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? (() => { throw new Error("Environment variable SUPABASE_ANON_KEY not found"); })();
export const supabase = createClient(supabaseUrl, supabaseKey);