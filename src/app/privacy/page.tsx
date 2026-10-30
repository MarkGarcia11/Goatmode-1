import InfoPage, { Block } from "@/components/InfoPage";

export const metadata = { title: "Privacy Policy — Goat Mode" };

export default function Privacy() {
  return (
    <InfoPage eyebrow="Legal" title="Privacy" italic="policy." intro="Your privacy matters. This is a clear summary of how we handle your information. Last updated: 2026.">
      <Block h="What we collect">
        <p>When you shop with us, we collect contact details (name, email, shipping address), order contents, and newsletter preferences. Browsing data such as device type may be collected to improve the experience.</p>
      </Block>
      <Block h="How we use it">
        <p>Your information is used to fulfil orders, provide support, and — only with your consent — send collection updates. We never sell your personal data.</p>
      </Block>
      <Block h="Your rights">
        <p>You may request access, correction or deletion of your data at any time, and unsubscribe from marketing emails with one click. Contact us and we&apos;ll respond promptly.</p>
      </Block>
      <Block h="Security">
        <p>We use industry-standard safeguards to protect your information. Payment processing is handled by PCI-compliant providers — we never store card details.</p>
      </Block>
    </InfoPage>
  );
}
