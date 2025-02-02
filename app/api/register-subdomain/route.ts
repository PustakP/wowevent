import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // updated import to use createClient

export async function POST(request: Request) {
  try {
    const { subdomain } = await request.json();
    if (typeof subdomain === 'string') {
      // log subdomain being registered
      console.log(`Registering subdomain: ${subdomain}`);

      // create supabase client
      const supabase = await createClient(); // updated to use createClient

      // Insert the subdomain into the Supabase database
      const { data, error } = await supabase
        .from('subdomains')
        .insert([{ name: subdomain }]) as { data: { id: string }[] | null; error: any }; // specify type for data

      // log result of insertion
      if (error) {
        console.error('Error inserting subdomain:', error);
        return NextResponse.json({ message: 'Error registering subdomain' }, { status: 500 });
      }

      // check if data is not null
      if (data && Array.isArray(data) && data.length > 0) { // ensure data is an array and has elements
        console.log(`Subdomain registered with ID: ${data[0].id}`); // log id of registered subdomain
        return NextResponse.json({ message: 'Subdomain registered', id: data[0].id }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'No data returned' }, { status: 400 }); // handle case where data is null
      }
    }
    return NextResponse.json({ message: 'Invalid subdomain' }, { status: 400 });
  } catch (error) {
    console.error('Error registering subdomain:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
