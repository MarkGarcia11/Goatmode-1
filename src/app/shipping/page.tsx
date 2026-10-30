import InfoPage, { Block } from "@/components/InfoPage";

export const metadata = { title: "Shipping Policy — Goat Mode" };

export default function Shipping() {
  return (
    <InfoPage eyebrow="Customer care" title="Shipping" italic="policy." intro="Clear, honest delivery information — no surprises at checkout.">
      <Block h="Processing time">
        <p>Orders are prepared and dispatched within 2–4 business days. You&apos;ll receive a confirmation email the moment your order leaves us.</p>
      </Block>
      <Block h="Delivery & rates">
        <p>Standard shipping is a flat $8, and complimentary on all orders over $150. Estimated delivery windows are shown at checkout and vary by destination.</p>
      </Block>
      <Block h="Tracking">
        <p>Every order includes tracking. If your parcel hasn&apos;t moved in a few days, contact us and we&apos;ll look into it directly with the carrier.</p>
      </Block>
      <Block h="Delays & issues">
        <p>Weather, peak periods and carrier disruptions can occasionally cause delays. If something looks wrong, reach out — we&apos;ll make it right.</p>
      </Block>
    </InfoPage>
  );
}
