import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Baby,
  Check,
  Headphones,
  LifeBuoy,
  Loader2,
  Luggage,
  MessageCircle,
  Minus,
  Plus,
  Repeat,
  ShieldCheck,
} from "lucide-react";
import { RUTA_PRIVADA, SERVICIOS_INCLUIDOS, soles, VEHICULOS } from "@/data/mock";
import { Stepper } from "@/components/privados/stepper";
import { VehicleCard } from "@/components/privados/vehicle-card";
import { RouteMap } from "@/components/privados/route-map";
import { ReservationSummary } from "@/components/privados/reservation-summary";

export const Route = createFileRoute("/traslados-privados")({
  head: () => ({
    meta: [
      { title: "Traslados privados en Cusco — Reserva tu vehículo | Andean'GO" },
      {
        name: "description",
        content:
          "Reserva un traslado privado con conductor en Cusco: sedán, SUV, mini van o sprinter. Meet & Greet, cancelación gratuita y pago en soles.",
      },
      { property: "og:title", content: "Traslados privados en Cusco | Andean'GO" },
      {
        property: "og:description",
        content: "Vehículo exclusivo con conductor del aeropuerto a tu hotel en Cusco.",
      },
    ],
  }),
  component: Privados,
});

function Privados() {
  const [paso, setPaso] = useState(1);
  const [vehiculoId, setVehiculoId] = useState("sedan");
  const [idaYVuelta, setIdaYVuelta] = useState(false);
  const [extras, setExtras] = useState({ vuelo: "", silla: false, notas: "", maletas: 2 });
  const [datos, setDatos] = useState({ nombre: "", apellido: "", email: "", celular: "", meet: "" });
  const [pago, setPago] = useState({ metodo: "tarjeta", numero: "", titular: "", vence: "", cvc: "" });
  const [terminos, setTerminos] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [listo, setListo] = useState(false);

  const vehiculo = useMemo(() => VEHICULOS.find((v) => v.id === vehiculoId) ?? VEHICULOS[0]!, [vehiculoId]);
  const ida = vehiculo.precio;
  const vuelta = idaYVuelta ? Math.round(vehiculo.precio * 0.85) : 0;
  const total = ida + vuelta;

  const validar = () => {
    if (paso === 3) {
      if (!datos.nombre || !datos.apellido || !datos.email.includes("@") || datos.celular.length < 6) {
        setError("Completa nombre, apellido, un correo válido y tu número de celular.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const siguiente = () => {
    if (!validar()) return;
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setPaso((p) => Math.min(4, p + 1));
    }, 700);
  };

  const pagar = () => {
    if (pago.metodo === "tarjeta" && (pago.numero.length < 12 || !pago.titular || !pago.vence || !pago.cvc)) {
      return setError("Completa los datos de tu tarjeta.");
    }
    if (!terminos) return setError("Debes aceptar los términos y la política de privacidad.");
    setError("");
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setListo(true);
    }, 1600);
  };

  if (listo) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center lg:px-8">
        <div className="surface-card p-10">
          <BadgeCheck className="mx-auto h-10 w-10 text-success" />
          <h1 className="mt-4 text-2xl font-extrabold text-navy">¡Traslado privado confirmado!</h1>
          <p className="mt-3 text-navy-soft">
            {vehiculo.nombre} · {RUTA_PRIVADA.fecha} · {soles(total)}. Enviamos la confirmación a {datos.email}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <div className="surface-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
        <div className="min-w-0">
          <Stepper paso={paso} onGoTo={setPaso} />
        </div>
        <span className="hidden shrink-0 items-center gap-2 text-xs font-semibold text-success sm:flex">
          <ShieldCheck className="h-4 w-4" /> Reserva segura · SSL Seguro
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="space-y-5">
          {paso === 1 && (
            <>
              <RouteMap />

              <div className="surface-card space-y-3 p-5">
                <h1 className="text-lg font-bold text-navy">Selecciona tu vehículo</h1>
                {VEHICULOS.map((v) => (
                  <VehicleCard
                    key={v.id}
                    vehiculo={v}
                    seleccionado={v.id === vehiculoId}
                    onSelect={() => setVehiculoId(v.id)}
                  />
                ))}
              </div>

              <button
                onClick={() => setIdaYVuelta((v) => !v)}
                className="surface-card grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 text-left"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold text-navy">
                    <Repeat className="h-4 w-4 text-gold" /> ¿Viaje de ida y vuelta? Viaja de forma inteligente
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {idaYVuelta
                      ? `Retorno activado · ahorras ${soles(Math.round(vehiculo.precio * 0.15))}`
                      : "Añade el retorno y ahorra un 15 % sobre la segunda tarifa."}
                  </p>
                </div>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    idaYVuelta ? "bg-gold text-gold-foreground" : "bg-secondary text-navy"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>

              <div className="rounded-2xl border border-success/30 bg-success-soft p-5 text-sm text-success">
                <p className="font-semibold">Cancelación Gratuita 24 horas</p>
                <p className="mt-1">
                  Reserva hoy y cancela sin costo hasta el 29 de junio de 2026 a las 22:59 hrs, con reembolso
                  completo.
                </p>
              </div>

              <div className="surface-card p-5">
                <p className="text-center text-xs font-bold tracking-widest text-navy uppercase">
                  Todos los servicios incluyen
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {SERVICIOS_INCLUIDOS.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-navy-soft">
                      <Check className="h-4 w-4 shrink-0 text-success" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: MessageCircle, t: "Iniciar chat", d: "Siempre a tu alcance" },
                  { icon: LifeBuoy, t: "Centro de ayuda", d: "Preguntas frecuentes" },
                  { icon: Headphones, t: "Contáctanos", d: "Atención 24/7" },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="rounded-2xl bg-navy p-5 text-center text-primary-foreground">
                    <Icon className="mx-auto h-5 w-5" />
                    <p className="mt-2 text-sm font-semibold">{t}</p>
                    <p className="text-[11px] text-primary-foreground/60">{d}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {paso === 2 && (
            <div className="surface-card space-y-6 p-6">
              <header className="text-center">
                <h1 className="text-lg font-bold text-navy">Extras y datos adicionales</h1>
                <p className="text-xs text-muted-foreground">Información opcional para personalizar tu traslado</p>
              </header>

              <div>
                <label className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Número de vuelo / tren
                </label>
                <input
                  value={extras.vuelo}
                  onChange={(e) => setExtras({ ...extras, vuelo: e.target.value })}
                  placeholder="Ej. LA2034, AV1 / IR3055"
                  className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-navy"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Nos ayuda a monitorear retrasos y ajustar la hora de recojo sin costo adicional.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Necesidades especiales
                </p>
                <label className="mt-2 flex items-start gap-2 text-sm text-navy-soft">
                  <input
                    type="checkbox"
                    checked={extras.silla}
                    onChange={(e) => setExtras({ ...extras, silla: e.target.checked })}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[oklch(0.24_0.08_265)]"
                  />
                  <span className="flex items-center gap-2">
                    <Baby className="h-4 w-4 text-gold" /> ¿Necesitas silla infantil o booster? Sin costo
                    adicional, sujeto a disponibilidad.
                  </span>
                </label>
              </div>

              <div>
                <label className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Notas para el conductor (ida)
                </label>
                <textarea
                  rows={4}
                  maxLength={250}
                  value={extras.notas}
                  onChange={(e) => setExtras({ ...extras, notas: e.target.value })}
                  placeholder="Detalles del equipaje, solicitudes especiales y/o datos que el conductor necesita saber."
                  className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-navy"
                />
                <p className="text-right text-[11px] text-muted-foreground">{250 - extras.notas.length} / 250</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Cantidad de maletas
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center rounded-xl border border-border">
                    <button
                      aria-label="Quitar maleta"
                      onClick={() => setExtras({ ...extras, maletas: Math.max(0, extras.maletas - 1) })}
                      className="px-4 py-2 text-navy"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-semibold text-navy">{extras.maletas}</span>
                    <button
                      aria-label="Agregar maleta"
                      onClick={() =>
                        setExtras({ ...extras, maletas: Math.min(vehiculo.maletas, extras.maletas + 1) })
                      }
                      className="px-4 py-2 text-navy"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Luggage className="h-4 w-4" /> Máx. {vehiculo.maletas} maletas estándar para este vehículo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {paso === 3 && (
            <div className="surface-card space-y-5 p-6">
              <header className="text-center">
                <h1 className="text-lg font-bold text-navy">Pasajero principal</h1>
                <p className="text-xs text-muted-foreground">Datos del titular de la reserva</p>
              </header>

              <div className="grid gap-4 sm:grid-cols-2">
                <Campo label="Nombre" value={datos.nombre} onChange={(v) => setDatos({ ...datos, nombre: v })} />
                <Campo
                  label="Apellido"
                  value={datos.apellido}
                  onChange={(v) => setDatos({ ...datos, apellido: v })}
                />
              </div>
              <Campo
                label="Correo electrónico"
                type="email"
                value={datos.email}
                onChange={(v) => setDatos({ ...datos, email: v })}
                hint="No enviaremos publicidad no solicitada."
              />
              <div>
                <label className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Número de celular
                </label>
                <div className="mt-1 grid grid-cols-[110px_minmax(0,1fr)] gap-2">
                  <select className="rounded-xl border border-border bg-card px-2 py-2.5 text-sm outline-none">
                    <option>🇵🇪 +51</option>
                    <option>🇨🇱 +56</option>
                    <option>🇦🇷 +54</option>
                    <option>🇺🇸 +1</option>
                    <option>🇪🇸 +34</option>
                  </select>
                  <input
                    value={datos.celular}
                    onChange={(e) => setDatos({ ...datos, celular: e.target.value })}
                    placeholder="999 999 999"
                    className="min-w-0 rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-navy"
                  />
                </div>
              </div>

              <p className="rounded-xl bg-navy p-4 text-xs text-primary-foreground/80">
                Recibirás los datos del conductor 6 horas antes del recojo por correo y WhatsApp, junto al punto
                exacto de encuentro.
              </p>

              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Meet &amp; Greet <span className="text-gold-foreground">(opcional)</span>
                </p>
                <input
                  value={datos.meet}
                  onChange={(e) => setDatos({ ...datos, meet: e.target.value })}
                  placeholder="Ej. Vuelo LA2034 / Reserva Hotel Centro Histórico"
                  className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-navy"
                />
              </div>
            </div>
          )}

          {paso === 4 && (
            <div className="surface-card space-y-5 p-6">
              <header className="text-center">
                <h1 className="text-lg font-bold text-navy">Desglose de precio</h1>
                <p className="text-xs text-muted-foreground">Revisa el detalle antes de continuar al pago</p>
              </header>

              <div className="grid gap-3 sm:grid-cols-2">
                <Dato label="Ida" valor={soles(ida)} />
                <Dato label="Ida y vuelta" valor={idaYVuelta ? soles(total) : "No incluido"} />
                <Dato label="Precio total" valor={soles(total)} destacado />
                <Dato label="Vehículo" valor={vehiculo.nombre} />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 rounded-xl border border-border p-4 text-sm font-semibold text-navy">
                  <input
                    type="radio"
                    checked={pago.metodo === "tarjeta"}
                    onChange={() => setPago({ ...pago, metodo: "tarjeta" })}
                    className="h-4 w-4 accent-[oklch(0.24_0.08_265)]"
                  />
                  Tarjeta de crédito / débito
                </label>
                {pago.metodo === "tarjeta" && (
                  <div className="grid gap-3 rounded-xl bg-secondary p-4 sm:grid-cols-2">
                    <input
                      placeholder="Titular de la tarjeta"
                      value={pago.titular}
                      onChange={(e) => setPago({ ...pago, titular: e.target.value })}
                      className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none sm:col-span-2"
                    />
                    <input
                      placeholder="0000 0000 0000 0000"
                      value={pago.numero}
                      onChange={(e) => setPago({ ...pago, numero: e.target.value })}
                      className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none sm:col-span-2"
                    />
                    <input
                      placeholder="MM/AA"
                      value={pago.vence}
                      onChange={(e) => setPago({ ...pago, vence: e.target.value })}
                      className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none"
                    />
                    <input
                      placeholder="CVC"
                      value={pago.cvc}
                      onChange={(e) => setPago({ ...pago, cvc: e.target.value })}
                      className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none"
                    />
                  </div>
                )}
                <label className="flex items-center gap-2 rounded-xl border border-border p-4 text-sm font-semibold text-navy">
                  <input
                    type="radio"
                    checked={pago.metodo === "billetera"}
                    onChange={() => setPago({ ...pago, metodo: "billetera" })}
                    className="h-4 w-4 accent-[oklch(0.24_0.08_265)]"
                  />
                  Billetera digital · Yape / Plin
                </label>
              </div>

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={terminos}
                  onChange={(e) => setTerminos(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[oklch(0.24_0.08_265)]"
                />
                Acepto los términos y condiciones y la política de privacidad de Andean'GO.
              </label>
            </div>
          )}

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl bg-card p-4 shadow-card">
            <button
              onClick={() => setPaso((p) => Math.max(1, p - 1))}
              disabled={paso === 1}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Volver
            </button>
            <button
              onClick={paso === 4 ? pagar : siguiente}
              disabled={cargando}
              className="inline-flex items-center justify-center gap-2 justify-self-end rounded-xl bg-gold px-6 py-3 text-sm font-bold text-gold-foreground disabled:opacity-70"
            >
              {cargando && <Loader2 className="h-4 w-4 animate-spin" />}
              {cargando ? "Procesando..." : paso === 4 ? `Pagar ${soles(total)}` : "Continuar"}
              {!cargando && paso < 4 && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </section>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ReservationSummary vehiculo={vehiculo} idaYVuelta={idaYVuelta} total={total} />
        </aside>
      </div>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-navy"
      />
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Dato({ label, valor, destacado }: { label: string; valor: string; destacado?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${destacado ? "bg-navy text-primary-foreground" : "bg-secondary"}`}>
      <p className={`text-[10px] tracking-widest uppercase ${destacado ? "opacity-70" : "text-muted-foreground"}`}>
        {label}
      </p>
      <p className={`mt-1 font-extrabold ${destacado ? "" : "text-navy"}`}>{valor}</p>
    </div>
  );
}
