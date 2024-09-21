import { TriangleAlertIcon } from "lucide-react";
import BackButton from "./auth/back-button";
import { CardWrapper } from "./auth/card-wrapper";
import { Card, CardHeader } from "./ui/card";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
      showSocial={false}
    >
      <div className="w-full flex justify-center items-center">
        <TriangleAlertIcon className="text-destructive"></TriangleAlertIcon>
      </div>
    </CardWrapper>
  );
}
