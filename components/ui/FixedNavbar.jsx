import Link from "next/link";
import { Button } from "./button";
import UserDropdown from "../UserDropdown";
import { cn } from "@/lib/utils";
import ItemTooltip from "../ItemTooltip";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../modechange";

export default function FixedNavbar({ isAuthenticated, navItems }) {
  const router = useRouter();
  return (
    <div className="fixed inset-x-0 top-0 z-10 bg-white py-2 shadow-md dark:bg-black">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {navItems.map((navItem, idx) => (
            <Link
              key={`fixed-link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
              )}
            >
              <ItemTooltip
                className={
                  "block hover:text-neutral-500 dark:hover:text-neutral-300 sm:hidden"
                }
                icon={navItem.icon}
                name={navItem.name}
              />
              <span className="text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {!isAuthenticated ? (
            <Button
              variant="outline"
              onClick={() => router.push("/signup")}
              className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
            >
              <span>Get Started</span>
              <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-primary-foreground to-transparent" />
            </Button>
          ) : (
            <UserDropdown />
          )}
        </div>
      </div>
    </div>
  );
}
