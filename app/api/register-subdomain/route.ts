import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { subdomain } = await request.json();
    
    // Validate subdomain format
    if (typeof subdomain !== 'string' || subdomain.trim() === '') {
      return NextResponse.json({ message: 'Invalid subdomain' }, { status: 400 });
    }

    // Create Supabase client
    const supabase = await createClient();

    // Check for existing subdomain
    const { data: existingSubdomain, error: checkError } = await supabase
      .from('subdomains')
      .select('name')
      .eq('name', subdomain)
      .single();

    // Handle errors (ignore "not found" error PGRST116)
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking subdomain:', checkError);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

    // Check if subdomain exists
    if (existingSubdomain) {
      return NextResponse.json({ message: 'Subdomain already exists' }, { status: 400 });
    }

    // Insert new subdomain (only the name) and return ID
    const { data, error } = await supabase
      .from('subdomains')
      .insert([{ name: subdomain }])
      .select('id');

    if (error) {
      console.error('Error inserting subdomain:', error);
      return NextResponse.json({ message: 'Error registering subdomain' }, { status: 500 });
    }

    // Validate response data
    if (!data || data.length === 0) {
      return NextResponse.json({ message: 'No data returned' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Subdomain registered', id: data[0].id }, { status: 200 });
  } catch (error) {
    console.error('Error registering subdomain:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}