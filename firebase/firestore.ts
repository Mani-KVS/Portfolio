import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  rating?: number;
  status: "pending" | "approved" | "rejected";
  createdAt: Timestamp | null;
}

const COMMENTS_COLLECTION = "comments";

// Called from the public Guestbook form. New comments start as "pending"
// until approved from the Admin > Comments moderation page.
export async function submitComment(
  name: string,
  email: string,
  message: string,
  rating?: number
) {
  return addDoc(collection(db, COMMENTS_COLLECTION), {
    name,
    email,
    message,
    ...(rating ? { rating } : {}),
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

// Public-facing: only approved comments.
export async function getApprovedComments(): Promise<Comment[]> {
  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Comment));
}

// Admin-facing: all comments regardless of status.
export async function getAllComments(): Promise<Comment[]> {
  const q = query(collection(db, COMMENTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Comment));
}

export async function setCommentStatus(id: string, status: "approved" | "rejected") {
  return updateDoc(doc(db, COMMENTS_COLLECTION, id), { status });
}

export async function deleteComment(id: string) {
  return deleteDoc(doc(db, COMMENTS_COLLECTION, id));
}

// ---- Contact form messages (separate from guestbook comments) ----

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Timestamp | null;
}

const MESSAGES_COLLECTION = "messages";

export async function submitMessage(name: string, email: string, message: string) {
  return addDoc(collection(db, MESSAGES_COLLECTION), {
    name,
    email,
    message,
    read: false,
    createdAt: serverTimestamp(),
  });
}
