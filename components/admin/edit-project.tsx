"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import { GuideSchema, ProjectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateGuide } from "@/actions/guides";
import { updateProject } from "@/actions/project";

type Project = {
  id: number;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
};

type EditProjectProps = {
  project: Project;
  open: any;
  handleClose: () => void;
  handleSave: any;
};

const EditProject: React.FC<EditProjectProps> = ({
  project,
  open,
  handleClose,
  handleSave,
}) => {
  const [updatedGuide, setUpdatedGuide] = useState(project);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      id: project.id,
      title: project?.title || "",
      description: project?.description || "",
      technologies: project?.technologies || [],
      icon: project?.icon || "",
    },
  });

  // Reset form values whenever a new project is selected
  useEffect(() => {
    if (project) {
      setUpdatedGuide(project); // Update the state with the new project
      form.reset({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        icon: project.icon,
      });
    }
  }, [project, form]);

  const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
    const sanitizedValues = {
      ...values,
      id: project.id,
    };
    startTransition(() => {
      updateProject(sanitizedValues).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Guide</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="title"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="description"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="technologies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="write topics separated with comma"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="lucide-react icons"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={isPending} type="submit">
                  Update Project
                </Button>
                <DialogFooter>
                  <FormSuccess message={success} />
                  <FormError message={error} />
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProject;
