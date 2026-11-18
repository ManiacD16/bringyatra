"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { useAuth } from "./Auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const fakeDelay = () => new Promise((r) => setTimeout(r, 700));

function Input({
  icon,
  error,
  right,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: ReactNode; error?: string; right?: ReactNode }) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <input
          {...props}
          aria-invalid={!!error}
          className={`field pl-11 ${right ? "pr-11" : ""} ${error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : ""}`}
        />
        {right && <span className="absolute right-2 top-1/2 -translate-y-1/2">{right}</span>}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

function PasswordInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      icon={<Lock size={18} />}
      error={error}
      right={
        <button type="button" onClick={() => setShow((v) => !v)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label={show ? "Hide password" : "Show password"}>
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      }
    />
  );
}

function Submit({ busy, children }: { busy: boolean; children: ReactNode }) {
  return (
    <button disabled={busy} className="btn-primary w-full py-3.5 text-base disabled:cursor-wait disabled:opacity-80">
      {busy && <Loader2 size={18} className="animate-spin" />} {children}
    </button>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!EMAIL_RE.test(email)) errs.email = "Enter a valid email address";
    if (password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    await fakeDelay();
    login(email.trim());
    router.push("/account");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Input icon={<Mail size={18} />} type="email" placeholder="Email address" aria-label="Email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <PasswordInput placeholder="Password" aria-label="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-slate-600">
          <input type="checkbox" className="h-4 w-4 accent-navy-600" defaultChecked /> Remember me
        </label>
        <Link href="/forgot-password" className="font-medium text-navy-600 hover:text-saffron-500">Forgot password?</Link>
      </div>
      <Submit busy={busy}>Login</Submit>
      <p className="text-center text-sm text-slate-600">
        New to BringYatra?{" "}
        <Link href="/signup" className="font-semibold text-saffron-600 hover:text-saffron-700">Create an account</Link>
      </p>
    </form>
  );
}

export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", confirm: "", terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((v) => ({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (f.name.trim().length < 2) errs.name = "Enter your full name";
    if (!EMAIL_RE.test(f.email)) errs.email = "Enter a valid email address";
    if (!/^(91)?[6-9]\d{9}$/.test(f.phone.replace(/\D/g, ""))) errs.phone = "Enter a valid 10-digit mobile number";
    if (f.password.length < 8) errs.password = "Use at least 8 characters";
    if (f.confirm !== f.password) errs.confirm = "Passwords don't match";
    if (!f.terms) errs.terms = "Please accept the Terms & Privacy Policy";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    await fakeDelay();
    signup({ name: f.name, email: f.email, phone: f.phone });
    router.push("/account?welcome=1");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Input icon={<User size={18} />} placeholder="Full name" aria-label="Full name" autoComplete="name" value={f.name} onChange={set("name")} error={errors.name} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input icon={<Mail size={18} />} type="email" placeholder="Email address" aria-label="Email address" autoComplete="email" value={f.email} onChange={set("email")} error={errors.email} />
        <Input icon={<Phone size={18} />} type="tel" placeholder="Mobile number" aria-label="Mobile number" autoComplete="tel" inputMode="numeric" value={f.phone} onChange={set("phone")} error={errors.phone} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordInput placeholder="Password (8+ characters)" aria-label="Password" autoComplete="new-password" value={f.password} onChange={set("password")} error={errors.password} />
        <PasswordInput placeholder="Confirm password" aria-label="Confirm password" autoComplete="new-password" value={f.confirm} onChange={set("confirm")} error={errors.confirm} />
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">
          <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-navy-600" checked={f.terms} onChange={set("terms")} />
          <span>
            I agree to the <Link href="/legal/terms-and-conditions" className="font-medium text-navy-600 underline-offset-2 hover:underline">Terms &amp; Conditions</Link> and{" "}
            <Link href="/legal/privacy-policy" className="font-medium text-navy-600 underline-offset-2 hover:underline">Privacy Policy</Link>
          </span>
        </label>
        {errors.terms && <p className="mt-1.5 text-xs text-rose-600">{errors.terms}</p>}
      </div>
      <Submit busy={busy}>Create Account</Submit>
      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-saffron-600 hover:text-saffron-700">Login</Link>
      </p>
    </form>
  );
}

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <CheckCircle2 size={52} className="text-emerald-500" />
        <h2 className="mt-4 text-xl font-semibold text-ink">Check your inbox</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-600">
          If an account exists for <span className="font-medium text-ink">{email}</span>, a reset link would be sent. 
          {/* (Demo mode: no email is actually sent.) */}
        </p>
        <Link href="/login" className="btn-navy mt-6">Back to Login</Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email)) return setError("Enter a valid email address");
        setError("");
        setBusy(true);
        await fakeDelay();
        setSent(true);
      }}
    >
      <Input icon={<Mail size={18} />} type="email" placeholder="Email address" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
      <Submit busy={busy}>Send Reset Link</Submit>
      <p className="text-center text-sm text-slate-600">
        Remembered it? <Link href="/login" className="font-semibold text-saffron-600">Back to Login</Link>
      </p>
    </form>
  );
}
