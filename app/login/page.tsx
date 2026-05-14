"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [googleLoading, setGoogleLoading] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);

  const loading = status === "loading";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email, password });
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
                    type="text"
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

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#ffdbd0] text-[#5f1900] font-semibold shadow-[0px_10px_30px_rgba(171,53,0,0.2)] hover:scale-[1.02] active:scale-95 transition"
              >
                Login
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
            <div className="grid grid-cols-2 gap-4 mb-10">
              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full mt-6 py-3 border rounded-full"
              >
                {googleLoading ? "Redirecting..." : "Google"}
              </button>

              {/* FACEBOOK */}
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={fbLoading}
                className="w-full mt-6 py-3 border rounded-full"
              >
                {fbLoading ? "Redirecting..." : "Facebook"}
              </button>
            </div>

            {/* FOOTER */}
            <div className="text-center">
              <p className="text-[16px] text-[#594139]">
                New to TravelTaste?
                <a className="ml-1 text-[#24619d] font-semibold hover:underline">
                  Sign Up Now
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
