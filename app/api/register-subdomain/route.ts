import { NextResponse } from 'next/server';

const registeredSubdomains: string[] = []; // in-memory storage for demo purposes

export async function POST(request: Request) {
  try {
    const { subdomain } = await request.json();
    if (typeof subdomain === 'string') {
      registeredSubdomains.push(subdomain); // register the subdomain
      return NextResponse.json({ message: 'Subdomain registered' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Invalid subdomain' }, { status: 400 });
  } catch (error) {
    console.error('Error registering subdomain:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
