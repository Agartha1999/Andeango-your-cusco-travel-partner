import sprinterImg from "@/assets/sprinter.jpg";
import stariaImg from "@/assets/staria.jpg";
import sedanImg from "@/assets/sedan.jpg";
import suvImg from "@/assets/suv.jpg";
import minivanImg from "@/assets/minivan.jpg";

export const CIUDADES = [
  "Ollantaytambo",
  "Cusco",
  "Urubamba",
  "Pisac",
  "Chinchero",
  "Aeropuerto Velasco Astete",
];

export type StopPoint = { id: string; label: string; hora: string };

export type Bus = {
  id: string;
  operador: string;
  vehiculo: string;
  tipoVehiculo: "Van Staria" | "Sprinter Mercedes";
  numeroUnidad: string;
  imagen: string;
  salida: string;
  llegada: string;
  duracion: string;
  asientos: number;
  precio: number;
  franja: "manana" | "tarde" | "atardecer" | "noche";
  amenities: string[];
  recogida: StopPoint[];
  entrega: StopPoint[];
  detalles: string;
  caracteristicas: string[];
};

export const BUSES: Bus[] = [
  {
    id: "spr-oll001",
    operador: "Sprinter Mercedes Benz",
    vehiculo: "Sprinter Mercedes",
    tipoVehiculo: "Sprinter Mercedes",
    numeroUnidad: "SPR-OLL001",
    imagen: sprinterImg,
    salida: "16:15",
    llegada: "18:20",
    duracion: "2h 5m",
    asientos: 18,
    precio: 25,
    franja: "tarde",
    amenities: ["Aire acondicionado", "Botiquín", "Oxígeno"],
    recogida: [
      { id: "r1", label: "Estación Ollantaytambo", hora: "4:15 pm" },
      { id: "r2", label: "Plaza de Armas Ollantaytambo", hora: "4:25 pm" },
    ],
    entrega: [
      { id: "e1", label: "Plaza Regocijo", hora: "6:10 pm" },
      { id: "e2", label: "Terminal Cusco", hora: "6:20 pm" },
    ],
    detalles: "Unidad 2023, 18 asientos reclinables, cinturones de 3 puntos y conductor certificado.",
    caracteristicas: ["18 asientos reclinables", "Wi-Fi a bordo", "USB por asiento", "Bodega para equipaje"],
  },
  {
    id: "sta-oll001",
    operador: "Hiunday Staria Premium",
    vehiculo: "Van Staria",
    tipoVehiculo: "Van Staria",
    numeroUnidad: "STA-OLL001",
    imagen: stariaImg,
    salida: "20:05",
    llegada: "22:10",
    duracion: "2h 5m",
    asientos: 8,
    precio: 30,
    franja: "noche",
    amenities: ["Aire acondicionado", "Botiquín", "Oxígeno"],
    recogida: [
      { id: "r1", label: "Estación Ollantaytambo", hora: "8:05 pm" },
      { id: "r2", label: "Hotel Pakaritampu", hora: "8:15 pm" },
    ],
    entrega: [
      { id: "e1", label: "Plaza Regocijo", hora: "10:00 pm" },
      { id: "e2", label: "Av. El Sol - Centro", hora: "10:10 pm" },
    ],
    detalles: "Van premium de 8 plazas con asientos de cuero y climatización individual.",
    caracteristicas: ["8 asientos de cuero", "Climatización individual", "Equipaje amplio", "Oxígeno a bordo"],
  },
  {
    id: "spr-oll002",
    operador: "Sprinter Mercedes Benz",
    vehiculo: "Sprinter Mercedes",
    tipoVehiculo: "Sprinter Mercedes",
    numeroUnidad: "SPR-OLL002",
    imagen: sprinterImg,
    salida: "07:30",
    llegada: "09:30",
    duracion: "2h 0m",
    asientos: 12,
    precio: 22,
    franja: "manana",
    amenities: ["Aire acondicionado", "Botiquín"],
    recogida: [
      { id: "r1", label: "Estación Ollantaytambo", hora: "7:30 am" },
      { id: "r2", label: "Plaza de Armas Ollantaytambo", hora: "7:40 am" },
    ],
    entrega: [
      { id: "e1", label: "Plaza Regocijo", hora: "9:20 am" },
      { id: "e2", label: "Terminal Cusco", hora: "9:30 am" },
    ],
    detalles: "Salida temprano ideal para conexiones con Machu Picchu.",
    caracteristicas: ["12 asientos", "Wi-Fi a bordo", "USB por asiento"],
  },
];

export const FRANJAS = [
  { id: "manana", label: "Mañana", icon: "🌤️" },
  { id: "tarde", label: "Tarde", icon: "☀️" },
  { id: "atardecer", label: "Atardecer", icon: "🌇" },
  { id: "noche", label: "Noche", icon: "🌙" },
] as const;

export const TIPOS_VEHICULO = ["Van Staria", "Sprinter Mercedes"];
export const OPERADORES = ["Hiunday Staria Premium", "Sprinter Mercedes Benz"];

/* ---------- Traslados privados ---------- */

export type Vehiculo = {
  id: string;
  nombre: string;
  imagen: string;
  pasajeros: number;
  maletas: number;
  descripcion: string;
  precio: number;
  badge?: "Mejor opción" | "Premium Class";
};

export const VEHICULOS: Vehiculo[] = [
  {
    id: "sedan",
    nombre: "Auto Sedan Premium",
    imagen: sedanImg,
    pasajeros: 3,
    maletas: 3,
    descripcion: "Servicio ejecutivo y discreto",
    precio: 85,
    badge: "Mejor opción",
  },
  {
    id: "suv",
    nombre: "SUV Ejecutivo",
    imagen: suvImg,
    pasajeros: 4,
    maletas: 4,
    descripcion: "Interior amplio y confort en carretera",
    precio: 110,
  },
  {
    id: "staria",
    nombre: "Mini Van Starria Ejecutiva",
    imagen: stariaImg,
    pasajeros: 6,
    maletas: 6,
    descripcion: "Ideal para familias y grupos pequeños",
    precio: 130,
  },
  {
    id: "renault",
    nombre: "Mini Van Renault Standard",
    imagen: minivanImg,
    pasajeros: 8,
    maletas: 8,
    descripcion: "La opción práctica para grupos medianos",
    precio: 160,
  },
  {
    id: "sprinter",
    nombre: "Van Sprinter (Mercedes-Benz)",
    imagen: sprinterImg,
    pasajeros: 15,
    maletas: 15,
    descripcion: "Espacio superior, altura interior y máxima seguridad",
    precio: 200,
    badge: "Premium Class",
  },
];

export const SERVICIOS_INCLUIDOS = [
  "Conducción privada 24h antes",
  "Aire acondicionado y climatización",
  "Meet & Greet personalizado",
  "15 minutos de espera incluidos",
  "Oxígeno a bordo",
];

export const RUTA_PRIVADA = {
  origen: "Aeropuerto Velasco Astete",
  origenDetalle: "Cusco, Provincia de Cusco",
  destino: "Hotel · Centro Histórico",
  destinoDetalle: "Cusco, Provincia de Cusco",
  distancia: "6.8 km",
  duracion: "21 min",
  horaRecojo: "09:00",
  horaLlegada: "09:20",
  fecha: "30 de junio de 2026",
  pasajeros: 2,
};

export const soles = (v: number) =>
  `S/ ${v.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const PAISES = ["Perú", "Chile", "Argentina", "Colombia", "México", "España", "Estados Unidos"];
