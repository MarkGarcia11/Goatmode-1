import Hero from "@/components/home/Hero";
import { NewArrivals, BestSellers } from "@/components/home/ProductRails";
import {
  Marquee,
  DualCollections,
  BrandStory,
  Campaign,
  ShopByCategory,
  Values,
  Community,
} from "@/components/home/HomeSections";
import Newsletter from "@/components/Newsletter";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <DualCollections />
      <NewArrivals />
      <BrandStory />
      <Campaign />
      <ShopByCategory />
      <BestSellers />
      <Values />
      <Community />
      <Newsletter />
    </>
  );
}
