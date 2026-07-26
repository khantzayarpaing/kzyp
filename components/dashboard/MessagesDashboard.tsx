"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Inbox,
  Sparkles,
  Reply,
  CircleAlert,
  CircleCheck,
} from "lucide-react";
import {
  portfolioConfig,
  messageStatuses,
  type MessageStatus,
} from "@/config/portfolio";
import { Button } from "@/components/ui/Button";
import { logoutAction } from "@/app/dashboard/actions";

export interface DashboardMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

interface MessagesDashboardProps {
  messages: DashboardMessage[];
}

const statusLabels: Record<MessageStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  archived: "Archived",
};

const statusColors: Record<MessageStatus, string> = {
  new: "bg-[#0071e3]/10 text-[#0071e3]",
  read: "bg-amber-100 text-amber-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-[#f5f5f7] text-[#6e6e73]",
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessagesDashboard({ messages }: MessagesDashboardProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<MessageStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const summary = useMemo(
    () => ({
      total: messages.length,
      new: messages.filter((item) => item.status === "new").length,
      replied: messages.filter((item) => item.status === "replied").length,
    }),
    [messages],
  );

  const visibleMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return messages.filter((item) => {
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesSearch =
        query.length === 0 ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        (item.company?.toLowerCase().includes(query) ?? false);

      return matchesStatus && matchesSearch;
    });
  }, [messages, searchQuery, statusFilter]);

  async function handleStatusChange(id: string, status: MessageStatus) {
    setUpdatingId(id);
    setFeedback(null);

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setFeedback({
          type: "error",
          message: result.message ?? "Unable to update the message status.",
        });
        return;
      }

      setFeedback({ type: "success", message: "Message status updated." });
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to update the message status. Please try again.",
      });
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="border-b border-[#d2d2d7] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">
              Messages
            </h1>
            <p className="mt-1 text-sm text-[#6e6e73]">
              {portfolioConfig.personal.name} · Contact form inbox
            </p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary" disabled={isPending}>
              Log out
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {feedback && (
          <div
            role="status"
            className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
              feedback.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {feedback.type === "success" ? (
              <CircleCheck
                className="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <CircleAlert
                className="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
            )}
            <p>{feedback.message}</p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard icon={Inbox} label="Total messages" value={summary.total} />
          <SummaryCard icon={Sparkles} label="New messages" value={summary.new} />
          <SummaryCard
            icon={Reply}
            label="Replied messages"
            value={summary.replied}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6e6e73]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by name, email, or company…"
              aria-label="Search messages"
              className="w-full rounded-xl border border-[#d2d2d7] bg-white py-2.5 pl-11 pr-4 text-[#1d1d1f] placeholder:text-[#6e6e73]/70 focus-visible:border-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            />
          </div>

          <div
            role="group"
            aria-label="Filter messages by status"
            className="flex flex-wrap gap-2"
          >
            <FilterButton
              active={statusFilter === "all"}
              onClick={() => setStatusFilter("all")}
            >
              All
            </FilterButton>
            {messageStatuses.map((status) => (
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

        {visibleMessages.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#d2d2d7] bg-white p-12 text-center">
            <p className="text-lg font-medium text-[#1d1d1f]">
              No messages found
            </p>
            <p className="mt-2 text-[#6e6e73]">
              {messages.length === 0
                ? "Contact form messages will appear here once someone gets in touch."
                : "Try adjusting your search or status filter."}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-[#d2d2d7] bg-white lg:block">
              <table className="min-w-full divide-y divide-[#d2d2d7]">
                <thead className="bg-[#f5f5f7]">
                  <tr>
                    {[
                      "Name",
                      "Email",
                      "Company",
                      "Subject",
                      "Message",
                      "Status",
                      "Received",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6e6e73]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d2d2d7]">
                  {visibleMessages.map((item) => (
                    <tr key={item.id} className="align-top">
                      <td className="px-4 py-4 text-sm font-medium text-[#1d1d1f]">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6e6e73]">
                        <a
                          href={`mailto:${item.email}`}
                          className="rounded-md hover:text-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6e6e73]">
                        {item.company || "—"}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6e6e73]">
                        {item.subject || "—"}
                      </td>
                      <td className="max-w-xs px-4 py-4 text-sm text-[#6e6e73]">
                        {item.message}
                      </td>
                      <td className="px-4 py-4">
                        <StatusSelect
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(status) =>
                            handleStatusChange(item.id, status)
                          }
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6e6e73]">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-4 lg:hidden">
              {visibleMessages.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#d2d2d7] bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#1d1d1f]">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-[#6e6e73]">{item.email}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusColors[item.status]}`}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-[#1d1d1f]">Company</dt>
                      <dd className="text-[#6e6e73]">{item.company || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-[#1d1d1f]">Subject</dt>
                      <dd className="text-[#6e6e73]">{item.subject || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-[#1d1d1f]">Message</dt>
                      <dd className="text-[#6e6e73]">{item.message}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-[#1d1d1f]">Received</dt>
                      <dd className="text-[#6e6e73]">
                        {formatDate(item.createdAt)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4">
                    <label
                      htmlFor={`status-${item.id}`}
                      className="mb-2 block text-sm font-medium text-[#1d1d1f]"
                    >
                      Update status
                    </label>
                    <StatusSelect
                      id={`status-${item.id}`}
                      value={item.status}
                      disabled={updatingId === item.id}
                      onChange={(status) => handleStatusChange(item.id, status)}
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
  icon: typeof Inbox;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[#d2d2d7] bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[#0071e3]/10 p-2.5 text-[#0071e3]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm text-[#6e6e73]">{label}</p>
          <p className="text-2xl font-semibold text-[#1d1d1f]">{value}</p>
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
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 ${
        active
          ? "border-[#1d1d1f] bg-[#1d1d1f] text-white"
          : "border-[#d2d2d7] bg-white text-[#1d1d1f] hover:border-[#1d1d1f]"
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
  value: MessageStatus;
  onChange: (status: MessageStatus) => void;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as MessageStatus)}
      aria-label="Message status"
      className="rounded-xl border border-[#d2d2d7] bg-white px-3 py-2 text-sm text-[#1d1d1f] focus-visible:border-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] disabled:opacity-60"
    >
      {messageStatuses.map((status) => (
        <option key={status} value={status}>
          {statusLabels[status]}
        </option>
      ))}
    </select>
  );
}
