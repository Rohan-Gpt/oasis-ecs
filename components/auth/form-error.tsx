import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }
  return (
    <div className="w-full justify-center bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlertIcon />
      <p>{message}</p>
    </div>
  );
}
