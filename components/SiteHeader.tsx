"use client";

import { useState } from "react";
import Link from "next/link";
import UserAccountMenu from "@/components/UserAccountMenu";

type NavKey = "home" | "discover" | "search" | "favorites";

type Props = {
  activeNav?: NavKey;
};

const navItems: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "discover", label: "Discover", href: "#" },
  { key: "search", label: "Search", href: "/search" },
  { key: "favorites", label: "Favorites", href: "/profile" },
];

export default function SiteHeader({ activeNav = "home" }: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
      <nav className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold text-orange-700 tracking-tight"
        >
          TravelTaste
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.key === activeNav ? (
              <Link
                key={item.key}
                href={item.href}
                className="text-orange-700 border-b-2 border-orange-700 pb-1 font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="hover:text-orange-700 transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
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
              className="p-2 rounded-full cursor-pointer hover:bg-zinc-100 transition"
              aria-label="Tài khoản"
              aria-expanded={openMenu}
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>

            <UserAccountMenu
              open={openMenu}
              onClose={() => setOpenMenu(false)}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
