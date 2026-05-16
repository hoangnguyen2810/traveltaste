"use client";

import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BottomNav from "@/components/BottomNav";
import ProvinceModal, {
  type ProvinceItem,
} from "@/components/search/ProvinceModal";
import SearchResultCard from "@/components/search/SearchResultCard";

const RESULTS = [
  {
    title: "Ana Mandara Villas",
    description:
      "Trải nghiệm không gian nghỉ dưỡng cổ điển Pháp giữa đồi thông xanh mát.",
    price: "2.500.000đ / đêm",
    rating: "4.8",
    category: "Homestay Cao Cấp",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC7NN1rTZ4GeipR_4AvaOtzNy4SZ5vFjYnegYe13CUt6TFuuf9dyril4lmmh42tJ8v_wUHPrUFieFdo1UbAVVCVzLO-2f94qhAHmU-60a3mzBeEZoRmOv6tW1vhl_N1ynDSP7gkbQ4VsgrKOHoJhEtajSXRQHrYNEogw3upMJ9nIsSRSKOYsU0uCh0RNmufwOEgADhhUpRHTplwRm27bwyPw_fD_Y3MXZUwfPhqpI8ZHtbdSl9FA3EeAoLALfwElW0ZAhMY7N3wmk",
  },
  {
    title: "The Wilder-nest",
    description:
      "Ngắm bình minh cực đẹp với tách cà phê specialty giữa thung lũng sương mù.",
    price: "65.000đ - 120.000đ",
    rating: "4.5",
    category: "Quán Cà phê",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBc7DVgDP8WVgQGMt4tCQMbgMXqwtPp3Uc8omLWZ0X3JAlWc7DD-HBVRU7zrBrz_0-MQ9QUV-GBEUrws518yF4lcp4_LUxxuHTb2_UnhXP71aUNT23EAdVR47H7vUIuwZzl0che28VqIXg4HrgyCUIFnCdh5yqS5pkSbw5NpWyKbRpAOJH03ci1KZNjOwv_e9liAiEKHKVBqnTW3ZSexQtkphDjtkMB4Xq3W0-XLFSHwghg-gc8gvsKjBmpWhDqeLAE7f4H7Ph-rxE",
  },
  {
    title: "Émai Dalat",
    description:
      "Nơi ẩm thực Ý hòa quyện cùng nông sản Đà Lạt trong một khu vườn thơ mộng.",
    price: "300.000đ - 800.000đ",
    rating: "4.9",
    category: "Nhà hàng Á",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXiLhxDhEDQ3oHkH_yTBd12ZZ7JH7mqGVmCZ7uOQQfDJpbyVTCyKENWzWdhV3YAaTw9RydY4ozVVbcO3vc_N8euaWSwuV39uUMBplMJxztT6x6xETUFE9rZ5LJGkgqJnvArELkbyBPCVNTYh0LupwN-pHg0aHNBdyfhiogrdHW5L5HBTd2L0X-HIBi4yokFwrKbtWmnYZOXIXO4Y3LzELKuW9AOJlxY0qSW0INfGplZR1RZgmpMwqysM7KZlgCjQ6FG1U3rOMSmnA",
  },
  {
    title: "Đồi Đa Phú",
    description:
      "Điểm săn mây và cắm trại lý tưởng nhất để ngắm toàn cảnh thành phố sương mù.",
    price: "Miễn phí",
    rating: "4.6",
    category: "Địa điểm tham quan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBu3LmJpHRe0L6HyIDzhBZO5oV1vdpnE-GdQbUqiYoaMfTn4PpTbSXgJDUBmSXhwGhVdKg76hpT6KKYJdxDOrll9RXfh1E0sBWFWnfP2EJDe8qJbCPBbLCfwSBGUt2Aue153BC0m5hLzeLXTIXL25UqD4nzczkdH6GmTueU9NRG0HE8rzN87yRD9mOP1vbuBNLFdmWtGalD2QAl-33n3_vZMgufTiqjMi7lJ4327z8TOlaThrkkaJuiJikaSenf-7Ipr8I-gDOjY-s",
  },
] as const;

