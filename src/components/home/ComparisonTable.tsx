import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Manual Visits", traditional: true, aquago: false },
  { feature: "Real-Time Monitoring", traditional: false, aquago: true },
  { feature: "Instant SMS Alerts", traditional: false, aquago: true },
  { feature: "Affordable for Small Farms", traditional: false, aquago: true },
  { feature: "Farmer-Friendly UI", traditional: false, aquago: true },
  { feature: "Solar Powered", traditional: false, aquago: true },
];

const ComparisonTable = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="overflow-hidden rounded-2xl border bg-card card-glow"
  >
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-secondary/50">
          <th className="px-6 py-4 text-left font-bold text-foreground">Feature</th>
          <th className="px-6 py-4 text-center font-bold text-muted-foreground">Traditional</th>
          <th className="px-6 py-4 text-center font-bold text-accent">AquaGo</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.feature} className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
            <td className="px-6 py-3.5 font-medium text-foreground">{row.feature}</td>
            <td className="px-6 py-3.5 text-center">
              {row.traditional ? (
                <Check className="mx-auto h-5 w-5 text-muted-foreground" />
              ) : (
                <X className="mx-auto h-5 w-5 text-danger/50" />
              )}
            </td>
            <td className="px-6 py-3.5 text-center">
              {row.aquago ? (
                <Check className="mx-auto h-5 w-5 text-accent" />
              ) : (
                <X className="mx-auto h-5 w-5 text-danger/50" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

export default ComparisonTable;
