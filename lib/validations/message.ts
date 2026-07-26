import { z } from "zod";
import { messageStatuses } from "@/config/portfolio";

const optionalText = (max: number, tooLong: string) =>
  z
    .string()
    .trim()
    .max(max, tooLong)
    .optional()
    .transform((value) => (value === "" ? undefined : value));

export const messageSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .max(120, "Full name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(200, "Email address is too long.")
    .transform((value) => value.toLowerCase()),
  company: optionalText(120, "Company name is too long."),
  subject: optionalText(160, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(2000, "Message is too long."),
});

export const messageStatusUpdateSchema = z.object({
  status: z.enum(messageStatuses, {
    message: "Please choose a valid message status.",
  }),
});

export type MessageSubmissionInput = z.infer<typeof messageSubmissionSchema>;
export type MessageStatusUpdateInput = z.infer<typeof messageStatusUpdateSchema>;
