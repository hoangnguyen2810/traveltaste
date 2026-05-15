"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRegistered(params.get("registered") === "1");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [googleLoading, setGoogleLoading] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    await signIn("google", {
      callbackUrl: "/",
      redirect: true,
    });
  };

  const handleFacebookLogin = async () => {
    if (fbLoading) return;
    setFbLoading(true);

    await signIn("facebook", {
      callbackUrl: "/",
      redirect: true,
    });
  };

  // ✅ FIX QUAN TRỌNG: reset state khi quay lại tab
  useEffect(() => {
    const resetState = () => {
      setGoogleLoading(false);
      setFbLoading(false);
      router.refresh();
    };

    window.addEventListener("focus", resetState);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        resetState();
      }
    });

    return () => {
      window.removeEventListener("focus", resetState);
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Email hoặc mật khẩu không đúng.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex items-center justify-center font-[Plus_Jakarta_Sans]">
      <main className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* LEFT SIDE (GIỮ NGUYÊN) */}
        <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative items-end p-16 bg-[#ab3500]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwPzm8zlmbvOucwm_tbD9dMOYlB7f72Nope7xkX9ZQ-BjuJIfnCBQAGXicb-zWOko22k_TtuxPHyEc__yKheFcxaalzlDfZ72iQlpIk-Y7lJnS4d8cqwBzIaheb4RTTiDdkDkFT_TSMKJmybBrYDq5CyaaMAq13iKOecDs1_YAuJwvHCkPMiCMr2FKW_ibF8DNt9YrEe5pCKb8js6rqoi-zjeZDeWBAs2Xhf-6V5Dkd-EbKDfyyR5Mvrvywytd6ZAelkqmozk5oiA"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            alt="cover"
          />
        </section>

        {/* RIGHT SIDE (GIỮ NGUYÊN UI) */}
        <section className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center p-10">
          <div className="w-full max-w-[400px]">
            {/* TITLE */}
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-[32px] font-bold mb-2">Welcome Back</h2>
              <p className="text-[#594139] text-[16px]">
                Please enter your details to continue your journey.
              </p>
              {registered ? (
                <p className="mt-3 text-sm text-green-700">
                  Đăng ký thành công. Vui lòng đăng nhập.
                </p>
              ) : null}
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[14px] text-[#594139] block ml-1 mb-2">
                  Email or Username
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d7168]">
                    @
                  </span>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-[#eeeef0] rounded-full text-[#1a1c1e] focus:ring-2 focus:ring-[#00696d] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between px-1 mb-2">
                  <label className="text-[14px] text-[#594139]">Password</label>
                  <a className="text-[14px] text-[#ab3500] hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d7168]">
                    🔒
                  </span>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-[#eeeef0] rounded-full focus:ring-2 focus:ring-[#00696d] outline-none"
                  />
                </div>
              </div>

              {error ? (
                <p className="text-sm text-red-600 px-2" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#ffdbd0] text-[#5f1900] font-semibold shadow-[0px_10px_30px_rgba(171,53,0,0.2)] hover:scale-[1.02] active:scale-95 transition disabled:opacity-60"
              >
                {submitting ? "Đang đăng nhập..." : "Login"}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-[1px] flex-grow bg-[#e1bfb5]" />
              <span className="text-[12px] text-[#8d7168]">
                OR CONTINUE WITH
              </span>
              <div className="h-[1px] flex-grow bg-[#e1bfb5]" />
            </div>

            {/* SOCIAL */}
            {/* SOCIAL */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C36.64 2.34 30.82 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.1 24.5c0-1.6-.14-3.13-.4-4.5H24v9h12.7c-.58 3.02-2.26 5.6-4.8 7.3l7.4 5.75C43.9 37.3 46.1 31.4 46.1 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.54 28.41A14.5 14.5 0 0 1 9.5 24c0-1.52.26-2.99.71-4.41l-7.98-6.19A24 24 0 0 0 0 24c0 3.84.92 7.47 2.56 10.6l7.98-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 12-2.14 16-5.84l-7.4-5.75c-2.06 1.38-4.7 2.2-8.6 2.2-6.26 0-11.57-4.22-13.46-9.99l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>

                <span className="font-medium text-gray-700">
                  {googleLoading ? "Redirecting..." : "Google"}
                </span>
              </button>

              {/* FACEBOOK */}
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={fbLoading}
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#1877F2] text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:opacity-95 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H17l-.5 3h-2.4v7A10 10 0 0 0 22 12z" />
                </svg>

                <span className="font-medium">
                  {fbLoading ? "Redirecting..." : "Facebook"}
                </span>
              </button>
            </div>

            {/* FOOTER */}
            <div className="text-center">
              <p className="text-[16px] text-[#594139]">
                New to TravelTaste?
                <Link
                  href="/signup"
                  className="ml-1 text-[#24619d] font-semibold hover:no-underline"
                >
                  Sign Up Now
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
