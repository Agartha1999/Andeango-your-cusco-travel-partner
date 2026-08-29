import { Link } from "@tanstack/react-router";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-navy">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/60">
            Traslados turísticos grupales y privados en Cusco y el Valle Sagrado.
          </p>
        </div>
        <div className="text-sm">
          <h3 className="font-semibold text-primary-foreground">Reservas</h3>
          <ul className="mt-3 space-y-2 text-primary-foreground/60">
            <li>
              <Link to="/traslados-grupales">Traslados grupales</Link>
            </li>
            <li>
              <Link to="/traslados-privados">Traslados privados</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="font-semibold text-primary-foreground">Empresa</h3>
          <ul className="mt-3 space-y-2 text-primary-foreground/60">
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-primary-foreground/60">
          <h3 className="font-semibold text-primary-foreground">Atención 24/7</h3>
          <p className="mt-3">Av. El Sol 315, Cusco, Perú</p>
          <p>+51 984 000 000</p>
          <p>reservas@andeango.com</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/50">
        © 2026 Andean'GO · Maquetado de demostración
      </div>
    </footer>
  );
}
