import { useState } from "react";
import { Bus as BusIcon, Check, ChevronDown, Loader2, MapPin, Minus, Plus, Ticket } from "lucide-react";
import { soles, type Bus } from "@/data/mock";
import { formatoLargo } from "./date-chips";

type Props = {
  bus: Bus;
  fecha: string;
  origen: string;
  destino: string;
  onReservar: (data: {
    adultos: number;
    ninos: number;
    recogida: string;
    entrega: string;
    total: number;
  }) => void;
};

const secciones = ["Detalles del bus", "Puntos de embarque y descenso", "Características del bus", "Foto del bus"];

export function BusCard({ bus, fecha, origen, destino, onReservar }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [seccion, setSeccion] = useState<string | null>(null);
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);
  const [recogida, setRecogida] = useState("");
  const [entrega, setEntrega] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const total = adultos * bus.precio + ninos * Math.round(bus.precio * 0.7);

  const continuar = () => {
    if (adultos + ninos < 1) return setError("Selecciona al menos 1 pasajero.");
    if (!recogida) return setError("Selecciona un punto de recogida.");
    if (!entrega) return setError("Selecciona un punto de entrega.");
    setError("");
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      onReservar({ adultos, ninos, recogida, entrega, total });
    }, 1200);
  };

  return (
    <article className="surface-card overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[240px_minmax(0,1fr)_220px_200px]">
        <div className="bg-secondary p-4">
          <img
            src={bus.imagen}
            alt={bus.operador}
            loading="lazy"
            width={900}
            height={700}
            className="h-40 w-full rounded-xl object-contain lg:h-full"
          />
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-border p-6 lg:border-t-0 lg:border-l">
          <div className="text-center">
            <p className="text-2xl font-bold text-navy">{bus.salida}</p>
            <p className="text-xs text-muted-foreground">{origen}</p>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-navy">
              {bus.duracion}
            </span>
            <div className="mt-2 flex w-full items-center">
              <span className="h-px flex-1 border-t border-dashed border-border" />
              <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-primary-foreground">
                <BusIcon className="h-3.5 w-3.5" />
              </span>
              <span className="h-px flex-1 border-t border-dashed border-border" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-navy">{bus.llegada}</p>
            <p className="text-xs text-muted-foreground">{destino}</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-border p-6 lg:border-t-0 lg:border-l">
          <h3 className="text-lg leading-tight font-bold text-navy">{bus.operador}</h3>
          <div className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs">
            <span className="text-muted-foreground">Bus No:</span>
            <span className="font-semibold text-navy">{bus.numeroUnidad}</span>
          </div>
          <div className="rounded-xl bg-success-soft px-3 py-2 text-xs font-semibold text-success">
            {bus.asientos} asientos disponibles
          </div>
          <ul className="space-y-1 text-xs text-navy-soft">
            {bus.amenities.map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-success" /> {a}
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-dashed border-border pt-3">
            {secciones.map((s) => (
              <button
                key={s}
                onClick={() => setSeccion(seccion === s ? null : s)}
                className="flex w-full items-center justify-between rounded-full border border-border px-3 py-2 text-left text-xs text-navy transition-colors hover:bg-secondary"
              >
                {s}
                <ChevronDown className={`h-3 w-3 transition-transform ${seccion === s ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 border-t border-border p-6 text-center lg:border-t-0 lg:border-l">
          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">Desde</p>
          <p className="text-3xl font-extrabold text-navy">{soles(bus.precio)}</p>
          <button
            onClick={() => setAbierto((v) => !v)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card"
          >
            Reservar Asiento →
          </button>
        </div>
      </div>

      {seccion && (
        <div className="border-t border-border bg-secondary/60 p-5 text-sm text-navy-soft">
          <p className="mb-2 font-semibold text-navy">{seccion}</p>
          {seccion === "Detalles del bus" && <p>{bus.detalles}</p>}
          {seccion === "Puntos de embarque y descenso" && (
            <ul className="space-y-1">
              {[...bus.recogida, ...bus.entrega].map((p) => (
                <li key={p.label} className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-navy" /> {p.label} · {p.hora}
                </li>
              ))}
            </ul>
          )}
          {seccion === "Características del bus" && (
            <ul className="grid gap-1 sm:grid-cols-2">
              {bus.caracteristicas.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success" /> {c}
                </li>
              ))}
            </ul>
          )}
          {seccion === "Foto del bus" && (
            <img
              src={bus.imagen}
              alt={bus.operador}
              loading="lazy"
              width={900}
              height={700}
              className="max-h-56 rounded-xl object-contain"
            />
          )}
        </div>
      )}

      {abierto && (
        <div className="border-t border-border bg-card p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <dl className="space-y-4 rounded-2xl border border-border p-5 text-sm">
              <Row icon={<MapPin className="h-4 w-4" />} label="Embarque">
                {origen}
                <br />
                <span className="text-muted-foreground">
                  {formatoLargo(fecha)} {bus.salida}
                </span>
              </Row>
              <Row icon={<MapPin className="h-4 w-4" />} label="Goteante">
                {destino}
                <br />
                <span className="text-muted-foreground">
                  {formatoLargo(fecha)} {bus.llegada}
                </span>
              </Row>
              <Row icon={<Ticket className="h-4 w-4" />} label="Fecha">
                <span className="capitalize">{formatoLargo(fecha)}</span>
              </Row>
              <Row icon={<BusIcon className="h-4 w-4" />} label="Tipo de autocar">
                {bus.vehiculo}
              </Row>
              <Row icon={<Ticket className="h-4 w-4" />} label="Tarifa">
                {soles(bus.precio)} <span className="text-[10px] text-muted-foreground">/Asiento</span>
              </Row>
            </dl>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-secondary px-4 py-3 text-xs font-semibold text-muted-foreground">
                  <span>Tipo De Asiento</span>
                  <span>Cantidad</span>
                  <span>Precio</span>
                </div>
                <Counter label="Adulto" value={adultos} onChange={setAdultos} precio={bus.precio} />
                <Counter
                  label="Niño"
                  value={ninos}
                  onChange={setNinos}
                  precio={Math.round(bus.precio * 0.7)}
                />
              </div>

              <Selector
                label="Punto de recogida"
                value={recogida}
                onChange={setRecogida}
                options={bus.recogida.map((p) => `${p.label} (${p.hora})`)}
                placeholder="Selecciona una opción Punto de Recogida"
              />
              <Selector
                label="Punto de entrega"
                value={entrega}
                onChange={setEntrega}
                options={bus.entrega.map((p) => `${p.label} (${p.hora})`)}
                placeholder="Selecciona una opción Punto de Entrega"
              />
            </div>
          </div>

          {error && <p className="mt-4 text-sm font-medium text-destructive">{error}</p>}

          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-5">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Total :</p>
              <p className="text-2xl font-extrabold text-navy">{soles(total)}</p>
            </div>
            <button
              onClick={continuar}
              disabled={enviando}
              className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-gold-foreground disabled:opacity-70"
            >
              {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
              {enviando ? "Procesando la reserva..." : "Continuar reserva"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-3">
      <dt className="flex items-center gap-2 font-medium text-navy">
        {icon}
        {label}
      </dt>
      <dd className="min-w-0 text-navy-soft">{children}</dd>
    </div>
  );
}

function Counter({
  label,
  value,
  onChange,
  precio,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  precio: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 text-sm">
      <span className="text-navy-soft">{label}</span>
      <div className="flex items-center rounded-lg border border-border">
        <button
          aria-label={`Quitar ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="px-3 py-1.5 text-navy"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center font-semibold text-navy">{value}</span>
        <button
          aria-label={`Agregar ${label}`}
          onClick={() => onChange(value + 1)}
          className="px-3 py-1.5 text-navy"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <span className="font-semibold text-navy">{soles(precio)}</span>
    </div>
  );
}

function Selector({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary p-4">
      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-navy outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
