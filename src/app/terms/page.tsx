import InfoPage, { Block } from "@/components/InfoPage";

export const metadata = { title: "Terms & Conditions — Goat Mode" };

export default function Terms() {
  return (
    <InfoPage eyebrow="Legal" title="Terms &" italic="conditions." intro="The ground rules for shopping with Goat Mode — written plainly. Last updated: 2026.">
      <Block h="Orders & pricing">
        <p>All prices are shown in USD and exclude taxes until checkout. We reserve the right to correct pricing errors and to cancel or refund orders affected by them. Sample pricing displayed pre-launch is subject to confirmation.</p>
      </Block>
      <Block h="Products">
        <p>We work hard to represent colours and fit accurately, but screens vary. If a product isn&apos;t as described, our 30-day return promise applies.</p>
      </Block>
      <Block h="Acceptable use">
        <p>This site is for personal shopping. Resale of launch stock in bulk, fraud, or abuse of support channels may result in cancelled orders or restricted access.</p>
      </Block>
      <Block h="Liability">
        <p>To the extent permitted by law, our liability is limited to the value of the order in question. Nothing here limits rights you hold under consumer law.</p>
      </Block>
    </InfoPage>
  );
}
