import NewAppBar from "@/components/newAppBar";
import UserProfile from "@/components/profile/user-profile";
import { currentUser } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function profile() {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }
  const email = user.email?.toString() || "";
  return (
    <div className="bg-gradient-to-r from-black to-blue-900">
      <NewAppBar />
      <UserProfile email={email} />
    </div>
  );
}
