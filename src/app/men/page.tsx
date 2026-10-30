import { getProducts } from "@/lib/products";
import CollectionBanner from "@/components/shop/CollectionBanner";
import CollectionView from "@/components/shop/CollectionView";
import Newsletter from "@/components/Newsletter";
import { IMAGES } from "@/lib/site";

export const revalidate = 60;
export const metadata = { title: "Men — Goat Mode" };

export default async function MenPage() {
  const items = await getProducts({ gender: "men" }).catch(() => []);
  return (
    <>
      <CollectionBanner
        eyebrow="Men"
        title="Train in"
        italic="your element."
        intro="Athletic tees, training shorts and heavyweight layers — cut for power, comfort and everyday ease. Built for your journey, whatever pace you set."
        image={IMAGES.menPanel}
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
          ]}
        />
      </div>
      <Newsletter />
    </>
  );
}
