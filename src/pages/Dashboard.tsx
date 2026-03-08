import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Thermometer,
  Activity,
  RefreshCw,
  Lightbulb,
  Gauge,
  Waves,
  Power,
  PowerOff,
  Clock,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";
import { useIoTSimulation } from "@/hooks/useIoTSimulation";
import TankVisualization from "@/components/TankVisualization";
import { Button } from "@/components/ui/button";

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
  const { devices, tank, pump, lastUpdated, togglePump } = useIoTSimulation();
  const mainDevice = devices[0];

  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [lastUpdated]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            <Activity className="h-3 w-3" /> LIVE MONITORING
          </div>
          <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time water monitoring overview</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs text-muted-foreground card-glow">
          <RefreshCw className={`h-3.5 w-3.5 text-accent ${pulse ? "animate-spin" : ""}`} />
          Auto-refreshing every 5s
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Gauge, label: "Tank Level", value: `${Math.round(tank.level)}%`, color: tank.status === "critical" ? "text-destructive" : tank.status === "low" ? "text-warning" : "text-safe", bg: tank.status === "critical" ? "bg-destructive/10" : tank.status === "low" ? "bg-warning/10" : "bg-safe/10" },
          { icon: Waves, label: "Water Volume", value: `${tank.volume.toLocaleString()}L`, color: "text-primary", bg: "bg-primary/10" },
          { icon: pump.isOn ? Power : PowerOff, label: "Pump Status", value: pump.isOn ? "ON" : "OFF", color: pump.isOn ? "text-safe" : "text-muted-foreground", bg: pump.isOn ? "bg-safe/10" : "bg-muted" },
          { icon: Clock, label: "Last Updated", value: lastUpdated.toLocaleTimeString(), color: "text-accent", bg: "bg-accent/10" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border bg-card p-5 card-glow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{stat.label}</span>
            </div>
            <p className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tank Visualization */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border bg-card p-6 card-glow flex flex-col items-center justify-center">
          <h3 className="mb-4 text-sm font-bold text-muted-foreground">TANK LEVEL</h3>
          <TankVisualization tank={tank} />
        </motion.div>

        {/* Pump Control */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="rounded-2xl border bg-card p-6 card-glow">
          <h3 className="mb-4 text-sm font-bold text-muted-foreground">PUMP CONTROL</h3>
          <div className="flex flex-col items-center gap-4">
            <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all ${
              pump.isOn ? "border-safe bg-safe/10" : "border-muted bg-muted"
            }`}>
              {pump.isOn ? (
                <Power className="h-10 w-10 text-safe" />
              ) : (
                <PowerOff className="h-10 w-10 text-muted-foreground" />
              )}
              {pump.isOn && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-safe animate-pulse-glow glow-dot" />}
            </div>
            <p className={`text-lg font-extrabold ${pump.isOn ? "text-safe" : "text-muted-foreground"}`}>
              {pump.isOn ? "RUNNING" : "STOPPED"}
            </p>
            <div className="flex gap-2">
              <Button onClick={togglePump} variant={pump.isOn ? "destructive" : "default"} className="rounded-xl">
                {pump.isOn ? "Turn OFF" : "Turn ON"}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>Runtime today: <span className="font-semibold text-foreground">{Math.round(pump.runtime)} min</span></p>
              <p>Last toggled: {pump.lastToggled.toLocaleTimeString()}</p>
            </div>
          </div>
        </motion.div>

        {/* Sensor Data Panel */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="rounded-2xl border bg-card p-6 card-glow">
          <h3 className="mb-4 text-sm font-bold text-muted-foreground">SENSOR DATA</h3>
          {mainDevice && (
            <div className="space-y-3">
              <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Sensor ID</p>
                <p className="text-sm font-bold text-foreground">{mainDevice.id}</p>
              </div>
              <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <p className="text-sm font-bold text-foreground">{mainDevice.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                  <div className="flex items-center gap-1 mb-1">
                    <Droplets className="h-3 w-3 text-primary" />
                    <p className="text-xs text-muted-foreground">pH</p>
                  </div>
                  <p className="text-lg font-extrabold text-foreground"><CountUp value={mainDevice.ph} /></p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                  <div className="flex items-center gap-1 mb-1">
                    <Thermometer className="h-3 w-3 text-accent" />
                    <p className="text-xs text-muted-foreground">Temp</p>
                  </div>
                  <p className="text-lg font-extrabold text-foreground"><CountUp value={mainDevice.temperature} suffix="°C" /></p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                  <div className="flex items-center gap-1 mb-1">
                    <Signal className="h-3 w-3 text-safe" />
                    <p className="text-xs text-muted-foreground">Signal</p>
                  </div>
                  <p className="text-lg font-extrabold text-foreground">{Math.round(mainDevice.signalStrength)}%</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                  <div className="flex items-center gap-1 mb-1">
                    <Battery className="h-3 w-3 text-warning" />
                    <p className="text-xs text-muted-foreground">Battery</p>
                  </div>
                  <p className="text-lg font-extrabold text-foreground">{Math.round(mainDevice.batteryLevel)}%</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
