"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface backButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: backButtonProps) {
  return (
    <Button variant={"link"} className="w-full font-normal" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
