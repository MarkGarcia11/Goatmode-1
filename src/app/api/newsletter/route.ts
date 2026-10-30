import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    try {
      await db.insert(newsletterSubscribers).values({ email: email.toLowerCase().trim() });
    } catch {
      // likely duplicate — treat as success without revealing
    }
    return NextResponse.json({ message: "Welcome to Goat Mode. You're on the list." });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