export default function SearchPage() {
  const [provinceModalOpen, setProvinceModalOpen] = useState(false);
  const [provinces, setProvinces] = useState<ProvinceItem[]>([]);
  const [provincesLoading, setProvincesLoading] = useState(true);
  const [provincesError, setProvincesError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProvinces() {
      setProvincesLoading(true);
      setProvincesError("");

      try {
        const res = await fetch("/api/provinces");
        const data = await res.json();

        if (!res.ok) {
          if (!cancelled) {
            setProvincesError(data.error ?? "Không thể tải tỉnh thành.");
          }
          return;
        }

        if (!cancelled) {
          setProvinces(data.provinces ?? []);
        }
      } catch {
        if (!cancelled) {
          setProvincesError("Không thể kết nối máy chủ.");
        }
      } finally {
        if (!cancelled) setProvincesLoading(false);
      }
    }

    loadProvinces();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = provinces.filter((p) => p.featured);
  const sidebarProvinces = (featured.length > 0 ? featured : provinces).slice(
    0,
    5,
  );

  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans min-h-screen pb-32">
      <SiteHeader activeNav="search" />

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-2">
                Khám phá Đà Lạt
              </h1>
              <p className="text-zinc-600">
                Tìm thấy 128 địa điểm ẩm thực và du lịch tuyệt vời nhất
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">map</span>
              Xem bản đồ
            </button>
          </div>

          <div className="mt-8 relative max-w-2xl">
            <input
              type="text"
              className="w-full h-14 pl-14 pr-6 rounded-full border-none bg-white shadow-soft focus:ring-2 focus:ring-teal-600 outline-none transition-all"
              placeholder="Tìm kiếm món ăn, địa danh..."
            />
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
              search
            </span>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3 space-y-8 bg-white p-8 rounded-2xl shadow-soft">
            <FilterSection title="Tỉnh / Thành">
              <div className="relative mb-4">
                <input
                  type="text"
                  className="w-full h-10 pl-10 pr-4 rounded-full border border-zinc-200 bg-zinc-50 text-base focus:ring-2 focus:ring-orange-700 focus:border-transparent outline-none"
                  placeholder="Tìm tỉnh thành..."
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-[20px]">
                  search
                </span>
              </div>
              <div className="space-y-3">
                {provincesLoading ? (
                  <p className="text-sm text-zinc-500">Đang tải...</p>
                ) : provincesError ? (
                  <p className="text-sm text-red-600">{provincesError}</p>
                ) : sidebarProvinces.length === 0 ? (
                  <p className="text-sm text-zinc-500">
                    Chưa có dữ liệu tỉnh thành.
                  </p>
                ) : (
                  sidebarProvinces.map((province, i) => (
                    <CheckboxRow
                      key={province.id}
                      label={province.name}
                      defaultChecked={i === 0}
                    />
                  ))
                )}
              </div>
              <button
                type="button"
                onClick={() => setProvinceModalOpen(true)}
                className="mt-4 text-orange-700 text-sm font-semibold flex items-center gap-1
             transition-all duration-300 ease-out
             hover:text-orange-600 hover:gap-2
             hover:translate-x-1
             active:scale-95"
              >
                <span className="transition-all duration-300">Xem thêm</span>

                <span
                  className="material-symbols-outlined text-[18px]
               transition-transform duration-300
               group-hover:rotate-180"
                >
                  expand_more
                </span>
              </button>
            </FilterSection>

            <FilterSection title="Khoảng giá">
              <CheckboxRow label="Dưới 200.000đ" />
              <CheckboxRow label="200.000đ - 500.000đ" defaultChecked />
              <CheckboxRow label="Trên 500.000đ" />
            </FilterSection>

            <FilterSection title="Loại hình" bordered>
              <CheckboxRow label="Quán cà phê" defaultChecked />
              <CheckboxRow label="Nhà hàng Á" defaultChecked />
              <CheckboxRow label="Điểm tham quan" />
              <CheckboxRow label="Homestay" />
            </FilterSection>

            <FilterSection title="Đánh giá" bordered>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  className="text-orange-700 focus:ring-orange-700"
                />
                <span className="flex items-center gap-1 text-zinc-600 group-hover:text-orange-700">
                  <span>5.0</span>
                  <span
                    className="material-symbols-outlined text-[18px] text-orange-700"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  defaultChecked
                  className="text-orange-700 focus:ring-orange-700"
                />
                <span className="flex items-center gap-1 text-zinc-600 group-hover:text-orange-700">
                  <span>Từ 4.0</span>
                  <span
                    className="material-symbols-outlined text-[18px] text-orange-700"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </span>
              </label>
            </FilterSection>

            <button
              type="button"
              className="w-full py-4 bg-orange-700 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
            >
              Áp dụng lọc
            </button>
          </aside>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESULTS.map((item) => (
                <SearchResultCard key={item.title} {...item} />
              ))}
            </div>

            <nav
              className="mt-16 flex justify-center gap-2"
              aria-label="Phân trang"
            >
              <PaginationButton>1</PaginationButton>
              <PaginationButton active>2</PaginationButton>
              <PaginationButton>3</PaginationButton>
              <PaginationButton aria-label="Trang sau">
                <span className="material-symbols-outlined">chevron_right</span>
              </PaginationButton>
            </nav>
          </div>
        </div>
      </main>

      <SiteFooter />
      <BottomNav />
      <ProvinceModal
        open={provinceModalOpen}
        onClose={() => setProvinceModalOpen(false)}
        provinces={provinces}
        loading={provincesLoading}
      />
    </div>
  );
}

function FilterSection({
  title,
  children,
  bordered,
}: {
  title: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <section
      className={
        bordered
          ? "pt-6 border-t border-zinc-200/80"
          : "pb-6 border-b border-zinc-200/80 mb-8"
      }
    >
      <h3 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function CheckboxRow({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="rounded text-orange-700 focus:ring-orange-700"
      />
      <span className="text-zinc-600 group-hover:text-orange-700">{label}</span>
    </label>
  );
}

function PaginationButton({
  children,
  active,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={`w-12 h-12 flex items-center justify-center rounded-full shadow-sm transition-all ${
        active
          ? "bg-orange-700 text-white shadow-lg"
          : "bg-white text-zinc-600 hover:bg-orange-700 hover:text-white"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
