import { prisma } from "@/db/prisma";
import { compare, hash } from "bcryptjs";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { LoginSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { generateMembershipId } from "@/actions/generateMembershipId";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {
      console.log("linkAccount event triggered for user:", user.id);
      const membershipId = await generateMembershipId();
      console.log("this is the memid", membershipId);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
          membershipId,
        },
      });
      const memuser = await prisma.user.findUnique({
        where: { email: "user@example.com" },
        select: { membershipId: true },
      });
      console.log(memuser);
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await prisma.user.findFirst({
            where: { email },
          });
          if (!user || !user.password) {
            return null;
          }
          const passwordMatcher = await compare(password, user.password);
          if (passwordMatcher) {
            return user;
          }
        }
        return null;
      },
    }),
    GitHub,
    Google,
    Resend,
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        // console.log(token);
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
