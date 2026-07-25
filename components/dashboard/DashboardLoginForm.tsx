"use client";

import { useActionState } from "react";
import { business } from "@/config/business";
import { Button } from "@/components/ui/Button";
import { loginFormAction } from "@/app/dashboard/actions";
import { Lock, AlertCircle } from "lucide-react";

export function DashboardLoginForm() {
  const [state, formAction, isPending] = useActionState(loginFormAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Dashboard Login
          </h1>
          <p className="mt-2 text-slate-600">{business.name}</p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          {state?.error && (
            <div
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>{state.error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
