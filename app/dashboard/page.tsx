import { redirect } from "next/navigation";
import { CircleAlert } from "lucide-react";
import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/message";
import {
  MessagesDashboard,
  type DashboardMessage,
} from "@/components/dashboard/MessagesDashboard";
import type { MessageStatus } from "@/config/portfolio";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/dashboard/login");
  }

  let messages: DashboardMessage[] = [];
  let errorMessage: string | null = null;

  try {
    await connectDB();
    const results = await Message.find().sort({ createdAt: -1 }).lean();

    messages = results.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      company: item.company || undefined,
      subject: item.subject || undefined,
      message: item.message,
      status: item.status as MessageStatus,
      createdAt: item.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    errorMessage =
      error instanceof Error &&
      error.message.includes("MONGODB_URI is not defined")
        ? "MongoDB is not configured yet. Add your connection string to .env.local."
        : "Unable to load messages. Please try again later.";
  }

  if (errorMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center">
          <CircleAlert
            className="mx-auto h-10 w-10 text-red-600"
            aria-hidden="true"
          />
          <h1 className="mt-4 text-xl font-semibold text-[#1d1d1f]">
            Dashboard unavailable
          </h1>
          <p className="mt-2 text-[#6e6e73]">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return <MessagesDashboard messages={messages} />;
}
