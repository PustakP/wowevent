import { headers } from 'next/headers';
import { registeredSubdomains } from '@/app/api/register-subdomain/route';

export default function SubdomainPage({ params }: { params: any }) {
  const headersList = headers();
  const host = headersList.get('host') || '';
  let subdomain = params.subdomain;
    if (host) {
        const parts = host.split('.');
        if(parts.length > 2) { subdomain = parts[0] };
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
