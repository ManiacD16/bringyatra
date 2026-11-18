import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import { SignupForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "Sign Up", description: "Create your free BringYatra account." };

export default function SignupPage() {
  return (
    <AuthShell title="Create your account" subtitle="Join free and unlock member-only travel deals." image="konarkWheel">
      <SignupForm />
    </AuthShell>
  );
}
