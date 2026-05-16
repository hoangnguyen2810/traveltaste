"use client";

import { useEffect, useState } from "react";

export type ProvinceItem = {
  id: number;
  name: string;
  slug: string;
  featured: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  provinces: ProvinceItem[];
  loading?: boolean;
};

export default function ProvinceModal({
  open,
  onClose,
  provinces,
  loading = false,
}: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  const filtered = provinces.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="province-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200/80">
          <div>
            <h2
              id="province-modal-title"
              className="text-2xl font-semibold text-zinc-900"
            >
              Chọn tỉnh / thành
            </h2>
            <p className="text-zinc-600 mt-1">
              Khám phá địa điểm trên toàn Việt Nam
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-all"
            aria-label="Đóng"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 border-b border-zinc-200/80">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-full border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-orange-700 outline-none"
              placeholder="Tìm tỉnh thành..."
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              search
            </span>
          </div>
        </div>

        <div className="p-6 max-h-[450px] overflow-y-auto hide-scrollbar">
          {loading ? (
            <p className="text-center text-zinc-500 py-8">Đang tải...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-zinc-500 py-8">
              Không tìm thấy tỉnh thành phù hợp.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((province) => (
                <label
                  key={province.id}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl hover:bg-zinc-50 transition-all"
                >
                  <input
                    type="checkbox"
                    className="rounded text-orange-700 focus:ring-orange-700"
                  />
                  <span>{province.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200/80 bg-zinc-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-full border border-zinc-200 hover:bg-white transition-all"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-orange-700 text-white hover:opacity-90 transition-all"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
