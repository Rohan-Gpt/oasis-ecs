"use client";

import * as z from "zod";
import { useCallback, useEffect, useState, useTransition } from "react";
import { PlusIcon, Pencil, Trash2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GuideSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
// import CreateGuide from "./handle-guide";

type Guide = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon | string;
  difficulty: string;
  modules?: number;
  duration?: string;
  guideLink?: string;
  week?: number;
  topics: string[];
};

export default function AdminDashboard() {
  const [isPending, startTransition] = useTransition();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);

  // const form = useForm<z.infer<typeof GuideSchema>>({
  //   resolver: zodResolver(GuideSchema),
  //   defaultValues: {
  //     week: 0,
  //     title: "",
  //     description: "",
  //     difficulty: "",
  //     modules: 0,
  //     duration: "",
  //     guideLink: "",
  //     topics: {},
  //   },
  // });

  const fetchGuides = useCallback(async () => {
    try {
      const response = await fetch("/api/guides");
      const data = await response.json();
      if (Array.isArray(data)) {
        setGuides(data);
      } else {
        // console.error("API did not return an array", data);
      }
    } catch (error) {
      // console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const updateGuide = () => {
    if (editingGuide) {
      setGuides(
        guides.map((g) => (g.id === editingGuide.id ? editingGuide : g))
      );
      setEditingGuide(null);
    }
  };

  const deleteGuide = (id: number) => {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {/* <CreateGuide /> */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Guides</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.map((guide, index) => (
              <TableRow key={index}>
                <TableCell>{guide.title}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Guide</DialogTitle>
                      </DialogHeader>
                      <Input
                        type="text"
                        value={editingGuide?.title || ""}
                        onChange={(e) =>
                          setEditingGuide({
                            ...editingGuide!,
                            title: e.target.value,
                          })
                        }
                        className="mb-2"
                      />
                      <Textarea
                        // value={editingGuide || ""}
                        // onChange={(e) =>

                        // }
                        className="mb-2"
                      />
                      <Button onClick={updateGuide}>Update Guide</Button>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    // onClick={() => deleteGuide()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
