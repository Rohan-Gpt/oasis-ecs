import { CircleCheck } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null;
  }
  return (
    <div className="w-full justify-center bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CircleCheck />
      <p>{message}</p>
    </div>
  );
}
