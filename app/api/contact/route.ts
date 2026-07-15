import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { submitMessage } from "@/firebase/firestore";

// Uses the same Resend account/free tier as the guestbook notifications.
// Set RESEND_API_KEY and NOTIFY_EMAIL in .env.local / Vercel env vars.
export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // Store the message in Firestore so it shows up in Admin > Messages,
  // even if email sending isn't configured yet or briefly fails.
  try {
  await submitMessage(name.trim(), email.trim(), message.trim());
  console.log("✅ Message saved to Firestore");
} catch (error) {
  console.error("❌ Firestore Error:", error);

  return NextResponse.json(
    {
      error: "Failed to save message.",
      details: String(error),
    },
    { status: 500 }
  );
}

  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
    return NextResponse.json(
      { error: "Email is not configured yet. Set RESEND_API_KEY and NOTIFY_EMAIL." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL,
      replyTo: email,
      subject: `Portfolio contact form: ${name}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message. Try again later." }, { status: 502 });
  }
}
