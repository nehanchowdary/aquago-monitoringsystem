import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { generateWaterAnalytics, generateDailyUsage } from "@/hooks/useIoTSimulation";
import { TrendingUp, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(207, 30%, 90%)",
  background: "hsl(0, 0%, 100%)",
  fontSize: "13px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

type TimeRange = "24h" | "7d" | "30d";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const hourly = useMemo(() => generateWaterAnalytics(), []);
  const daily = useMemo(() => generateDailyUsage(), []);

  const exportCSV = () => {
    const headers = "Time,Water Level,Temperature,pH,Pump Active\n";
    const rows = hourly.map(r => `${r.time},${r.waterLevel},${r.temperature},${r.ph},${r.pumpActive}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aquago-analytics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <TrendingUp className="h-3 w-3" /> ANALYTICS
          </div>
          <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Analytics</h1>
          <p className="text-sm text-muted-foreground">Water usage trends and sensor data history</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border bg-card p-1">
            {(["24h", "7d", "30d"] as const).map(r => (
              <Button key={r} variant={timeRange === r ? "default" : "ghost"} size="sm" onClick={() => setTimeRange(r)} className="rounded-lg text-xs h-7 px-3">
                {r === "24h" ? "24 Hours" : r === "7d" ? "7 Days" : "30 Days"}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="rounded-xl gap-2" onClick={exportCSV}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Water Level Over Time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-6 card-glow">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <h2 className="text-base font-bold text-foreground">Water Level Over Time</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={hourly}>
                <defs>
                  <linearGradient id="wlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(207, 87%, 33%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(207, 87%, 33%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 90%)" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} interval="preserveStartEnd" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="waterLevel" stroke="hsl(207, 87%, 33%)" strokeWidth={2} fill="url(#wlGrad)" name="Water Level %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Daily Water Usage */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border bg-card p-6 card-glow">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <h2 className="text-base font-bold text-foreground">Daily Water Consumption</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="usage" fill="hsl(170, 77%, 43%)" radius={[6, 6, 0, 0]} name="Usage (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Temperature Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border bg-card p-6 card-glow">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-warning" />
            <h2 className="text-base font-bold text-foreground">Temperature Trend</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 90%)" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} interval="preserveStartEnd" />
                <YAxis domain={[18, 38]} tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="temperature" stroke="hsl(33, 95%, 55%)" strokeWidth={2} dot={false} name="Temp °C" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pump Activity & Fill Cycles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border bg-card p-6 card-glow">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-safe" />
            <h2 className="text-base font-bold text-foreground">Tank Fill Cycles</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="fillCycles" fill="hsl(134, 61%, 41%)" radius={[6, 6, 0, 0]} name="Fill Cycles" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Weekly Water Usage Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border bg-card p-6 card-glow lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <h2 className="text-base font-bold text-foreground">Weekly Water Usage Trend</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={daily}>
                <defs>
                  <linearGradient id="weeklyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(170, 77%, 43%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(170, 77%, 43%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(207, 20%, 46%)" }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="usage" stroke="hsl(170, 77%, 43%)" strokeWidth={2} fill="url(#weeklyGrad)" name="Usage (L)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
