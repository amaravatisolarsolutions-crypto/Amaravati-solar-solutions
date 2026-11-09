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
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef, type FormEvent } from "react";
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
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
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
        setOtpDigits(["", "", "", "", "", ""]);
        setResendCooldown(60);
        setSuccessMsg("Security verification code sent to " + (data.email || "amaravatisolarsolutions@gmail.com"));
        // Focus first OTP input after step switch
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
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

  // Handle individual OTP digit change
  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, "");
    const updated = [...otpDigits];

    if (!clean) {
      updated[index] = "";
      setOtpDigits(updated);
      return;
    }

    if (clean.length > 1) {
      const chars = clean.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        updated[i] = chars[i] || "";
      }
      setOtpDigits(updated);
      const nextIndex = Math.min(chars.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    updated[index] = clean;
    setOtpDigits(updated);
    setError("");

    if (index < 5 && clean) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Key Down in OTP boxes (Backspace & Arrow keys)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Paste into OTP inputs
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const updated = [...otpDigits];
    const chars = pasted.split("");
    for (let i = 0; i < 6; i++) {
      updated[i] = chars[i] || "";
    }
    setOtpDigits(updated);
    setError("");
    const nextIndex = Math.min(chars.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle Step 2: OTP Verification Submit
  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const fullOtp = otpDigits.join("").trim();

    if (fullOtp.length < 6) {
      setError("Please enter all 6 digits of the OTP verification code.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: sentToEmail,
          otp: fullOtp,
        }),
      });

      const data = await res.json().catch(() => ({ success: false, error: "Network response error" }));

      if ((res.ok || data.success) && data.success) {
        setSuccessMsg("OTP verified successfully! Redirecting to Admin Dashboard...");
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
        setError(data.error || "Invalid or expired verification code. Please check your email or click Resend.");
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
        setOtpDigits(["", "", "", "", "", ""]);
        setSuccessMsg("A fresh 6-digit verification code has been sent to " + sentToEmail);
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
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
    <div className="min-h-screen bg-[#051829] relative flex flex-col justify-between overflow-hidden selection:bg-[#F59E0B]/30 selection:text-white">
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
              {step === "credentials" ? "ADMIN SECURE ACCESS" : "2-FACTOR VERIFICATION"}
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="mt-3.5 text-2xl sm:text-[28px] font-black text-[#082B4C] tracking-tight">
            {step === "credentials" ? "Welcome Back" : "Security Verification"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[380px] mx-auto">
            {step === "credentials"
              ? "Sign in to manage Services, Projects, and Customer Inquiries"
              : "Enter the 6-digit security verification code sent to your email"}
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

          {/* ======================================================== */}
          {/* STEP 1: CREDENTIALS FORM                                 */}
          {/* ======================================================== */}
          {step === "credentials" && (
            <form onSubmit={handleCredentialsSubmit} className="mt-6 text-left space-y-4">
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
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="amaravatisolarsolutions@gmail.com"
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
                    autoComplete="current-password"
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
                      <span>SIGN IN & GET OTP</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-600" />
                  <span>Protected by Two-Factor Authentication via email</span>
                </p>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 2: PREMIUM 6-DIGIT OTP VERIFICATION FORM             */}
          {/* ======================================================== */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="mt-6 text-left space-y-5">
              {/* Email Destination Pill - High Contrast */}
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-3 sm:p-3.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      SENT TO AUTHORIZED EMAIL
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {sentToEmail}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-[#082B4C] font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-2xs cursor-pointer active:scale-95"
                >
                  Change
                </button>
              </div>

              {/* 6 Individual Digit Boxes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                    ENTER 6-DIGIT CODE <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Valid for 10 mins
                  </span>
                </div>

                <div className="flex justify-between gap-1.5 sm:gap-2.5" onPaste={handlePaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="size-11 sm:size-14 rounded-2xl border-2 border-slate-300 bg-slate-50/70 text-center font-mono text-xl sm:text-2xl font-black text-[#082B4C] focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-amber-500/20 focus:outline-none transition-all shadow-2xs"
                      autoFocus={idx === 0}
                      required
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-600 mt-2.5 flex items-center gap-1.5 font-medium leading-relaxed">
                  <span className="text-slate-400">ℹ️</span>
                  <span>Check your Inbox & Spam/Junk folder. Only the latest code is valid.</span>
                </p>
              </div>

              {/* Main Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading || otpDigits.join("").length < 6}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#082B4C] hover:bg-[#062038] active:scale-[0.99] text-white py-3.5 text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-amber-400" />
                      <span>VERIFYING CODE...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="size-4 text-amber-400 fill-amber-400" />
                      <span>VERIFY & ACCESS ADMIN</span>
                    </>
                  )}
                </button>
              </div>

              {/* Resend OTP and Back to Sign In Controls - High Contrast */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  disabled={resendCooldown > 0 || isResending}
                  onClick={handleResendOtp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 disabled:opacity-50 transition-all cursor-pointer shadow-2xs"
                >
                  <RotateCcw className={`size-3.5 text-amber-600 ${isResending ? "animate-spin" : ""}`} />
                  <span>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP Code"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-[#082B4C] transition-colors underline underline-offset-4 cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 pb-6 text-center text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Amaravati Solar Solutions &bull; Authorized Administrative Access Only</p>
      </footer>
    </div>
  );
}
