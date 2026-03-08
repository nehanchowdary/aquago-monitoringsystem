import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Plus, Trash2, Wifi, WifiOff, AlertTriangle, Battery, Signal, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIoTSimulation, type DeviceData } from "@/hooks/useIoTSimulation";

const statusIcon = (s: DeviceData["status"]) => {
  if (s === "online") return <Wifi className="h-4 w-4 text-safe" />;
  if (s === "warning") return <AlertTriangle className="h-4 w-4 text-warning" />;
  return <WifiOff className="h-4 w-4 text-destructive" />;
};

const Devices = () => {
  const { devices, addDevice, removeDevice } = useIoTSimulation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", id: "", sensorType: "", location: "" });
  const [search, setSearch] = useState("");

  const filtered = devices.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase()) ||
    d.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.id) return;
    addDevice({ id: form.id, name: form.name, sensorType: form.sensorType || "Multi-Parameter", location: form.location || "Unassigned" });
    setForm({ name: "", id: "", sensorType: "", location: "" });
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Cpu className="h-3 w-3" /> DEVICE MANAGEMENT
          </div>
          <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Devices</h1>
          <p className="text-sm text-muted-foreground">Manage your IoT sensor devices</p>
        </div>
        <div className="flex items-center gap-3">
          <Input placeholder="Search devices..." value={search} onChange={e => setSearch(e.target.value)} className="w-48 rounded-xl" />
          <Button onClick={() => setShowForm(true)} className="rounded-xl gap-2">
            <Plus className="h-4 w-4" /> Add Device
          </Button>
        </div>
      </div>

      {/* Add Device Modal */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-6 card-glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Add New Device</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Device Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Tank A Sensor" className="rounded-xl mt-1" /></div>
            <div><Label>Device ID</Label><Input value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} placeholder="SEN-005" className="rounded-xl mt-1" /></div>
            <div><Label>Sensor Type</Label><Input value={form.sensorType} onChange={e => setForm(p => ({ ...p, sensorType: e.target.value }))} placeholder="Multi-Parameter" className="rounded-xl mt-1" /></div>
            <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="Main Tank" className="rounded-xl mt-1" /></div>
          </div>
          <Button onClick={handleAdd} className="mt-4 rounded-xl">Add Device</Button>
        </motion.div>
      )}

      {/* Device Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((device, i) => (
          <motion.div key={device.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border bg-card p-5 card-glow group hover:scale-[1.01] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {statusIcon(device.status)}
                <button onClick={() => removeDevice(device.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{device.location}</span>
                <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">{device.sensorType}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Level</p>
                  <p className="text-sm font-bold text-foreground">{Math.round(device.waterLevel)}%</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Temp</p>
                  <p className="text-sm font-bold text-foreground">{device.temperature}°C</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">pH</p>
                  <p className="text-sm font-bold text-foreground">{device.ph}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Signal className="h-3 w-3" /> {Math.round(device.signalStrength)}%</span>
                <span className="flex items-center gap-1"><Battery className="h-3 w-3" /> {Math.round(device.batteryLevel)}%</span>
                <span className="ml-auto">{device.lastDataReceived.toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Devices;
