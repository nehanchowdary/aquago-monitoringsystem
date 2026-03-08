import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Droplets,
  Thermometer,
  Wifi,
  WifiOff,
  Gauge,
  Power,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIoTSimulation, type AlertData } from "@/hooks/useIoTSimulation";

const typeIcons: Record<AlertData["type"], typeof Bell> = {
  low_water: Gauge,
  overflow: Droplets,
  sensor_failure: WifiOff,
  pump_dry_run: Power,
  network_disconnected: Wifi,
  ph_warning: Droplets,
  temp_warning: Thermometer,
};

const typeLabels: Record<AlertData["type"], string> = {
  low_water: "Low Water Level",
  overflow: "Tank Overflow",
  sensor_failure: "Sensor Failure",
  pump_dry_run: "Pump Dry Run",
  network_disconnected: "Network Disconnected",
  ph_warning: "pH Warning",
  temp_warning: "Temperature Warning",
};

const AlertsPage = () => {
  const { alerts, resolveAlert } = useIoTSimulation();
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");

  const filtered = alerts
    .filter(a => filter === "all" || a.status === filter)
    .sort((a, b) => b.time.getTime() - a.time.getTime());

  const activeCount = alerts.filter(a => a.status === "active").length;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
            <Bell className="h-3 w-3" /> ALERT CENTER
          </div>
          <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Alerts</h1>
          <p className="text-sm text-muted-foreground">
            {activeCount} active alert{activeCount !== 1 ? "s" : ""} requiring attention
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {(["all", "active", "resolved"] as const).map(f => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="rounded-xl capitalize text-xs">
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Alert Table */}
      <div className="rounded-2xl border bg-card card-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Alert</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Device</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Severity</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Time</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((alert, i) => {
                const Icon = typeIcons[alert.type];
                return (
                  <motion.tr key={alert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          alert.severity === "critical" ? "bg-destructive/10" : "bg-warning/10"
                        }`}>
                          <Icon className={`h-4 w-4 ${alert.severity === "critical" ? "text-destructive" : "text-warning"}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{typeLabels[alert.type]}</p>
                          <p className="text-xs text-muted-foreground">{alert.message}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{alert.device}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {alert.time.toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        alert.status === "active" ? "bg-destructive/10 text-destructive" : "bg-safe/10 text-safe"
                      }`}>
                        {alert.status === "active" ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {alert.status === "active" && (
                        <Button size="sm" variant="outline" className="rounded-xl text-xs" onClick={() => resolveAlert(alert.id)}>
                          Resolve
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <Bell className="mx-auto h-8 w-8 mb-2 opacity-30" />
            <p>No {filter} alerts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
