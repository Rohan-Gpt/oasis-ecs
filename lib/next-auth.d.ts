import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: UserRole;
  }

  interface JWT {
    role: UserRole;
  }
}
