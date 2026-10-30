import { getProducts } from "@/lib/products";
import CollectionBanner from "@/components/shop/CollectionBanner";
import CollectionView from "@/components/shop/CollectionView";
import Newsletter from "@/components/Newsletter";
import { IMAGES } from "@/lib/site";

export const revalidate = 60;
export const metadata = { title: "Women — Goat Mode" };

export default async function WomenPage() {
  const items = await getProducts({ gender: "women" }).catch(() => []);
  return (
    <>
      <CollectionBanner
        eyebrow="Women"
        title="Move like"
        italic="yourself."
        intro="Sculpting leggings, supportive tops and studio-ready layers — designed to support your rhythm and celebrate every kind of movement."
        image={IMAGES.womenPanel}
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
            { id: "leggings", label: "Leggings" },
            { id: "tops", label: "Tops" },
            { id: "shorts", label: "Shorts" },
            { id: "hoodies", label: "Hoodies" },
          ]}
        />
      </div>
      <Newsletter />
    </>
  );
}
