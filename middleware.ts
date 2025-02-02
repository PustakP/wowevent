import { createClient } from './app/utils/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || '';
  const url = request.nextUrl.clone();
  const baseDomain = 'catalystiq.fun';

  let subdomain = '';
  if (process.env.NODE_ENV === 'production') {
    subdomain = hostname.replace(`.${baseDomain}`, '').replace('www.', '');
  } else {
    subdomain = hostname.replace('.localhost:3000', '').replace('www.', '');
  }

  if (hostname === baseDomain || subdomain === 'localhost:3000' || !subdomain) {
    return NextResponse.next();
  }

  try {
    const supabase = await createClient();

    // Fetch subdomain data
    const { data: subdomainData, error: subdomainError } = await supabase
      .from('subdomains')
      .select('name')
      .eq('name', subdomain)
      .single();

    if (subdomainError || !subdomainData) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // Fetch event details based on subdomain
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('subdomain', subdomain)
      .single();

    if (eventError || !eventData) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // Rewrite the request URL
    url.pathname = `/${subdomain}${url.pathname}`;
    if (url.pathname === `/${subdomain}`) {
      url.pathname = `/${subdomain}/`;
    }

    // Attach event data as headers
    const response = NextResponse.rewrite(url);
    response.headers.set('x-event-data', JSON.stringify(eventData));

    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.rewrite(new URL('/500', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|trpc|404|500|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
