import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, TrendingUp, Droplets, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: AlertCircle,
    title: "The Problem",
    color: "text-danger",
    bg: "bg-danger/10",
    badge: "CHALLENGE",
    badgeColor: "bg-danger/10 text-danger",
    content:
      "Fish and prawn farmers rely on manual water testing which is costly, time-consuming, and often delayed. By the time poor water conditions are detected, significant fish mortality may have already occurred — leading to severe financial losses for small-scale farmers who can least afford it.",
  },
  {
    icon: Droplets,
    title: "Our Solution",
    color: "text-accent",
    bg: "bg-accent/10",
    badge: "AQUAGO",
    badgeColor: "bg-accent/10 text-accent",
    content:
      "AquaGo provides continuous, automated monitoring of critical water parameters — pH and temperature — using low-cost IoT sensors. Data is transmitted in real time to a cloud dashboard, and instant SMS alerts are sent to farmers when conditions become dangerous. No internet required.",
  },
  {
    icon: TrendingUp,
    title: "The Impact",
    color: "text-safe",
    bg: "bg-safe/10",
    badge: "RESULTS",
    badgeColor: "bg-safe/10 text-safe",
    content:
      "AquaGo prevents fish mortality by enabling early intervention. Farmers save on manual testing costs, increase survival rates, and boost overall yield. The solar-powered system makes it accessible even in remote, off-grid rural areas across the country.",
  },
];

const AboutPage = () => (
  <div className="min-h-screen bg-gradient-section">
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            ABOUT
          </div>
          <h1 className="text-2xl font-extrabold text-foreground md:text-4xl">About AquaGo</h1>
          <p className="mt-2 text-muted-foreground">
            Affordable smart aquaculture monitoring for every farmer.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="rounded-3xl border bg-card p-6 md:p-8 card-glow"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${s.badgeColor}`}>{s.badge}</span>
                  <h2 className="text-lg font-bold text-foreground">{s.title}</h2>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-3xl border bg-card p-8 text-center card-glow"
        >
          <CheckCircle className="mx-auto mb-3 h-10 w-10 text-accent" />
          <p className="text-lg font-bold text-foreground mb-2">
            Designed with farmers, for farmers.
          </p>
          <p className="text-sm text-muted-foreground mb-6">Simple. Solar. Smart.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground shadow-lg transition-all hover:scale-105"
          >
            View Live Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AboutPage;
