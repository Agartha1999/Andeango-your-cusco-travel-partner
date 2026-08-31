import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Bus, Car, ShieldCheck, Clock, HeartHandshake } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SearchBar } from "@/components/grupales/search-bar";
import { DateChips } from "@/components/grupales/date-chips";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Andean'GO — Traslados turísticos en Cusco y Valle Sagrado" },
      {
        name: "description",
        content:
          "Reserva traslados grupales por asiento o traslados privados exclusivos en Cusco, Ollantaytambo y el Valle Sagrado. Precios en soles y confirmación inmediata.",
      },
      { property: "og:title", content: "Andean'GO — Traslados turísticos en Cusco" },
      {
        property: "og:description",
        content: "Traslados grupales y privados en Cusco: reserva tu asiento o tu vehículo exclusivo.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"grupal" | "privado">("grupal");
  const [form, setForm] = useState({
    origen: "Ollantaytambo",
    destino: "Cusco",
    fecha: "2026-08-30",
    regreso: "",
  });
  const [loading, setLoading] = useState(false);

  const buscar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({
        to: "/traslados-grupales",
        search: { origen: form.origen, destino: form.destino, fecha: form.fecha },
      });
    }, 700);
  };

  return (
    <>
      <section className="relative">
        <img
          src={heroImg}
          alt="Carretera andina hacia Cusco al amanecer"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-28 lg:px-8">
          <h1 className="max-w-2xl text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
            Transporte turístico Cusco · Valle Sagrado
          </h1>
          <p className="mt-4 max-w-xl text-primary-foreground/70">
            Elige tu asiento en un traslado compartido o reserva un vehículo privado con conductor.
          </p>

          <div className="mt-8 inline-flex rounded-full bg-card/10 p-1 backdrop-blur">
            <button
              onClick={() => setModo("grupal")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                modo === "grupal" ? "bg-gold text-gold-foreground" : "text-primary-foreground/80"
              }`}
            >
              <Bus className="h-4 w-4" /> Traslados grupales
            </button>
            <button
              onClick={() => setModo("privado")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                modo === "privado" ? "bg-gold text-gold-foreground" : "text-primary-foreground/80"
              }`}
            >
              <Car className="h-4 w-4" /> Traslados privados
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-20 max-w-7xl px-4 lg:px-8">
        <div className="surface-card p-4 sm:p-6">
          <h2 className="text-lg font-bold text-navy">
            {modo === "grupal" ? "Transporte Cusco Ollantaytambo" : "Traslado privado puerta a puerta"}
          </h2>

          {modo === "grupal" ? (
            <div className="mt-4 space-y-4">
              <SearchBar
                origen={form.origen}
                destino={form.destino}
                fecha={form.fecha}
                regreso={form.regreso}
                onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
                onSearch={buscar}
                loading={loading}
              />
              <DateChips fecha={form.fecha} onSelect={(fecha) => setForm((f) => ({ ...f, fecha }))} />
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <p className="text-sm text-muted-foreground">
                Servicio exclusivo desde el Aeropuerto Velasco Astete hacia tu hotel en el Centro Histórico, con
                Meet &amp; Greet incluido y vehículos desde 3 hasta 15 pasajeros.
              </p>
              <button
                onClick={() => navigate({ to: "/traslados-privados" })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-gold-foreground"
              >
                Reservar traslado privado <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-4 px-4 sm:grid-cols-3 lg:px-8">
        {[
          { icon: ShieldCheck, t: "Conductores certificados", d: "Unidades con revisión técnica y seguro vigente." },
          { icon: Clock, t: "Puntualidad garantizada", d: "15 minutos de espera incluidos en cada traslado." },
          { icon: HeartHandshake, t: "Atención 24/7", d: "Soporte en español e inglés antes y durante tu viaje." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="surface-card p-6">
            <Icon className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-bold text-navy">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </>
  );
}
