import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/firebase/admin";
import { isAdminAuthed } from "@/lib/adminAuth";
import { getProjects, getCertifications, getSkills } from "@/lib/content";

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let pendingComments = 0;
  let unreadMessages = 0;
  try {
    const db = getAdminDb();
    const [commentsSnap, messagesSnap] = await Promise.all([
      db.collection("comments").where("status", "==", "pending").get(),
      db.collection("messages").where("read", "==", false).get(),
    ]);
    pendingComments = commentsSnap.size;
    unreadMessages = messagesSnap.size;
  } catch {
    // Firebase not configured yet — surface zeros instead of failing the
    // whole dashboard.
  }

  return NextResponse.json({
    projects: getProjects().length,
    certifications: getCertifications().length,
    skillCategories: getSkills().categories.length,
    pendingComments,
    unreadMessages,
  });
}
