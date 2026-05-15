import { NextResponse } from "next/server";
import { createUser, ensureUsersTable } from "@/lib/users";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password =
      typeof body.password === "string" ? body.password : "";

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 8 ký tự." },
        { status: 400 }
      );
    }

    await ensureUsersTable();
    const user = await createUser({ name, email, password });

    return NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return NextResponse.json(
        { error: "Email đã được sử dụng." },
        { status: 409 }
      );
    }

    if (error instanceof Error && error.message === "DATABASE_URL is not set") {
      return NextResponse.json(
        { error: "Cấu hình cơ sở dữ liệu chưa được thiết lập." },
        { status: 500 }
      );
    }

    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Không thể tạo tài khoản. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
