import { getProducts } from "@/lib/products";
import CollectionBanner from "@/components/shop/CollectionBanner";
import CollectionView from "@/components/shop/CollectionView";
import Newsletter from "@/components/Newsletter";
import { IMAGES } from "@/lib/site";

export const revalidate = 60;
export const metadata = { title: "Shop All — Goat Mode" };

export default async function ShopPage() {
  const items = await getProducts({}).catch(() => []);
  return (
    <>
      <CollectionBanner
        eyebrow="All Products"
        title="Every essential,"
        italic="one standard."
        intro="The complete Goat Mode collection for men and women. A tight edit of training and everyday pieces — each one earned its place."
        image={IMAGES.hero}
      />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <CollectionView
          products={items.map((p) => ({
            slug: p.slug,
            name: p.name,
            categoryLabel: p.categoryLabel,
            priceCents: p.priceCents,
            compareAtCents: p.compareAtCents,
            images: p.images,
            colors: p.colors,
            colorsFull: p.colors,
            sizes: p.sizes,
            isNew: p.isNew,
            gender: p.gender,
            category: p.category,
          }))}
          categories={[
            { id: "shirts", label: "Shirts" },
            { id: "shorts", label: "Shorts" },
            { id: "hoodies", label: "Hoodies" },
            { id: "leggings", label: "Leggings" },
            { id: "tops", label: "Tops" },
          ]}
        />
      </div>
      <Newsletter />
    </>
  );
}
