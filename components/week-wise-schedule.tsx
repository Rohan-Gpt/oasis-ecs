"use client";
import * as React from "react";
import { format, isWithinInterval } from "date-fns";
import { CalendarIcon, Clock, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as Cal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { GetAllWorkshops } from "@/actions/schdeule";

// Class type styles
const classTypes: Record<string, string> = {
  programming: "bg-blue-100 text-blue-700 border-blue-300",
  frontend: "bg-purple-100 text-purple-700 border-purple-300",
  backend: "bg-green-100 text-green-700 border-green-300",
};

interface Schedule {
  id: number;
  topic: string;
  host: string;
  date: string;
  time: string;
  type: string;
}

export default function Schedule() {
  const [schedules, setSchedules] = React.useState<Schedule[]>([]);
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({
    from: undefined,
    to: undefined,
  });
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await GetAllWorkshops();
        if (Array.isArray(data)) {
          setSchedules(data as Schedule[]);
        } else {
          console.error("API did not return an array", data);
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };
    fetchSchedules();
  }, []);

  // Filter logic
  const filteredSchedule = schedules.filter((cls) => {
    const classDate = new Date(cls.date);
    const isInRange =
      (!dateRange.from && !dateRange.to) ||
      (dateRange.from &&
        dateRange.to &&
        isWithinInterval(classDate, {
          start: dateRange.from,
          end: dateRange.to,
        })) ||
      (dateRange.from && !dateRange.to && classDate >= dateRange.from) ||
      (!dateRange.from && dateRange.to && classDate <= dateRange.to);

    const matchesSearch =
      cls.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.host.toLowerCase().includes(searchTerm.toLowerCase());

    return isInRange && matchesSearch;
  });

  const displaySchedule =
    dateRange.from || searchTerm ? filteredSchedule : schedules;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 h-full mt-6">
      <h1 className="text-5xl font-bold text-center mb-10 py-2">
        📅
        <span className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Upcoming Classes
        </span>
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[260px] flex justify-between"
            >
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from
                  ? `${format(dateRange.from, "MMM d")} → ${
                      dateRange.to ? format(dateRange.to, "MMM d") : "?"
                    }`
                  : "Pick a date range"}
              </div>
              {dateRange.from && (
                <X
                  className="h-4 w-4 text-gray-500 hover:text-black cursor-pointer"
                  onClick={() =>
                    setDateRange({ from: undefined, to: undefined })
                  }
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) =>
                setDateRange(range || { from: undefined, to: undefined })
              }
            />
          </PopoverContent>
        </Popover>

        <Input
          type="search"
          placeholder="🔎 Search by topic or host..."
          className="max-w-sm bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-300">
        <AnimatePresence>
          {displaySchedule.length > 0 ? (
            displaySchedule.map((classInfo) => (
              <motion.div
                key={classInfo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative pl-6 pb-8"
              >
                <div className="absolute left-[-80px] text-white font-medium">
                  {format(new Date(classInfo.date), "MMM d")}
                </div>
                <div className="absolute -left-3 w-6 h-6 bg-purple-600 border-2 border-gray-400 rounded-full"></div>
                <Card className="hover:shadow-lg hover:border-purple-500 transition transform hover:scale-[1.02] bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
                  <CardContent className="p-4 flex flex-col gap-2">
                    <p className="font-semibold text-xl">{classInfo.topic}</p>
                    <p className="flex items-center text-gray-400">
                      <User className="mr-2 h-4 w-4" /> {classInfo.host}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{classInfo.time}</span>
                    </div>
                    <p className="flex items-center text-gray-500">
                      <Cal className="mr-2 h-4 w-4" />{" "}
                      {format(new Date(classInfo.date), "PPP")}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium w-fit border ${
                        classTypes[classInfo.type.toLowerCase()] ||
                        "bg-gray-200"
                      }`}
                    >
                      {classInfo.type.replace("-", " ")}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.p
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500"
            >
              🚫 No classes found.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
