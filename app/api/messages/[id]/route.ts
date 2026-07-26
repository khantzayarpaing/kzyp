import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/message";
import { messageStatusUpdateSchema } from "@/lib/validations/message";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Dashboard only: update a message's status. */
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await context.params;
    const body: unknown = await request.json();
    const validated = messageStatusUpdateSchema.parse(body);

    await connectDB();

    const updated = await Message.findByIdAndUpdate(
      id,
      { status: validated.status },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Message not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Message status updated.",
      data: {
        id: updated._id.toString(),
        status: updated.status,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid status value." },
        { status: 400 },
      );
    }

    console.error("Message update error:", error);
    return NextResponse.json(
      { message: "Unable to update message status." },
      { status: 500 },
    );
  }
}
