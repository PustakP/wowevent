import { NextResponse } from 'next/server';

const registeredSubdomains: string[] = [];

export async function POST(request: Request) {
  try {
    const { subdomain } = await request.json();
    if (typeof subdomain === 'string') {
      registeredSubdomains.push(subdomain);
      return NextResponse.json({ message: 'Subdomain registered' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Invalid subdomain' }, { status: 400 });
  } catch (error) {
    console.error('Error registering subdomain:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
