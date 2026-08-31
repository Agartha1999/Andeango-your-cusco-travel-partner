import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BUSES } from "@/data/mock";
import { SearchBar } from "@/components/grupales/search-bar";
import { DateChips, formatoCorto } from "@/components/grupales/date-chips";
import { FiltersSidebar, type Filtros } from "@/components/grupales/filters-sidebar";
import { BusCard } from "@/components/grupales/bus-card";
import { useBooking } from "@/lib/booking-store";

type Search = { origen?: string | undefined; destino?: string | undefined; fecha?: string | undefined };

export const Route = createFileRoute("/traslados-grupales")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    origen: typeof search["origen"] === "string" ? search["origen"] : undefined,
    destino: typeof search["destino"] === "string" ? search["destino"] : undefined,
    fecha: typeof search["fecha"] === "string" ? search["fecha"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Traslados grupales Cusco ↔ Ollantaytambo | Andean'GO" },
      {
        name: "description",
        content:
          "Compara horarios, operadores y precios de traslados compartidos por asiento entre Cusco y Ollantaytambo. Reserva en línea desde S/ 22.00.",
      },
      { property: "og:title", content: "Traslados grupales en Cusco | Andean'GO" },
      {
        property: "og:description",
        content: "Buses y vans compartidas por asiento entre Cusco, Ollantaytambo y el Valle Sagrado.",
      },
    ],
  }),
  component: Grupales,
});

function Grupales() {
  const params = Route.useSearch();
  const navigate = useNavigate();
  const { setGrupal } = useBooking();

  const [form, setForm] = useState({
    origen: params.origen ?? "Ollantaytambo",
    destino: params.destino ?? "Cusco",
    fecha: params.fecha ?? "2026-08-30",
    regreso: "",
  });
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState<Filtros>({ franjas: [], tipos: [], operadores: [] });
  const [orden, setOrden] = useState("temprano");

  const resultados = useMemo(() => {
    let list = BUSES.filter(
      (b) =>
        (!filtros.franjas.length || filtros.franjas.includes(b.franja)) &&
        (!filtros.tipos.length || filtros.tipos.includes(b.tipoVehiculo)) &&
        (!filtros.operadores.length || filtros.operadores.includes(b.operador)),
    );
    list = [...list].sort((a, b) => {
      if (orden === "precio-asc") return a.precio - b.precio;
      if (orden === "precio-desc") return b.precio - a.precio;
      if (orden === "tarde") return b.salida.localeCompare(a.salida);
      return a.salida.localeCompare(b.salida);
    });
    return list;
  }, [filtros, orden]);

  const buscar = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="surface-card p-4 sm:p-6">
        <h1 className="text-lg font-bold text-navy">
          Transporte {form.origen} {form.destino}
        </h1>
        <div className="mt-4">
          <SearchBar
            origen={form.origen}
            destino={form.destino}
            fecha={form.fecha}
            regreso={form.regreso}
            onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
            onSearch={buscar}
            loading={loading}
          />
        </div>
      </div>

      <div className="mt-4">
        <DateChips fecha={form.fecha} onSelect={(fecha) => setForm((f) => ({ ...f, fecha }))} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <FiltersSidebar filtros={filtros} onChange={setFiltros} />

        <section className="space-y-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <p className="min-w-0 text-sm text-navy-soft">
              <span className="font-bold text-navy">{resultados.length}</span> buses disponibles para{" "}
              <span className="capitalize">{formatoCorto(form.fecha)}</span>
            </p>
            <label className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Ordenar por:</span>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-navy outline-none"
              >
                <option value="temprano">Más temprano primero</option>
                <option value="tarde">Más tarde primero</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
              </select>
            </label>
          </div>

          {resultados.map((bus, i) => (
            <div key={bus.id} className="space-y-4">
              <BusCard
                bus={bus}
                fecha={form.fecha}
                origen={form.origen}
                destino={form.destino}
                onReservar={(data) => {
                  setGrupal({
                    bus,
                    fecha: form.fecha,
                    origen: form.origen,
                    destino: form.destino,
                    ...data,
                  });
                  navigate({ to: "/finalizar-compra" });
                }}
              />
              {i === 0 && (
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl bg-navy p-5 text-primary-foreground">
                  <div className="min-w-0">
                    <p className="font-bold">Descuento para miembros</p>
                    <p className="text-sm text-primary-foreground/70">
                      Ahorra hasta 15 % en tu primer viaje a Cusco.
                    </p>
                  </div>
                  <button className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-bold text-gold-foreground">
                    Únete ahora
                  </button>
                </div>
              )}
            </div>
          ))}

          {!resultados.length && (
            <p className="surface-card p-8 text-center text-sm text-muted-foreground">
              No hay salidas con esos filtros. Prueba restableciéndolos.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
