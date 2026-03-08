import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Droplets,
  Thermometer,
  Gauge,
  Zap,
  Bell,
  Cpu,
  BarChart3,
  Cloud,
  Brain,
  Smartphone,
  Building2,
  Sprout,
  Home as HomeIcon,
  Factory,
  Waves,
  Wifi,
  Database,
  Monitor,
  Server,
  ChevronDown,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const features = [
  { icon: Activity, title: "Real-Time Water Monitoring", desc: "Track water levels, pH, and temperature 24/7 with live IoT sensors." },
  { icon: Zap, title: "Pump Automation Control", desc: "Automate pump operations based on water levels and custom rules." },
  { icon: Bell, title: "Smart Alerts & Notifications", desc: "Get instant alerts for critical events via email, SMS, or push." },
  { icon: Cpu, title: "Device Management System", desc: "Add, configure, and monitor all your IoT sensor devices." },
  { icon: BarChart3, title: "Water Usage Analytics", desc: "Analyze consumption trends with interactive charts and reports." },
  { icon: Wifi, title: "IoT Sensor Integration", desc: "Connect ESP32, Arduino, and other microcontrollers seamlessly." },
  { icon: Cloud, title: "Cloud Monitoring Dashboard", desc: "Access your dashboard from anywhere with cloud-based monitoring." },
  { icon: Brain, title: "AI Consumption Prediction", desc: "Predict water usage patterns with AI-powered analytics." },
];

const useCases = [
  { icon: HomeIcon, title: "Smart Homes", desc: "Monitor rooftop tanks and automate household water supply." },
  { icon: Sprout, title: "Agriculture Irrigation", desc: "Optimize crop irrigation with real-time soil moisture and tank levels." },
  { icon: Building2, title: "Apartment Water Tanks", desc: "Manage multi-floor water distribution and prevent shortages." },
  { icon: Factory, title: "Industrial Water Systems", desc: "Monitor process water for manufacturing and cooling systems." },
  { icon: Waves, title: "Smart Cities", desc: "Integrate with urban water management and distribution networks." },
];

const systemSteps = [
  { icon: Gauge, title: "Water Level Sensor", desc: "Ultrasonic sensor measures water level in real-time", color: "text-primary", bg: "bg-primary/10" },
  { icon: Cpu, title: "Microcontroller (ESP32)", desc: "Processes sensor data and transmits via WiFi/MQTT", color: "text-accent", bg: "bg-accent/10" },
  { icon: Wifi, title: "WiFi / MQTT Communication", desc: "Secure wireless data transmission to cloud", color: "text-warning", bg: "bg-warning/10" },
  { icon: Server, title: "Cloud Server API", desc: "Receives, validates, and stores sensor readings", color: "text-safe", bg: "bg-safe/10" },
  { icon: Database, title: "Database Storage", desc: "Time-series storage for historical analytics", color: "text-primary", bg: "bg-primary/10" },
  { icon: Monitor, title: "AquaGo Dashboard", desc: "Beautiful real-time visualization and control", color: "text-accent", bg: "bg-accent/10" },
];

const HomePage = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-hero">
        {/* Animated water particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-foreground/10"
              style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Wave overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg className="absolute bottom-0 w-[200%] animate-wave" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,20 1440,30 L1440,60 L0,60 Z" fill="hsl(210, 60%, 98%)" fillOpacity="0.6" />
          </svg>
          <svg className="absolute bottom-0 w-[200%] animate-wave-slow" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,40 C240,10 480,50 720,30 C960,10 1200,50 1440,35 L1440,60 L0,60 Z" fill="hsl(210, 60%, 98%)" fillOpacity="0.8" />
          </svg>
        </div>

        <div className="container relative z-10 py-20 md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent glow-dot" />
              IoT-Powered Smart Water Platform
            </div>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              AquaGo
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 font-bold text-primary-foreground/80">
                Smart IoT Water Monitoring System
              </span>
            </h1>
            <p className="mb-8 max-w-xl text-base text-primary-foreground/70 md:text-lg">
              Monitor water levels, control pumps, and receive smart alerts in real time using IoT sensors.
              Built for smart homes, agriculture, apartments, and industrial systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-bold text-accent-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Open Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/architecture"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-7 py-3.5 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/10"
              >
                View System Architecture <ChevronDown className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">FEATURES</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Everything You Need for Water Monitoring
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              A comprehensive IoT platform with real-time monitoring, automation, and intelligent analytics.
            </p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border bg-card p-6 card-glow transition-all hover:scale-[1.03] hover:card-glow-accent"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-accent/10">
                  <f.icon className="h-6 w-6 text-primary transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-section py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent">HOW IT WORKS</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              System Flow
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              From sensor to dashboard — see how AquaGo processes and visualizes your water data.
            </p>
          </motion.div>
          <div className="mx-auto max-w-3xl">
            {systemSteps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-4 mb-1"
              >
                <div className="flex flex-col items-center">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${step.bg}`}>
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  {i < systemSteps.length - 1 && (
                    <div className="w-0.5 h-8 bg-border my-1" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-safe/10 px-4 py-1.5 text-xs font-bold text-safe">USE CASES</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Where AquaGo Can Be Used
            </h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border bg-card p-6 text-center card-glow transition-all hover:scale-[1.03]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-safe/10 transition-colors group-hover:bg-accent/10">
                  <uc.icon className="h-7 w-7 text-safe transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-foreground">{uc.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Preview */}
      <section className="bg-gradient-section py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">ARCHITECTURE</span>
            <h2 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Built on Modern Technology
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Enterprise-grade architecture designed for reliability and scale.
            </p>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: Gauge, label: "Water Sensor" },
              { icon: Cpu, label: "ESP32" },
              { icon: Wifi, label: "WiFi/MQTT" },
              { icon: Cloud, label: "Cloud API" },
              { icon: Database, label: "Database" },
              { icon: Monitor, label: "Dashboard" },
            ].map((block, i) => (
              <motion.div
                key={block.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 card-glow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <block.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-foreground text-center">{block.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/architecture" className="text-sm font-semibold text-primary hover:underline">
              View Full Architecture →
            </Link>
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
              Ready to Monitor Smarter?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-primary-foreground/70">
              Start monitoring your water systems with AquaGo's professional IoT dashboard.
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
});

HomePage.displayName = "HomePage";

export default HomePage;
