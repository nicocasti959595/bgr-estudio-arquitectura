import { NextResponse } from "next/server";

function inspectChars(s: string | undefined) {
  if (!s) return { len: 0, valor: "(undefined)", chars: [] };
  const chars: { i: number; ch: string; code: number; sospechoso: boolean }[] = [];
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    const sospechoso = code < 32 || code > 126;
    chars.push({ i, ch: sospechoso ? "?" : s[i], code, sospechoso });
  }
  return { len: s.length, valor: s.slice(0, 20) + "...", chars: chars.slice(0, 20) };
}

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const result = {
    NEXT_PUBLIC_SUPABASE_URL: inspectChars(url),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: inspectChars(anon),
    sospechosos: {
      url: inspectChars(url).chars.filter((c) => c.sospechoso),
      anon: inspectChars(anon).chars.filter((c) => c.sospechoso),
    },
  };

  return NextResponse.json(result);
}
