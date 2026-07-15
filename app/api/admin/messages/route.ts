import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/firebase/admin";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const snapshot = await getAdminDb().collection("messages").orderBy("createdAt", "desc").get();
  const messages = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ messages });
}

export async function PATCH(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, read } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await getAdminDb().collection("messages").doc(id).update({ read: Boolean(read) });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await getAdminDb().collection("messages").doc(id).delete();
  return NextResponse.json({ ok: true });
}
