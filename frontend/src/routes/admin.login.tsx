import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  ShieldCheck,
  KeyRound,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  User,
} from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Amaravati Solar Solutions | Admin Portal Login" },
      { name: "description", content: "Sign in to manage Services, Projects, and Inquiries." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();

  // Authentication Steps: 'credentials' | 'otp'
  const [step, setStep] = useState<"credentials" | "otp">("credentials");

  // Step 1: Credentials
  const [identifier, setIdentifier] = useState("amaravatisolarsolutions@gmail.com");
  const [password, setPassword] = useState("Amaravthi@123");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: OTP Verification
  const [otp, setOtp] = useState("");
  const [sentToEmail, setSentToEmail] = useState("amaravatisolarsolutions@gmail.com");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Loading & Feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Handle Step 1: Credentials Submit
  const handleCredentialsSubmit = async (e: FormEvent) => {
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

      const data = await res.json().catch(() => ({ success: false, error: "Network response error" }));

      if ((res.ok || data.success) && data.requireOtp) {
        setSentToEmail(data.email || "amaravatisolarsolutions@gmail.com");
        setStep("otp");
        setOtp("");
        setResendCooldown(60);
        setSuccessMsg("Security verification code sent to " + (data.email || "amaravatisolarsolutions@gmail.com"));
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

  // Handle Step 2: OTP Verification Submit
  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const cleanOtp = otp.replace(/\D/g, "").trim();

    if (cleanOtp.length < 4) {
      setError("Please enter the complete 6-digit OTP received in your email.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sentToEmail,
          otp: cleanOtp,
        }),
      });

      const data = await res.json().catch(() => ({ success: false, error: "Network response error" }));

      if ((res.ok || data.success) && data.success) {
        setSuccessMsg("OTP verified successfully! Access granted.");
        try {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_email", data.admin?.email || sentToEmail);
          localStorage.setItem("admin_username", data.admin?.username || "u236567282_Amaravthisolar");
          if (data.token) {
            localStorage.setItem("admin_token", data.token);
          }
        } catch (err) {
          console.warn("Storage warning:", err);
        }

        setTimeout(() => {
          navigate({ to: "/admin" });
        }, 800);
      } else {
        setError(data.error || "Invalid or expired verification code. Please check your email or request a new code.");
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);
      setError("Failed to verify OTP code. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: sentToEmail }),
      });

      const data = await res.json().catch(() => ({ success: false, error: "Resend failed" }));

      if ((res.ok || data.success) && data.success) {
        setResendCooldown(60);
        setSuccessMsg("A new 6-digit verification code has been sent to " + sentToEmail);
      } else {
        setError(data.error || "Failed to resend verification code. Please try again.");
      }
    } catch (err) {
      setError("Network error while resending verification code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col selection:bg-[#F59E0B]/20">
      {/* Top Navigation */}
      <div className="pt-6 sm:pt-8 px-6 sm:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* Center Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 pb-16">
        <div className="w-full max-w-[460px] rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-lg text-center transition-all">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Amaravati Solar Solutions"
              width={1016}
              height={307}
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>

          {/* Admin Portal Badge */}
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-[#D97706]">
              <ShieldCheck className="size-3.5" />
              {step === "credentials" ? "ADMIN PORTAL" : "2-STEP VERIFICATION"}
            </span>
          </div>

          {/* Title and Subtitle */}
          <h1 className="mt-4 text-2xl sm:text-[26px] font-extrabold text-[#082B4C] tracking-tight">
            {step === "credentials" ? "Welcome Back" : "Security Verification"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {step === "credentials"
              ? "Sign in to manage Services, Projects, and Inquiries"
              : "Enter the 6-digit code sent to your authorized email"}
          </p>

          {/* Error Message Box */}
          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-700 flex items-start gap-2 text-left">
              <AlertCircle className="size-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* Success Message Box */}
          {successMsg && (
            <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-start gap-2 text-left">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <div className="flex-1">{successMsg}</div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 1: CREDENTIALS FORM                                 */}
          {/* ======================================================== */}
          {step === "credentials" && (
            <form onSubmit={handleCredentialsSubmit} className="mt-6 text-left space-y-4">
              <div>
                <label
                  htmlFor="admin-identifier"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                >
                  EMAIL ADDRESS OR USERNAME
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                  <input
                    id="admin-identifier"
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="amaravatisolarsolutions@gmail.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 focus:border-[#082B4C] transition-all font-medium"
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 focus:border-[#082B4C] transition-all font-mono"
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

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] active:scale-[0.99] text-white py-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>AUTHENTICATING...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" />
                      <span>SIGN IN & GET OTP</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-400">
                  Protected by 2-Factor Authentication via authorized email.
                </p>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 2: OTP VERIFICATION FORM                             */}
          {/* ======================================================== */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="mt-6 text-left space-y-4">
              {/* Email Destination Pill */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/90 p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700 min-w-0">
                  <Mail className="size-4 text-amber-600 shrink-0" />
                  <span className="truncate font-semibold">{sentToEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="text-primary hover:text-primary/80 font-bold text-[11px] shrink-0 uppercase underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div>
                <label
                  htmlFor="admin-otp"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 text-center"
                >
                  ENTER 6-DIGIT OTP CODE
                </label>
                <div className="relative">
                  <input
                    id="admin-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    autoFocus
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setOtp(val);
                      if (val.length === 6) {
                        setError("");
                      }
                    }}
                    placeholder="------"
                    className="w-full text-center tracking-[0.55em] text-2xl font-mono font-extrabold rounded-xl border-2 border-slate-300 bg-white py-3 text-[#082B4C] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 focus:border-[#082B4C] transition-all"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 text-center">
                  Check your inbox and spam folder for the code. Code expires in 10 minutes.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || otp.replace(/\D/g, "").length < 6}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] active:scale-[0.99] text-white py-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>VERIFYING CODE...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="size-4" />
                      <span>VERIFY & ACCESS ADMIN</span>
                    </>
                  )}
                </button>
              </div>

              {/* Resend OTP and Back Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <button
                  type="button"
                  disabled={resendCooldown > 0 || isResending}
                  onClick={handleResendOtp}
                  className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-900 disabled:opacity-50 cursor-pointer"
                >
                  <RotateCcw className={`size-3.5 ${isResending ? "animate-spin" : ""}`} />
                  {resendCooldown > 0 ? (
                    <span>Resend code in {resendCooldown}s</span>
                  ) : (
                    <span>Resend OTP Code</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
