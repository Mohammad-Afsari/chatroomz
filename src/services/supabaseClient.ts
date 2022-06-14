import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// ! is a non null operator that we can use to tell TS that even though something may be null, it can trust you that it's not
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
