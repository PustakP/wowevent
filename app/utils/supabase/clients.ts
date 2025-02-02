import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
const supabaseUrl = 'https://umxywgspfpvkgdamhxtb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteHl3Z3NwZnB2a2dkYW1oeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTM0ODYsImV4cCI6MjA1MzgyOTQ4Nn0.vMrcHgRAzn0PuWCU8vb7dunjnR_K5gDmxfwaazwnfDI"

//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
    return createBrowserClient(
        supabaseUrl,supabaseKey
    )
}