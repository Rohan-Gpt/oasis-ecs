import { Description } from "@radix-ui/react-dialog";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(1, {
    message: "password is Required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  department: z.string({
    message: "Department is required"
  }),
  semester: z.string({
    message: "Semester is required"
  })
});

export const GuideSchema = z.object({
  week: z.string().optional(),
  title: z.string().min(1, {
    message: "title is requires",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  difficulty: z.string().min(1, {
    message: "Basic, intermediate or Advanced",
  }),
  modules: z.string().optional(),
  duration: z.string().optional(),
  guideLink: z.string().optional(),
  topics: z.union([z.string(), z.array(z.string())]),
});

export const CreateTeamSchema = z.object({
  teamName: z.string().min(1, {
    message: "Team name is required",
  }),
  membershipId: z.array(z.string()).min(1, {
    message: "At least one member is required",
  }),
  leaderId: z.string().optional()
});
