"use client";

import { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BottomNav from "@/components/BottomNav";

type Props = {
  children: ReactNode;
  activeNav?: "home" | "discover" | "search" | "favorites";
};

export default function SiteShell({ children, activeNav }: Props) {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans min-h-screen pb-32">
      <SiteHeader activeNav={activeNav} />
      {children}
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
