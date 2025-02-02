type tParams = Promise<{ subdomain: string[] }>; // define tParams


export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string[] }> }) {
    const { subdomain }: { subdomain: string[] } = await params;
    return <div>Subdomain: {subdomain}</div>;
}