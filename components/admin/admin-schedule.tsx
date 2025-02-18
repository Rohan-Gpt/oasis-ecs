"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { GetAllWorkshops } from "@/actions/schdeule";
import ViewSchedule from "./handle-schedule";
import DeleteSchedule from "./delete-schedule";
import Editworkshop from "./edit-schedule";
import { format } from "date-fns";

interface Schedule {
  id: number;
  topic: string;
  host: string;
  date: string;
  time: string;
  type: string;
}

export default function AdminSchedule() {
  const [Schedules, setSchedules] = useState<Schedule[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [deleteSchedule, setDeleteSchedule] = useState(null);

  // const fetchGuides = useCallback(async () => {
  //   const response = await fetch("/api/guides");
  //   const data = await response.json();
  //   setGuides(data);
  // }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        // const response = await fetch("/api/guides", { cache: "force-cache" });
        const data = await GetAllWorkshops();
        if (Array.isArray(data)) {
          setSchedules(data as Schedule[]);
        } else {
          console.error("API did not return an array", data);
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchSchedules();
  }, []);

  // useEffect(() => {
  //   // fetchGuides();
  //   fetchSchedules();
  // }, [fetchSchedules]);

  const handleEditSchedule = (Schedule: Schedule) => {
    setSelectedSchedule(Schedule);
    setOpenEditDialog(true);
  };
  const handleDeleteSchedule = (Schedule: any) => {
    setDeleteSchedule(Schedule);
    setOpenDeleteDialog(true);
  };

  const handleSaveGuide = (updatedGuide: any) => {
    // console.log("Guide saved:", updatedGuide);
    setOpenEditDialog(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-4">Schedule</h2>
        <ViewSchedule />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Schedules.map((Schedule) => (
              <TableRow key={Schedule.id}>
                <TableCell>{Schedule.topic}</TableCell>
                <TableCell>{Schedule.host}</TableCell>
                <TableCell>{Schedule.date}</TableCell>
                <TableCell>{Schedule.time}</TableCell>
                <TableCell>{Schedule.type}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditSchedule(Schedule)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSchedule(Schedule)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {deleteSchedule && (
          <DeleteSchedule
            workshop={deleteSchedule}
            open={openDeleteDialog}
            handleClose={() => setOpenDeleteDialog(false)}
          />
        )}
        {selectedSchedule && (
          <Editworkshop
            workshop={selectedSchedule}
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            handleSave={handleSaveGuide}
          />
        )}
      </main>
    </div>
  );
}
