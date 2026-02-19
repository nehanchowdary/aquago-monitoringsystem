import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card py-12">
    <div className="container">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Droplets className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-extrabold text-foreground">AquaGo</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/dashboard", label: "Dashboard" },
            { to: "/alerts", label: "Alerts" },
            { to: "/analytics", label: "Analytics" },
            { to: "/about", label: "About" },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          AquaGo – Affordable Smart Aquaculture for Every Farmer.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          © {new Date().getFullYear()} AquaGo. Built for farmers, powered by innovation.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
