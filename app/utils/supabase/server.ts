import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  const supabaseUrl = 'https://umxywgspfpvkgdamhxtb.supabase.co'
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteHl3Z3NwZnB2a2dkYW1oeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTM0ODYsImV4cCI6MjA1MzgyOTQ4Nn0.vMrcHgRAzn0PuWCU8vb7dunjnR_K5gDmxfwaazwnfDI"

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}