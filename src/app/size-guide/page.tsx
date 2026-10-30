import InfoPage, { Block } from "@/components/InfoPage";

export const metadata = { title: "Size Guide — Goat Mode" };

const rows = [
  ["XS", "32–34", "24–26", "33–35"],
  ["S", "34–36", "26–28", "35–37"],
  ["M", "36–38", "28–31", "37–40"],
  ["L", "39–42", "31–34", "40–43"],
  ["XL", "42–45", "34–38", "43–46"],
  ["XXL", "45–48", "38–41", "46–49"],
];

export default function SizeGuide() {
  return (
    <InfoPage eyebrow="Fit & sizing" title="Find your" italic="fit." intro="Body measurements in inches. Fit notes are included on every product page.">
      <Block h="Tops, tees & hoodies">
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-3 pr-4">Size</th><th className="py-3 pr-4">Chest</th><th className="py-3 pr-4">Waist</th><th className="py-3">Hip</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-line/60">
                  <td className="py-3 pr-4 font-bold text-charcoal">{r[0]}</td>
                  <td className="py-3 pr-4">{r[1]}</td>
                  <td className="py-3 pr-4">{r[2]}</td>
                  <td className="py-3">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
      <Block h="Leggings & shorts">
        <p>Our bottoms use the same waist and hip measurements. Leggings are high-compression — if you prefer a softer feel or are between sizes, take the larger size.</p>
      </Block>
      <Block h="Still unsure?">
        <p>Message us with your usual size and the piece you&apos;re eyeing, and we&apos;ll help you choose — replies within 1–2 business days.</p>
      </Block>
    </InfoPage>
  );
}
