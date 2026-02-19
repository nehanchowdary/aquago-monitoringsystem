import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  Bell,
  DollarSign,
  Sun,
  Users,
  ArrowRight,
  Cpu,
  Cloud,
  Smartphone,
  Monitor,
  Wifi,
  Sprout,
  Lightbulb,
  Mic,
  Layers,
} from "lucide-react";
import heroImage from "@/assets/hero-aquaculture.jpg";

const benefits = [
  { icon: Activity, title: "Real-Time Monitoring", desc: "Track water pH and temperature 24/7" },
  { icon: Bell, title: "Instant SMS Alerts", desc: "Get warnings before fish are at risk" },
  { icon: DollarSign, title: "Low-Cost Solution", desc: "Affordable for small-scale farmers" },
  { icon: Sun, title: "Solar Powered", desc: "Works without electricity grid" },
  { icon: Users, title: "Easy for Farmers", desc: "Simple interface, no tech skills needed" },
];

const flowSteps = [
  { icon: Wifi, label: "IoT Sensor" },
  { icon: Cpu, label: "Microcontroller" },
  { icon: Cloud, label: "Cloud Server" },
  { icon: Monitor, label: "AquaGo Dashboard" },
  { icon: Smartphone, label: "Farmer Alert" },
];

const futureCards = [
  { icon: Activity, title: "Dissolved Oxygen Monitoring" },
  { icon: Smartphone, title: "Mobile App Integration" },
  { icon: Lightbulb, title: "AI Prediction of Water Quality" },
  { icon: Layers, title: "Multi-Pond Monitoring" },
  { icon: Mic, title: "Voice Alerts for Farmers" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Aquaculture pond with IoT sensors" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
              AquaGo
            </h1>
            <p className="mb-3 text-xl font-medium text-primary-foreground/90 md:text-2xl">
              Smart Water Monitoring for Healthy Aquaculture.
            </p>
            <p className="mb-8 max-w-lg text-base text-primary-foreground/75 md:text-lg">
              AquaGo is a low-cost system that monitors pond pH and temperature and sends alerts to farmers to prevent fish loss.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
            >
              View Live Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-3 text-center text-2xl font-bold text-foreground md:text-3xl">
            Why Choose AquaGo?
          </h2>
          <p className="mx-auto mb-12 max-w-md text-center text-muted-foreground">
            Built for real farmers, solving real problems.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="card-glow rounded-xl border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-foreground">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Flow */}
      <section className="border-y bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <h2 className="mb-3 text-center text-2xl font-bold text-foreground md:text-3xl">
            How It Works
          </h2>
          <p className="mx-auto mb-12 max-w-md text-center text-muted-foreground">
            From sensor to farmer — a seamless flow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-0">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{step.label}</span>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 text-muted-foreground md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 card-glow md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Sprout className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Sustainable by Design</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Solar Powered", desc: "Operates entirely on solar energy — no power grid needed." },
                { title: "Rural Ready", desc: "Works in areas without reliable electricity or internet." },
                { title: "Small Farm Focus", desc: "Designed and priced for small-scale aquaculture farmers." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="border-t bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <h2 className="mb-3 text-center text-2xl font-bold text-foreground md:text-3xl">
            Future Roadmap
          </h2>
          <p className="mx-auto mb-12 max-w-md text-center text-muted-foreground">
            What's coming next for AquaGo.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {futureCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl border bg-card p-5 text-center"
              >
                <card.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
