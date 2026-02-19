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
} from "recharts";
import { generateHistoricalData } from "@/hooks/useSensorData";

const AnalyticsPage = () => {
  const data = useMemo(() => generateHistoricalData(), []);

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Analytics</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Historical sensor data from the last 24 hours.
      </p>

      <div className="grid gap-8">
        {/* pH Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glow rounded-2xl border bg-card p-6"
        >
          <h2 className="mb-6 text-lg font-bold text-foreground">pH Level Over Time</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 88%)" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={[5, 10]}
                  tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(207, 30%, 88%)",
                    background: "hsl(0, 0%, 100%)",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ph"
                  stroke="hsl(207, 87%, 33%)"
                  strokeWidth={2.5}
                  dot={false}
                  name="pH"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Temperature Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-glow rounded-2xl border bg-card p-6"
        >
          <h2 className="mb-6 text-lg font-bold text-foreground">Temperature Over Time</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(207, 30%, 88%)" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={[18, 38]}
                  tick={{ fontSize: 11, fill: "hsl(207, 20%, 46%)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(207, 30%, 88%)",
                    background: "hsl(0, 0%, 100%)",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(134, 61%, 41%)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
