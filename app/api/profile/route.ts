import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserProfileByEmail, upsertUserProfile } from "@/lib/users";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await getUserProfileByEmail(email);

    return NextResponse.json({
      profile: profile ?? {
        email,
        name: session.user?.name ?? null,
        location: null,
        bio: null,
        instagram: null,
        website: null,
        avatar_url: session.user?.image ?? null,
      },
    });
  } catch (error) {
    console.error("GET /api/profile:", error);
    return NextResponse.json(
      { error: "Không thể tải hồ sơ." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json(
        { error: "Họ và tên không được để trống." },
        { status: 400 }
      );
    }

    const profile = await upsertUserProfile(email, {
      name,
      location: typeof body.location === "string" ? body.location : "",
      bio: typeof body.bio === "string" ? body.bio : "",
      instagram: typeof body.instagram === "string" ? body.instagram : "",
      website: typeof body.website === "string" ? body.website : "",
      avatarUrl:
        typeof body.avatarUrl === "string"
          ? body.avatarUrl
          : session.user?.image ?? undefined,
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("PATCH /api/profile:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật hồ sơ." },
      { status: 500 }
    );
  }
}
