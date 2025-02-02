import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './clients'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  const supabaseUrl = 'https://umxywgspfpvkgdamhxtb.supabase.co'
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteHl3Z3NwZnB2a2dkYW1oeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTM0ODYsImV4cCI6MjA1MzgyOTQ4Nn0.vMrcHgRAzn0PuWCU8vb7dunjnR_K5gDmxfwaazwnfDI"


  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  await supabase.auth.getUser()

  return supabaseResponse
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || '';
  const subdomain = hostname.split('.')[0]; // extract subdomain from host

  // create supabase client
  const supabase = await createClient();

  // Check if the subdomain exists in the database
  const { data: subdomainData, error } = await supabase
    .from('subdomains')
    .select('name')
    .eq('name', subdomain)
    .single();

  if (error || !subdomainData) {
    return NextResponse.json({ message: 'Subdomain not found' }, { status: 404 }); // return 404 if not found
  }

  // Proceed with the request if subdomain exists
  return NextResponse.next();
}