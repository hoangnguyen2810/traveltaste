"use client";

import { useSession } from "next-auth/react";

export default function HomeHero() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const firstName =
    session?.user?.name?.split(" ")[0] ??
    session?.user?.email?.split("@")[0] ??
    "bạn";

  return (
    <>
      <h1
        className={`text-5xl md:text-7xl font-bold text-white drop-shadow-lg leading-tight ${isLoggedIn ? "mb-4" : "mb-8"}`}
      >
        {isLoggedIn
          ? `Chào ${firstName}, sẵn sàng khám phá?`
          : "Khám phá hương vị và hành trình mới"}
      </h1>
      {isLoggedIn ? (
        <p className="text-white/90 text-lg md:text-xl mb-8 drop-shadow">
          Gợi ý và lịch trình được cá nhân hóa dành cho bạn.
        </p>
      ) : null}
    </>
  );
}
