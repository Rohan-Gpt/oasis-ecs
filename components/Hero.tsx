"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Link from "next/link";
import { User } from "next-auth";
import { getSession } from "next-auth/react";

export default function Hero() {
  const [user, setUser] = useState<User | null | undefined>(null);

  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setUser(session?.user);
    }

    fetchSession();
    if (!scroll) return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy(".scroller", {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: (document.querySelector(".scroller") as HTMLElement)?.style
        .transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();
  }, [scroll]);

  return (
    <div className="scroller inset-0 flex flex-col items-center justify-center h-80 md:h-screen bg-black">
      <div className="flex justify-center lg:mt-10 z-10">
        <Image
          src={"/OASIS-logo(white).png"}
          width={1000}
          height={244}
          alt="OASIS"
        />
      </div>
      <div className="flex justify-center z-10 rounded-xl py-2 px-4 pb-3">
        <div className="mt-4 md:mt-0 text-4xl text-center text-white font-semibold md:text-6xl max-w-3xl font-heading">
          A community where <span className="text-pink-500">Top 1%</span> Devs
          are made
        </div>
      </div>
      {user ? (
        <div className="flex justify-center mt-8 md:mt-14 z-10">
          <Link href="/dashboard">
            <button className="bg-yellow-500 text-white px-6 py-2  rounded-lg text-lg hover:px-8 transition-all hover:shadow-lg hover:shadow-yellow-800">
              Go to Dashborad
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center mt-8 md:mt-14 z-10">
          <Link href={"/auth/login"}>
            <button className="bg-green-500 px-8 lg:px-6 py-2 font-heading text-white rounded-lg text-lg -ml-4 mr-4 hover:shadow-lg hover:shadow-green-800 hover:px-8 transition-all">
              Join Now
            </button>
          </Link>
          <button className="bg-white px-6 py-2 font-heading rounded-lg text-lg hover:px-8 transition-all hover:shadow-lg hover:shadow-gray-500">
            Know More
          </button>
        </div>
      )}

      <div
        className="-mt-72 lg:-mt-80 opacity-30"
        data-scroll
        data-scroll-speed="2"
        data-scroll-target=".scroller"
      >
        <Image src={"/dotwave(small).png"} width={1948} height={565} alt="" />
      </div>
    </div>
  );
}
