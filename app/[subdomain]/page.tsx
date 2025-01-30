// app/[subdomain]/page.tsx
import { headers } from 'next/headers';
import pool from '@/app/lib/db'; // import the database connection

interface Subdomain {
    name: string; // define the structure of the subdomain object
}

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

    // Fetch registered subdomains from PostgreSQL
    const { rows: registeredSubdomains } = await pool.query('SELECT name FROM subdomains');

    const isValidSubdomain = registeredSubdomains.some((item: Subdomain) => item.name === subdomain);
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
