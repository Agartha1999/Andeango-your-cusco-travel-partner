import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, CreditCard, Loader2, LocateFixed, MapPin, Tag } from "lucide-react";
import { PAISES, soles } from "@/data/mock";
import { formatoLargo } from "@/components/grupales/date-chips";
import { useBooking } from "@/lib/booking-store";

export const Route = createFileRoute("/finalizar-compra")({
  head: () => ({
    meta: [
      { title: "Finalizar compra — Traslado grupal | Andean'GO" },
      {
        name: "description",
        content: "Completa tus datos de facturación, punto de recojo y pago para confirmar tu traslado grupal.",
      },
      { property: "og:title", content: "Finalizar compra | Andean'GO" },
      { property: "og:description", content: "Confirma tu reserva de traslado grupal en Cusco." },
    ],
  }),
  component: Checkout,
});

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  return `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
}

function Checkout() {
  const { grupal } = useBooking();
  const navigate = useNavigate();
  const tiempo = useCountdown(600);
  const [cupónAbierto, setCupónAbierto] = useState(false);
  const [terminos, setTerminos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [pagado, setPagado] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    pais: "Perú",
    direccion: "",
    telefono: "",
    tipoDoc: "Pasaporte",
    numeroDoc: "",
    notas: "",
  });

  if (!grupal) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
        <h1 className="text-2xl font-bold text-navy">No hay una reserva en curso</h1>
        <p className="mt-2 text-muted-foreground">Elige un horario para continuar con tu compra.</p>
        <Link
          to="/traslados-grupales"
          className="mt-6 inline-block rounded-xl bg-gold px-6 py-3 text-sm font-bold text-gold-foreground"
        >
          Ver traslados grupales
        </Link>
      </div>
    );
  }

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const pagar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.apellidos || !form.email.includes("@") || !form.telefono || !form.numeroDoc) {
      return setError("Completa nombre, apellidos, correo válido, teléfono y número de documento.");
    }
    if (!terminos) return setError("Debes aceptar los términos y la política de privacidad.");
    setError("");
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setPagado(true);
    }, 1600);
  };

  if (pagado) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center lg:px-8">
        <div className="surface-card p-10">
          <h1 className="text-2xl font-extrabold text-navy">¡Reserva confirmada!</h1>
          <p className="mt-3 text-navy-soft">
            Enviamos tu voucher a {form.email}. Tu unidad {grupal.bus.numeroUnidad} sale a las{" "}
            {grupal.bus.salida}.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-6 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <h1 className="font-serif text-3xl font-extrabold text-navy">Finalizar compra</h1>

      <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-success-soft px-4 py-3 text-sm font-medium text-success">
        <Clock className="h-4 w-4" /> Tus asientos están reservados por {tiempo}
      </div>

      <div className="mt-4 rounded-xl border border-gold bg-gold/10 px-4 py-3 text-sm text-navy">
        ¿Tienes un cupón?{" "}
        <button onClick={() => setCupónAbierto((v) => !v)} className="text-gold-foreground underline">
          Haz clic aquí para introducir tu código
        </button>
        {cupónAbierto && (
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <input
              placeholder="Código de cupón"
              className="min-w-0 rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
            />
            <button className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-primary-foreground">
              <Tag className="h-3.5 w-3.5" /> Aplicar
            </button>
          </div>
        )}
      </div>

      <form onSubmit={pagar} className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="surface-card space-y-4 p-6">
          <h2 className="border-b border-border pb-3 text-lg font-bold text-navy">Detalles de facturación</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nombre *" value={form.nombre} onChange={set("nombre")} />
            <Input label="Apellidos *" value={form.apellidos} onChange={set("apellidos")} />
          </div>
          <Input label="Dirección de correo electrónico *" type="email" value={form.email} onChange={set("email")} />
          <div>
            <label className="text-xs font-semibold text-navy">Indícanos tu País *</label>
            <select
              value={form.pais}
              onChange={(e) => set("pais")(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none"
            >
              {PAISES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <Input
            label="Dirección de recojo Airbnb u Hotel *"
            value={form.direccion}
            onChange={set("direccion")}
            placeholder="Ej. Calle Tecsecocha 162"
          />

          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative h-48 bg-[oklch(0.94_0.02_150)]">
              <svg viewBox="0 0 400 200" className="h-full w-full" aria-label="Mapa de recojo" role="img">
                <rect width="400" height="200" fill="oklch(0.95 0.02 150)" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={i} x1={i * 34} y1="0" x2={i * 34} y2="200" stroke="oklch(0.9 0.02 150)" strokeWidth="6" />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={i} x1="0" y1={i * 36} x2="400" y2={i * 36} stroke="oklch(0.9 0.02 150)" strokeWidth="6" />
                ))}
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-destructive">
                <MapPin className="h-7 w-7" />
              </span>
            </div>
            <div className="bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">
                Mueve el marcador para ajustar tu ubicación exacta.
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-gold-foreground"
              >
                <LocateFixed className="h-3.5 w-3.5" /> Detectar mi ubicación actual
              </button>
            </div>
          </div>

          <Input label="Teléfono/WhatsApp *" value={form.telefono} onChange={set("telefono")} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-navy">Tipo de Documento *</label>
              <select
                value={form.tipoDoc}
                onChange={(e) => set("tipoDoc")(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none"
              >
                <option>Pasaporte</option>
                <option>DNI</option>
                <option>Carné de extranjería</option>
              </select>
            </div>
            <Input label="Número de Documento *" value={form.numeroDoc} onChange={set("numeroDoc")} />
          </div>

          <div>
            <label className="text-xs font-semibold text-navy">Notas del pedido (opcional)</label>
            <textarea
              rows={3}
              value={form.notas}
              onChange={(e) => set("notas")(e.target.value)}
              placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
              className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none"
            />
          </div>
        </section>

        <aside className="space-y-4">
          <div className="surface-card space-y-4 p-6 text-sm">
            <h2 className="border-b border-border pb-3 text-lg font-bold text-navy">Tu pedido</h2>
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>Producto</span>
              <span>Subtotal</span>
            </div>
            <p className="font-semibold text-navy">
              {grupal.bus.operador} × {grupal.adultos + grupal.ninos}
            </p>
            <div className="space-y-2 rounded-xl border border-border p-3 text-xs text-navy-soft">
              <p className="font-semibold text-navy">Detalles de la reserva:</p>
              <p>
                📍 Embarque: {grupal.origen} ({formatoLargo(grupal.fecha)} {grupal.bus.salida})
              </p>
              <p>
                📍 Goteante: {grupal.destino} ({formatoLargo(grupal.fecha)} {grupal.bus.llegada})
              </p>
              <p>📍 Punto de Recogida: {grupal.recogida}</p>
              <p>📍 Punto de Entrega: {grupal.entrega}</p>
            </div>
            <div className="space-y-1 rounded-xl bg-secondary p-3 text-xs text-navy-soft">
              <p className="font-semibold text-navy">Información del boleto</p>
              <p>Adulto: {grupal.adultos}</p>
              {grupal.ninos > 0 && <p>Niño: {grupal.ninos}</p>}
              <p>Precio: {soles(grupal.bus.precio)} /asiento</p>
              <p className="font-semibold text-navy">Subtotal de entradas: {soles(grupal.total)}</p>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-navy">{soles(grupal.total)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="font-semibold text-navy">Total</span>
              <span className="font-extrabold text-navy">{soles(grupal.total)}</span>
            </div>
          </div>

          <div className="surface-card space-y-4 p-6 text-sm">
            <div className="flex items-center gap-2 font-semibold text-navy">
              <CreditCard className="h-4 w-4" /> Paga con tarjeta de crédito y débito
              <span className="ml-auto text-xs text-muted-foreground">VISA · MC</span>
            </div>
            <input placeholder="Número de tarjeta" className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="MM/AA" className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none" />
              <input placeholder="CVV" className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none" />
            </div>
            <input placeholder="Nombre del titular" className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none" />

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[oklch(0.24_0.08_265)]"
              />
              He leído y estoy de acuerdo con los términos y condiciones y la política de privacidad de la web.
            </label>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              disabled={enviando}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-gold-foreground disabled:opacity-70"
            >
              {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
              {enviando ? "Procesando el pago..." : "Realizar el pedido"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-navy">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-navy"
      />
    </div>
  );
}
