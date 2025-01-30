import { NextResponse } from 'next/server';
import pool from '@/app/lib/db'; // import the database connection

export async function POST(request: Request) {
  try {
    const { subdomain } = await request.json();
    if (typeof subdomain === 'string') {
      // Insert the subdomain into the PostgreSQL database
      const result = await pool.query('INSERT INTO subdomains (name) VALUES ($1)', [subdomain]);

      if (result.rowCount === 0) {
        return NextResponse.json({ message: 'Error registering subdomain' }, { status: 500 });
      }

      return NextResponse.json({ message: 'Subdomain registered' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Invalid subdomain' }, { status: 400 });
  } catch (error) {
    console.error('Error registering subdomain:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
