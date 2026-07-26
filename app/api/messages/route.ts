import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/message";
import { isAuthenticated } from "@/lib/auth";
import { messageSubmissionSchema } from "@/lib/validations/message";
import { messageStatuses, type MessageStatus } from "@/config/portfolio";

function isMissingDatabaseConfig(error: unknown): boolean {
  return (
    error instanceof Error && error.message.includes("MONGODB_URI is not defined")
  );
}

/** Public: save a contact-form submission. */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validated = messageSubmissionSchema.parse(body);

    await connectDB();

    const created = await Message.create({
      name: validated.name,
      email: validated.email,
      company: validated.company,
      subject: validated.subject,
      message: validated.message,
      status: "new",
    });

    return NextResponse.json(
      {
        message: "Message sent successfully.",
        id: created._id.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          fieldErrors[field] = fieldErrors[field] ?? [];
          fieldErrors[field].push(issue.message);
        }
      }
      return NextResponse.json(
        { message: "Please check the form and try again.", errors: fieldErrors },
        { status: 400 },
      );
    }

    if (isMissingDatabaseConfig(error)) {
      return NextResponse.json(
        {
          message:
            "The database is not configured yet. Please add your MongoDB connection string to .env.local.",
        },
        { status: 500 },
      );
    }

    console.error("Message submission error:", error);
    return NextResponse.json(
      { message: "Unable to send your message. Please try again later." },
      { status: 500 },
    );
  }
}

/** Dashboard only: list messages, newest first, with optional search + status filter. */
export async function GET(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() ?? "";
    const statusParam = searchParams.get("status")?.trim() ?? "";

    const filter: Record<string, unknown> = {};

    if (messageStatuses.includes(statusParam as MessageStatus)) {
      filter.status = statusParam;
    }

    if (search.length > 0) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(escaped, "i");
      filter.$or = [
        { name: pattern },
        { email: pattern },
        { company: pattern },
      ];
    }

    await connectDB();
    const results = await Message.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      messages: results.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        company: item.company ?? undefined,
        subject: item.subject ?? undefined,
        message: item.message,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    if (isMissingDatabaseConfig(error)) {
      return NextResponse.json(
        { message: "The database is not configured yet." },
        { status: 500 },
      );
    }

    console.error("Message list error:", error);
    return NextResponse.json(
      { message: "Unable to load messages." },
      { status: 500 },
    );
  }
}
