import { createClient } from '@/app/utils/supabase/server';

// Define type for route parameters
type tParams = Promise<{ subdomain: string[] }>;

// Define event type based on schema
interface Event {
  id: string;
  name: string;
  organizer_id: string;
  date: string;
  location: string;
  description: string;
  requirements: string[];
  status: string;
  subdomain: string;
  created_at: string;
  updated_at: string;
  images: string[];
}

export default async function SubdomainPage({ params }: { params: tParams }) {
  const { subdomain }: { subdomain: string[] } = await params;
  const supabase = await createClient();

  // Fetch event details based on subdomain
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('subdomain', subdomain[0])
    .single();

  if (error || !event) {
    return <div className="text-center text-xl font-semibold mt-10">Event not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>

      <div className="mt-4">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Status:</strong> {event.status}</p>
      </div>

      {event.requirements.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Requirements</h2>
          <ul className="list-disc list-inside mt-2">
            {event.requirements.map((req: string, index: number) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {event.images.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {event.images.map((img: string, index: number) => (
              <img key={index} src={img} alt={`Event image ${index + 1}`} className="rounded-lg shadow-md" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
