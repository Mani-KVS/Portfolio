import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import { Resend } from "resend";

// Set with: firebase functions:secrets:set RESEND_API_KEY
const resendApiKey = defineSecret("RESEND_API_KEY");
const notifyEmail = defineSecret("NOTIFY_EMAIL"); // your inbox, e.g. you@example.com

/**
 * Fires whenever a new document is added to the "comments" collection
 * (i.e. whenever a visitor submits the Guestbook form). Sends you an
 * email with the visitor's name, email, comment, and timestamp.
 *
 * Free tier: Resend's free plan covers 100 emails/day / 3,000/month,
 * which is more than enough for a portfolio guestbook.
 */
export const notifyOnNewComment = onDocumentCreated(
  { document: "comments/{commentId}", secrets: [resendApiKey, notifyEmail] },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const resend = new Resend(resendApiKey.value());
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    await resend.emails.send({
      from: "Portfolio Guestbook <onboarding@resend.dev>",
      to: notifyEmail.value(),
      subject: `New guestbook comment from ${data.name}`,
      html: `
        <h2>New comment on your portfolio</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Comment:</strong> ${data.message}</p>
        <p><strong>Submitted:</strong> ${submittedAt}</p>
        <p>Approve or reject it from your Admin &gt; Comments page.</p>
      `,
    });
  }
);
