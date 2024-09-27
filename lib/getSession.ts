import { auth } from "@/lib/auth";
import { cache } from "react";

export const getSession = cache(async () => {
  const session = await auth();
  return session;
});

export const currentUser = cache(async () => {
  const session = await getSession();
  return session?.user;
});

export const isAdmin = cache(async () => {
  const user = await currentUser();
  return user?.role === "ADMIN";
});
