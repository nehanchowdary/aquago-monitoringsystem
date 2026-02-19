import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, TrendingUp, Droplets } from "lucide-react";

const sections = [
  {
    icon: AlertCircle,
    title: "The Problem",
    color: "text-danger",
    bg: "bg-danger/10",
    content:
      "Fish and prawn farmers rely on manual water testing which is costly, time-consuming, and often delayed. By the time poor water conditions are detected, significant fish mortality may have already occurred, leading to severe financial losses for small-scale farmers.",
  },
  {
    icon: Droplets,
    title: "Our Solution",
    color: "text-primary",
    bg: "bg-primary/10",
    content:
      "AquaGo provides continuous, automated monitoring of critical water parameters — pH and temperature — using low-cost IoT sensors. Data is transmitted in real time to a cloud dashboard, and instant SMS alerts are sent to farmers when conditions become dangerous.",
  },
  {
    icon: TrendingUp,
    title: "The Impact",
    color: "text-accent",
    bg: "bg-accent/10",
    content:
      "AquaGo prevents fish mortality by enabling early intervention. Farmers save on manual testing costs, increase survival rates, and boost overall yield. The solar-powered system makes it accessible even in remote, off-grid rural areas.",
  },
];

const AboutPage = () => (
  <div className="container py-8 md:py-12">
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">About AquaGo</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Affordable smart aquaculture monitoring for every farmer.
      </p>

      <div className="space-y-6">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="card-glow rounded-2xl border bg-card p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <h2 className="text-lg font-bold text-foreground">{s.title}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex items-center justify-center gap-2 rounded-2xl border bg-accent/10 p-6 text-center"
      >
        <CheckCircle className="h-5 w-5 text-accent" />
        <p className="text-sm font-semibold text-foreground">
          Designed with farmers, for farmers. Simple, solar, smart.
        </p>
      </motion.div>
    </div>
  </div>
);

export default AboutPage;
