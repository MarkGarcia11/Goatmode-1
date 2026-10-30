import { notFound } from "next/navigation";
import { getProductBySlug, getRelated } from "@/lib/products";
import ProductDetail from "@/components/shop/ProductDetail";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug).catch(() => null);
  return { title: p ? `${p.name} — Goat Mode` : "Product — Goat Mode" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();
  const related = await getRelated(product).catch(() => []);
  return <ProductDetail product={product} related={related} />;
}
