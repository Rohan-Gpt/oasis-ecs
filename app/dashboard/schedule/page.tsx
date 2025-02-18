import NewAppBar from "@/components/newAppBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Schedule from "@/components/week-wise-schedule";

export default async function WeeklySchedule() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <NewAppBar />
      <div>
        <TooltipProvider>
          <Schedule />
        </TooltipProvider>
      </div>
    </div>
  );
}
