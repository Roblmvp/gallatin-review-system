// lib/supabase.ts
// Server-side Supabase client

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseServerInstance: SupabaseClient | null = null;

// Lazy initialization - only creates client when first used (at runtime, not build time)
export function getSupabaseServer(): SupabaseClient {
  if (supabaseServerInstance) {
    return supabaseServerInstance;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable");
  }

  supabaseServerInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseServerInstance;
}

// For backwards compatibility - use getter
export const supabaseServer = {
  from: (table: string) => getSupabaseServer().from(table),
};
