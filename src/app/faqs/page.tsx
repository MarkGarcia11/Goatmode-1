import InfoPage, { Block } from "@/components/InfoPage";

export const metadata = { title: "FAQs — Goat Mode" };

export default function FAQs() {
  return (
    <InfoPage eyebrow="Support" title="Questions," italic="answered." intro="Everything you need to know about shopping with Goat Mode. Still curious? Reach out via our contact page.">
      <Block h="How does sizing run?">
        <p>Our pieces follow standard athletic sizing. Tops and hoodies have a slightly relaxed cut, while leggings and compression pieces are designed to fit close. Check the size guide on any product page — when between sizes, we suggest sizing up for comfort.</p>
      </Block>
      <Block h="How long does shipping take?">
        <p>Orders ship within 2–4 business days. Delivery times vary by location and are confirmed at checkout. Shipping is complimentary on orders over $150.</p>
      </Block>
      <Block h="What is your return policy?">
        <p>We offer easy 30-day returns and exchanges on unworn items with tags attached. Start a return from the contact page and we&apos;ll guide you through it.</p>
      </Block>
      <Block h="When will new collections drop?">
        <p>We release considered, limited collections rather than fast seasonal churn. Join the newsletter for first access to every launch.</p>
      </Block>
      <Block h="How do I care for my pieces?">
        <p>Machine wash cold with like colours, skip the fabric softener, and hang or tumble dry low. A little care keeps performance fabrics performing.</p>
      </Block>
    </InfoPage>
  );
}
