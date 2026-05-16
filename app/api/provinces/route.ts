import { NextResponse } from "next/server";
import {
  getAllProvinces,
  getFeaturedProvinces,
  searchProvinces,
} from "@/lib/provinces";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const featured = searchParams.get("featured") === "true";
    const limitParam = searchParams.get("limit");
    const q = searchParams.get("q")?.trim();

    const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 5, 50) : 5;

    let provinces;

    // 1. SEARCH theo keyword (ưu tiên cao nhất)
    if (q) {
      provinces = await searchProvinces(q, limit);
    }
    // 2. FEATURED
    else if (featured) {
      provinces = await getFeaturedProvinces(limit);
    }
    // 3. ALL
    else {
      provinces = await getAllProvinces();
    }

    return NextResponse.json({ provinces });
  } catch (error) {
    console.error("GET /api/provinces:", error);

    return NextResponse.json(
      { error: "Không thể tải danh sách tỉnh thành." },
      { status: 500 },
    );
  }
}
