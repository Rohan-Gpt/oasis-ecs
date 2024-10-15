import NewAppBar from "@/components/newAppBar";
import ProjectsComponent from "@/components/projects/projects";
import { currentUser } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Projects() {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black">
      {/* <CreateTeam /> */}
      {/* <CreateTeamDialog /> */}
      <NewAppBar />
      <ProjectsComponent />
    </div>
  );
}
