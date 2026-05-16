"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import SiteShell from "@/components/SiteShell";

const AVATAR_PLACEHOLDER =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBea_otGWmJnJeF8tRLJyiz06J1OqVZUYRHYerrFbclTcXGbhuRuWEDlo9rHvgBAhoTS0ZHSUMpK_3gud3np3pI42q7v59gIkHE9lLgB3s2RrarHTg8wimZI8XgXxFCQgvAZVXybbT4v6dpwDEK7b3BfdAJ2LW5RaHN9Clq-zaC7hofk5Z6I3lBwvTRstuUS-4veYQCLANOuLSIYuzAoqDXpjzOKLeuBAjPWeaehpz1AkAq9CHq3ptMGa3ZnjANcbnYM85du9pFEMI";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"saved" | "history" | "reviews">(
    "saved",
  );
  const [location, setLocation] = useState("Hà Nội, Việt Nam");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile?.location) {
          setLocation(data.profile.location);
        }
        setAvatarUrl(data.profile?.avatar_url ?? null);
      })
      .catch(() => {});
  }, [status, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-zinc-900">
        <p className="text-zinc-600">Đang tải...</p>
      </div>
    );
  }

  if (status !== "authenticated" || !session?.user) {
    return null;
  }

  const displayName =
    session.user.name?.trim() || session.user.email?.split("@")[0] || "Bạn";

  const avatarSrc =
    avatarUrl ?? session.user.image ?? AVATAR_PLACEHOLDER;

  return (
    <SiteShell>
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-16 space-y-16 pb-40">
        <section className="flex flex-col md:flex-row items-center md:items-end gap-gutter bg-surface-container-lowest p-gutter rounded-lg shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.08)]">
          <div className="relative group shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={avatarSrc}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg bg-surface-container"
            />
            <Link
              href="/profile/edit"
              className="absolute bottom-1 right-1 bg-primary text-on-primary p-2 rounded-full shadow-md hover:scale-105 transition-transform"
              aria-label="Chỉnh sửa ảnh đại diện"
            >
              <span className="material-symbols-outlined text-[18px]">
                edit
              </span>
            </Link>
          </div>
          <div className="flex-1 text-center md:text-left space-y-2 pb-2">
            <h1 className="font-bold text-headline-lg text-on-surface">
              {displayName}
            </h1>
            <p className="text-body-md text-on-surface-variant flex items-center justify-center md:justify-start gap-1">
              <span className="material-symbols-outlined text-primary text-[18px]">
                location_on
              </span>
              {location || "Chưa cập nhật địa điểm"}
            </p>
            <div className="flex gap-4 pt-2 justify-center md:justify-start">
              <div className="text-center md:text-left">
                <span className="block font-semibold text-headline-md text-primary">
                  24
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Saved
                </span>
              </div>
              <div className="h-10 w-px bg-outline-variant/30 self-center" />
              <div className="text-center md:text-left">
                <span className="block font-semibold text-headline-md text-secondary">
                  12
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Reviews
                </span>
              </div>
              <div className="h-10 w-px bg-outline-variant/30 self-center" />
              <div className="text-center md:text-left">
                <span className="block font-semibold text-headline-md text-tertiary">
                  08
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  Trips
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-gutter md:pb-2">
            <Link
              href="/profile/edit"
              className="inline-flex items-center justify-center px-8 py-3 bg-orange-700 text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              Chỉnh sửa hồ sơ
            </Link>
          </div>
        </section>

        <section>
          <div className="flex flex-wrap border-b border-zinc-200/80 overflow-x-auto mb-10 gap-x-4 md:gap-x-12 gap-y-2 -mx-1 px-1">
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-6 md:px-10 py-4 font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-colors min-w-[max-content] ${
                activeTab === "saved"
                  ? "border-orange-700 text-orange-700"
                  : "border-transparent text-zinc-600 hover:text-orange-700"
              }`}
            >
              Địa điểm ưa thích
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-6 md:px-10 py-4 font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-colors min-w-[max-content] ${
                activeTab === "history"
                  ? "border-orange-700 text-orange-700"
                  : "border-transparent text-zinc-600 hover:text-orange-700"
              }`}
            >
              Lịch sử đã xem
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`px-6 md:px-10 py-4 font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-colors min-w-[max-content] ${
                activeTab === "reviews"
                  ? "border-orange-700 text-orange-700"
                  : "border-transparent text-zinc-600 hover:text-orange-700"
              }`}
            >
              Đánh giá của tôi
            </button>
          </div>

          {activeTab === "saved" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <div className="md:col-span-8 group cursor-pointer">
                  <div className="bg-white rounded-lg overflow-hidden shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.08)] h-full">
                    <div className="relative h-[400px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Bq5K3U8qGjPtO-nPiinGp_s4tF-hTRDsQnKjPFLR3ccQxJiKYOoCzEvxzBw4IEQWTA7NtZZR88njUgxvOKKEMFlGwcReJUM-QrEqLFt2LyO-qyf9lwAy0jJY0v2N7Ea-VfowJi_PvPge8Pjt-h2mvZBRjHDNNwKlCkkAENNHblnF-M0IWe0Pn5RD4HAddsGKuf4fmkPcnw4dGISMYbeKgFVPzqgTagNWjMym_sHNCtYcp1If1HPtfMD3E9cSgdsic0NAoEmpQZ4"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur text-primary p-2 rounded-full shadow-md">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            favorite
                          </span>
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-gutter bg-gradient-to-t from-black/60 to-transparent text-white">
                        <span className="bg-tertiary-container/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white mb-2 inline-block">
                          Must-Visit
                        </span>
                        <h3 className="font-bold text-headline-lg">
                          Vịnh Hạ Long, Quảng Ninh
                        </h3>
                        <p className="text-body-md opacity-90">
                          Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi
                          kỳ vĩ.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-gutter">
                  <div className="bg-white rounded-lg overflow-hidden shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.08)] group cursor-pointer">
                    <div className="h-48 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7fW6S_Ft7dMP0B5Sybl43Z-7IQGTuQSq7pVPy-8yWzgxEtZrbupQgXoyDDBzXS2y1CywbKc7xPSWEZGWsaNhKqkM_jtEqtLGNTMlBcEItJQ4RZX_V6AkzD6ookyAXq5zGeafFuuDEpvCVEARMNCiTrhn-Mj2uiHC7AiQHp3uKRK2l91OsziFpVTjWDyJgqHwdKdXV8ZwrdGRzd2zh6dDf8562R0ejJ8MBYfoOatp5X28u7Z4lf6d7mo0SlmvDoXx9G1ZRNER8N0g"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-headline-md">
                          Phố cổ Hội An
                        </h4>
                        <span
                          className="material-symbols-outlined text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          favorite
                        </span>
                      </div>
                      <p className="text-body-md text-on-surface-variant line-clamp-2">
                        Di sản văn hóa với nét cổ kính, rực rỡ sắc đèn lồng.
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-tertiary material-symbols-outlined text-[18px]">
                          restaurant
                        </span>
                        <span className="text-xs font-medium text-on-surface-variant">
                          Top Culinary Spot
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.08)] group cursor-pointer">
                    <div className="h-48 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCANSzbluyX_fXLA3GsR9MwszhdnBqHKi6SZTjMtjFnwh0difyXBHU3tTtd59_EDYAeuVHbGJVycE9vdiTeWkZOke-CUl8mrgq4q3e-PGXKG5L7r0bjJLhFJVOPrZ-GexPHUidYA-VVkop-RXEcpbOvuBU-TfQsfUJc6-8ez_vhUP8D1NEG4MSUgMV_UHwYkj9RdmY7YSzz_zEEANsDwa9QfW70VJQqN7cduvBICc6OoVuHPwz4oOeMag8VQvsBKhD5OCDbudS7xic"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-headline-md">
                          Đà Lạt Highland
                        </h4>
                        <span
                          className="material-symbols-outlined text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          favorite
                        </span>
                      </div>
                      <p className="text-body-md text-on-surface-variant line-clamp-2">
                        Thành phố mộng mơ với không khí se lạnh và rừng thông.
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-tertiary material-symbols-outlined text-[18px]">
                          eco
                        </span>
                        <span className="text-xs font-medium text-on-surface-variant">
                          Nature Escape
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-gutter">
                {[
                  {
                    title: "Bánh Mì Phượng",
                    sub: "Hội An, Việt Nam",
                    rate: "4.9 (2k+)",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIdWi-vvo04IQx7xjPW-fWMaf-bvYfFxvik0pPZIUjYZiwZf-znx6caHeO6DP9IBId9kF3XgdJSQoLVGfmIzVr_JuOz10jGcwEBbmTAKUFkdN5Ppt_UUkPQ9A0Ap85mIgJ3e6s-8QBa16bIUI3LBSDgVm4WBwatu-oKn6YFUVPu0QbIbOdC-SLZjD9uGIGptx1vpBQEhznULyBVF3Io9-TlYjCdTvhDN9HO7ML0YBkFNmzy_9Qj1LWt5MaaJZPj7Sfne3pYKV2oNc",
                  },
                  {
                    title: "Bãi Sao Beach",
                    sub: "Phú Quốc, Việt Nam",
                    rate: "4.7 (1.5k)",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKajHv1kYwj47_7VheX1HW590XBW59EVyRmRViBoqPpKFfI1k8FedxYLFR3eg29gjZ-enRPdPGFlCzOztj7dY54BRDls8mfR3mslEIwBUBuEpU49KrJdKn2ZzXfshEQvTH_WfjKPVZu0XIsRSDMh8MOW-_FYDzhdmfqiMF1adjgI4-VPcfDhCRTkBnLSEKchhz7QWyUevvKkhOC0nSdXj3lZDStAeFwAJLHJzh2JuCrrq_mbcMAjHszpY1gWO7ss013JhOzLc47do",
                  },
                  {
                    title: "Saigon Rooftop Bar",
                    sub: "Hồ Chí Minh, Việt Nam",
                    rate: "4.8 (800)",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA0ENJrv0JElKibxoTTLHf8E_vP11odZQPNmv3oZOsWteb0iJad7JPIF5YNxKQKRNp-HjqzA-X6B10BH-3jlIPdfvqKULEZ2tN2dWf0183qMVNVZtyrFNLJzo8OEuVwpm4TMDo17l96IzmBDFLkft4HAwF7_Gqc36sKIKr20WTmS4ViYFRZw3IpNmZtXOu_THxBhycpPGTUHhV5pOBtYI-vIhkAPdhC-Qei4L_jOqo5QwiiWjAOktePqFIfihNOoVh4zkdX6PJDA0",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white p-6 rounded-lg shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.08)] flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="w-full h-full object-cover"
                        src={item.img}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-label-md text-on-surface">
                        {item.title}
                      </h5>
                      <p className="text-xs font-medium text-on-surface-variant">
                        {item.sub}
                      </p>
                      <div className="flex items-center text-primary mt-1">
                        <span
                          className="material-symbols-outlined text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-xs font-medium ml-1">
                          {item.rate}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-zinc-600 text-base py-12 text-center">
              {activeTab === "history"
                ? "Chưa có lịch sử xem."
                : "Chưa có đánh giá nào."}
            </p>
          )}
        </section>

        <section className="bg-primary-container rounded-lg p-8 lg:p-margin-desktop text-on-primary-container relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-bold text-display-lg mb-4">
              Lên kế hoạch cho hành trình từ địa điểm đã lưu?
            </h2>
            <p className="text-body-lg mb-8 opacity-90">
              TravelTaste AI giúp bạn kết nối các địa điểm yêu thích thành một
              lịch trình ẩm thực và du lịch hoàn hảo chỉ trong vài giây.
            </p>
            <button
              type="button"
              className="bg-white text-primary px-10 py-4 rounded-full font-semibold text-label-md hover:shadow-xl transition-shadow flex items-center gap-2"
            >
              Bắt đầu ngay{" "}
              <span className="material-symbols-outlined">auto_awesome</span>
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-10 top-10 text-white/20 pointer-events-none hidden lg:block">
            <span className="material-symbols-outlined text-[200px]">
              travel_explore
            </span>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
