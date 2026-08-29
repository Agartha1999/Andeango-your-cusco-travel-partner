type Props = {
  fecha: string;
  onSelect: (fecha: string) => void;
};

export function nextDays(from: string, count = 6) {
  const base = new Date(`${from}T00:00:00`);
  if (Number.isNaN(base.getTime())) return [];
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() + i - 1);
    return d.toISOString().slice(0, 10);
  });
}

export function formatoLargo(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("es-PE", { month: "long", day: "numeric", year: "numeric" });
}

export function formatoCorto(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("es-PE", { month: "long", day: "numeric" });
}

export function DateChips({ fecha, onSelect }: Props) {
  const days = nextDays(fecha);
  return (
    <div className="surface-card flex gap-2 overflow-x-auto p-2">
      {days.map((d) => {
        const activo = d === fecha;
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`shrink-0 rounded-lg border px-4 py-2 text-sm whitespace-nowrap transition-colors ${
              activo
                ? "border-navy bg-navy/5 font-semibold text-navy"
                : "border-border text-muted-foreground hover:border-navy/40"
            }`}
          >
            <span className="capitalize">{formatoLargo(d)}</span>
          </button>
        );
      })}
    </div>
  );
}
