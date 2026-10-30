import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { eq, and, desc, asc, sql } from "drizzle-orm";

export type ProductFilter = {
  gender?: string;
  category?: string;
  sort?: string;
  search?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  limit?: number;
};

export async function getProducts(f: ProductFilter = {}): Promise<Product[]> {
  const conds = [];
  if (f.gender && f.gender !== "all") conds.push(eq(products.gender, f.gender));
  if (f.category && f.category !== "all") conds.push(eq(products.category, f.category));
  if (f.isNew) conds.push(eq(products.isNew, true));
  if (f.isBestSeller) conds.push(eq(products.isBestSeller, true));
  if (f.search) {
    const q = `%${f.search.toLowerCase()}%`;
    conds.push(sql`lower(${products.name}) LIKE ${q}`);
  }
  let order: ReturnType<typeof desc> | ReturnType<typeof asc> = desc(products.createdAt);
  if (f.sort === "price-asc") order = asc(products.priceCents);
  if (f.sort === "price-desc") order = desc(products.priceCents);
  if (f.sort === "name") order = asc(products.name);

  const query = db
    .select()
    .from(products)
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(order)
    .limit(f.limit ?? 60);
  return query;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.gender, product.gender), sql`${products.id} != ${product.id}`))
    .limit(limit);
  return rows;
}

