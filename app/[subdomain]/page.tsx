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
  console.log('subdomain:', subdomain); // dbg: log subdomain

  const supabase = await createClient();
  console.log('supabase client created'); // dbg: log client creation

  // Fetch event details based on subdomain
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('subdomain', subdomain)  // subdomain is an array  
    .single();
  
  console.log('event data:', event); // dbg: log fetched event data
  console.log('fetch error:', error); // dbg: log fetch error

  if (error || !event) {
    console.log('event not found or error occurred'); // dbg: log error case
    return <div className="text-center text-xl font-semibold mt-10">Event not found</div>;
  }

  console.log('event found:', event); // dbg: log found event
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
            {Array.from({ length: 4 }).map((_, index: number) => (
              <img key={index} src={`https://placehold.co/600x400`} alt={`Placeholder image ${index + 1}`} className="rounded-lg shadow-md" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
