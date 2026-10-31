import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Amaravati Solar Solutions | Admin Portal Login" },
      { name: "description", content: "Sign in to manage Services and Projects." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("amaravatisolarsolutions@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      try {
        localStorage.setItem("admin_auth", "true");
        localStorage.setItem("admin_email", email);
      } catch (err) {
        console.warn("Storage error", err);
      }
      setTimeout(() => {
        navigate({ to: "/admin" });
      }, 700);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      {/* Top Navigation */}
      <div className="pt-6 sm:pt-8 px-6 sm:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* Center Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 pb-16">
        <div className="w-full max-w-[440px] rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-xs text-center transition-all">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Amaravati Solar Solutions"
              width={843}
              height={565}
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Admin Portal Badge */}
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-primary">
              ADMIN PORTAL
            </span>
          </div>

          {/* Title and Subtitle */}
          <h1 className="mt-4 text-2xl sm:text-[26px] font-extrabold text-[#082B4C] tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Sign in to manage Services and Projects
          </p>

          {/* Error / Success message */}
          {error && (
            <div className="mt-4 rounded-xl bg-destructive/10 p-2.5 text-xs font-semibold text-destructive">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 rounded-xl bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-700">
              Signed in successfully! Redirecting…
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 text-left space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amaravatisolarsolutions@gmail.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/40 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 focus:border-[#082B4C] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/40 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 focus:border-[#082B4C] transition-all font-mono tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] active:scale-[0.99] text-white py-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-sm disabled:opacity-70 cursor-pointer"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              <span>SIGN IN</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
