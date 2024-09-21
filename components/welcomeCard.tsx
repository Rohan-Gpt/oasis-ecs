import { getSession } from "@/lib/getSession";

export default async function WelcomeCard() {
  const session = await getSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0];
  return (
    <div className="px-2 py-2">
      <div className="text-white text-5xl lg:text-7xl font-semibold">
        Hi, {firstName}
      </div>
      <div className="text-gray-500 text-xl font-medium">
        What are you going to do today?
      </div>
    </div>
  );
}
