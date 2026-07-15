import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Server-only. Uses a Firebase service account, NOT the public client keys.
// Set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local / Vercel env vars to the
// full JSON of a service account key (Firebase Console > Project Settings
// > Service Accounts > Generate new private key), stringified on one line.
function getAdminApp(): App {
  if (getApps().length) return getApps()[0];

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY is not set. Add it to .env.local (see README)."
    );
  }
  const serviceAccount = JSON.parse(raw);
  return initializeApp({ credential: cert(serviceAccount) });
}

// Lazy getter: only touches env vars / initializes the app when a route
// handler actually calls this at request time — never at build time.
let cachedDb: Firestore | null = null;
export function getAdminDb(): Firestore {
  if (!cachedDb) {
    cachedDb = getFirestore(getAdminApp());
  }
  return cachedDb;
}
