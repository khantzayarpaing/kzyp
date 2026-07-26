import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { messageStatuses, defaultMessageStatus } from "@/config/portfolio";

const messageSchema = new Schema(
  {
    name: {
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
    company: {
      type: String,
      trim: true,
    },
    subject: {
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
      enum: messageStatuses,
      default: defaultMessageStatus,
    },
  },
  {
    timestamps: true,
  },
);

export type MessageDocument = InferSchemaType<typeof messageSchema>;

// Guard against Mongoose model-recompile errors during hot reloads in dev.
export const Message: Model<MessageDocument> =
  (models.Message as Model<MessageDocument>) ||
  model<MessageDocument>("Message", messageSchema);
