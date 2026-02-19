import { useEffect, useState, useRef } from "react";
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
  Activity,
} from "lucide-react";
import {
  useSensorSimulation,
  getPhRecommendation,
  getTempRecommendation,
  type WaterStatus,
} from "@/hooks/useSensorData";

const statusConfig: Record<WaterStatus, { label: string; icon: typeof ShieldCheck; gradient: string; glow: string; desc: string }> = {
  safe: { label: "Healthy", icon: ShieldCheck, gradient: "bg-gradient-safe", glow: "card-glow-safe", desc: "All parameters within optimal range" },
  warning: { label: "Warning", icon: ShieldAlert, gradient: "bg-gradient-warning", glow: "card-glow-warning", desc: "Some parameters need attention" },
  critical: { label: "Critical", icon: ShieldX, gradient: "bg-gradient-danger", glow: "card-glow-danger", desc: "Immediate action required" },
};

const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round((start + (end - start) * eased) * 10) / 10);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevRef.current = value;
  }, [value]);

  return <>{display}{suffix}</>;
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
    <div className="min-h-screen bg-gradient-section">
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              <Activity className="h-3 w-3" /> LIVE MONITORING
            </div>
            <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time pond water quality data</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs text-muted-foreground card-glow">
            <RefreshCw className={`h-3.5 w-3.5 text-accent ${pulse ? "animate-spin" : ""}`} />
            Auto-refreshing every 5s
          </div>
        </div>

        {/* Main status card */}
        <motion.div
          key={status}
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`mb-8 rounded-3xl p-8 text-center ${cfg.gradient} ${cfg.glow} relative overflow-hidden md:p-10`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 h-32 w-32 rounded-full bg-primary-foreground blur-3xl" />
            <div className="absolute bottom-4 left-8 h-24 w-24 rounded-full bg-primary-foreground blur-2xl" />
          </div>
          <div className="relative z-10">
            <StatusIcon className="mx-auto mb-4 h-14 w-14 text-primary-foreground md:h-20 md:w-20" />
            <h2 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">{cfg.label}</h2>
            <p className="mt-2 text-sm text-primary-foreground/70">{cfg.desc}</p>
          </div>
        </motion.div>

        {/* Sensor cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* pH */}
          <motion.div layout className="group rounded-3xl border bg-card p-6 card-glow transition-all hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-muted-foreground">pH Level</span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse-glow glow-dot" />
            </div>
            <p className="text-5xl font-extrabold text-foreground md:text-6xl">
              <CountUp value={data.ph} />
            </p>
            <div className="mt-3 rounded-lg bg-secondary/50 px-3 py-1.5">
              <p className="text-xs text-muted-foreground">Optimal range: <span className="font-semibold text-foreground">6.5 – 8.5</span></p>
            </div>
          </motion.div>

          {/* Temperature */}
          <motion.div layout className="group rounded-3xl border bg-card p-6 card-glow transition-all hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <Thermometer className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-bold text-muted-foreground">Temperature</span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse-glow glow-dot" />
            </div>
            <p className="text-5xl font-extrabold text-foreground md:text-6xl">
              <CountUp value={data.temperature} suffix="°C" />
            </p>
            <div className="mt-3 rounded-lg bg-secondary/50 px-3 py-1.5">
              <p className="text-xs text-muted-foreground">Optimal range: <span className="font-semibold text-foreground">23°C – 30°C</span></p>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.div layout className="group rounded-3xl border bg-card p-6 card-glow transition-all hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-muted-foreground">Last Updated</span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-safe animate-pulse-glow glow-dot" />
            </div>
            <p className="text-3xl font-extrabold text-foreground md:text-4xl">
              {data.lastUpdated.toLocaleTimeString()}
            </p>
            <div className="mt-3 rounded-lg bg-secondary/50 px-3 py-1.5">
              <p className="text-xs text-muted-foreground">{data.lastUpdated.toLocaleDateString()}</p>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        {(phRec || tempRec) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border bg-card p-6 card-glow"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                <Lightbulb className="h-5 w-5 text-warning" />
              </div>
              <h3 className="font-bold text-foreground">Smart Recommendations</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {phRec && (
                <div className="rounded-xl bg-secondary/50 p-4 border border-border/50">
                  <p className="text-sm font-medium text-foreground">💧 <span className="font-bold">pH:</span> {phRec}</p>
                </div>
              )}
              {tempRec && (
                <div className="rounded-xl bg-secondary/50 p-4 border border-border/50">
                  <p className="text-sm font-medium text-foreground">🌡️ <span className="font-bold">Temperature:</span> {tempRec}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
