"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusCircle, Pencil, Trash2, BookOpen, FolderGit2 } from "lucide-react";
import * as z from "zod";
import { GuideSchema } from "@/schemas";
import { createGuide, deleteGuide, GetAllGuides } from "@/actions/guides";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import AdminGuide from "./handle-guide";
import EditGuide from "./edit-guide";
import DeleteGuide from "./delete-guide";
import AdminProject from "./handle-project";
import EditProject from "./edit-project";
import DeleteProject from "./delete-project";
import { GetAllProjects } from "@/actions/project";

type Guide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  modules: string;
  duration: string;
  guideLink?: string;
  week?: string;
  topics: string[];
};

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  team: {
    name: string;
  };
}

export default function NewAdminDashboard() {
  const [activeSection, setActiveSection] = useState<"guides" | "projects">(
    "guides"
  );
  const [guides, setGuides] = useState<Guide[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [guideToDelete, setGuideToDelete] = useState<Guide | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteGuide, setDeleteGuide] = useState(null);
  const [selectedProject, setSelectedproject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState(null);

  // const fetchGuides = useCallback(async () => {
  //   const response = await fetch("/api/guides");
  //   const data = await response.json();
  //   setGuides(data);
  // }, []);
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        // const response = await fetch("/api/guides", { cache: "force-cache" });
        const data = await GetAllGuides();
        if (Array.isArray(data)) {
          setGuides(data as Guide[]);
        } else {
          console.error("API did not return an array", data);
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);

  // const fetchProjects = useCallback(async () => {
  //   const response = await fetch("/api/projects");
  //   const data = await response.json();
  //   setProjects(data);
  // }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch("/api/guides", { cache: "force-cache" });
        const data = await GetAllProjects();
        if (Array.isArray(data)) {
          setProjects(data as Project[]);
        } else {
          console.error("API did not return an array", data);
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchProjects();
  }, []);

  // useEffect(() => {
  //   // fetchGuides();
  //   fetchProjects();
  // }, [fetchProjects]);

  const handleEditProject = (project: Project) => {
    setSelectedproject(project);
    setOpenEditDialog(true);
  };

  const handleEditGuide = (guide: any) => {
    setSelectedGuide(guide);
    setOpenEditDialog(true);
  };
  const handleDeleteGuide = (guide: any) => {
    setDeleteGuide(guide);
    setOpenDeleteDialog(true);
  };
  const handleDeleteProject = (project: any) => {
    setDeleteProject(project);
    setOpenDeleteDialog(true);
  };

  const handleSaveGuide = (updatedGuide: any) => {
    // console.log("Guide saved:", updatedGuide);
    setOpenEditDialog(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">OASIS Admin</h1>
        <nav>
          <Button
            variant={activeSection === "guides" ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => setActiveSection("guides")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Guides
          </Button>
          <Button
            variant={activeSection === "projects" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("projects")}
          >
            <FolderGit2 className="mr-2 h-4 w-4" />
            Projects
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-4">
          {activeSection === "guides" ? "Guides" : "Projects"}
        </h2>
        {activeSection === "guides" && (
          <>
            <AdminGuide />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Week</TableHead>
                  <TableHead className="pl-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guides.map((guide, index) => (
                  <TableRow key={index}>
                    <TableCell>{guide.title}</TableCell>
                    <TableCell>{guide.difficulty}</TableCell>
                    <TableCell>{guide.modules}</TableCell>
                    <TableCell>{guide.week}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditGuide(guide)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteGuide(guide)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        {deleteGuide && (
          <DeleteGuide
            guide={deleteGuide}
            open={openDeleteDialog}
            handleClose={() => setOpenDeleteDialog(false)}
          />
        )}
        {selectedGuide && (
          <EditGuide
            guide={selectedGuide}
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            handleSave={handleSaveGuide}
          />
        )}
        {activeSection === "projects" && (
          <>
            <AdminProject />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.technologies}</TableCell>
                    <TableCell>{project?.team?.name}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProject(project)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        {deleteProject && (
          <DeleteProject
            project={deleteProject}
            open={openDeleteDialog}
            handleClose={() => setOpenDeleteDialog(false)}
          />
        )}
        {selectedProject && (
          <EditProject
            project={selectedProject}
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            handleSave={handleSaveGuide}
          />
        )}
      </main>
    </div>
  );
}
