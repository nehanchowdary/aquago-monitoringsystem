import { motion } from "framer-motion";
import { AlertTriangle, Thermometer, Droplets, Clock, Wrench, Bell } from "lucide-react";

interface Alert {
  id: number;
  type: "ph" | "temperature";
  severity: "warning" | "critical";
  message: string;
  recommendation: string;
  time: string;
}

const alerts: Alert[] = [
  { id: 1, type: "ph", severity: "critical", message: "Warning! pH dropped to 5.7", recommendation: "Add agricultural lime to raise pH levels immediately.", time: "2 minutes ago" },
  { id: 2, type: "temperature", severity: "warning", message: "Temperature rising to 32°C", recommendation: "Start aerator to maintain dissolved oxygen levels.", time: "8 minutes ago" },
  { id: 3, type: "ph", severity: "warning", message: "pH level at 8.6 — slightly above safe range", recommendation: "Consider partial water change with fresh water to dilute.", time: "25 minutes ago" },
  { id: 4, type: "temperature", severity: "critical", message: "Temperature reached 35°C — danger zone!", recommendation: "Immediately run aerator. Consider shade netting over pond.", time: "1 hour ago" },
  { id: 5, type: "ph", severity: "warning", message: "pH dropped to 6.2 — approaching acidic", recommendation: "Monitor closely. Prepare lime for application if it drops further.", time: "3 hours ago" },
];

const AlertsPage = () => (
  <div className="min-h-screen bg-gradient-section">
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
          <Bell className="h-3 w-3" /> ALERT CENTER
        </div>
        <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Alerts & Recommendations</h1>
        <p className="text-sm text-muted-foreground">
          Recent alerts from your pond sensors with recommended actions.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`group rounded-2xl border bg-card p-5 transition-all hover:scale-[1.01] ${
              alert.severity === "critical" ? "card-glow-danger border-danger/20" : "card-glow-warning border-warning/20"
            }`}
          >
            <div className="flex flex-wrap items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  alert.severity === "critical" ? "bg-danger/10" : "bg-warning/10"
                }`}
              >
                {alert.type === "ph" ? (
                  <Droplets className={`h-5 w-5 ${alert.severity === "critical" ? "text-danger" : "text-warning"}`} />
                ) : (
                  <Thermometer className={`h-5 w-5 ${alert.severity === "critical" ? "text-danger" : "text-warning"}`} />
                )}
              </div>

              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    alert.severity === "critical" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"
                  }`}>
                    <AlertTriangle className="h-3 w-3" />
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-sm font-bold text-foreground">{alert.message}</span>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-xl bg-secondary/50 p-3 border border-border/50">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-foreground">{alert.recommendation}</p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default AlertsPage;
