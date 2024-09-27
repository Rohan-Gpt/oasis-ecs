import { currentUser, getSession } from "@/lib/getSession";

export default async function WelcomeCard() {
  const user = await currentUser();
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
