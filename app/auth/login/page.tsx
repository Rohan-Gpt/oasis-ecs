import LoginForm from "@/components/auth/login-form";
import { currentUser, getSession } from "@/lib/getSession";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await currentUser();
  if (user) return redirect("/dashboard");
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-blue-900">
      <div className="hidden w-1/2 m-4 rounded-lg space-x-2 lg:flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center">
          <Image
            src={"/OASIS-logo(white).png"}
            width={500}
            height={122}
            alt="OASIS"
            className="mx-auto"
          />
          <h1 className="text-blue-500 font-heading text-2xl font-normal mt-4">
            A haven for top 1% devs
          </h1>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:px-0 lg:ml-10">
        <div className="w-full md:max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
