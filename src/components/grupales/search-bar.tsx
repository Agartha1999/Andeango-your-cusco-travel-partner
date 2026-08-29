import { ArrowLeftRight, CalendarDays, MapPin, Search } from "lucide-react";
import { CIUDADES } from "@/data/mock";

type Props = {
  origen: string;
  destino: string;
  fecha: string;
  regreso: string;
  onChange: (patch: { origen?: string; destino?: string; fecha?: string; regreso?: string }) => void;
  onSearch: () => void;
  loading?: boolean;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 flex-1 border-b border-border px-4 py-3 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
      <div className="mt-1 flex items-center gap-2">{children}</div>
    </div>
  );
}

export function SearchBar({ origen, destino, fecha, regreso, onChange, onSearch, loading }: Props) {
  return (
    <div className="surface-card overflow-hidden p-2 md:p-3">
      <div className="flex flex-col items-stretch md:flex-row md:items-center">
        <Field label="De">
          <MapPin className="h-4 w-4 shrink-0 text-navy" />
          <select
            value={origen}
            onChange={(e) => onChange({ origen: e.target.value })}
            className="w-full min-w-0 bg-transparent text-sm font-semibold text-navy outline-none"
          >
            {CIUDADES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <button
          type="button"
          aria-label="Invertir origen y destino"
          onClick={() => onChange({ origen: destino, destino: origen })}
          className="mx-auto -my-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-card text-navy shadow-sm md:mx-1 md:my-0"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <Field label="A">
          <MapPin className="h-4 w-4 shrink-0 text-navy" />
          <select
            value={destino}
            onChange={(e) => onChange({ destino: e.target.value })}
            className="w-full min-w-0 bg-transparent text-sm font-semibold text-navy outline-none"
          >
            {CIUDADES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Fecha del viaje">
          <CalendarDays className="h-4 w-4 shrink-0 text-navy" />
          <input
            type="date"
            value={fecha}
            onChange={(e) => onChange({ fecha: e.target.value })}
            className="w-full min-w-0 bg-transparent text-sm font-semibold text-navy outline-none"
          />
        </Field>

        <Field label="Fecha de regreso">
          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="date"
            value={regreso}
            onChange={(e) => onChange({ regreso: e.target.value })}
            className="w-full min-w-0 bg-transparent text-sm font-semibold text-muted-foreground outline-none"
          />
        </Field>

        <div className="p-2">
          <button
            onClick={onSearch}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-70 md:w-auto"
          >
            <Search className="h-4 w-4" />
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>
    </div>
  );
}
