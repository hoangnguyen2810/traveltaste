export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#f9f9fc]">
      {/* LEFT VISUAL */}
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

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* BRAND */}
          <div className="mb-10 text-center md:text-left">
            <a href="/" className="text-3xl font-bold text-[#ab3500]">
              TravelTaste
            </a>

            <h2 className="text-2xl font-bold mt-6">Tạo tài khoản mới</h2>
            <p className="text-gray-500 mt-2">
              Hãy điền thông tin bên dưới để bắt đầu.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5">
            <input
              className="w-full px-6 py-4 rounded-full bg-white shadow"
              placeholder="Họ và tên"
            />

            <input
              className="w-full px-6 py-4 rounded-full bg-white shadow"
              placeholder="Email"
              type="email"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full px-6 py-4 rounded-full bg-white shadow"
                placeholder="Mật khẩu"
                type="password"
              />
              <input
                className="w-full px-6 py-4 rounded-full bg-white shadow"
                placeholder="Xác nhận"
                type="password"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" />
              Tôi đồng ý điều khoản
            </label>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff8a5c] text-white font-semibold shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-500/40 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
            >
              Đăng ký ngay
            </button>
          </form>

          {/* SOCIAL */}
          <div className="my-8 text-center text-gray-400">Hoặc</div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] active:scale-95">
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
              <span className="font-medium text-gray-700">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#1877F2] text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:opacity-95 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H17l-.5 3h-2.4v7A10 10 0 0 0 22 12z" />
              </svg>
              <span className="font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center mt-8 text-gray-500">
            Đã có tài khoản?{" "}
            <a className="text-[#ab3500] font-bold" href="/login">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>

      {/* FLOAT BUTTON */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg">
        ?
      </button>
    </main>
  );
}
