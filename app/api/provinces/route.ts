import { NextResponse } from "next/server";
import { getAllProvinces, getFeaturedProvinces } from "@/lib/provinces";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 5, 50) : 5;

    const provinces = featured
      ? await getFeaturedProvinces(limit)
      : await getAllProvinces();

    return NextResponse.json({ provinces });
  } catch (error) {
    console.error("GET /api/provinces:", error);
    return NextResponse.json(
      { error: "Không thể tải danh sách tỉnh thành." },
      { status: 500 },
    );
  }
}
