import { motion } from "framer-motion";
import { Gauge, Cpu, Wifi, Server, Database, Monitor, ArrowDown } from "lucide-react";

const layers = [
  {
    icon: Gauge,
    title: "Water Level Sensor (Ultrasonic HC-SR04)",
    desc: "An ultrasonic sensor measures the distance to the water surface. The difference from the tank height gives the current water level. Accuracy: ±3mm, Range: 2cm – 400cm.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Cpu,
    title: "ESP32 Microcontroller",
    desc: "The ESP32 reads sensor data via GPIO pins, processes readings, and transmits them over WiFi. It also controls the relay module to toggle the water pump on/off.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Wifi,
    title: "WiFi / MQTT Protocol",
    desc: "Data is sent using MQTT (lightweight messaging protocol) over WiFi. This ensures low-latency, reliable communication even on unstable networks.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Server,
    title: "Cloud API Server",
    desc: "A RESTful API server receives incoming sensor data, validates payloads, and routes them to the database. It also serves the dashboard frontend and handles authentication.",
    color: "text-safe",
    bg: "bg-safe/10",
  },
  {
    icon: Database,
    title: "Database Storage",
    desc: "Time-series data is stored with timestamps for historical analysis. Tables include SensorData, Devices, Alerts, PumpLogs, and AutomationRules.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Monitor,
    title: "AquaGo Dashboard",
    desc: "A modern React-based SPA that visualizes real-time data, provides pump control, displays alerts, and offers analytics charts with CSV export.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const ArchitecturePage = () => (
  <div className="p-4 md:p-6 lg:p-8 space-y-6">
    <div>
      <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
        <Server className="h-3 w-3" /> SYSTEM ARCHITECTURE
      </div>
      <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Architecture</h1>
      <p className="text-sm text-muted-foreground">How AquaGo's IoT pipeline works end-to-end</p>
    </div>

    <div className="mx-auto max-w-2xl space-y-1">
      {layers.map((layer, i) => (
        <div key={layer.title}>
          <motion.div
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rounded-2xl border bg-card p-6 card-glow"
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${layer.bg}`}>
                <layer.icon className={`h-6 w-6 ${layer.color}`} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">{layer.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{layer.desc}</p>
              </div>
            </div>
          </motion.div>
          {i < layers.length - 1 && (
            <div className="flex justify-center py-1">
              <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Database Schema */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 card-glow">
      <h3 className="text-sm font-bold text-foreground mb-4">Database Schema</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { table: "Users", fields: "id, email, role, name, created_at" },
          { table: "Devices", fields: "id, name, location, sensor_type, status" },
          { table: "SensorData", fields: "id, device_id, water_level, temp, ph, timestamp" },
          { table: "Alerts", fields: "id, type, severity, device, message, status" },
          { table: "PumpLogs", fields: "id, action, timestamp, triggered_by" },
          { table: "AutomationRules", fields: "id, name, condition, action, enabled" },
        ].map(t => (
          <div key={t.table} className="rounded-xl bg-secondary/50 p-3 border border-border/50">
            <p className="text-xs font-bold text-primary mb-0.5">{t.table}</p>
            <p className="text-[11px] text-muted-foreground font-mono">{t.fields}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default ArchitecturePage;
