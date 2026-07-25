import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { DashboardLoginForm } from "@/components/dashboard/DashboardLoginForm";

export default async function LoginPage() {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect("/dashboard");
  }

  return <DashboardLoginForm />;
}
