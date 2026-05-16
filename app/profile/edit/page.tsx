"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SiteShell from "@/components/SiteShell";

const SAMPLE_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCsl7hU96Q7FuG_Qbw2trqFCiH9ZZJO9DmnXaCZu9QUHzJmlLk-CuH1q56Q--h25_45WG5qtO_wyaVcwxi1rvHcATsoToEQVJV9bo7x1Yfs29XLrYLgJ5F_6-zAsJdCLrjZD9o9QTO-QQhPPruJ2sumHtg815qk5PwTIvJFhzHm6sQO1hunQz2JEG851ZdakKrCUTBC9vn8PsXEZ5OfuEsZh60wDpkvxsy5tyQ0yZOVaeM2LnaxhADOHt0WsrzTsSrnALGcXRDoSxQ";

type ProfileResponse = {
  profile: {
    name: string | null;
    location: string | null;
    bio: string | null;
    instagram: string | null;
    website: string | null;
    avatar_url: string | null;
  };
};

export default function EditProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/profile/edit");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;

    async function loadProfile() {
      setLoadingProfile(true);
      setError("");

      try {
        const res = await fetch("/api/profile");
        const data: ProfileResponse & { error?: string } = await res.json();

        if (!res.ok) {
          if (!cancelled) {
            setError(data.error ?? "Không thể tải hồ sơ.");
          }
          return;
        }

        if (cancelled) return;

        const p = data.profile;
        setFullName(
          p.name?.trim() ||
            session?.user?.name?.trim() ||
            session?.user?.email?.split("@")[0] ||
            ""
        );
        setLocation(p.location ?? "");
        setBio(p.bio ?? "");
        setInstagram(p.instagram ?? "");
        setWebsite(p.website ?? "");
        setAvatarUrl(p.avatar_url ?? session?.user?.image ?? null);
      } catch {
        if (!cancelled) {
          setError("Không thể kết nối máy chủ.");
        }
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [status, session?.user?.name, session?.user?.email, session?.user?.image]);

  if (status === "loading" || loadingProfile) {
    return (
      <SiteShell>
        <main className="max-w-[800px] mx-auto px-margin-mobile md:px-0 py-16 pb-40 flex justify-center">
          <p className="text-zinc-600">Đang tải...</p>
        </main>
      </SiteShell>
    );
  }

  if (status !== "authenticated" || !session?.user) {
    return null;
  }

  const avatarSrc = avatarUrl ?? session.user.image ?? SAMPLE_AVATAR;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          location,
          bio,
          instagram,
          website,
          avatarUrl: avatarUrl ?? session?.user?.image ?? null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Không thể lưu hồ sơ.");
        return;
      }

      await update({ name: data.profile.name });
      router.push("/profile");
      router.refresh();
    } catch {
      setError("Không thể kết nối máy chủ.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteShell>
      <main className="max-w-[800px] mx-auto px-margin-mobile md:px-0 py-16 pb-40">
        <div className="mb-12 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.08)] text-orange-800 hover:scale-95 transition-transform"
            aria-label="Quay lại hồ sơ"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="font-bold text-headline-lg text-on-surface">
              Chỉnh sửa hồ sơ
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Cập nhật thông tin cá nhân và sở thích du lịch của bạn.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.08)]">
          {error ? (
            <p className="mb-6 text-sm text-red-600 px-2" role="alert">{error}</p>
          ) : null}
          <section className="mb-12 flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg bg-zinc-100">
                <img alt="" src={avatarSrc} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75" />
              </div>
              <button type="button" className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-primary-container text-on-primary-container p-3 rounded-full shadow-md hover:scale-105 transition-transform" aria-label="Đổi ảnh đại diện">
                <span className="material-symbols-outlined">photo_camera</span>
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-outline mt-1">JPG, GIF hoặc PNG. Tối đa 2MB</p>
            </div>
          </section>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="fullName" className="font-semibold text-sm text-on-surface-variant ml-4 block">Họ và tên</label>
              <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full h-14 px-6 rounded-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container text-base text-on-surface shadow-sm transition-all" />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="font-semibold text-sm text-on-surface-variant ml-4 block">Địa điểm</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-6 top-4 text-primary pointer-events-none">location_on</span>
                <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full h-14 pl-14 pr-6 rounded-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container text-base text-on-surface shadow-sm transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="bio" className="font-semibold text-sm text-on-surface-variant ml-4 block">Giới thiệu</label>
              <textarea id="bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Kể về sở thích ẩm thực và phong cách du lịch của bạn..." className="w-full p-6 rounded-lg bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container text-base text-on-surface shadow-sm transition-all resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-2">
                <label htmlFor="instagram" className="font-semibold text-sm text-on-surface-variant ml-4 block">Instagram</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-6 top-4 text-tertiary pointer-events-none">alternate_email</span>
                  <input id="instagram" type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="ten_tai_khoan" className="w-full h-14 pl-14 pr-6 rounded-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container text-base text-on-surface shadow-sm transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="website" className="font-semibold text-sm text-on-surface-variant ml-4 block">Website cá nhân</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-6 top-4 text-tertiary pointer-events-none">link</span>
                  <input id="website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="example.com/ban" className="w-full h-14 pl-14 pr-6 rounded-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container text-base text-on-surface shadow-sm transition-all" />
                </div>
              </div>
            </div>
            <div className="pt-8 flex flex-col md:flex-row gap-4 items-center justify-end">
              <button type="button" onClick={() => router.push("/profile")} className="w-full md:w-auto px-10 h-14 rounded-full font-semibold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">Hủy</button>
              <button type="submit" disabled={submitting} className="w-full md:w-auto px-12 h-14 rounded-full bg-primary-container text-on-primary-container font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60">{submitting ? "Đang lưu..." : "Lưu thay đổi"}</button>
            </div>
          </form>
        </div>
      </main>
    </SiteShell>
  );
}

