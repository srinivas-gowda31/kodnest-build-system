import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/saved", label: "Saved" },
  { to: "/digest", label: "Digest" },
  { to: "/settings", label: "Settings" },
  { to: "/proof", label: "Proof" },
];

const AppNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-space-3">
        <NavLink to="/" className="font-heading text-lg font-semibold text-foreground">
          KodNest
        </NavLink>

        {/* Desktop */}
        <ul className="hidden gap-space-3 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className="pb-1 text-sm text-muted-foreground transition-colors duration-base hover:text-foreground"
                activeClassName="text-primary border-b-2 border-primary"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col border-t border-border bg-card px-space-3 py-space-2 md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className="block py-2 text-sm text-muted-foreground transition-colors duration-base hover:text-foreground"
                activeClassName="text-primary font-medium"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default AppNav;
