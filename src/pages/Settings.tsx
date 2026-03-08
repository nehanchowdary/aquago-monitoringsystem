import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Sliders, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@aquago.io" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [preferences, setPreferences] = useState({ refreshInterval: "5", tempUnit: "celsius" });

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-3xl">
      <div>
        <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <SettingsIcon className="h-3 w-3" /> SETTINGS
        </div>
        <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-6 card-glow">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-bold text-foreground">User Profile</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Full Name</Label>
            <Input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="rounded-xl mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="rounded-xl mt-1" />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border bg-card p-6 card-glow">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
            <Bell className="h-5 w-5 text-warning" />
          </div>
          <h2 className="font-bold text-foreground">Notification Settings</h2>
        </div>
        <div className="space-y-4">
          {([
            { key: "email" as const, label: "Email Alerts", desc: "Receive alert notifications via email" },
            { key: "sms" as const, label: "SMS Alerts", desc: "Receive SMS notifications for critical alerts" },
            { key: "push" as const, label: "Push Notifications", desc: "Browser push notifications for real-time alerts" },
          ]).map(item => (
            <div key={item.key} className="flex items-center justify-between rounded-xl bg-secondary/50 p-4 border border-border/50">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onCheckedChange={v => setNotifications(p => ({ ...p, [item.key]: v }))}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* System Preferences */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border bg-card p-6 card-glow">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Sliders className="h-5 w-5 text-accent" />
          </div>
          <h2 className="font-bold text-foreground">System Preferences</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Data Refresh Interval (seconds)</Label>
            <Input type="number" value={preferences.refreshInterval} onChange={e => setPreferences(p => ({ ...p, refreshInterval: e.target.value }))} className="rounded-xl mt-1" />
          </div>
          <div>
            <Label>Temperature Unit</Label>
            <select
              value={preferences.tempUnit}
              onChange={e => setPreferences(p => ({ ...p, tempUnit: e.target.value }))}
              className="mt-1 flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
            </select>
          </div>
        </div>
      </motion.div>

      <Button onClick={handleSave} className="rounded-xl gap-2">
        <Save className="h-4 w-4" /> Save Settings
      </Button>
    </div>
  );
};

export default SettingsPage;
