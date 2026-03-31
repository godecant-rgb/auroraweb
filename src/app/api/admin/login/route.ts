import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_COOKIE = "aurora_admin_session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "").trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email y contraseña son obligatorios." },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: "Faltan variables de Supabase." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Credenciales inválidas." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: ADMIN_COOKIE,
      value: "1",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "No se pudo iniciar sesión." },
      { status: 500 },
    );
  }
}