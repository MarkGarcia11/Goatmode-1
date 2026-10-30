import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const data = await getProducts({
      gender: searchParams.get("gender") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      search: searchParams.get("search") ?? searchParams.get("q") ?? undefined,
      isNew: searchParams.get("new") === "1",
      isBestSeller: searchParams.get("best") === "1",
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
    });
    return NextResponse.json({ products: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
