import { Button } from "@/components/ui/button";
import { getEventbyID } from "@/lib/event";
import Image from "next/image";
import Link from "next/link";

export default async function EventDetails({ params }) {
  const id = params.eventSlug;
  const event = await getEventbyID(id);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-2xl rounded-lg bg-muted p-6 shadow-md dark:bg-card-foreground">
        <div className="flex">
          <Image
            src={event.image_link}
            alt="Event"
            className="w-1/2 rounded-lg"
            width={500}
            height={500}
          />
          <div className="ml-6 w-1/2">
            <h2 className="mb-4 text-2xl font-bold">{event.title}</h2>
            <p className="mb-4 text-gray-600">{event.description}</p>
            <div className="mb-4 text-gray-600">
              {event.start_date && (
                <p>
                  <strong>Start Date:</strong> {event.start_date}
                </p>
              )}
              {event.end_date && (
                <p>
                  <strong>End Date:</strong> {event.end_date}
                </p>
              )}
            </div>
            <Button asChild className="mt-4">
              <Link href={event.registration_link}>Register for the Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
