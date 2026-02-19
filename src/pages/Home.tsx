import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  Bell,
  DollarSign,
  Sun,
  Users,
  ArrowRight,
  AlertTriangle,
  FlaskConical,
  Fish,
  Zap,
  ShieldAlert,
  Sprout,
  Lightbulb,
  Smartphone,
  Layers,
  Mic,
  Droplets,
  Thermometer,
  Brain,
  Globe,
} from "lucide-react";
import heroImage from "@/assets/hero-aquaculture.jpg";
import SystemFlow from "@/components/home/SystemFlow";
import ComparisonTable from "@/components/home/ComparisonTable";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const benefits = [
  { icon: Activity, title: "Real-Time Monitoring", desc: "Track water pH and temperature 24/7 with live IoT sensors" },
  { icon: Bell, title: "Instant SMS Alerts", desc: "Get warnings before fish are at risk — no internet required" },
  { icon: DollarSign, title: "Low-Cost Solution", desc: "Affordable hardware designed for small-scale farmers" },
  { icon: Sun, title: "Solar Powered", desc: "Works off-grid using clean solar energy" },
  { icon: Users, title: "Farmer Friendly", desc: "Simple color-coded interface anyone can understand" },
];

const problems = [
  { icon: FlaskConical, text: "Farmers rely on manual water testing" },
  { icon: DollarSign, text: "Testing is costly and often delayed" },
  { icon: Fish, text: "Sudden pH change causes mass fish death" },
  { icon: ShieldAlert, text: "No continuous monitoring available" },
  { icon: AlertTriangle, text: "Small farmers can't afford industrial systems" },
];

const futureCards = [
  { icon: Brain, title: "AI-Based Prediction", desc: "Forecast water quality issues before they happen" },
  { icon: Layers, title: "Multi-Pond Monitoring", desc: "Manage multiple ponds from one dashboard" },
  { icon: Smartphone, title: "Mobile App", desc: "Full monitoring from your phone" },
  { icon: Zap, title: "Auto Chemical Dosing", desc: "Automated pH correction systems" },
  { icon: Globe, title: "Gov. Integration", desc: "Connect with aquaculture programs" },
  { icon: Mic, title: "Voice Alerts", desc: "Audio notifications for farmers in the field" },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Aquaculture pond with IoT sensors" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>
        {/* Animated wave overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg className="absolute bottom-0 w-[200%] animate-wave" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,20 1440,30 L1440,60 L0,60 Z" fill="hsl(210, 60%, 98%)" fillOpacity="0.6" />
          </svg>
          <svg className="absolute bottom-0 w-[200%] animate-wave-slow" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,40 C240,10 480,50 720,30 C960,10 1200,50 1440,35 L1440,60 L0,60 Z" fill="hsl(210, 60%, 98%)" fillOpacity="0.8" />
          </svg>
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent glow-dot" />
              IoT-Powered Aquaculture Platform
            </div>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              AquaGo
            </h1>
            <p className="mb-3 text-xl font-medium text-primary-foreground/90 md:text-2xl">
              Prevent Fish Loss with Real-Time Water Intelligence.
            </p>
            <p className="mb-8 max-w-lg text-base text-primary-foreground/70 md:text-lg">
              A low-cost IoT system that monitors pond pH and temperature and sends instant alerts to farmers — solar powered, farmer friendly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                View Live Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-6 py-3.5 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/10"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-danger/10 px-4 py-1.5 text-xs font-bold text-danger">THE PROBLEM</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Why Farmers Are Losing Fish
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Traditional aquaculture monitoring fails small-scale farmers.
            </p>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => (
              <motion.div
                key={p.text}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-2xl border bg-card p-5 card-glow transition-all hover:scale-[1.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger/10">
                  <p.icon className="h-5 w-5 text-danger" />
                </div>
                <p className="text-sm font-medium text-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / System Flow */}
      <section className="bg-gradient-section py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-6">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent">THE SOLUTION</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              How AquaGo Works
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              A low-cost IoT device + smart dashboard that continuously monitors pond conditions and alerts farmers instantly.
            </p>
          </motion.div>
          <div className="mt-14">
            <SystemFlow />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">WHY AQUAGO</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Built for Real Farmers
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border bg-card p-6 text-center card-glow transition-all hover:scale-[1.03] hover:card-glow-accent"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-accent/10">
                  <b.icon className="h-7 w-7 text-primary transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-foreground">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-gradient-section py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent">COMPARISON</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Why AquaGo is Different
            </h2>
          </motion.div>
          <div className="mx-auto max-w-2xl">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Smart Recommendation Engine */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">SMART ENGINE</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Intelligent Recommendations
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              AquaGo doesn't just monitor — it tells farmers exactly what to do.
            </p>
          </motion.div>
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            {[
              { icon: Droplets, condition: "pH < 6.0 (Acidic)", action: "Add agricultural lime to balance pH levels", color: "text-warning", bg: "bg-warning/10" },
              { icon: Droplets, condition: "pH > 8.5 (Alkaline)", action: "Dilute pond with fresh water to reduce pH", color: "text-primary", bg: "bg-primary/10" },
              { icon: Thermometer, condition: "Temp > 33°C (High)", action: "Run aerator immediately to maintain oxygen", color: "text-danger", bg: "bg-danger/10" },
              { icon: Thermometer, condition: "Temp < 20°C (Low)", action: "Consider using a pond heater for warmth", color: "text-accent", bg: "bg-accent/10" },
            ].map((rec, i) => (
              <motion.div
                key={rec.condition}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border bg-card p-5 card-glow"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${rec.bg}`}>
                    <rec.icon className={`h-4 w-4 ${rec.color}`} />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{rec.condition}</span>
                </div>
                <p className="text-sm font-medium text-foreground">👉 {rec.action}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-gradient-section py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-safe/10 px-4 py-1.5 text-xs font-bold text-safe">SUSTAINABILITY</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Sustainable by Design
            </h2>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sun, title: "Solar Powered", desc: "Operates entirely on solar energy — no power grid needed." },
              { icon: Globe, title: "Remote Villages", desc: "Works in areas without reliable electricity or internet." },
              { icon: Sprout, title: "Eco-Friendly", desc: "Reduces resource waste and supports sustainable farming." },
              { icon: Users, title: "Small Farm Focus", desc: "Designed and priced for small-scale aquaculture farmers." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border bg-card p-6 card-glow text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-safe/10">
                  <item.icon className="h-6 w-6 text-safe" />
                </div>
                <h3 className="mb-1 font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent">ROADMAP</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Future Scope
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              What's coming next for AquaGo.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {futureCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border bg-card p-6 card-glow transition-all hover:scale-[1.02]"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <card.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-1 font-bold text-foreground">{card.title}</h3>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden rotate-180">
          <svg className="w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,20 1440,30 L1440,60 L0,60 Z" fill="hsl(210, 60%, 98%)" fillOpacity="0.8" />
          </svg>
        </div>
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-extrabold text-primary-foreground md:text-4xl mb-4">
              Ready to Protect Your Fish?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-primary-foreground/70">
              Experience the future of aquaculture monitoring with AquaGo's live dashboard.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg transition-all hover:scale-105"
            >
              Launch Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
