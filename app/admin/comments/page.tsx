import { redirect } from "next/navigation";

// Comments moderation moved into the unified admin dashboard shell.
// This redirect keeps the old bookmarked URL working.
export default function LegacyCommentsRedirect() {
  redirect("/admin/dashboard/comments");
}
