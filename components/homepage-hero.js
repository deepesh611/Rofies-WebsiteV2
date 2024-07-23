import { Button } from "@/components/ui/button";
import { verifyAuth } from "@/lib/auth";
import Link from "next/link";

export default function HomePageHeroSection() {
  const auth = verifyAuth();
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform"
        >
          <div className="h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-background/50 to-background blur-3xl" />
          <div className="h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 rounded-full bg-gradient-to-tl from-primary-foreground via-primary-foreground to-background blur-3xl" />
        </div>
        {/* End Gradients */}
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="">Elevate Yourself</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  R.O.F.I.E.S
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Robotics Club of IIIT Pune - A group of passionate students
                  who are interested in the field of robotics and automation.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 flex justify-center gap-3">
                {!auth ? (
                  <Button size={"lg"} asChild>
                    <Link href="/signup">Get started</Link>
                  </Button>
                ) : (
                  <Button size={"lg"} asChild>
                    <Link href="/events">Current Events </Link>
                  </Button>
                )}
                <Button size={"lg"} variant={"outline"} asChild>
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
