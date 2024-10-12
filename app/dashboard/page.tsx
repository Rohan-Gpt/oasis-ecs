import { redirect } from "next/navigation";
import DesignTaskBreakdown from "../../components/circularProgress";
import WelcomeCard from "../../components/welcomeCard";
import FreeResources from "../../components/FreeResources";
import { currentUser } from "@/lib/getSession";
import GuideCards from "@/components/GuideCards";
import EnhancedWeekWiseSyllabus from "@/components/WeekCards";
import NewAppBar from "@/components/newAppBar";

export default async function dashborad() {
  const user = await currentUser();
  if (!user) return redirect("/auth/login");
  return (
    <div className="bg-black">
      <NewAppBar />
      <div className="py-10 grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-2 lg:gap-20 px-10 lg:px-20">
        <div className="grid col-span-1 row-span-1">
          <WelcomeCard />
        </div>
        <div className="grid col-span-1 row-span-1">
          <DesignTaskBreakdown />
        </div>
      </div>
      <div className="bg-gray-900">
        <EnhancedWeekWiseSyllabus />
      </div>
      <GuideCards />
      <FreeResources />
    </div>
  );
}
