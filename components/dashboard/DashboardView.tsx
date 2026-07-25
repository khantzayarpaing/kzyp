"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Users,
  UserPlus,
  PhoneCall,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { business, leadStatuses, type LeadStatus } from "@/config/business";
import { Button } from "@/components/ui/Button";
import { logoutAction } from "@/app/dashboard/actions";

export interface DashboardLead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

interface DashboardViewProps {
  leads: DashboardLead[];
}

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  closed: "Closed",
};

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  qualified: "bg-green-100 text-green-800",
  closed: "bg-slate-200 text-slate-700",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DashboardView({ leads }: DashboardViewProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const summary = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((lead) => lead.status === "new").length,
      contacted: leads.filter((lead) => lead.status === "contacted").length,
    }),
    [leads],
  );

  const filteredLeads = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      const matchesSearch =
        query.length === 0 ||
        lead.fullName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.company?.toLowerCase().includes(query) ?? false);

      return matchesStatus && matchesSearch;
    });
  }, [leads, searchQuery, statusFilter]);

  async function handleStatusChange(leadId: string, status: LeadStatus) {
    setUpdatingId(leadId);
    setFeedback(null);

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setFeedback({
          type: "error",
          message: result.message ?? "Unable to update lead status.",
        });
        return;
      }

      setFeedback({
        type: "success",
        message: "Lead status updated successfully.",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to update lead status. Please try again.",
      });
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Lead Dashboard</h1>
            <p className="mt-1 text-slate-600">{business.name}</p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary" disabled={isPending}>
              Log out
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {feedback && (
          <div
            className={`mb-6 flex items-start gap-3 rounded-lg border p-4 ${
              feedback.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
            role="status"
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <p>{feedback.message}</p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={Users}
            label="Total Leads"
            value={summary.total}
          />
          <SummaryCard icon={UserPlus} label="New Leads" value={summary.new} />
          <SummaryCard
            icon={PhoneCall}
            label="Contacted Leads"
            value={summary.contacted}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Search leads"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={statusFilter === "all"}
              onClick={() => setStatusFilter("all")}
            >
              All
            </FilterButton>
            {leadStatuses.map((status) => (
              <FilterButton
                key={status}
                active={statusFilter === status}
                onClick={() => setStatusFilter(status)}
              >
                {statusLabels[status]}
              </FilterButton>
            ))}
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-medium text-slate-900">No leads found</p>
            <p className="mt-2 text-slate-600">
              {leads.length === 0
                ? "Customer enquiries will appear here once submitted."
                : "Try adjusting your search or filter."}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:block">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="align-top">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        {lead.fullName}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {lead.phone || "—"}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {lead.company || "—"}
                      </td>
                      <td className="max-w-xs px-4 py-4 text-sm text-slate-600">
                        {lead.message}
                      </td>
                      <td className="px-4 py-4">
                        <StatusSelect
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(status) =>
                            handleStatusChange(lead.id, status)
                          }
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-4 lg:hidden">
              {filteredLeads.map((lead) => (
                <article
                  key={lead.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {lead.fullName}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">{lead.email}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[lead.status]}`}
                    >
                      {statusLabels[lead.status]}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-slate-700">Phone</dt>
                      <dd className="text-slate-600">{lead.phone || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-700">Company</dt>
                      <dd className="text-slate-600">{lead.company || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-700">Message</dt>
                      <dd className="text-slate-600">{lead.message}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-700">Submitted</dt>
                      <dd className="text-slate-600">
                        {formatDate(lead.createdAt)}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4">
                    <label
                      htmlFor={`status-${lead.id}`}
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Update status
                    </label>
                    <StatusSelect
                      id={`status-${lead.id}`}
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(status) => handleStatusChange(lead.id, status)}
                    />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function StatusSelect({
  value,
  onChange,
  disabled,
  id,
}: {
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as LeadStatus)}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-60"
      aria-label="Lead status"
    >
      {leadStatuses.map((status) => (
        <option key={status} value={status}>
          {statusLabels[status]}
        </option>
      ))}
    </select>
  );
}
