import RegisterForm from "@/components/auth/register-form";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getSession();
  const user = session?.user;
  if (user) return redirect("/dashboard");
  return (
    <div className="h-screen flex items-center justify-center bg-slate-500">
      <RegisterForm />
    </div>
  );
}
