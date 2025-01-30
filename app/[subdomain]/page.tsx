// app/[subdomain]/page.tsx
import { headers } from 'next/headers';
import { POST } from '@/app/api/register-subdomain/route';

const registeredSubdomains: string[] = (POST as any).registeredSubdomains || [];


export default async function SubdomainPage({ params }: { params: any }) {
    const headersList = headers();
    const host = (await headersList).get('host') || '';
    let subdomain = params.subdomain;
    if (host) {
        const parts = host.split('.');
        if (parts.length > 2) {
            subdomain = parts[0];
        }
    }
    const isValidSubdomain = registeredSubdomains.includes(`${subdomain}.test.example.com`);

    if (!isValidSubdomain) {
        return <div><h1>Error: Subdomain not registered</h1></div>;
    }

    return (
        <div>
            <h1>Subdomain: {subdomain}</h1>
        </div>
    );
}
