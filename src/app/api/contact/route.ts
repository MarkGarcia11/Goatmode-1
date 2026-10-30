import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { name, email, topic, message } = await req.json();
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    await db.insert(contactMessages).values({ name: name.trim(), email: email.trim(), topic: topic ?? "General", message: message.trim() });
    return NextResponse.json({ message: "Message received. We'll be in touch within 1–2 business days." });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
