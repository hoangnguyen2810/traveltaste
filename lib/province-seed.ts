export const PROVINCE_SEED = [
  { name: "Hà Nội", featured: true },
  { name: "TP. Hồ Chí Minh", featured: true },
  { name: "Hải Phòng", featured: false },
  { name: "Đà Nẵng", featured: true },
  { name: "An Giang", featured: false },
  { name: "Bắc Ninh", featured: false },
  { name: "Cà Mau", featured: false },
  { name: "Cần Thơ", featured: false },
  { name: "Cao Bằng", featured: false },
  { name: "Đắk Lắk", featured: false },
  { name: "Điện Biên", featured: false },
  { name: "Đồng Nai", featured: false },
  { name: "Đồng Tháp", featured: false },
  { name: "Gia Lai", featured: false },
  { name: "Hà Tĩnh", featured: false },
  { name: "Hưng Yên", featured: false },
  { name: "Khánh Hòa", featured: true },
  { name: "Lai Châu", featured: false },
  { name: "Lâm Đồng", featured: true },
  { name: "Lạng Sơn", featured: false },
  { name: "Lào Cai", featured: false },
  { name: "Nghệ An", featured: false },
  { name: "Ninh Bình", featured: false },
  { name: "Phú Thọ", featured: false },
  { name: "Quảng Ngãi", featured: false },
  { name: "Quảng Ninh", featured: false },
  { name: "Quảng Trị", featured: false },
  { name: "Sóc Trăng", featured: false },
  { name: "Sơn La", featured: false },
  { name: "Tây Ninh", featured: false },
  { name: "Thái Nguyên", featured: false },
  { name: "Thanh Hóa", featured: false },
  { name: "Thừa Thiên Huế", featured: false },
  { name: "Tuyên Quang", featured: false },
  { name: "Vĩnh Long", featured: false },
] as const;

export function slugifyProvinceName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
