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
import { GuideSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateGuide } from "@/actions/guides";

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

type EditGuideProps = {
  guide: Guide;
  open: any;
  handleClose: () => void;
  handleSave: any;
};

const EditGuide: React.FC<EditGuideProps> = ({
  guide,
  open,
  handleClose,
  handleSave,
}) => {
  const [updatedGuide, setUpdatedGuide] = useState(guide);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof GuideSchema>>({
    resolver: zodResolver(GuideSchema),
    defaultValues: {
      id: guide.id,
      title: guide?.title || "",
      description: guide?.description || "",
      week: guide?.week ?? "",
      difficulty: guide?.difficulty || "",
      modules: guide?.modules ?? "",
      duration: guide?.duration ?? "",
      guideLink: guide?.guideLink ?? "",
      topics: guide?.topics || [],
      icon: guide?.icon || "",
    },
  });

  // Reset form values whenever a new guide is selected
  useEffect(() => {
    if (guide) {
      setUpdatedGuide(guide); // Update the state with the new guide
      form.reset({
        title: guide.title,
        description: guide.description,
        week: guide.week,
        difficulty: guide.difficulty,
        modules: guide.modules,
        duration: guide.duration,
        guideLink: guide.guideLink,
        topics: guide.topics,
        icon: guide.icon,
      });
    }
  }, [guide, form]);

  const handleSubmit = () => {
    handleSave(updatedGuide);
    handleClose(); // Close the dialog after saving
  };

  const onSubmit = (values: z.infer<typeof GuideSchema>) => {
    const processedValues = {
      ...values,
      id: guide.id,
      title: values.title === "" ? null : values.title,
      description: values.description === "" ? null : values.description,
      difficulty: values.difficulty === "" ? null : values.difficulty,
      topics: values.topics.length === 0 ? null : values.topics,
      icon: values.icon === "" ? null : values.icon,
      week: values.week === "" ? null : values.week,
      modules: values.modules === "" ? null : values.modules,
      duration: values.duration === "" ? null : values.duration,
      guideLink: values.guideLink === "" ? null : values.guideLink,
    };
    startTransition(() => {
      updateGuide(processedValues as Guide).then((data) => {
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
                    name="guideLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guide Link</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="guideLink"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="week"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Week</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="week"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modules</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="modules"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            value={field.value ?? ""}
                            placeholder="Duration"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="topics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topics</FormLabel>
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
                            placeholder="lucide-react icon"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={isPending} type="submit">
                  Update Guide
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

export default EditGuide;
