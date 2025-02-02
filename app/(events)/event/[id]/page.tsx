import EventBiddingPage from "./component";

// Define type for route parameters
type tParams = Promise<{ id: string }>;


export default async function Page({ params }: { params: tParams } ) {
    const { id }: { id: string } = await params;
    return <EventBiddingPage eventId={id} />;
  }