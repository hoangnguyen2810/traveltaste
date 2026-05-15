"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function UserAccountMenu({ open, onClose }: Props) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const userLabel = session?.user?.name ?? session?.user?.email ?? "Tài khoản";

  if (!open) return null;

  return (
    <div className="absolute right-0 mt-3 w-56 bg-white border border-zinc-200 rounded-2xl shadow-2xl p-2 z-50">
      {isLoggedIn ? (
        <>
          <div className="px-4 py-3 border-b border-zinc-100">
            <p className="text-xs text-zinc-500">Xin chào</p>

            <p className="font-semibold text-zinc-900 truncate">{userLabel}</p>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 transition"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">
              person
            </span>

            <span>Trang cá nhân</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              onClose();
              signOut({ callbackUrl: "/" });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 transition text-left"
          >
            <span className="material-symbols-outlined text-[20px]">
              logout
            </span>

            <span>Đăng xuất</span>
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 transition"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">login</span>
            <span>Đăng nhập</span>
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 transition"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">
              person_add
            </span>
            <span>Đăng ký</span>
          </Link>
        </>
      )}
    </div>
  );
}
