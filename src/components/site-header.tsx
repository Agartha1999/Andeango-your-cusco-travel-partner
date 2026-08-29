import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/traslados-grupales", label: "Traslados" },
  { to: "/traslados-privados", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
  { to: "/blog", label: "Blog" },
] as const;

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link to="/" className="flex shrink-0 flex-col leading-none">
      <span
        className={`text-2xl font-extrabold tracking-tight ${tone === "light" ? "text-primary-foreground" : "text-navy"}`}
      >
        andean<span className="text-gold">'GO</span>
      </span>
      <span
        className={`mt-0.5 text-[8px] tracking-[0.35em] ${tone === "light" ? "text-primary-foreground/60" : "text-muted-foreground"}`}
      >
        TRANSPORTE TURÍSTICO
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                activeProps={{
                  className: "text-primary-foreground underline decoration-gold decoration-2 underline-offset-8",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contacto"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold tracking-wide text-gold-foreground uppercase transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Contáctanos <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-primary-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-primary-foreground/10 px-4 pb-4 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-primary-foreground/10 py-3 text-sm font-medium text-primary-foreground/85"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