// Fallback seed data used if DB is empty (keeps preview resilient)
export const SEED_PRODUCTS = [
  {
    slug: "ascent-training-tee-men",
    name: "Ascent Training Tee",
    gender: "men",
    category: "shirts",
    categoryLabel: "Men's Shirts",
    priceCents: 4800,
    compareAtCents: null,
    description:
      "A clean, athletic training tee cut for natural movement. Soft-touch knit with a structured drape that holds its shape from warm-up to cool-down.",
    details: ["Athletic regular fit", "Soft-touch performance knit", "Reinforced flatlock seams", "Subtle tonal chest mark"],
    colors: [
      { name: "Charcoal", hex: "#222321" },
      { name: "Stone", hex: "#D8D3C9" },
      { name: "Sage", hex: "#A4AA9A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.pexels.com/photos/18799138/pexels-photo-18799138.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/34917426/pexels-photo-34917426.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: true,
    isBestSeller: true,
    salesCount: 214,
  },
  {
    slug: "drift-oversized-tee-men",
    name: "Drift Oversized Tee",
    gender: "men",
    category: "shirts",
    categoryLabel: "Men's Shirts",
    priceCents: 5400,
    compareAtCents: null,
    description:
      "An oversized silhouette with dropped shoulders and a heavyweight hand-feel. Made for training days and rest days alike.",
    details: ["Relaxed oversized fit", "Dropped shoulder", "Ribbed collar", "Back graphic print"],
    colors: [
      { name: "Ivory", hex: "#F1EDE3" },
      { name: "Charcoal", hex: "#222321" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.pexels.com/photos/34917428/pexels-photo-34917428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/25315911/pexels-photo-25315911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: true,
    isBestSeller: false,
    salesCount: 86,
  },
  {
    slug: "stride-training-short-men",
    name: "Stride 7\" Training Short",
    gender: "men",
    category: "shorts",
    categoryLabel: "Men's Shorts",
    priceCents: 5200,
    compareAtCents: null,
    description:
      "A versatile 7-inch training short with a secure waistband and side-split hem for unrestricted movement.",
    details: ["7-inch inseam", "Elastic waistband + drawcord", "Side zip pocket", "Quick-dry woven"],
    colors: [
      { name: "Charcoal", hex: "#222321" },
      { name: "Taupe", hex: "#B9B1A5" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.pexels.com/photos/12931755/pexels-photo-12931755.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/4046747/pexels-photo-4046747.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: true,
    isBestSeller: true,
    salesCount: 178,
  },
  {
    slug: "haven-hoodie-men",
    name: "Haven Heavyweight Hoodie",
    gender: "men",
    category: "hoodies",
    categoryLabel: "Men's Hoodies",
    priceCents: 8900,
    compareAtCents: null,
    description:
      "A heavyweight fleece hoodie with a structured hood and brushed interior. Your uniform for cold mornings and late sessions.",
    details: ["450 GSM brushed fleece", "Double-lined hood", "Kangaroo pocket", "Ribbed cuffs & hem"],
    colors: [
      { name: "Stone", hex: "#D8D3C9" },
      { name: "Charcoal", hex: "#222321" },
      { name: "Sage", hex: "#A4AA9A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.pexels.com/photos/9789598/pexels-photo-9789598.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/27855501/pexels-photo-27855501.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: false,
    isBestSeller: true,
    salesCount: 196,
  },
  {
    slug: "flow-high-rise-legging",
    name: "Flow High-Rise Legging",
    gender: "women",
    category: "leggings",
    categoryLabel: "Women's Leggings",
    priceCents: 6800,
    compareAtCents: null,
    description:
      "A high-rise legging with sculpting compression and a second-skin feel. Stays in place through every squat, sprint and stretch.",
    details: ["High-rise waistband", "Sculpting compression", "Hidden waistband pocket", "25-inch inseam"],
    colors: [
      { name: "Charcoal", hex: "#222321" },
      { name: "Sage", hex: "#A4AA9A" },
      { name: "Taupe", hex: "#B9B1A5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.pexels.com/photos/30500802/pexels-photo-30500802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/30246177/pexels-photo-30246177.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: true,
    isBestSeller: true,
    salesCount: 243,
  },
  {
    slug: "align-seamless-top",
    name: "Align Seamless Top",
    gender: "women",
    category: "tops",
    categoryLabel: "Women's Tops",
    priceCents: 4600,
    compareAtCents: null,
    description:
      "A seamless long-sleeve top with a cropped cut and thumbholes. Moves with you like a second layer of skin.",
    details: ["Seamless knit", "Cropped silhouette", "Thumbholes", "Removable padding friendly"],
    colors: [
      { name: "Ivory", hex: "#F1EDE3" },
      { name: "Sage", hex: "#A4AA9A" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.pexels.com/photos/16122070/pexels-photo-16122070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/29138809/pexels-photo-29138809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: true,
    isBestSeller: false,
    salesCount: 74,
  },
  {
    slug: "tempo-sports-bra",
    name: "Tempo Medium-Support Bra",
    gender: "women",
    category: "tops",
    categoryLabel: "Women's Tops",
    priceCents: 4200,
    compareAtCents: null,
    description:
      "Medium-support sports bra with a clean scoop neckline and strappy back. Confident support for training and studio days.",
    details: ["Medium support", "Scoop neckline", "Strappy open back", "Removable cups"],
    colors: [
      { name: "Charcoal", hex: "#222321" },
      { name: "Stone", hex: "#D8D3C9" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.pexels.com/photos/7674499/pexels-photo-7674499.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/39635347/pexels-photo-39635347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: false,
    isBestSeller: true,
    salesCount: 187,
  },
  {
    slug: "pulse-biker-short",
    name: "Pulse 6\" Biker Short",
    gender: "women",
    category: "shorts",
    categoryLabel: "Women's Shorts",
    priceCents: 4400,
    compareAtCents: null,
    description:
      "A 6-inch biker short with sculpting compression and no front seam. Made for running, riding and everything between.",
    details: ["6-inch inseam", "No front seam", "High-rise waistband", "Side pocket"],
    colors: [
      { name: "Charcoal", hex: "#222321" },
      { name: "Taupe", hex: "#B9B1A5" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.pexels.com/photos/30246208/pexels-photo-30246208.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/30438293/pexels-photo-30438293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: true,
    isBestSeller: false,
    salesCount: 92,
  },
  {
    slug: "summit-tank-men",
    name: "Summit Training Tank",
    gender: "men",
    category: "shirts",
    categoryLabel: "Men's Shirts",
    priceCents: 3800,
    compareAtCents: null,
    description:
      "A lightweight training tank with an open cut that keeps you cool when the session heats up.",
    details: ["Lightweight mesh panels", "Open athletic cut", "Sweat-wicking", "Curved hem"],
    colors: [
      { name: "Charcoal", hex: "#222321" },
      { name: "Stone", hex: "#D8D3C9" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.pexels.com/photos/9361427/pexels-photo-9361427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/39147541/pexels-photo-39147541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: false,
    isBestSeller: false,
    salesCount: 45,
  },
  {
    slug: "serene-hoodie-women",
    name: "Serene Cropped Hoodie",
    gender: "women",
    category: "hoodies",
    categoryLabel: "Women's Hoodies",
    priceCents: 7800,
    compareAtCents: null,
    description:
      "A cropped fleece hoodie with a relaxed fit and dropped shoulders. Softness you will live in.",
    details: ["Cropped relaxed fit", "Brushed fleece", "Dropped shoulders", "Tonal embroidery"],
    colors: [
      { name: "Stone", hex: "#D8D3C9" },
      { name: "Sage", hex: "#A4AA9A" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.pexels.com/photos/6674232/pexels-photo-6674232.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/14055661/pexels-photo-14055661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: true,
    isBestSeller: false,
    salesCount: 63,
  },
  {
    slug: "motion-race-day-top",
    name: "Motion Studio Top",
    gender: "women",
    category: "tops",
    categoryLabel: "Women's Tops",
    priceCents: 4800,
    compareAtCents: null,
    description:
      "A studio-ready top with a flattering square neckline and buttery compression fabric.",
    details: ["Square neckline", "Buttery compression", "Built-in shelf", "Studio to street"],
    colors: [
      { name: "Taupe", hex: "#B9B1A5" },
      { name: "Charcoal", hex: "#222321" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.pexels.com/photos/39635391/pexels-photo-39635391.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/6805340/pexels-photo-6805340.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: false,
    isBestSeller: false,
    salesCount: 51,
  },
  {
    slug: "apex-jogger-men",
    name: "Apex Tapered Jogger",
    gender: "men",
    category: "shorts",
    categoryLabel: "Men's Shorts",
    priceCents: 7200,
    compareAtCents: null,
    description:
      "A tapered jogger with articulated knees and zip ankles. Clean enough for the street, built for training.",
    details: ["Tapered fit", "Articulated knees", "Zip ankles", "3 zip pockets"],
    colors: [
      { name: "Charcoal", hex: "#222321" },
      { name: "Sage", hex: "#A4AA9A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.pexels.com/photos/5666983/pexels-photo-5666983.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/28757997/pexels-photo-28757997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    isNew: false,
    isBestSeller: true,
    salesCount: 164,
  },
];
