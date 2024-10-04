import AdminDashboard from "@/components/admin/admin-dashboard";
import NewAdminDashboard from "@/components/admin/new-admin-dashboard";
import { getSession, isAdmin } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function AdminDashboardHome() {
  const Admin = await isAdmin();
  if (!Admin) {
    redirect("/auth/login");
  }

  return (
    <div>
      <NewAdminDashboard />
    </div>
  );
}
