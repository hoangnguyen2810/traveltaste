"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError("");

    if (!agreed) {
      setError("Bạn cần đồng ý điều khoản đềEtiếp tục.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Không thềEđăng ký. Vui lòng thử lại.");
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setError("Không thềEkết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#f9f9fc]">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#ab3500]">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF7IEr3S9zcQahRI1exHImGXNXWpYMzm1r5O8QCcJDfKVo1fv-ZWBXW99w1FP1PDoMbJJnpK8HRqG4OnFuJAUwnrad9v1likH-cIZ7ksslnNxUiLrsoi4taMY5NdmC2IphwB1rlXVmGkNuSJAKHv6nnRL9b6Fnp1VoGs8AjL7vWiLzFBYCgNZiETV_0qCHUL4dWWFtL6dksGcUr4gms5WXzDQXGlEg5oR6f-3OODyYG3AiXDq9jsXAsXdHcPgPUfMFQQ6NpDDFMqc"
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay"
          alt="travel"
        />

        <div className="relative z-10 flex flex-col justify-end p-16 text-white">
          <span className="bg-white/20 px-4 py-1 rounded-full text-sm w-fit mb-6">
            Khám phá thế giới
          </span>

          <h1 className="text-4xl font-bold mb-4">
            Hành trình mỹ vị bắt đầu từ đây.
          </h1>

          <p className="text-white/90">
            Tham gia TravelTaste để khám phá ẩm thực và du lịch.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <Link href="/" className="text-3xl font-bold text-[#ab3500]">
              TravelTaste
            </Link>

            <h2 className="text-2xl font-bold mt-6">Tạo tài khoản mới</h2>
            <p className="text-gray-500 mt-2">
              Hãy điền thông tin bên dưới đềEbắt đầu.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              className="w-full px-6 py-4 rounded-full bg-white shadow"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="w-full px-6 py-4 rounded-full bg-white shadow"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full px-6 py-4 rounded-full bg-white shadow"
                placeholder="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <input
                className="w-full px-6 py-4 rounded-full bg-white shadow"
                placeholder="Xác nhận"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              Tôi đồng ý điều khoản
            </label>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff8a5c] text-white font-semibold shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-500/40 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-60"
            >
              {submitting ? "Đang đăng ký..." : "Đăng ký ngay"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Đã có tài khoản?{" "}
            <Link className="text-[#ab3500] font-bold" href="/login">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>

      <button
        type="button"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg"
        aria-label="Trợ giúp"
      >
        ?
      </button>
    </main>
  );
}
