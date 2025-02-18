"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import DialogWrapper from "./Dialog-wrapper";
import { WorkshopSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import { Calendar } from "../ui/calendar";
import { createWorkshop } from "@/actions/schdeule";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Clock, X } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import * as z from "zod";

const timeOptions = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

export default function ViewSchedule() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(""); // Error state
  const [success, setSuccess] = useState<string | undefined>(""); // Success state

  // Set up react-hook-form with Zod validation schema
  const form = useForm<z.infer<typeof WorkshopSchema>>({
    resolver: zodResolver(WorkshopSchema),
    defaultValues: {
      topic: "",
      host: "",
      type: "",
      date: "", // Default date should be an empty string initially (not a Date object)
      time: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof WorkshopSchema>) => {
    startTransition(() => {
      console.log("these are the workshop creation values", values);
      createWorkshop(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <DialogWrapper
      headerLabel="Create Class"
      triggerLabel="Add New Class"
      title="Create New Class"
      description="Add the details for the new Class here."
    >
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[260px] flex justify-between"
                        >
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {field.value || "Pick a time"}
                          </div>
                          {field.value && (
                            <X
                              className="h-4 w-4 text-gray-500 hover:text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange("");
                              }}
                            />
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-2 w-[260px]">
                        <div className="grid grid-cols-2 gap-2">
                          {timeOptions.map((time) => (
                            <Button
                              key={time}
                              variant="ghost"
                              className="w-full"
                              onClick={() => field.onChange(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
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
    </DialogWrapper>
  );
}
