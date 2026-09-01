import { useState } from "react";
import { ChevronUp, CloudSun, Moon, SlidersHorizontal, Sun, Sunset } from "lucide-react";
import { FRANJAS, OPERADORES, TIPOS_VEHICULO } from "@/data/mock";

export type Filtros = { franjas: string[]; tipos: string[]; operadores: string[] };

type Props = { filtros: Filtros; onChange: (f: Filtros) => void };

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export function FiltersSidebar({ filtros, onChange }: Props) {
  const [abierto, setAbierto] = useState(true);

  return (
    <aside className="space-y-4">
      <button
        onClick={() => setAbierto((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl bg-gold px-4 py-3 text-sm font-bold text-gold-foreground"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </span>
        <ChevronUp className={`h-4 w-4 transition-transform ${abierto ? "" : "rotate-180"}`} />
      </button>

      {abierto && (
        <div className="surface-card space-y-6 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy">Filtros</h2>
            <button
              onClick={() => onChange({ franjas: [], tipos: [], operadores: [] })}
              className="text-xs text-gold-foreground underline"
            >
              Restablecer
            </button>
          </div>

          <Group title="Hora de salida">
            {FRANJAS.map((f) => (
              <Check
                key={f.id}
                label={f.label}
                icon={ICONOS[f.id]}
                checked={filtros.franjas.includes(f.id)}
                onChange={() => onChange({ ...filtros, franjas: toggle(filtros.franjas, f.id) })}
              />
            ))}
          </Group>

          <Group title="Tipo de vehículo">
            {TIPOS_VEHICULO.map((t) => (
              <Check
                key={t}
                label={t}
                checked={filtros.tipos.includes(t)}
                onChange={() => onChange({ ...filtros, tipos: toggle(filtros.tipos, t) })}
              />
            ))}
          </Group>

          <Group title="Operador de transporte">
            {OPERADORES.map((o) => (
              <Check
                key={o}
                label={o}
                checked={filtros.operadores.includes(o)}
                onChange={() => onChange({ ...filtros, operadores: toggle(filtros.operadores, o) })}
              />
            ))}
          </Group>
        </div>
      )}

      <div className="rounded-2xl bg-navy p-5 text-primary-foreground">
        <h3 className="text-sm font-bold">Descuento para miembros</h3>
        <p className="mt-2 text-sm text-primary-foreground/70">
          Ahorra hasta un 15 % en tu primer viaje a Cusco.
        </p>
        <button className="mt-4 rounded-full bg-card px-4 py-2 text-xs font-bold text-navy">Únete ahora</button>
      </div>
    </aside>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{title}</p>
      {children}
    </div>
  );
}

const ICONOS: Record<string, React.ReactNode> = {
  manana: <CloudSun className="h-3.5 w-3.5 text-gold" />,
  tarde: <Sun className="h-3.5 w-3.5 text-gold" />,
  atardecer: <Sunset className="h-3.5 w-3.5 text-gold" />,
  noche: <Moon className="h-3.5 w-3.5 text-navy" />,
};

function Check({
  label,
  checked,
  onChange,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-navy-soft">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-[oklch(0.24_0.08_265)]"
      />
      {icon}
      {label}
    </label>
  );
}
