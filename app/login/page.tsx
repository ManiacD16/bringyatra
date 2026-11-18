import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import { LoginForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "Login", description: "Login to your BringYatra account." };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Login to view your trips, wishlist and member offers." image="coupleMountain">
      <LoginForm />
    </AuthShell>
  );
}
