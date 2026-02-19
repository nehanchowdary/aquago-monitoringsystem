import { Droplets } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-8">
    <div className="container text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        <Droplets className="h-5 w-5 text-primary" />
        <span className="font-bold text-foreground">AquaGo</span>
      </div>
      <p className="text-sm text-muted-foreground">
        AquaGo – Affordable Smart Aquaculture for Every Farmer.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        © {new Date().getFullYear()} AquaGo. Built for farmers, powered by innovation.
      </p>
    </div>
  </footer>
);

export default Footer;
