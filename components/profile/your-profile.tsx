"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "../auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schemas";
import * as z from "zod";
import { GetUser, updateUser } from "@/actions/profile";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function YourProfile({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [user, setUser] = useState<User | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: "",
      name: "",
      membershipId: "",
      department: undefined,
      semester: undefined,
    },
  });
  useEffect(() => {
    async function fetchUser() {
      const data = await GetUser(email);
      setUser(data);
      form.reset({
        email: data?.email || "",
        name: data?.name || "",
        membershipId: data?.membershipId || "",
        department: data?.department || "",
        semester: data?.semester || "",
      });
      // console.log(data);
    }
    fetchUser();
  }, [email, form]);

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    // console.log("onsubmit is being calledx");
    // console.log(values);
    startTransition(() => {
      updateUser(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        setIsEditable(false);
      });
    });
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-6 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 shadow-lg overflow-hidden">
        <Avatar className="w-16 h-16 md:w-24 md:h-24 flex-none rounded-full border-4 border-gray-300 dark:border-gray-600">
          <AvatarImage
            src={user?.image ?? undefined}
            alt={user?.name ?? "User Avatar"}
            className="rounded-full object-cover"
          />
          <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300 flex items-center justify-center w-full h-full rounded-full">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center space-y-1">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {user?.name ?? "Name"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email ?? "Email"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Membership ID: {user?.membershipId ?? "N/A"}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled {...field} type="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membershipId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Id</FormLabel>
                  <FormControl>
                    <Input disabled {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="flex space-x-2 ">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditable || isPending}
                        {...field}
                        type="text"
                        maxLength={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditable || isPending}
                        {...field}
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          {!isEditable ? (
            <button
              onClick={handleEditClick}
              type="button"
              className="w-full rounded-md bg-black hover:bg-black/90 text-white px-4 py-2"
            >
              Edit Profile
            </button>
          ) : (
            <Button disabled={isPending} type="submit" className="w-full">
              Save Changes
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
