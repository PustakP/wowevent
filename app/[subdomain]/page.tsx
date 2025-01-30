// app/[subdomain]/page.tsx
import { headers } from 'next/headers';
import { POST } from '@/app/api/register-subdomain/route';

const registeredSubdomains: string[] = (POST as any).registeredSubdomains || []; // in-memory storage for demo purposes

export default async function SubdomainPage({ params }: { params: any }) {
    const headersList = headers();
    const host = (await headersList).get('host') || '';
    let subdomain = params.subdomain; // extract subdomain from params
    console.log('Host:', host); // log host
    console.log('Initial Subdomain:', subdomain); // log initial subdomain

    if (host) {
        const parts = host.split('.');
        if (parts.length > 2) {
            subdomain = parts[0]; // extract subdomain from host
        }
    }
    console.log('Final Subdomain:', subdomain); // log final subdomain
    console.log('Subdomain:', subdomain); // log extracted subdomain
    console.log('Registered Subdomains:', registeredSubdomains); // log registered subdomains

    const isValidSubdomain = registeredSubdomains.includes(`${subdomain}.catalystiq.fun`); // validate subdomain
    console.log('Is Valid Subdomain:', isValidSubdomain); // log validation result

    if (!isValidSubdomain) {
        return <div><h1>Error: Subdomain not registered</h1></div>; // return error if not valid
    }

    return (
        <div>
            <h1>Subdomain: {subdomain}</h1> // display valid subdomain
        </div>
    );
}
