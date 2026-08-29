import { Briefcase, Users } from "lucide-react";
import { soles, type Vehiculo } from "@/data/mock";

export function VehicleCard({
  vehiculo,
  seleccionado,
  onSelect,
}: {
  vehiculo: Vehiculo;
  seleccionado: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={seleccionado}
      className={`grid w-full grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-2xl border p-3 text-left transition-all sm:grid-cols-[140px_minmax(0,1fr)_auto] ${
        seleccionado ? "border-navy bg-navy/5 shadow-card" : "border-border bg-card hover:border-navy/40"
      }`}
    >
      <img
        src={vehiculo.imagen}
        alt={vehiculo.nombre}
        loading="lazy"
        width={800}
        height={600}
        className="h-16 w-full rounded-xl object-contain sm:h-20"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-bold text-navy">{vehiculo.nombre}</h3>
          {vehiculo.badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${
                vehiculo.badge === "Mejor opción"
                  ? "bg-gold text-gold-foreground"
                  : "bg-navy text-primary-foreground"
              }`}
            >
              {vehiculo.badge}
            </span>
          )}
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {vehiculo.pasajeros} pax
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" /> {vehiculo.maletas} maletas
          </span>
        </p>
        <p className="mt-1 truncate text-xs text-muted-foreground">{vehiculo.descripcion}</p>
        <p className="mt-2 text-base font-extrabold text-navy sm:hidden">{soles(vehiculo.precio)}</p>
      </div>
      <div className="hidden text-right sm:block">
        <p className="text-lg font-extrabold text-navy">{soles(vehiculo.precio)}</p>
        <p className="text-[10px] text-muted-foreground">Precio total</p>
      </div>
    </button>
  );
}
