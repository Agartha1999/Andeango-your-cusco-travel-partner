# AndeanGO: Your Cusco Travel Partner

Quiero que construyas el maquetado funcional (frontend, sin backend real, con datos de ejemplo/mock) de una plataforma de reservas de transporte turístico llamada AndeanGO, operando en Cusco, Perú. La plataforma debe soportar dos tipos de producto de reserva: traslados grupales (compartidos, por asiento) y traslados privados (exclusivos, por vehículo). Uso las capturas adjuntas como referencia visual exacta de layout, textos y componentes — replica esa estética y esos flujos, no inventes uno distinto.

Identidad visual

Paleta: azul marino oscuro como color primario (headers, botones secundarios, textos de marca), dorado/ámbar como color de acento para los CTA principales ("Reservar Asiento", "Continuar", "Pagar"), blanco y grises claros de fondo.

Tarjetas con bordes redondeados, sombras suaves, badges de estado en verde (disponibilidad) y ámbar (destacados/"mejor opción").

Tipografía sans-serif moderna, jerarquía clara entre títulos de sección y datos.

Idioma de toda la interfaz: español (Perú), moneda en Soles (S/ o SOL).

Logo de texto "andean'GO" en el header, con menú: Inicio, Traslados, Servicios, Nosotros, Contacto, Blog, y botón "Contáctanos" destacado.

Producto 1 — Traslado Grupal (compartido, por asiento)

Buscador (hero de la home):

Card flotante sobre el hero con: campo "De" y campo "A" (origen/destino, ej. Ollantaytambo ↔ Cusco) con ícono para invertir, selector "Fecha del viaje", selector "Fecha de regreso", botón "Buscar".

Debajo, una fila de chips de fechas rápidas (los próximos 6 días) para saltar entre días sin reabrir el calendario.

Resultados:

Sidebar de filtros con checkboxes: "Hora de salida" (Mañana/Tarde/Atardecer/Noche), "Tipo de vehículo" (Van Staria, Sprinter Mercedes, etc.), "Operador de transporte".

Encabezado con contador "X buses disponibles para [fecha]" y un selector "Ordenar por" (más temprano primero, precio, etc.).

Un banner promocional de membresía dentro del listado ("Ahorra hasta 15% en tu primer viaje" + botón "Únete ahora").

Tarjeta de resultado por cada bus: foto del vehículo, nombre del operador, número de unidad, hora de salida → hora de llegada con duración del viaje, badge verde de "X asientos disponibles", chips de amenities (aire acondicionado, botiquín, oxígeno), precio "Desde S/ XX.XX", botón "Reservar Asiento", y accesos secundarios expandibles ("Detalles del bus", "Puntos de embarque y descenso", "Características del bus", "Foto del bus").

Detalle y selección de asiento (expandible o modal):

Resumen del tramo: punto de embarque con fecha/hora, punto de llegada con fecha/hora, fecha del viaje, tipo de autocar, tarifa por asiento.

Selector de cantidad por tipo de pasajero (Adulto, y si aplica Niño) con botones +/−, precio unitario y subtotal.

Dos dropdowns: "Punto de recogida" y "Punto de entrega" (con horario asociado a cada opción).

Total dinámico y botón de continuar con estado de carga ("Procesando la reserva...").

Checkout grupal:

Barra superior con cuenta regresiva de retención de asientos ("Tus asientos están reservados por 10:00").

Campo de cupón colapsable.

Formulario de facturación: nombre, apellidos, email, país (selector), dirección de recojo (Airbnb/Hotel) con mapa interactivo y botón "Detectar mi ubicación actual", teléfono/WhatsApp, tipo y número de documento, notas del pedido (opcional).

Panel lateral "Tu pedido": producto reservado, detalles de la reserva (embarque/llegada, puntos de recogida/entrega), desglose de tipo de asiento/cantidad/precio, subtotal y total.

Métodos de pago: tarjeta de crédito/débito (Visa/Mastercard), checkbox de aceptación de términos y política de privacidad, botón "Finalizar el pedido".

Producto 2 — Traslado Privado (exclusivo, por vehículo)

Flujo tipo wizard de 4 pasos con stepper visible en todo momento (Vehículo → Extras → Datos → Pago), un badge de "Reserva segura / SSL Seguro" arriba, y un panel lateral fijo con el resumen de la reserva (vehículo elegido, ruta en mini-mapa, fecha, pasajeros, precio total) que se actualiza en vivo en cada paso.

Paso 1 — Vehículo:

Mapa con la ruta origen → destino (ej. Aeropuerto Velasco Astete → Hotel Centro Histórico) y distancia estimada.

Lista de vehículos como tarjetas seleccionables (radio): Auto Sedan Premium, SUV Ejecutivo, Mini Van Starria Ejecutiva, Mini Van Renault Standard, Van Sprinter (Mercedes-Benz), cada una con foto, capacidad de pasajeros y maletas, badge "Mejor opción" en la recomendada, badge "Premium Class" cuando aplique, y precio.

Toggle "¿Viaje de ida y vuelta? Viaja de forma inteligente" que muestra ahorro al activarlo.

Banner verde de cancelación gratuita con fecha límite.

Lista de "Todos los servicios incluyen": conducción privada 24h antes, aire acondicionado y climatización, meet & greet personalizado, 15 minutos de espera incluidos, oxígeno a bordo.

Accesos de ayuda: "Iniciar chat", "Centro de ayuda", "Contáctanos".

Paso 2 — Extras:

Campo "Número de vuelo / tren".

Checkbox "¿Necesitas silla infantil o booster?".

Campo de texto "Notas para el conductor (ida)".

Contador +/− de "Cantidad de maletas", con nota de maletas extendidas.

Paso 3 — Datos:

Formulario "Pasajero principal": nombre, apellido, correo electrónico (con nota de que no se usará para spam), número de celular con selector de código de país (+51 por defecto), y nota de que el contacto del conductor se enviará por email/WhatsApp el día del viaje.

Sección opcional "Meet & Greet": número de vuelo o reserva de hotel.

Paso 4 — Pago:

Desglose de precio: tarifa "Ida", tarifa "Ida y vuelta" (si aplica), precio total y vehículo elegido.

Selector de método de pago: tarjeta de crédito/débito (número, titular, fecha, CVC) o billetera digital (Yape/Plin).

Checkbox de aceptación de términos y política de privacidad.

Botón final "Pagar S/ XX.XX".

Requisitos técnicos

React + Tailwind CSS, componentes reutilizables y bien separados (buscador, tarjeta de resultado, stepper, selector de vehículo, formularios).

Datos de ejemplo en JSON/mock (rutas, horarios, vehículos, precios, puntos de recogida) para poblar ambos flujos.

Totalmente responsive (mobile-first), con especial cuidado en que el stepper y los formularios funcionen bien en móvil.

Validación básica de formularios y estados de carga/loading en los botones de acción.

Navegación clara entre "Traslados Grupales" y "Traslados Privados" desde el menú principal o un selector de tipo de servicio en la home.

No requiero integración real de pagos ni backend — solo el maquetado funcional con estado en el cliente (React state) que simule el flujo completo de principio a fin.


## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
