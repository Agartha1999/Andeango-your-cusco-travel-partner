import { createFileRoute } from "@tanstack/react-router";

const posts = [
  ["Cómo llegar de Cusco a Ollantaytambo en 2026", "Horarios, precios y consejos para el traslado más usado del Valle Sagrado."],
  ["Traslado privado vs. compartido: cuál te conviene", "Comparamos costo, tiempos y comodidad según el tamaño de tu grupo."],
  ["Soroche: 7 consejos para tu primer día en Cusco", "Aclimatación, hidratación y por qué llevamos oxígeno a bordo."],
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog de viajes — Andean'GO Cusco" },
      {
        name: "description",
        content: "Guías prácticas de traslados, rutas y consejos para viajar por Cusco y el Valle Sagrado.",
      },
      { property: "og:title", content: "Blog de viajes — Andean'GO" },
      { property: "og:description", content: "Guías de traslados y rutas en Cusco y el Valle Sagrado." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy">Blog</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {posts.map(([t, d]) => (
          <article key={t} className="surface-card p-6">
            <h2 className="font-bold text-navy">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            <p className="mt-4 text-xs font-semibold text-gold-foreground">Leer artículo →</p>
          </article>
        ))}
      </div>
    </div>
  ),
});
