import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/lead";
import { leadSubmissionSchema } from "@/lib/validations/lead";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validated = leadSubmissionSchema.parse(body);

    await connectDB();

    const lead = await Lead.create({
      fullName: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      company: validated.company,
      message: validated.message,
      status: "new",
    });

    return NextResponse.json(
      {
        message: "Enquiry submitted successfully.",
        id: lead._id.toString(),
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

    if (
      error instanceof Error &&
      error.message.includes("MONGODB_URI is not defined")
    ) {
      return NextResponse.json(
        {
          message:
            "The database is not configured yet. Please add your MongoDB connection string to .env.local.",
        },
        { status: 500 },
      );
    }

    console.error("Lead submission error:", error);
    return NextResponse.json(
      { message: "Unable to save your enquiry. Please try again later." },
      { status: 500 },
    );
  }
}
