import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@/lib/getSession";
import { UserMenu } from "./user-menu";

export default async function AppBar() {
  const user = await currentUser();

  return (
    <div className="sticky top-3 z-30 flex justify-between w-auto mx-10 lg:mx-20 rounded-xl bg-transparent backdrop-blur-md border border-white text-white px-6 py-4 items-center hover:bg-white/15 transition-all">
      <Link href={"/"}>
        <Image
          src={"/OASIS-logo(small).png"}
          width={125}
          height={31}
          alt="OASIS"
        />
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <UserMenu />
        ) : (
          <Link
            href={"/auth/login"}
            className="flex items-center bg-white font-semibold text-black px-4 py-1 rounded-lg hover:drop-shadow-lg hover:shadow-white hover:-translate-y-1 transition-all group"
          >
            Join now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="hidden md:block ml-2 w-6 h-6 group-hover:translate-x-2 transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
