// lib/supabase/server.ts
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client for server-side operations
 * ⚠️ Use ONLY in server code (API routes, Server Actions, Edge Functions)
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the client
 */
export function createAdminClient() {
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
    }
  );
}
