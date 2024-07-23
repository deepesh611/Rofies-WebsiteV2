"use client";
import SubmitButton from "@/components/SubmitButton";
export default function ProfilePage() {
  const handleLogoutSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/logout");
      const result = await response.json();
      if (result.success) {
        window.location.href = "/";
      } else {
        console.error(result.message || "Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="py-14">
        <h1 className="text-orange-400">Profile Page</h1>
        <form onSubmit={handleLogoutSubmitHandler}>
          <SubmitButton
            label={"Logout"}
            variant={"destructive"}
            type={"submit"}
          />
        </form>
      </div>
    </>
  );
}
