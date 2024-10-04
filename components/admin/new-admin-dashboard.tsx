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
import { createGuide } from "@/actions/guides";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import AdminGuide from "./handle-guide";
import EditGuide from "./edit-guide";

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
  id: string;
  title: string;
  description: string;
  technologies: string;
  icon: string;
}

export default function NewAdminDashboard() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [activeSection, setActiveSection] = useState<"guides" | "projects">(
    "guides"
  );
  const [guides, setGuides] = useState<Guide[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [guideToDelete, setGuideToDelete] = useState<Guide | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof GuideSchema>>({
    resolver: zodResolver(GuideSchema),
    defaultValues: {
      title: "",
      description: "",
      week: "",
      difficulty: "",
      modules: "",
      duration: "",
      guideLink: "",
      topics: [],
      icon: "",
    },
  });

  const fetchGuides = useCallback(async () => {
    const response = await fetch("/api/guides");
    const data = await response.json();
    setGuides(data);
  }, []);
  const fetchProjects = useCallback(async () => {
    const response = await fetch("/api/projects");
    const data = await response.json();
    setProjects(data);
  }, []);

  useEffect(() => {
    fetchGuides();
    fetchProjects();
  }, [fetchGuides, fetchProjects]);

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleEditGuide = (guide: Guide) => {
    setEditingGuide(guide);
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
                        onClick={() => {}}
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
        {editingGuide && <EditGuide guide={editingGuide} />}
        {activeSection === "projects" && (
          <>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mb-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingProject ? "Edit Project" : "Create New Project"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProject
                      ? "Make changes to the Project here."
                      : "Add the details for the new Project here."}
                  </DialogDescription>
                </DialogHeader>
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={editingProject?.title}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="icon" className="text-right">
                        Icon
                      </Label>
                      <Input
                        id="icon"
                        name="icon"
                        defaultValue={editingProject?.icon}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingProject?.description}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      {editingGuide ? "Update Project" : "Create Project"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.technologies}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProject(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </main>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the Guide?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              guide
              <strong> {guideToDelete?.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 ">
              <Label htmlFor="name" className="">
                Type the guide name to confirm:
              </Label>
            </div>
            <Input
              id="name"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-500"
              // onClick={confirmDeleteGuide}
              disabled={deleteConfirmation !== guideToDelete?.title}
            >
              Delete Guide
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
