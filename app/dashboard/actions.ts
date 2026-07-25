"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  verifyDashboardPassword,
} from "@/lib/auth";

export async function loginFormAction(
  _prevState: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Please enter your password." };
  }

  try {
    if (!verifyDashboardPassword(password)) {
      return { error: "Incorrect password. Please try again." };
    }

    await createSession();
  } catch {
    return {
      error:
        "Dashboard login is not configured yet. Please check your environment variables.",
    };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/dashboard/login");
}
