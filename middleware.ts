import { createClient } from '@/utils/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || '';
  const url = request.nextUrl.clone();
  const baseDomain = 'catalystiq.fun';

  // Extract subdomain correctly
  let subdomain = '';
  if (process.env.NODE_ENV === 'production') {
    subdomain = hostname.replace(`.${baseDomain}`, '').replace('www.', '');
  } else {
    subdomain = hostname.replace('.localhost:3000', '').replace('www.', '');
  }

  // Bypass middleware for root domain and assets
  if (hostname === baseDomain || subdomain === 'localhost:3000' || !subdomain) {
    return NextResponse.next();
  }

  try {
    const supabase = await createClient();

    // Check if subdomain exists in database
    const { data, error } = await supabase
      .from('subdomains')   
      .select('name')
      .eq('name', subdomain)
      .single();

    // Handle unknown subdomains
    if (error || !data) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // Rewrite to dynamic route with subdomain parameter
    if (hostname !== baseDomain) {
      url.pathname = `/${subdomain}${url.pathname}`;
      
      // For root path, ensure trailing slash is handled
      if (url.pathname === `/${subdomain}`) {
        url.pathname = `/${subdomain}/`;
      }
    }

    return NextResponse.rewrite(url);

  } catch (error) {
    console.error('Middleware error:', error);
  } }