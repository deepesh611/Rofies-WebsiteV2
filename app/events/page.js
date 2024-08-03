import EventCard from "@/components/eventcard";
import { getRoleFromSession } from "@/lib/auth";
import { getAllEvents } from "@/lib/event";
export const dynamic = "force-dynamic";
export default async function EventPage() {
  const eventcards = await getAllEvents();
  const userrole = await getRoleFromSession();
  console.log("userrole", userrole);
  if (eventcards.length === 0) {
    return <div>No events found</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {eventcards.map((cardContent) => (
        <EventCard key={cardContent._id} cardContent={cardContent} />
      ))}
    </div>
  );
}
