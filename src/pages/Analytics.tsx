import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { generateHistoricalData } from "@/hooks/useSensorData";
import { TrendingUp } from "lucide-react";

const AnalyticsPage = () => {
  const data = useMemo(() => generateHistoricalData(), []);

  return (
    <div className="min-h-screen bg-gradient-section">
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <TrendingUp className="h-3 w-3" /> ANALYTICS
          </div>
          <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Sensor Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Historical sensor data from the last 24 hours.
          </p>
        </div>

        <div className="grid gap-8">
          {/* pH Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border bg-card p-6 card-glow"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <h2 className="text-lg font-bold text-foreground">pH Level Over Time</h2>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="phGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(207, 87%, 33%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(207, 87%, 33%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 90%)" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }} interval="preserveStartEnd" />
                  <YAxis domain={[5, 10]} tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(207, 30%, 90%)", background: "hsl(0, 0%, 100%)", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                  <Area type="monotone" dataKey="ph" stroke="hsl(207, 87%, 33%)" strokeWidth={2.5} fill="url(#phGradient)" name="pH" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Temperature Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border bg-card p-6 card-glow"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <h2 className="text-lg font-bold text-foreground">Temperature Over Time</h2>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(170, 77%, 43%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(170, 77%, 43%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 90%)" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }} interval="preserveStartEnd" />
                  <YAxis domain={[18, 38]} tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(207, 30%, 90%)", background: "hsl(0, 0%, 100%)", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                  <Area type="monotone" dataKey="temperature" stroke="hsl(170, 77%, 43%)" strokeWidth={2.5} fill="url(#tempGradient)" name="Temperature (°C)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
