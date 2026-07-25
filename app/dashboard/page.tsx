import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/lead";
import {
  DashboardView,
  type DashboardLead,
} from "@/components/dashboard/DashboardView";
import { AlertCircle } from "lucide-react";
import type { LeadStatus } from "@/config/business";

export default async function DashboardPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/dashboard/login");
  }

  let leads: DashboardLead[] = [];
  let errorMessage: string | null = null;

  try {
    await connectDB();
    const results = await Lead.find().sort({ createdAt: -1 }).lean();

    leads = results.map((lead) => ({
      id: lead._id.toString(),
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone || undefined,
      company: lead.company || undefined,
      message: lead.message,
      status: lead.status as LeadStatus,
      createdAt: lead.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    if (
      error instanceof Error &&
      error.message.includes("MONGODB_URI is not defined")
    ) {
      errorMessage =
        "MongoDB is not configured yet. Add your connection string to .env.local.";
    } else {
      errorMessage = "Unable to load leads. Please try again later.";
    }
  }

  if (errorMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle
            className="mx-auto h-10 w-10 text-red-600"
            aria-hidden="true"
          />
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Dashboard unavailable
          </h1>
          <p className="mt-2 text-slate-600">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return <DashboardView leads={leads} />;
}
