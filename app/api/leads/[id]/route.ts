import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/lead";
import { leadStatusUpdateSchema } from "@/lib/validations/lead";
import { ZodError } from "zod";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await context.params;
    const body: unknown = await request.json();
    const validated = leadStatusUpdateSchema.parse(body);

    await connectDB();

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status: validated.status },
      { new: true },
    );

    if (!lead) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lead status updated.",
      lead: {
        id: lead._id.toString(),
        status: lead.status,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid status value." },
        { status: 400 },
      );
    }

    console.error("Lead update error:", error);
    return NextResponse.json(
      { message: "Unable to update lead status." },
      { status: 500 },
    );
  }
}
