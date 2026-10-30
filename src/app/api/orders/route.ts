import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, items, subtotalCents } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }
    const [row] = await db
      .insert(orders)
      .values({ email, firstName, lastName, items, subtotalCents: subtotalCents ?? 0, status: "pending" })
      .returning();
    return NextResponse.json({ orderId: row.id, message: "Order reserved. Payment integration coming soon." });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not place order. Please try again." }, { status: 500 });
  }
}
