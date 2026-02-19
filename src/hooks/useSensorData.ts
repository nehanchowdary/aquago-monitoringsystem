import { useState, useEffect, useCallback } from "react";

export interface SensorData {
  ph: number;
  temperature: number;
  lastUpdated: Date;
}

export type WaterStatus = "safe" | "warning" | "critical";

export const getWaterStatus = (ph: number, temp: number): WaterStatus => {
  if (ph < 5.5 || ph > 9 || temp > 35 || temp < 18) return "critical";
  if (ph < 6.5 || ph > 8.5 || temp > 32 || temp < 22) return "warning";
  return "safe";
};

export const getPhRecommendation = (ph: number): string | null => {
  if (ph < 6) return "Water is acidic. Add agricultural lime to balance the pH level.";
  if (ph < 6.5) return "pH is slightly low. Monitor closely and consider adding lime.";
  if (ph > 8.5) return "pH is too high. Dilute pond with fresh water.";
  if (ph > 8) return "pH is slightly elevated. Monitor and consider partial water change.";
  return null;
};

export const getTempRecommendation = (temp: number): string | null => {
  if (temp > 33) return "Temperature is dangerously high! Run aerator immediately to maintain oxygen.";
  if (temp > 30) return "Temperature is rising. Consider running aerator to maintain oxygen levels.";
  if (temp < 20) return "Temperature is too low. Consider using pond heater.";
  if (temp < 23) return "Temperature is slightly low. Monitor fish behavior.";
  return null;
};

const randomFluctuation = (value: number, range: number): number => {
  return Math.round((value + (Math.random() - 0.5) * range) * 10) / 10;
};

export const useSensorSimulation = () => {
  const [data, setData] = useState<SensorData>({
    ph: 6.8,
    temperature: 28,
    lastUpdated: new Date(),
  });

  const updateData = useCallback(() => {
    setData((prev) => ({
      ph: Math.max(4.5, Math.min(10, randomFluctuation(prev.ph, 0.4))),
      temperature: Math.max(18, Math.min(38, randomFluctuation(prev.temperature, 1))),
      lastUpdated: new Date(),
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, [updateData]);

  return { data, status: getWaterStatus(data.ph, data.temperature) };
};

export const generateHistoricalData = () => {
  const now = new Date();
  const data = [];
  let ph = 7.0;
  let temp = 27;

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    ph = Math.max(5, Math.min(9.5, randomFluctuation(ph, 0.3)));
    temp = Math.max(20, Math.min(35, randomFluctuation(temp, 0.8)));
    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ph: Math.round(ph * 10) / 10,
      temperature: Math.round(temp * 10) / 10,
    });
  }
  return data;
};
