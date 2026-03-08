import { useState, useEffect, useCallback, useRef } from "react";

export interface DeviceData {
  id: string;
  name: string;
  location: string;
  sensorType: string;
  waterLevel: number;
  temperature: number;
  ph: number;
  signalStrength: number;
  batteryLevel: number;
  status: "online" | "offline" | "warning";
  lastDataReceived: Date;
}

export interface TankData {
  level: number;
  volume: number;
  capacity: number;
  status: "normal" | "low" | "full" | "critical";
}

export interface PumpData {
  isOn: boolean;
  lastToggled: Date;
  runtime: number; // minutes today
}

export interface AlertData {
  id: string;
  type: "low_water" | "overflow" | "sensor_failure" | "pump_dry_run" | "network_disconnected" | "ph_warning" | "temp_warning";
  severity: "warning" | "critical";
  device: string;
  message: string;
  time: Date;
  status: "active" | "resolved";
}

export interface SensorReading {
  time: string;
  waterLevel: number;
  temperature: number;
  ph: number;
  pumpActive: boolean;
}

const rand = (min: number, max: number) => Math.round((Math.random() * (max - min) + min) * 10) / 10;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const fluctuate = (v: number, range: number) => Math.round((v + (Math.random() - 0.5) * range) * 10) / 10;

const defaultDevices: DeviceData[] = [
  { id: "SEN-001", name: "Tank A Sensor", location: "Main Tank", sensorType: "Multi-Parameter", waterLevel: 72, temperature: 27.5, ph: 7.2, signalStrength: 92, batteryLevel: 85, status: "online", lastDataReceived: new Date() },
  { id: "SEN-002", name: "Tank B Sensor", location: "Reserve Tank", sensorType: "Water Level", waterLevel: 45, temperature: 26.8, ph: 6.9, signalStrength: 78, batteryLevel: 62, status: "online", lastDataReceived: new Date() },
  { id: "SEN-003", name: "Pond Sensor", location: "Fish Pond", sensorType: "pH + Temp", waterLevel: 88, temperature: 29.1, ph: 7.8, signalStrength: 65, batteryLevel: 34, status: "warning", lastDataReceived: new Date() },
  { id: "SEN-004", name: "Overflow Detector", location: "Drainage", sensorType: "Level Switch", waterLevel: 15, temperature: 25.0, ph: 7.0, signalStrength: 45, batteryLevel: 91, status: "online", lastDataReceived: new Date() },
];

const alertTemplates: Omit<AlertData, "id" | "time">[] = [
  { type: "low_water", severity: "critical", device: "Tank A", message: "Water level dropped below 20%", status: "active" },
  { type: "overflow", severity: "warning", device: "Reserve Tank", message: "Water level approaching overflow threshold", status: "active" },
  { type: "sensor_failure", severity: "critical", device: "SEN-003", message: "Sensor not responding for 5 minutes", status: "resolved" },
  { type: "pump_dry_run", severity: "critical", device: "Pump-01", message: "Pump running with no water flow detected", status: "resolved" },
  { type: "network_disconnected", severity: "warning", device: "SEN-004", message: "Device lost network connection", status: "active" },
  { type: "ph_warning", severity: "warning", device: "Fish Pond", message: "pH level at 8.7 — above safe range", status: "active" },
  { type: "temp_warning", severity: "warning", device: "Main Tank", message: "Temperature rising to 33°C", status: "active" },
];

export const useIoTSimulation = () => {
  const [devices, setDevices] = useState<DeviceData[]>(defaultDevices);
  const [tank, setTank] = useState<TankData>({ level: 72, volume: 7200, capacity: 10000, status: "normal" });
  const [pump, setPump] = useState<PumpData>({ isOn: false, lastToggled: new Date(), runtime: 45 });
  const [alerts, setAlerts] = useState<AlertData[]>(
    alertTemplates.map((a, i) => ({
      ...a,
      id: `ALT-${String(i + 1).padStart(3, "0")}`,
      time: new Date(Date.now() - Math.random() * 3600000 * 6),
    }))
  );
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const togglePump = useCallback(() => {
    setPump(prev => ({ ...prev, isOn: !prev.isOn, lastToggled: new Date() }));
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "resolved" as const } : a));
  }, []);

  const addDevice = useCallback((device: Omit<DeviceData, "waterLevel" | "temperature" | "ph" | "signalStrength" | "batteryLevel" | "status" | "lastDataReceived">) => {
    setDevices(prev => [...prev, {
      ...device,
      waterLevel: rand(30, 90),
      temperature: rand(24, 30),
      ph: rand(6.5, 8.0),
      signalStrength: rand(60, 100),
      batteryLevel: rand(50, 100),
      status: "online",
      lastDataReceived: new Date(),
    }]);
  }, []);

  const removeDevice = useCallback((id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
  }, []);

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(d => ({
        ...d,
        waterLevel: clamp(fluctuate(d.waterLevel, 4), 0, 100),
        temperature: clamp(fluctuate(d.temperature, 0.8), 18, 38),
        ph: clamp(fluctuate(d.ph, 0.3), 5, 10),
        signalStrength: clamp(fluctuate(d.signalStrength, 5), 0, 100),
        batteryLevel: Math.max(0, d.batteryLevel - 0.1),
        lastDataReceived: new Date(),
      })));

      setTank(prev => {
        const newLevel = clamp(fluctuate(prev.level, 3), 0, 100);
        const status = newLevel < 15 ? "critical" : newLevel < 30 ? "low" : newLevel > 90 ? "full" : "normal";
        return { level: newLevel, volume: Math.round(newLevel * 100), capacity: 10000, status };
      });

      setPump(prev => prev.isOn ? { ...prev, runtime: prev.runtime + 0.08 } : prev);
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { devices, tank, pump, alerts, lastUpdated, togglePump, resolveAlert, addDevice, removeDevice };
};

export const generateWaterAnalytics = () => {
  const now = new Date();
  const hourly: SensorReading[] = [];
  let wl = 65, temp = 27, ph = 7.2;

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    wl = clamp(fluctuate(wl, 8), 10, 100);
    temp = clamp(fluctuate(temp, 1.2), 20, 36);
    ph = clamp(fluctuate(ph, 0.4), 5, 9.5);
    hourly.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      waterLevel: Math.round(wl),
      temperature: Math.round(temp * 10) / 10,
      ph: Math.round(ph * 10) / 10,
      pumpActive: Math.random() > 0.6,
    });
  }
  return hourly;
};

export const generateDailyUsage = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(day => ({
    day,
    usage: Math.round(Math.random() * 800 + 200),
    fillCycles: Math.round(Math.random() * 4 + 1),
  }));
};
