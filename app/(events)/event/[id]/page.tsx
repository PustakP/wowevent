import EventBiddingPage from "./component";
export default function Page({ params }: { params: { id: string } }) {
    return <EventBiddingPage eventId={params.id} />;
  }