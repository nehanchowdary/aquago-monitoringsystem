import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Thermometer,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Clock,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import {
  useSensorSimulation,
  getPhRecommendation,
  getTempRecommendation,
  type WaterStatus,
} from "@/hooks/useSensorData";

const statusConfig: Record<WaterStatus, { label: string; icon: typeof ShieldCheck; gradient: string; glow: string }> = {
  safe: { label: "Safe", icon: ShieldCheck, gradient: "bg-gradient-safe", glow: "card-glow-safe" },
  warning: { label: "Warning", icon: ShieldAlert, gradient: "bg-gradient-warning", glow: "card-glow-warning" },
  critical: { label: "Critical", icon: ShieldX, gradient: "bg-gradient-danger", glow: "card-glow-danger" },
};

const Dashboard = () => {
  const { data, status } = useSensorSimulation();
  const cfg = statusConfig[status];
  const StatusIcon = cfg.icon;

  const phRec = getPhRecommendation(data.ph);
  const tempRec = getTempRecommendation(data.temperature);

  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [data.lastUpdated]);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Live Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time pond water monitoring</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className={`h-3.5 w-3.5 ${pulse ? "animate-spin" : ""}`} />
          Auto-refreshing every 5s
        </div>
      </div>

      {/* Main status card */}
      <motion.div
        key={status}
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`mb-8 rounded-2xl p-6 text-center ${cfg.gradient} ${cfg.glow} md:p-8`}
      >
        <StatusIcon className="mx-auto mb-3 h-12 w-12 text-primary-foreground md:h-16 md:w-16" />
        <h2 className="text-2xl font-extrabold text-primary-foreground md:text-4xl">{cfg.label}</h2>
        <p className="mt-1 text-sm text-primary-foreground/80">Water Health Status</p>
      </motion.div>

      {/* Sensor cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* pH */}
        <motion.div
          layout
          className="card-glow rounded-2xl border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">pH Level</span>
          </div>
          <motion.p
            key={data.ph}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-4xl font-extrabold text-foreground md:text-5xl"
          >
            {data.ph}
          </motion.p>
          <p className="mt-1 text-xs text-muted-foreground">Optimal: 6.5 – 8.5</p>
        </motion.div>

        {/* Temperature */}
        <motion.div
          layout
          className="card-glow rounded-2xl border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Temperature</span>
          </div>
          <motion.p
            key={data.temperature}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-4xl font-extrabold text-foreground md:text-5xl"
          >
            {data.temperature}°C
          </motion.p>
          <p className="mt-1 text-xs text-muted-foreground">Optimal: 23°C – 30°C</p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          layout
          className="card-glow rounded-2xl border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Last Updated</span>
          </div>
          <p className="text-2xl font-bold text-foreground md:text-3xl">
            {data.lastUpdated.toLocaleTimeString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{data.lastUpdated.toLocaleDateString()}</p>
        </motion.div>
      </div>

      {/* Recommendations */}
      {(phRec || tempRec) && (
        <div className="rounded-2xl border bg-card p-6 card-glow">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            <h3 className="font-bold text-foreground">Smart Recommendations</h3>
          </div>
          <div className="space-y-3">
            {phRec && (
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-sm font-medium text-foreground">💧 pH: {phRec}</p>
              </div>
            )}
            {tempRec && (
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-sm font-medium text-foreground">🌡️ Temperature: {tempRec}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
