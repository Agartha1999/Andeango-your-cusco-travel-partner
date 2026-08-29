import { CalendarDays, Hotel, Pencil, Plane, Users } from "lucide-react";
import { RUTA_PRIVADA, soles, type Vehiculo } from "@/data/mock";
import { RouteMap } from "./route-map";

export function ReservationSummary({
  vehiculo,
  idaYVuelta,
  total,
}: {
  vehiculo: Vehiculo;
  idaYVuelta: boolean;
  total: number;
}) {
  return (
    <div className="surface-card space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-navy">Tu reserva</h2>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" /> {RUTA_PRIVADA.pasajeros} pasajeros
        </span>
      </div>

      <RouteMap compact />

      <div className="rounded-2xl border border-border p-3">
        <div className="flex items-center justify-between">
          {vehiculo.badge === "Mejor opción" && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold text-gold-foreground uppercase">
              Mejor opción
            </span>
          )}
          <Pencil className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <img
          src={vehiculo.imagen}
          alt={vehiculo.nombre}
          loading="lazy"
          width={800}
          height={600}
          className="mx-auto h-16 object-contain"
        />
        <p className="text-sm font-bold text-navy">{vehiculo.nombre}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {vehiculo.pasajeros} pax · {vehiculo.maletas} maletas
        </p>
        <p className="mt-2 text-right text-base font-extrabold text-navy">{soles(vehiculo.precio)}</p>
      </div>

      <div className="space-y-3 text-sm">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <CalendarDays className="h-3.5 w-3.5" /> Ida · {RUTA_PRIVADA.fecha}
        </p>
        <div className="flex items-start gap-3 rounded-xl bg-secondary p-3">
          <Plane className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-navy">{RUTA_PRIVADA.origen}</p>
            <p className="truncate text-xs text-muted-foreground">{RUTA_PRIVADA.origenDetalle}</p>
          </div>
          <span className="shrink-0 text-xs font-semibold text-navy">{RUTA_PRIVADA.horaRecojo}</span>
        </div>
        <div className="flex items-start gap-3 rounded-xl bg-secondary p-3">
          <Hotel className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-navy">{RUTA_PRIVADA.destino}</p>
            <p className="truncate text-xs text-muted-foreground">{RUTA_PRIVADA.destinoDetalle}</p>
          </div>
          <span className="shrink-0 text-xs font-semibold text-navy">{RUTA_PRIVADA.horaLlegada}</span>
        </div>
        {idaYVuelta && (
          <p className="rounded-xl bg-success-soft px-3 py-2 text-xs font-semibold text-success">
            Retorno incluido · ahorras {soles(Math.round(vehiculo.precio * 0.15))}
          </p>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Detalles del precio</p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-navy">Total</span>
          <span className="text-xl font-extrabold text-navy">{soles(total)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground">
        {["Cancelación gratuita", "Servicio puerta a puerta", "Meet & Greet", "Choferes profesionales"].map((t) => (
          <span key={t} className="rounded-lg border border-border px-2 py-2">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
