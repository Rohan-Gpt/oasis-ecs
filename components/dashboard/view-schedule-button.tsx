import type * as React from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface ViewScheduleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ViewScheduleButton: React.FC<ViewScheduleButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Link href={"/dashboard/schedule"}>
      <button
        className="group relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 shadow-lg"
        {...props}
      >
        <span className="absolute inset-0 rounded-full opacity-25 bg-gradient-to-r from-purple-600 to-indigo-600 blur-sm transition-opacity duration-300 ease-in-out group-hover:opacity-50"></span>
        <span className="relative flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          {children}
        </span>
      </button>
    </Link>
  );
};
