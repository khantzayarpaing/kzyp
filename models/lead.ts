import { Schema, model, models } from "mongoose";
import { leadStatuses } from "@/config/business";

const leadSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: leadStatuses,
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

export const Lead = models.Lead || model("Lead", leadSchema);
