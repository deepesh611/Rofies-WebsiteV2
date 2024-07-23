"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./button";
import UserDropdown from "../UserDropdown";
import ItemTooltip from "../ItemTooltip";
import FixedNavbar from "./FixedNavbar";
import { ModeToggle } from "../modechange";

export const FloatingNav = ({ navItems, className, isAuthenticated }) => {
  const path = usePathname();
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.1) {
        setIsAtTop(true);
        setVisible(true);
      } else {
        setIsAtTop(false);
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <>
      {isAtTop && path === "/" && (
        <FixedNavbar isAuthenticated={isAuthenticated} navItems={navItems} />
      )}
      <AnimatePresence mode="wait">
        {!isAtTop && (
          <motion.div
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -75,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={cn(
              "fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-white py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black",
              className,
            )}
          >
            {navItems.map((navItem, idx) => (
              <Link
                key={`floating-link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
                )}
              >
                <ItemTooltip
                  className={"block sm:hidden"}
                  icon={navItem.icon}
                  name={navItem.name}
                />
                <span className="hidden text-sm sm:block">{navItem.name}</span>
              </Link>
            ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
