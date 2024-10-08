"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteGuide } from "@/actions/guides";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";

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

type DeleteGuideProps = {
  guide: Guide;
  open: boolean;
  handleClose: () => void;
};

const DeleteGuide: React.FC<DeleteGuideProps> = ({
  guide,
  open,
  handleClose,
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const guideName = guide.title;
  const form = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: { title: string }) => {
    if (values.title !== guideName) {
      setError("The guide name doesn't match. Please try again.");
      return;
    }
    setError(undefined);

    startTransition(() => {
      deleteGuide(guide.id, values.title).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Guide</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please type the guide name{" "}
            {guide.title} to confirm.
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
                        placeholder="Enter guide name"
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
                  disabled={form.watch("title") !== guideName || isPending}
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

export default DeleteGuide;
