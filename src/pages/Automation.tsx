import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Plus, Trash2, Power, Droplets, WifiOff, Bell, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
  icon: typeof Zap;
  triggerCount: number;
}

const defaultRules: AutomationRule[] = [
  { id: "rule-1", name: "Low Water Auto-Pump", condition: "Water Level < 20%", action: "Turn Pump ON", enabled: true, icon: Droplets, triggerCount: 12 },
  { id: "rule-2", name: "Tank Full Stop", condition: "Water Level ≥ 95%", action: "Turn Pump OFF", enabled: true, icon: Power, triggerCount: 8 },
  { id: "rule-3", name: "Sensor Offline Alert", condition: "Sensor offline > 5 min", action: "Send Critical Alert", enabled: true, icon: WifiOff, triggerCount: 3 },
  { id: "rule-4", name: "High Temperature Warning", condition: "Temperature > 35°C", action: "Send Warning Alert", enabled: false, icon: Bell, triggerCount: 0 },
];

const AutomationPage = () => {
  const [rules, setRules] = useState<AutomationRule[]>(defaultRules);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", condition: "", action: "" });

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const removeRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
    toast({ title: "Rule deleted" });
  };

  const addRule = () => {
    if (!form.name || !form.condition || !form.action) return;
    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: form.name,
      condition: form.condition,
      action: form.action,
      enabled: true,
      icon: Zap,
      triggerCount: 0,
    };
    setRules(prev => [...prev, newRule]);
    setForm({ name: "", condition: "", action: "" });
    setShowForm(false);
    toast({ title: "Rule created", description: `"${form.name}" is now active.` });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            <Zap className="h-3 w-3" /> AUTOMATION
          </div>
          <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Automation Rules</h1>
          <p className="text-sm text-muted-foreground">Create rules to automate pump control and alerts</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" /> Create Rule
        </Button>
      </div>

      {/* Add Rule Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-6 card-glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">New Automation Rule</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label>Rule Name</Label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Night Mode Pump" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Condition (IF)</Label>
              <Input value={form.condition} onChange={e => setForm(p => ({ ...p, condition: e.target.value }))} placeholder="e.g. Water Level < 15%" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Action (THEN)</Label>
              <Input value={form.action} onChange={e => setForm(p => ({ ...p, action: e.target.value }))} placeholder="e.g. Turn Pump ON" className="rounded-xl mt-1" />
            </div>
          </div>
          <Button onClick={addRule} className="mt-4 rounded-xl">Create Rule</Button>
        </motion.div>
      )}

      {/* Rules Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl border bg-card p-5 card-glow group transition-all ${!rule.enabled ? "opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${rule.enabled ? "bg-accent/10" : "bg-muted"}`}>
                  <rule.icon className={`h-5 w-5 ${rule.enabled ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{rule.name}</p>
                  <p className="text-xs text-muted-foreground">Triggered {rule.triggerCount} times</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                <button onClick={() => removeRule(rule.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-0.5">If</p>
                <p className="text-sm font-medium text-foreground">{rule.condition}</p>
              </div>
              <div className="rounded-xl bg-secondary/50 p-3 border border-border/50">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-0.5">Then</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-safe" /> {rule.action}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AutomationPage;
