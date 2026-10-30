import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { SEED_PRODUCTS } from "@/lib/products";
import { sql } from "drizzle-orm";

export async function POST() {
  try {
    const count = await db.select({ c: sql<number>`count(*)` }).from(products);
    if (Number(count[0]?.c ?? 0) > 0) {
      return NextResponse.json({ message: "Already seeded", count: Number(count[0].c) });
    }
    await db.insert(products).values(SEED_PRODUCTS.map((p) => ({ ...p })));
    return NextResponse.json({ message: "Seeded", count: SEED_PRODUCTS.length });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await db.select({ c: sql<number>`count(*)` }).from(products);
    return NextResponse.json({ count: Number(count[0]?.c ?? 0) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Count failed" }, { status: 500 });
  }
}
