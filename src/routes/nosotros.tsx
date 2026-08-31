import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Andean'GO Transporte Turístico Cusco" },
      {
        name: "description",
        content:
          "Somos un operador de transporte turístico en Cusco con flota propia, conductores certificados y atención 24/7 en el Valle Sagrado.",
      },
      { property: "og:title", content: "Nosotros — Andean'GO" },
      { property: "og:description", content: "Operador de transporte turístico con flota propia en Cusco." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy">Nosotros</h1>
      <p className="mt-4 text-navy-soft">
        Andean'GO nació en Cusco para ordenar el traslado turístico entre la ciudad, Ollantaytambo y el Valle
        Sagrado. Operamos flota propia de vans y sprinters, con conductores certificados, oxígeno a bordo y
        seguimiento de cada servicio desde nuestra central 24/7.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["+12 000", "Pasajeros trasladados"],
          ["18", "Unidades en flota"],
          ["4.9/5", "Calificación promedio"],
        ].map(([n, l]) => (
          <div key={l} className="surface-card p-6">
            <p className="text-2xl font-extrabold text-navy">{n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </div>
  ),
});
