export default function SubdomainPage({ params }: { params: { subdomain: string } }) {
    // Use params.subdomain to fetch/display content
    return <div>Subdomain: {params.subdomain}</div>
  }