// app/api/register-subdomain/route.ts
import { createClient } from '../../utils/supabase/clients';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    
    const { subdomain } = await request.json();
    
    // Validate input
    if (!subdomain || typeof subdomain !== 'string') {
      return NextResponse.json(
        { message: 'Subdomain is required' }, 
        { status: 400 }
      );
    }

    // Clean and validate subdomain format
    const cleanedSubdomain = subdomain
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .trim();

    if (!/^[a-z0-9-]+$/.test(cleanedSubdomain)) {
      return NextResponse.json(
        { message: 'Only lowercase letters, numbers, and hyphens allowed' }, 
        { status: 400 }
      );
    }

    // Check subdomain availability in events table
    const { data: existingEvent, error } = await supabase
      .from('events')
      .select('subdomain')
      .eq('subdomain', cleanedSubdomain)
      .single();

    if (!error && existingEvent) {
      return NextResponse.json(
        { message: 'Subdomain already in use' }, 
        { status: 409 }
      );
    }

    return NextResponse.json({
      message: 'Subdomain available',
      subdomain: cleanedSubdomain
    }, { status: 200 });

  } catch (error) {
    console.error('Error in subdomain registration:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}