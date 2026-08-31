import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Reserva tu traslado con Andean'GO" },
      {
        name: "description",
        content:
          "Escríbenos por WhatsApp o formulario para cotizar traslados grupales y privados en Cusco. Atención 24 horas.",
      },
      { property: "og:title", content: "Contacto — Andean'GO" },
      { property: "og:description", content: "Cotiza tu traslado en Cusco con atención 24 horas." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email.includes("@") || form.mensaje.length < 10) {
      setError("Completa tu nombre, un correo válido y un mensaje de al menos 10 caracteres.");
      return;
    }
    setError("");
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setOk(true);
    }, 1200);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8">
      <div>
        <h1 className="text-3xl font-extrabold text-navy">Contáctanos</h1>
        <p className="mt-3 text-navy-soft">Respondemos en menos de 30 minutos, todos los días del año.</p>
        <ul className="mt-6 space-y-3 text-sm text-navy-soft">
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" /> Av. El Sol 315, Cusco
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold" /> +51 984 000 000
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gold" /> reservas@andeango.com
          </li>
        </ul>
      </div>

      <form onSubmit={submit} className="surface-card space-y-4 p-6">
        {ok ? (
          <p className="rounded-xl bg-success-soft px-4 py-3 text-sm font-semibold text-success">
            ¡Gracias! Tu mensaje fue enviado.
          </p>
        ) : (
          <>
            <Field label="Nombre" value={form.nombre} onChange={(v) => setForm({ ...form, nombre: v })} />
            <Field
              label="Correo electrónico"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <div>
              <label className="text-xs font-semibold text-navy">Mensaje</label>
              <textarea
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                rows={4}
                className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-navy"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              disabled={enviando}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-gold-foreground disabled:opacity-70"
            >
              {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-navy">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </div>
  );
}
