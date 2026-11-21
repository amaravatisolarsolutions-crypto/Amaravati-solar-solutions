import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  User,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Amaravati Solar Solutions | Admin Portal Login" },
      { name: "description", content: "Sign in with password to manage Services, Projects, and Inquiries." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();

  // Credentials (Empty by default)
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Loading & Feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle Credentials Submit (Direct Login with Password)
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();

    if (!cleanIdentifier || !cleanPassword) {
      setError("Please enter your email/username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: cleanIdentifier,
          password: cleanPassword,
        }),
      });

      const data = await res.json().catch(() => ({
        success: false,
        error: "Network response error. Please try again.",
      }));

      if ((res.ok || data.success) && data.success) {
        setSuccessMsg(data.message || "Login successful! Redirecting to Admin Dashboard...");
        try {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_email", data.admin?.email || cleanIdentifier || "amaravatisolarsolutions@gmail.com");
          localStorage.setItem("admin_username", data.admin?.username || "u236567282_Amaravthisolar");
          if (data.token) {
            localStorage.setItem("admin_token", data.token);
          }
        } catch (err) {
          console.warn("Storage warning:", err);
        }

        setTimeout(() => {
          navigate({ to: "/admin" });
        }, 600);
      } else {
        setError(data.error || "Invalid username/email or password. Access denied.");
      }
    } catch (err: any) {
      console.error("Login request failed:", err);
      setError("Unable to connect to login server. Please verify your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="admin-portal min-h-screen bg-[#051829] relative flex flex-col justify-between overflow-hidden selection:bg-[#F59E0B]/30 selection:text-white"
      data-admin="true"
    >
      {/* Ambient Lighting & Solar Gradients */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-br from-[#F5A623]/20 via-[#B83A16]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-tl from-[#087FC1]/20 via-[#082B4C]/40 to-transparent blur-3xl pointer-events-none" />

      {/* Tech Grid Background Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-10 pt-6 sm:pt-8 px-6 sm:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-bold text-white transition-all backdrop-blur-md active:scale-95 shadow-sm"
        >
          <ArrowLeft className="size-4 text-amber-400" />
          <span>Back to Website</span>
        </Link>

        <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-slate-300">
          <ShieldCheck className="size-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted Admin Portal</span>
        </div>
      </header>

      {/* Centerpiece Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 py-10">
        <div className="w-full max-w-[490px] rounded-3xl border border-white/20 bg-white shadow-2xl p-7 sm:p-10 text-center relative overflow-hidden backdrop-blur-2xl">
          {/* Top 3-Tone Solar Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#082B4C] via-[#F5A623] to-[#087FC1]" />

          {/* Logo Showcase */}
          <div className="flex justify-center pt-1">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs">
              <img
                src={logo}
                alt="Amaravati Solar Solutions"
                width={1016}
                height={307}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-amber-900 shadow-2xs">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
              ADMIN SECURE ACCESS
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="mt-3.5 text-2xl sm:text-[28px] font-black text-[#082B4C] tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[380px] mx-auto">
            Sign in with your admin credentials to manage Services, Projects, and Inquiries
          </p>

          {/* High Contrast Error Banner */}
          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 border-2 border-red-200 p-3.5 text-xs font-bold text-red-900 flex items-start gap-2.5 text-left shadow-2xs animate-in fade-in duration-200">
              <AlertCircle className="size-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1 leading-snug">{error}</div>
            </div>
          )}

          {/* High Contrast Success Banner */}
          {successMsg && (
            <div className="mt-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-3.5 text-xs font-bold text-emerald-950 flex items-start gap-2.5 text-left shadow-2xs animate-in fade-in duration-200">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <div className="flex-1 leading-snug">{successMsg}</div>
            </div>
          )}

          {/* DIRECT ADMIN CREDENTIALS FORM */}
          <form onSubmit={handleLoginSubmit} autoComplete="off" className="mt-6 text-left space-y-4">
            <div>
              <label
                htmlFor="admin-identifier"
                className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5"
              >
                EMAIL ADDRESS OR USERNAME <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-identifier"
                  type="text"
                  autoComplete="off"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email address or username"
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#082B4C] focus:ring-4 focus:ring-[#082B4C]/10 transition-all font-semibold"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5"
              >
                PASSWORD <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 pl-10 pr-10 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#082B4C] focus:ring-4 focus:ring-[#082B4C]/10 transition-all font-mono font-bold"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#082B4C] hover:bg-[#062038] active:scale-[0.99] text-white py-3.5 text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-amber-400" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-4 text-amber-400" />
                    <span>SIGN IN TO ADMIN</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>Protected by 256-Bit SSL Encryption</span>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 pb-6 text-center text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Amaravati Solar Solutions &bull; Authorized Administrative Access Only</p>
      </footer>
    </div>
  );
}
