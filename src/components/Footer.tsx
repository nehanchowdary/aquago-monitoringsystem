import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card py-12">
    <div className="container">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Droplets className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-foreground">AquaGo</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Smart IoT Water Monitoring System for homes, farms, apartments, and industry.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground mb-3">Product</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</Link>
            <Link to="/automation" className="text-muted-foreground hover:text-foreground transition-colors">Automation</Link>
            <Link to="/devices" className="text-muted-foreground hover:text-foreground transition-colors">Devices</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground mb-3">Resources</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
            <Link to="/architecture" className="text-muted-foreground hover:text-foreground transition-colors">Architecture</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>support@aquago.io</p>
            <p>Documentation & API</p>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AquaGo. Smart Water Monitoring for Everyone.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Designed by M.Nehan Chowdary
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
