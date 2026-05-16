"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import UserAccountMenu from "@/components/UserAccountMenu";

type Props = {
  children: ReactNode;
};

export default function SiteShell({ children }: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
        <nav className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold text-orange-700 tracking-tight"
          >
            TravelTaste
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="hover:text-orange-700 transition-colors font-medium"
            >
              Home
            </Link>
            <a href="#" className="hover:text-orange-700 transition-colors">
              Discover
            </a>
            <a href="#" className="hover:text-orange-700 transition-colors">
              Search
            </a>
            <a href="#" className="hover:text-orange-700 transition-colors">
              Favorites
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-zinc-100 transition"
              aria-label="Thông báo"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu(!openMenu)}
                className="p-2 rounded-full hover:bg-zinc-100 transition"
                aria-label="Tài khoản"
                aria-expanded={openMenu}
              >
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>

              <UserAccountMenu
                open={openMenu}
                onClose={() => setOpenMenu(false)}
              />
            </div>
          </div>
        </nav>
      </header>

      {children}

      <footer className="bg-zinc-100 border-t border-zinc-200/80 mt-8">
        <div className="w-full py-16 px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            <span className="font-bold text-2xl text-orange-700">
              TravelTaste
            </span>
            <p className="text-zinc-600">
              © 2026 TravelTaste. Your vibrant concierge for culinary
              adventures and effortless travel.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-semibold text-sm text-orange-700 uppercase tracking-widest">
              Khám phá
            </h5>
            <span className="text-zinc-600 hover:text-orange-700 transition-colors cursor-default">
              Explore Destinations
            </span>
            <span className="text-zinc-600 hover:text-orange-700 transition-colors cursor-default">
              Top Culinary Spots
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-semibold text-sm text-orange-700 uppercase tracking-widest">
              Cá nhân
            </h5>
            <span className="text-zinc-600 hover:text-orange-700 transition-colors cursor-default">
              My Itinerary
            </span>
            <Link
              href="/profile"
              className="text-zinc-600 hover:text-orange-700 transition-colors"
            >
              Favorites
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-semibold text-sm text-orange-700 uppercase tracking-widest">
              Hỗ trợ
            </h5>
            <span className="text-zinc-600 hover:text-orange-700 transition-colors cursor-default">
              Privacy Policy
            </span>
            <span className="text-zinc-600 hover:text-orange-700 transition-colors cursor-default">
              Contact Us
            </span>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/80 backdrop-blur-xl shadow-[0px_30px_60px_-12px_rgba(0,78,137,0.15)] rounded-full px-6 py-4 flex items-center gap-8 border border-white/40">
          <Link href="/" className="flex flex-col items-center gap-1 group">
            <span className="material-symbols-outlined text-orange-700 group-hover:scale-110 transition-transform">
              explore
            </span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">
              Explore
            </span>
          </Link>
          <button type="button" className="flex flex-col items-center gap-1 group">
            <span className="material-symbols-outlined text-zinc-500 group-hover:text-orange-700 group-hover:scale-110 transition-transform">
              calendar_month
            </span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">
              Plan
            </span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1 group">
            <span
              className="material-symbols-outlined text-zinc-500 group-hover:text-orange-700 group-hover:scale-110 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">
              Saved
            </span>
          </button>
          <div className="w-px h-8 bg-zinc-200" />
          <button type="button" className="flex flex-col items-center gap-1 group">
            <span className="material-symbols-outlined text-zinc-500 group-hover:text-orange-700 group-hover:scale-110 transition-transform">
              smart_toy
            </span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">
              AI Trip
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
