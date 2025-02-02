import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './client'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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