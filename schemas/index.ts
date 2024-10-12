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
    message: "Department is required",
  }),
  semester: z.string({
    message: "Semester is required",
  }),
});

export const ProfileSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is Required",
    })
    .optional(),
  password: z
    .string()
    .min(6, {
      message: "Minimum 6 characters required",
    })
    .optional(),
  membershipId: z.string().optional(),
  name: z
    .string()
    .min(1, {
      message: "Name is Required",
    })
    .optional(),
  department: z.string().min(1, {
    message: "Department is required",
  }),
  semester: z
    .string()
    .min(1, {
      message: "Semester is required",
    })
    .max(1),
});

export const GuideSchema = z.object({
  id: z.string().optional(),
  week: z.union([z.string(), z.null()]).optional(),
  title: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  difficulty: z.string().min(1, {
    message: "Basic, intermediate or Advanced",
  }),
  modules: z.union([z.string(), z.null()]).optional(),
  duration: z.union([z.string(), z.null()]).optional(),
  guideLink: z.union([z.string(), z.null()]).optional(),
  topics: z.union([z.string(), z.array(z.string())]),
  icon: z.string(),
});

export const ProjectSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  technologies: z.union([z.string(), z.array(z.string())]),
  icon: z.string(),
});

export const CreateTeamSchema = z.object({
  teamName: z.string().min(1, {
    message: "Team name is required",
  }),
  membershipId: z.array(z.string()).min(1, {
    message: "At least one member is required",
  }),
  leaderId: z.string().optional(),
});
