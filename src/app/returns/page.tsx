import InfoPage, { Block } from "@/components/InfoPage";

export const metadata = { title: "Returns & Exchanges — Goat Mode" };

export default function Returns() {
  return (
    <InfoPage eyebrow="Customer care" title="Returns &" italic="exchanges." intro="Changed your mind? No stress. Easy returns within 30 days of delivery.">
      <Block h="Eligibility">
        <p>Items must be unworn, unwashed and with tags attached. For hygiene reasons, we can only accept returns in original condition.</p>
      </Block>
      <Block h="How to start a return">
        <p>Send us a message via the contact page with your order number and the items you&apos;d like to return or exchange. We&apos;ll reply with instructions within 1–2 business days.</p>
      </Block>
      <Block h="Refunds">
        <p>Once your return arrives and is inspected, refunds are issued to your original payment method within 5–10 business days.</p>
      </Block>
      <Block h="Exchanges">
        <p>Need a different size or colour? Let us know in your message and we&apos;ll arrange an exchange where stock allows.</p>
      </Block>
    </InfoPage>
  );
}
