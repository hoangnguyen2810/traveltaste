import Link from "next/link";

type Props = {
  active?: "explore" | "plan" | "saved" | "ai";
};

export default function BottomNav({ active = "explore" }: Props) {
  const inactive =
    "flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition";
  const activeCls = "flex flex-col items-center gap-1";

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl border border-white/40 flex items-center gap-8 md:gap-12">
      <Link
        href="/"
        className={active === "explore" ? activeCls : inactive}
      >
        <span
          className={`material-symbols-outlined ${active === "explore" ? "text-orange-700" : ""}`}
          style={
            active === "explore"
              ? { fontVariationSettings: "'FILL' 1" }
              : undefined
          }
        >
          explore
        </span>
        <span
          className={`text-sm ${active === "explore" ? "text-orange-700" : ""}`}
        >
          Khám phá
        </span>
      </Link>

      <button type="button" className={active === "plan" ? activeCls : inactive}>
        <span className="material-symbols-outlined">event_note</span>
        <span className="text-sm">Lịch trình</span>
      </button>

      <Link
        href="/profile"
        className={active === "saved" ? activeCls : inactive}
      >
        <span className="material-symbols-outlined">favorite</span>
        <span className="text-sm">Yêu thích</span>
      </Link>

      <button type="button" className={active === "ai" ? activeCls : inactive}>
        <span className="material-symbols-outlined">smart_toy</span>
        <span className="text-sm">AI Trợ lý</span>
      </button>
    </div>
  );
}
