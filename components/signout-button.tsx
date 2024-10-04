import { signOut } from "@/lib/auth";

export async function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="flex items-center bg-white font-semibold text-black px-4 py-1 rounded-lg hover:drop-shadow-lg hover:shadow-white hover:-translate-y-1 transition-all group"
      >
        Sign Out
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
      </button>
    </form>
  );
}
