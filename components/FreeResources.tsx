import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="ml-6 text-3xl mb-6 text-green-400 font-semibold">
        Free Resources
      </div>
      <div className="container lg:mx-2 px-6 lg:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">
          <Link href="https://roadmap.sh" className="hover:underline">
            roadmap.sh
          </Link>
          <Link href="https://neetcode.io" className="hover:underline">
            NeetCode.io
          </Link>
          <Link href="https://takeuforward.org" className="hover:underline">
            TakeUForward (Striver)
          </Link>
          <Link
            href="https://www.youtube.com/@piyushgargdev"
            className="hover:underline"
          >
            Piyush Garg YouTube
          </Link>
          <Link
            href="https://www.youtube.com/@harkirat1"
            className="hover:underline"
          >
            Harkirat Singh YouTube
          </Link>
          <Link
            href="https://www.youtube.com/@HiteshCodeLab"
            className="hover:underline"
          >
            Hitesh Choudhary / Chai aur Code
          </Link>
          <Link
            href="https://www.youtube.com/@huxnwebdev"
            className="hover:underline"
          >
            HuXn WebDev
          </Link>
          <Link
            href="https://www.youtube.com/@sheryians"
            className="hover:underline"
          >
            Sheryians Coding School
          </Link>
        </div>
        <hr className="my-4 text-gray-600 lg:-mr-32"></hr>
        <div className="lg:ml-32 flex justify-center items-center text-center text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} Gnit-Ecs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
