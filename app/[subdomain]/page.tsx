export default function SubdomainPage({ params }: { params: { subdomain: string } }) { // directly type params
    return <div>Subdomain: {params.subdomain}</div>
}