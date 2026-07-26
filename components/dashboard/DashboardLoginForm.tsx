"use client";

import { useActionState } from "react";
import { Lock, CircleAlert } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import { Button } from "@/components/ui/Button";
import { loginFormAction } from "@/app/dashboard/actions";

export function DashboardLoginForm() {
  const [state, formAction, isPending] = useActionState(loginFormAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#d2d2d7] bg-white p-8">
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-full bg-[#0071e3]/10 p-3 text-[#0071e3]">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#1d1d1f]">
            Dashboard login
          </h1>
          <p className="mt-2 text-sm text-[#6e6e73]">
            {portfolioConfig.personal.name} · Contact form inbox
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          {state?.error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              <CircleAlert
                className="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              <p>{state.error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1d1d1f]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 block w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] focus-visible:border-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
