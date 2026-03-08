import { motion } from "framer-motion";
import type { TankData } from "@/hooks/useIoTSimulation";

const statusColors = {
  normal: "from-primary to-accent",
  low: "from-warning to-warning/70",
  full: "from-accent to-primary",
  critical: "from-destructive to-destructive/70",
};

const TankVisualization = ({ tank }: { tank: TankData }) => {
  const color = statusColors[tank.status];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-48 w-28 rounded-2xl border-2 border-border bg-secondary/30 overflow-hidden">
        {/* Water fill */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${color} opacity-80`}
          initial={{ height: 0 }}
          animate={{ height: `${tank.level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Wave effect */}
          <div className="absolute top-0 left-0 right-0 h-3 overflow-hidden">
            <svg className="w-[200%] animate-wave" viewBox="0 0 120 8" preserveAspectRatio="none">
              <path d="M0,4 C30,8 60,0 90,4 C105,6 115,2 120,4 L120,8 L0,8 Z" fill="currentColor" className="text-primary-foreground/20" />
            </svg>
          </div>
        </motion.div>

        {/* Level markers */}
        {[25, 50, 75].map(mark => (
          <div key={mark} className="absolute left-0 right-0 border-t border-dashed border-muted-foreground/20" style={{ bottom: `${mark}%` }}>
            <span className="absolute -right-8 -top-2 text-[9px] text-muted-foreground">{mark}%</span>
          </div>
        ))}

        {/* Level text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-extrabold text-foreground drop-shadow-sm">{Math.round(tank.level)}%</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-bold text-foreground">{tank.volume.toLocaleString()}L / {tank.capacity.toLocaleString()}L</p>
        <p className={`text-xs font-semibold capitalize ${
          tank.status === "critical" ? "text-destructive" :
          tank.status === "low" ? "text-warning" :
          tank.status === "full" ? "text-accent" : "text-safe"
        }`}>
          {tank.status}
        </p>
      </div>
    </div>
  );
};

export default TankVisualization;
