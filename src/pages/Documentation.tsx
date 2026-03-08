import { motion } from "framer-motion";
import { BookOpen, Cpu, Gauge, Zap, Monitor, Server, Wrench } from "lucide-react";

const sections = [
  {
    icon: BookOpen,
    title: "Project Overview",
    content: `AquaGo is a smart IoT water monitoring system designed for real-time water level tracking, pump automation, and alert management. It supports smart homes, agriculture irrigation, apartment water tanks, and industrial water systems.

The system uses ultrasonic sensors connected to ESP32 microcontrollers that transmit data via WiFi/MQTT to a cloud dashboard for visualization and control.`,
  },
  {
    icon: Wrench,
    title: "Hardware Components",
    content: `Required hardware components:

• Ultrasonic Sensor HC-SR04 — Measures water level using sound waves (range: 2cm–400cm, accuracy: ±3mm)
• ESP32 Microcontroller — WiFi-enabled microcontroller for data processing and transmission
• Relay Module (5V) — Controls the water pump ON/OFF state
• Submersible Water Pump — 12V DC pump for water transfer
• Power Supply — 5V USB or 12V adapter (solar panel compatible)
• Breadboard & Jumper Wires — For prototyping connections
• Waterproof Enclosure — To protect electronics from moisture`,
  },
  {
    icon: Gauge,
    title: "Sensor Wiring Guide",
    content: `HC-SR04 Ultrasonic Sensor Wiring:

• VCC → ESP32 5V (or VIN)
• GND → ESP32 GND
• TRIG → ESP32 GPIO 5
• ECHO → ESP32 GPIO 18

Relay Module Wiring:

• VCC → ESP32 3.3V
• GND → ESP32 GND
• IN → ESP32 GPIO 2
• COM → Pump Power (+)
• NO → Power Supply (+)

Temperature Sensor (DS18B20):

• VCC → ESP32 3.3V
• GND → ESP32 GND
• DATA → ESP32 GPIO 4 (with 4.7kΩ pull-up resistor)`,
  },
  {
    icon: Server,
    title: "System Architecture",
    content: `The system follows a standard IoT pipeline:

1. Sensing Layer — Ultrasonic and temperature sensors collect data
2. Processing Layer — ESP32 reads sensors, applies calibration, and formats data
3. Communication Layer — Data sent via WiFi using MQTT protocol to cloud broker
4. Storage Layer — Cloud server stores readings in a time-series database
5. Presentation Layer — AquaGo Dashboard renders data with charts, alerts, and controls

Data flow: Sensor → ESP32 → WiFi/MQTT → Cloud API → Database → Dashboard UI`,
  },
  {
    icon: Monitor,
    title: "Dashboard Usage",
    content: `Dashboard Features:

• Dashboard — Real-time tank level, pump status, and sensor data overview
• Devices — Add, edit, and remove IoT sensor devices
• Analytics — View water level history, daily usage, temperature trends, and export CSV
• Alerts — Monitor and resolve system alerts (low water, overflow, sensor failure, etc.)
• Automation — Create IF/THEN rules for pump control and alert triggers
• Settings — Configure user profile, notification preferences, and system intervals

The dashboard auto-refreshes sensor data every 5 seconds. Use the pump control widget to manually start/stop the pump, or enable auto-mode through automation rules.`,
  },
  {
    icon: Zap,
    title: "API Integration Guide",
    content: `REST API Endpoints:

POST /api/sensor-data
  Body: { device_id, water_level, temperature, ph }
  → Stores a new sensor reading

GET /api/sensor-data/:device_id
  → Returns latest readings for a device

POST /api/pump/control
  Body: { action: "on" | "off", device_id }
  → Controls pump state

GET /api/alerts
  → Returns all active alerts

MQTT Topics:

• aquago/sensor/{device_id}/data — Publish sensor readings
• aquago/pump/{device_id}/control — Publish pump commands
• aquago/alerts — Subscribe to alert notifications

Authentication: All API requests require a Bearer token in the Authorization header.`,
  },
];

const DocumentationPage = () => (
  <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-4xl">
    <div>
      <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
        <BookOpen className="h-3 w-3" /> DOCUMENTATION
      </div>
      <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">Documentation</h1>
      <p className="text-sm text-muted-foreground">Complete project guide — hardware, software, and API reference</p>
    </div>

    {/* Table of Contents */}
    <div className="rounded-2xl border bg-card p-5 card-glow">
      <h3 className="text-sm font-bold text-foreground mb-3">Table of Contents</h3>
      <div className="grid gap-1 sm:grid-cols-2">
        {sections.map((s, i) => (
          <a key={s.title} href={`#doc-${i}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
            <s.icon className="h-3.5 w-3.5 text-primary" />
            {s.title}
          </a>
        ))}
      </div>
    </div>

    {/* Sections */}
    {sections.map((section, i) => (
      <motion.div
        key={section.title}
        id={`doc-${i}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
        className="rounded-2xl border bg-card p-6 card-glow scroll-mt-20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <section.icon className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-bold text-foreground">{section.title}</h2>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {section.content}
        </div>
      </motion.div>
    ))}
  </div>
);

export default DocumentationPage;
