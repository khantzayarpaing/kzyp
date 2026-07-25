import { z } from "zod";
import { leadStatuses } from "@/config/business";

export const leadSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .max(120, "Full name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(2000, "Message is too long."),
});

export const leadStatusUpdateSchema = z.object({
  status: z.enum(leadStatuses, {
    message: "Please choose a valid lead status.",
  }),
});

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;
