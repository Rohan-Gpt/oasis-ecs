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
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UpdateWorkshop } from "@/actions/schdeule";
import { WorkshopSchema } from "@/schemas";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

type Workshop = {
  id: number;
  topic: string;
  host: string;
  date: string;
  time: string;
  type: string;
};
type EditworkshopProps = {
  workshop: Workshop;
  open: any;
  handleClose: () => void;
  handleSave: any;
};

const Editworkshop: React.FC<EditworkshopProps> = ({
  workshop,
  open,
  handleClose,
  handleSave,
}) => {
  const [calOpen, setCalOpen] = useState(false);
  const [updatedGuide, setUpdatedGuide] = useState(workshop);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof WorkshopSchema>>({
    resolver: zodResolver(WorkshopSchema),
    defaultValues: {
      id: workshop.id,
      topic: workshop?.topic || "",
      host: workshop?.host || "",
      type: workshop?.type || "",
      date: workshop?.date || "",
      time: workshop.time || "",
    },
  });

  // Reset form values whenever a new workshop is selected
  useEffect(() => {
    if (workshop) {
      setUpdatedGuide(workshop); // Update the state with the new workshop
      form.reset({
        topic: workshop.topic,
        host: workshop.host,
        type: workshop.type,
        date: workshop.date,
        time: workshop.time,
      });
    }
  }, [workshop, form]);

  const onSubmit = (values: z.infer<typeof WorkshopSchema>) => {
    const sanitizedValues = {
      ...values,
      id: workshop.id,
    };
    startTransition(() => {
      UpdateWorkshop(sanitizedValues).then((data) => {
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
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
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
                    name="host"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="Name of the Host"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Backend">Backend</SelectItem>
                              <SelectItem value="Frontend">Frontend</SelectItem>
                              <SelectItem value="Competitive Programming">
                                Competitive Programming
                              </SelectItem>
                              <SelectItem value="Project">Project</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[220px] flex justify-between"
                            >
                              <div className="flex items-center">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(new Date(field.value), "MMM d, yyyy")
                                  : "Pick a date"}
                              </div>
                              {field.value && (
                                <X
                                  className="h-4 w-4 text-gray-500 hover:text-black ml-4"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevents popover from opening
                                    field.onChange(""); // Reset the date
                                  }}
                                />
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <Calendar
                              mode="single" // Select only one date
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date?.toISOString() || "")
                              } // Convert to string
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="Enter time"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={isPending} type="submit">
                  Create Class
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

export default Editworkshop;
