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
import { GuideSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createGuide, updateGuide } from "@/actions/guides";

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
};

const EditGuide: React.FC<EditGuideProps> = ({ guide }) => {
  // console.log(guide);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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

  const onSubmit = (values: z.infer<typeof GuideSchema>) => {
    // console.log("inside onguidesubmit");
    startTransition(() => {
      updateGuide(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  //   console.log(form.formState.errors);

  return (
    <DialogWrapper
      headerLabel="Create a Guide"
      triggerLabel="Add New Guide"
      title="Create New Guide"
      description="Add the details for the new guide here."
    >
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
                        placeholder="title"
                        type="text"
                        defaultValue={guide.title}
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
                        placeholder="description"
                        type="text"
                        defaultValue={guide.description}
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
                        placeholder="guideLink"
                        type="text"
                        defaultValue={guide.guideLink}
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
                    <FormLabel>week</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="week"
                        type="text"
                        defaultValue={guide.week}
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
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                        defaultValue={guide.difficulty}
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
                        placeholder=""
                        type="text"
                        defaultValue={guide.modules}
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
                        placeholder="Duration"
                        type="text"
                        defaultValue={guide.duration}
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
                        placeholder="write topics separated with comma"
                        type="text"
                        defaultValue={guide.topics}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} type="submit">
              Create Guide
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
};

export default EditGuide;
