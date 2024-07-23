import HomePageHeroSection from "@/components/homepage-hero";
import Vision from "@/components/vision";
import { getUserRoleFromSession } from "@/lib/auth";
export default async function HomePage() {
  const userrole = await getUserRoleFromSession();
  console.log(userrole);
  return (
    <>
      <HomePageHeroSection />
      <Vision />
    </>
  );
}
