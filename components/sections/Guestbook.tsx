"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingInput, FloatingTextarea } from "@/components/ui/FloatingField";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { getApprovedComments, type Comment } from "@/firebase/firestore";

const PAGE_SIZE = 4;

export function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getApprovedComments()
      .then(setComments)
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, rating }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const totalPages = Math.max(1, Math.ceil(comments.length / PAGE_SIZE));
  const pageItems = comments.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section id="guestbook" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading label="Guestbook" title="Visitor Feedback & Notes" />

      <div className="grid gap-8 md:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="glass-card h-fit rounded-2xl p-6 sm:p-7"
        >
          <div className="space-y-4">
            <FloatingInput label="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <FloatingInput
              label="Your email (not shown publicly)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FloatingTextarea
              label="Leave a comment"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
              <span className="text-xs font-medium text-[var(--color-ink-muted)]">
                Your rating
              </span>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-solid)] px-5 py-3 text-sm font-semibold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-60"
          >
            <Send size={15} />
            {status === "sending" ? "Submitting..." : "Submit Comment"}
          </button>
          {status === "sent" && (
            <p className="mt-3 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Thanks! Your comment is awaiting approval and will appear here soon.
            </p>
          )}
          {status === "error" && <p className="mt-3 text-center text-xs text-red-500">{errorMsg}</p>}
        </motion.form>

        <div className="space-y-3">
          {loading && (
            <p className="text-sm text-[var(--color-ink-muted)]">
              Loading comments…
            </p>
          )}
          {!loading && comments.length === 0 && (
            <div className="glass-card rounded-2xl p-8 text-center text-sm text-[var(--color-ink-muted)]">
              No comments yet — be the first to leave a note!
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {pageItems.map((comment) => (
                <div key={comment.id} className="glass-card rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={comment.name} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[var(--color-ink)]">{comment.name}</p>
                        {comment.rating && <StarRating value={comment.rating} readonly size={12} />}
                      </div>
                      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {comments.length > PAGE_SIZE && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="glass-card flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs text-[var(--color-ink-muted)]">
                {page + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="glass-card flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

