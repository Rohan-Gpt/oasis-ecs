"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import Social from "./social";

interface cardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: cardWrapperProps) => {
  return (
    <Card className="max-w-[400px] shadow-2xl bg-white mx-2 md:mx-0">
      <CardHeader className="flex text-2xl font-bold justify-center items-center">
        {headerLabel}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
