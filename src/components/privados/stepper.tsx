import { Check } from "lucide-react";

export const PASOS = ["Vehículo", "Extra", "Datos", "Pago"];

export function Stepper({ paso, onGoTo }: { paso: number; onGoTo: (n: number) => void }) {
  return (
    <ol className="flex items-center gap-1 sm:gap-3">
      {PASOS.map((label, i) => {
        const n = i + 1;
        const completo = n < paso;
        const activo = n === paso;
        return (
          <li key={label} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-3">
            <button
              onClick={() => n < paso && onGoTo(n)}
              className="flex min-w-0 flex-col items-center gap-1"
              aria-current={activo ? "step" : undefined}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                  completo
                    ? "bg-navy text-primary-foreground"
                    : activo
                      ? "bg-gold text-gold-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {completo ? <Check className="h-4 w-4" /> : n}
              </span>
              <span
                className={`truncate text-[10px] tracking-wide uppercase sm:text-xs ${
                  activo ? "font-semibold text-navy" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </button>
            {i < PASOS.length - 1 && (
              <span className={`h-0.5 flex-1 rounded ${completo ? "bg-navy" : "bg-border"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
