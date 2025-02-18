import AdminSchedule from "@/components/admin/admin-schedule";
import NewAdminDashboard from "@/components/admin/new-admin-dashboard";
import { isAdmin } from "@/lib/getSession";

import { redirect } from "next/navigation";

export default async function AdminDashboardHome() {
  const Admin = await isAdmin();
  if (!Admin) {
    redirect("/auth/login");
  }

  return (
    <div>
      <AdminSchedule />
    </div>
  );
}
