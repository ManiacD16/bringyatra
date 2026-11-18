import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import { ForgotForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "Forgot Password", description: "Reset your BringYatra account password." };

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Forgot password?" subtitle="Enter your registered email and we'll send you a reset link." image="keralaHouseboat">
      <ForgotForm />
    </AuthShell>
  );
}
