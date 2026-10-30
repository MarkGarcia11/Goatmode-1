import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  gender: text("gender").notNull(), // 'men' | 'women' | 'unisex'
  category: text("category").notNull(), // 'shirts' | 'shorts' | 'hoodies' | 'leggings' | 'tops'
  categoryLabel: text("category_label").notNull(),
  priceCents: integer("price_cents").notNull(),
  compareAtCents: integer("compare_at_cents"),
  description: text("description").notNull(),
  details: jsonb("details").$type<string[]>().notNull().default([]),
  colors: jsonb("colors").$type<{ name: string; hex: string }[]>().notNull().default([]),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  isNew: boolean("is_new").notNull().default(false),
  isBestSeller: boolean("is_best_seller").notNull().default(false),
  salesCount: integer("sales_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  items: jsonb("items").$type<{ slug: string; name: string; size: string; color: string; qty: number; priceCents: number; image: string }[]>().notNull(),
  subtotalCents: integer("subtotal_cents").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  topic: text("topic"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
