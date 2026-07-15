import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  return NextResponse.json({ authed: isAdminAuthed(req) });
}
