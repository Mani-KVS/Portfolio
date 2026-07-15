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
    <section id="guestbook" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading label="Guestbook" title="Sign my guestbook" />

      <div className="grid gap-8 md:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-card glow-ring h-fit rounded-3xl p-7"
        >
          <div className="space-y-5">
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
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] px-4 py-3 dark:border-[var(--color-dark-border)]">
              <span className="text-xs font-medium text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                Your rating
              </span>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="gradient-button mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--color-glow)] disabled:opacity-60 dark:shadow-[0_8px_24px_-8px_var(--color-dark-glow)]"
          >
            <Send size={15} />
            {status === "sending" ? "Submitting..." : "Submit Comment"}
          </button>
          {status === "sent" && (
            <p className="mt-3 text-center text-xs text-emerald-500">
              Thanks! Your comment is awaiting approval and will appear here soon.
            </p>
          )}
          {status === "error" && <p className="mt-3 text-center text-xs text-red-500">{errorMsg}</p>}
        </motion.form>

        <div className="space-y-3">
          {loading && (
            <p className="text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
              Loading comments…
            </p>
          )}
          {!loading && comments.length === 0 && (
            <div className="glass-card rounded-3xl p-8 text-center text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
              No comments yet — be the first to say hi!
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {pageItems.map((comment) => (
                <div key={comment.id} className="glass-card glow-ring rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={comment.name} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{comment.name}</p>
                        {comment.rating && <StarRating value={comment.rating} readonly size={12} />}
                      </div>
                      <p className="mt-1 text-sm text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
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
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="glass-card flex h-8 w-8 items-center justify-center rounded-full disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs text-[var(--color-ink-muted)] dark:text-[var(--color-dark-ink-muted)]">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="glass-card flex h-8 w-8 items-center justify-center rounded-full disabled:opacity-40"
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
