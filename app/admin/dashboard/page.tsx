import AdminDashboard from "@/components/admin/admin-dashboard";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function AdminDashboardHome() {
  const session = await getSession();
  const user = session?.user;
  console.log(user?.role);
  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
