"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full hover:bg-blue-100 transition-all text-black"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Google
      </Button>
      <Button
        size={"lg"}
        className="w-full hover:bg-blue-100 transition-all text-black"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 mr-2" />
        Github
      </Button>
    </div>
  );
}
