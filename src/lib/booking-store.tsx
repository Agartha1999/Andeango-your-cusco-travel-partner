import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Bus } from "@/data/mock";

export type GrupalBooking = {
  bus: Bus;
  fecha: string;
  origen: string;
  destino: string;
  adultos: number;
  ninos: number;
  recogida: string;
  entrega: string;
  total: number;
};

type Ctx = {
  grupal: GrupalBooking | null;
  setGrupal: (b: GrupalBooking | null) => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [grupal, setGrupal] = useState<GrupalBooking | null>(null);
  const value = useMemo(() => ({ grupal, setGrupal }), [grupal]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking debe usarse dentro de BookingProvider");
  return ctx;
}
