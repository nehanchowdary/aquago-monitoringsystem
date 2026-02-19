import { motion } from "framer-motion";
import { ArrowRight, Wifi, Cpu, Cloud, Monitor, Smartphone } from "lucide-react";

const steps = [
  { icon: Wifi, label: "IoT Sensor", desc: "Measures pH & temp" },
  { icon: Cpu, label: "Controller", desc: "Processes data" },
  { icon: Cloud, label: "Cloud", desc: "Stores & analyzes" },
  { icon: Monitor, label: "Dashboard", desc: "Visualizes live" },
  { icon: Smartphone, label: "Alert", desc: "Notifies farmer" },
];

const SystemFlow = () => (
  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
    {steps.map((step, i) => (
      <div key={step.label} className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          className="group flex flex-col items-center gap-2"
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <step.icon className="h-7 w-7" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent glow-dot" />
          </div>
          <span className="text-xs font-bold text-foreground">{step.label}</span>
          <span className="text-[10px] text-muted-foreground">{step.desc}</span>
        </motion.div>
        {i < steps.length - 1 && (
          <ArrowRight className="mx-1 hidden h-5 w-5 text-accent md:block" />
        )}
      </div>
    ))}
  </div>
);

export default SystemFlow;
