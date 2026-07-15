import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    tina: Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN),
    firebaseClient: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    firebaseAdmin: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
    resend: Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL),
    adminPassword: Boolean(process.env.ADMIN_PASSWORD),
  });
}
