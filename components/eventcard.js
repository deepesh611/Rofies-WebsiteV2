import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CardBody = ({ className = "", content }) => (
  <div
    className={cn(
      "px-2 py-0 text-left text-gray-100 sm:px-4 sm:pb-3",
      className,
    )}
  >
    <h3 className="mb-1 mt-3 text-lg font-bold tracking-tighter">
      {content.title}
    </h3>
    <p className="text-sm leading-5">{content.startDate}</p>
    <p className="text-sm leading-5">{content.endDate}</p>
  </div>
);
//======================================
export default function EventCard({ cardContent }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-zinc-50 p-2 pb-3 dark:bg-zinc-950">
      <div className="relative aspect-video">
        <Image
          fill
          className="rounded-xl shadow-[0px_0px_10px_#A1A1AA] dark:shadow-[0px_0px_12px_rgb(39,39,42,0.7)]"
          src={cardContent.image}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
          alt="image"
        />
      </div>
      <CardBody
        className="relative mb-2 text-gray-800 dark:text-gray-200"
        content={cardContent}
      />
      <div className="px-2">
        <Button className="w-full rounded-lg" asChild>
          <Link href={`/events/${cardContent._id}`}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}
