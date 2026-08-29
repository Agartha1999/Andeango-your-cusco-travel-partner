import { MapPin, Navigation } from "lucide-react";
import { RUTA_PRIVADA } from "@/data/mock";

export function RouteMap({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-[oklch(0.94_0.02_230)] ${
        compact ? "h-32" : "h-56 sm:h-64"
      }`}
    >
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa de la ruta">
        <rect width="400" height="200" fill="oklch(0.95 0.015 230)" />
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="oklch(0.9 0.02 230)" strokeWidth="1" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="200" stroke="oklch(0.9 0.02 230)" strokeWidth="1" />
        ))}
        <path
          d="M50 150 C 130 140, 160 70, 250 60 S 340 55, 355 45"
          fill="none"
          stroke="oklch(0.24 0.08 265)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute bottom-6 left-4 grid h-6 w-6 place-items-center rounded-full bg-navy text-primary-foreground">
        <MapPin className="h-3.5 w-3.5" />
      </span>
      <span className="absolute top-6 right-5 grid h-6 w-6 place-items-center rounded-full bg-gold text-gold-foreground">
        <Navigation className="h-3.5 w-3.5" />
      </span>
      <div className="absolute top-3 left-3 rounded-lg bg-card/95 px-3 py-1.5 text-[11px] font-semibold text-navy shadow-sm">
        {RUTA_PRIVADA.origen} → {RUTA_PRIVADA.destino}
      </div>
      <div className="absolute right-3 bottom-3 rounded-lg bg-card/95 px-3 py-1.5 text-[11px] font-semibold text-navy shadow-sm">
        ~{RUTA_PRIVADA.distancia} · {RUTA_PRIVADA.duracion}
      </div>
    </div>
  );
}
