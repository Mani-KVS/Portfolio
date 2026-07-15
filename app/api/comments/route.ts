import { NextRequest, NextResponse } from "next/server";
import { submitComment } from "@/firebase/firestore";

export async function POST(req: NextRequest) {
  const { name, email, message, rating } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (message.length > 1000) {
    return NextResponse.json({ error: "Comment is too long." }, { status: 400 });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  const parsedRating =
    typeof rating === "number" && rating >= 1 && rating <= 5 ? Math.round(rating) : undefined;

  await submitComment(name.trim(), email.trim(), message.trim(), parsedRating);
  // The notifyOnNewComment Cloud Function (functions/src/index.ts) fires
  // automatically from this write and emails you the details.
  return NextResponse.json({ ok: true });
}
