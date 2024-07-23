import React from "react";
import { FloatingNav } from "./ui/Floatingnavbar";
import {
  IconCalendarEvent,
  IconHome,
  IconPhoto,
  IconUser,
} from "@tabler/icons-react";

export async function MainHeader({ isUserAuthenticated }) {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Events",
      link: "/events",
      icon: (
        <IconCalendarEvent className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Gallery",
      link: "/gallery",
      icon: <IconPhoto className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} isAuthenticated={isUserAuthenticated} />
    </div>
  );
}
