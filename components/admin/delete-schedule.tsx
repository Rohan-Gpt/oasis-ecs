"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import { DeleteWorkshop } from "@/actions/schdeule";

type Workshop = {
  id: number;
  topic: string;
  host: string;
  date: string;
  time: string;
  type: string;
};

type DeleteScheduleProps = {
  workshop: Workshop;
  open: boolean;
  handleClose: () => void;
};

const DeleteSchedule: React.FC<DeleteScheduleProps> = ({
  workshop,
  open,
  handleClose,
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const WorkshopName = workshop.topic;
  const form = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: { title: string }) => {
    if (values.title !== WorkshopName) {
      setError("The Workshop name doesn't match. Please try again.");
      return;
    }
    setError(undefined);

    startTransition(() => {
      DeleteWorkshop(workshop.id, values.title).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Workshop</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please type the Workshop name{" "}
            {workshop.topic} to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        placeholder="Enter Workshop name"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  type="submit"
                  disabled={form.watch("title") !== WorkshopName || isPending}
                >
                  Delete
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
        <DialogFooter>
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSchedule;
