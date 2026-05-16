"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BottomNav from "@/components/BottomNav";
import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans pb-32">
      <SiteHeader activeNav="home" />
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBykqNPzJgImpdbJskGj4w5YRLylmCkISa8Ezon9jy8sfhHlhDCtyS_kMKTfBHsC9w_IFLVKR_s3gAMHvTgazjnmZYsf4qZohFejFezDiKDmYPIP3GzGRSCNenM7h2PTQKEi9Da93Y8nxGLvVbpNzUKZuXKYOrNIbrksu1OHqj8Z6BnU5yzJmfIp0DSBJnugnWAUkSAjCzcTRFDybJU_GG4O0fzBLptF8SbCnewFl1-ksXf0SRwxkgleC_VtY381-I0rD138TNkVxw"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 w-full max-w-4xl px-6 text-center">
          <HomeHero />

          {/* SEARCH */}
          <div className="bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-2xl flex items-center max-w-3xl mx-auto border border-white/20">
            <div className="flex-1 px-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-orange-700">
                location_on
              </span>

              <input
                type="text"
                placeholder="Bạn muốn đi đâu?"
                className="bg-transparent w-full outline-none text-zinc-700"
              />
            </div>

            <Link
              href="/search"
              className="bg-orange-700 text-white px-10 py-4 rounded-full hover:opacity-90 transition"
            >
              Tìm kiếm
            </Link>
          </div>

          {/* QUICK CATEGORY */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/30 transition">
              <span className="material-symbols-outlined">restaurant</span>

              <span>Ăn uống</span>
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/30 transition">
              <span className="material-symbols-outlined">celebration</span>

              <span>Vui chơi</span>
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/30 transition">
              <span className="material-symbols-outlined">photo_camera</span>

              <span>Check-in</span>
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/30 transition">
              <span className="material-symbols-outlined">map</span>

              <span>Tham quan</span>
            </button>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Điểm đến xu hướng</h2>

            <p className="text-zinc-600">
              Những địa điểm đang được cộng đồng yêu thích nhất
            </p>
          </div>

          <button className="text-orange-700 font-medium flex items-center gap-1 hover:underline">
            Xem tất cả
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CARD */}
          <div className="group cursor-pointer">
            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-4 shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNjEF8YqmESyjvsJq1_GBPdWiW6EKHttYqlnkU-W1cUkvg-E7nNTaDMBTN2_1FeQeMMKmRfSW4hpZytyVbG8f1gyjmUjfBmSdJnTdLQHBiOrUWqjF77OKzVPLEFQi5CmVjdyzDUL9aE4dQ6emIx_F2YHHD13unzpoKLucv4wfawX7Cxd5LPYi_8fgsgQdSsF0c6uHrhvWuy_ocfzslISDGnVLQdFy_oit5QwBDd94rFsv4RQAV39s-_lPHtqG-vUIDM0Z2XAqI2c0"
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px] text-orange-700"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>

                <span className="text-sm">4.9</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold">Đà Lạt mộng mơ</h3>

            <p className="text-zinc-600">
              Thành phố ngàn hoa với không khí se lạnh
            </p>
          </div>

          {/* CARD */}
          <div className="group cursor-pointer pt-12">
            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-4 shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqFJes7lw_RSw5qIQR3jQDVkGJya8Yf6E0E8d8d1dIpA99ydM7P1kb5SNf1ZtpSFqoURjQWr7_hIuDoGZjglSlJF4s0KlVaUbQz106RgJnNaxzVYNe9-fRmTF4DCOouhOXsStUzT9Ev32orapeHN5zIvCo_B7bTiB_rhu0lhpv4hiwwNeXt_zIfj0AqKie6OGcQ6WPHSEOr3XEOONjZKK7sKkA7e4sv6Z7rps_8KmpfhhLbk1l-5HJ1O950aJKq1_VnSNzc8DqpMw"
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px] text-orange-700"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>

                <span className="text-sm">4.8</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold">Phố cổ Hội An</h3>

            <p className="text-zinc-600">Vẻ đẹp di sản vượt thời gian</p>
          </div>

          {/* CARD */}
          <div className="group cursor-pointer">
            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-4 shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVAJjctosrbFM9E3tMC2ltFj4glCB9mNsoZZh4GbhW2_eF1ViIHU4JO3vCKmGiqQYNYpDQprCruDGtFAuvmKKQsdVSWoD-b5ku5vcGkuak9vJ4T0fb_DfYCvRHKnEd6_iasI8z-V8TTUVrJC1qFOmD-Exe-c0p4HAem9WBAbY-H2IzgzNkobWPWamD5eiSJubnZJyd37jal0Kp2Y0OIo-AjJhBFLj5aJBAIdcZeaGchq2cToRA-906lYPWX1eO78LN7nUb8X9AWXk"
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px] text-orange-700"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>

                <span className="text-sm">5.0</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold">Vịnh Hạ Long</h3>

            <p className="text-zinc-600">Kỳ quan thiên nhiên thế giới</p>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="bg-zinc-100 py-20">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="w-full md:w-5/12">
              <span className="text-orange-700 uppercase tracking-[4px] font-semibold mb-4 block">
                Gợi ý dành riêng cho bạn
              </span>

              <h2 className="text-5xl font-bold text-zinc-900 mb-6 leading-tight">
                Trải nghiệm ẩm thực địa phương tinh tế
              </h2>

              <p className="text-zinc-600 text-lg leading-8 mb-8">
                Dựa trên sở thích của bạn về văn hóa và ẩm thực, chúng tôi đã
                chuẩn bị một danh sách các nhà hàng "hidden gems" tại Hà Nội.
              </p>

              <div className="space-y-4 mb-8">
                {/* Item 1 */}
                <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm hover:shadow-lg transition">
                  <span className="material-symbols-outlined text-orange-700 text-3xl">
                    restaurant_menu
                  </span>

                  <div>
                    <h4 className="font-bold text-lg text-zinc-900">
                      Ẩm thực Phố Cổ
                    </h4>

                    <p className="text-zinc-600 text-sm mt-1">
                      Top 10 món ăn đường phố không thể bỏ qua
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm hover:shadow-lg transition">
                  <span className="material-symbols-outlined text-orange-700 text-3xl">
                    local_cafe
                  </span>

                  <div>
                    <h4 className="font-bold text-lg text-zinc-900">
                      Cà phê trứng giảng
                    </h4>

                    <p className="text-zinc-600 text-sm mt-1">
                      Hương vị truyền thống từ năm 1946
                    </p>
                  </div>
                </div>
              </div>

              <button className="bg-orange-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all">
                Khám phá ngay
              </button>
            </div>

            {/* Right Images */}
            <div className="w-full md:w-7/12">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_eqc5ip9i0KjhlrXLQUV461FJuBO6RbVoF7Xxmv4o0r-ioj28rn269i3uidTSY8iN_qOC-diwjQhmNjFbDKmUVC2ywwA39j43rCmHaTh-qOjtmn2s69IJ4bq8p0jQ6hnNg-Ry2_NQiN634WJ2TN3pshxC7Di8vD7sHKc1LsEu9x2yhs8hRwaODfvWfl-eJR4OLynHgXFuZmuwpikUg7y8qNiIexqrQpG-urTJul2FVlDE10TtCuazOh4KDP_LyQ4_On0bvvk_f2k"
                  alt="Pho"
                  className="w-full h-80 object-cover rounded-3xl shadow-lg"
                />

                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKmxHNBO06HOPHZ-Rv8AyRXblMuqIzvqEHrv9Tqk-TDnV9k9gfKu821Cla0WtiNTBTpr6xFew9vKinzV8_gHS13IMtIIwQa6cynx8y54qRqySzxI4ZmW9-qG3HkVJmr9u5ftl35k0uwxlM_8CFC_RWx4MXbfCWIpQ7vED87CkNOASN_cRjBBbftnoAJmICD74qp6VRM5Iudbqsy7Yd1N-ewG9WWCobaZN-SHc8UP9ZldHxmmgfi1e7LsO2I7OCGd5NCHAxLDx8bV0"
                  alt="Cafe"
                  className="w-full h-80 object-cover rounded-3xl mt-12 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto bg-orange-100 rounded-[40px] p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300/20 rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-300/20 rounded-full translate-y-1/2 -translate-x-1/2" />

          <h2 className="text-5xl font-bold mb-4 relative z-10">
            Đừng bỏ lỡ những ưu đãi độc quyền
          </h2>

          <p className="text-zinc-700 mb-10 max-w-2xl mx-auto relative z-10">
            Đăng ký nhận bản tin để nhận được các gợi ý du lịch và ẩm thực mới
            nhất hàng tuần.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-6 py-4 rounded-full outline-none bg-white"
            />

            <button className="bg-orange-700 text-white px-10 py-4 rounded-full hover:shadow-xl transition">
              Đăng ký
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
      <BottomNav />
    </div>
  );
}
