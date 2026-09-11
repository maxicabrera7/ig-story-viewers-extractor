# Instagram Story Viewers Extractor

Script de extracción DOM ligero para exportar listas completas de espectadores de historias de Instagram en la versión web (Firefox/Chromium).

## Características
- Superación de virtualización y lazy-loading sin peticiones manuales a endpoints GraphQL.
- Auto-apertura de modal y rebobinado de scroll a posición cero.
- Interfaz inyectada (*glassmorphism*) con recuento dinámico y microinteracciones.
- Exportación directa vía portapapeles o archivo `.txt`.

## Uso
1. Abre tu historia en Instagram Web.
2. Abre la consola de desarrollador (`F12` > Consola).
3. Pega el contenido de `extractor.js` y presiona Enter.
