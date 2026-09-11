# Instagram Viewers & Privacy Extractor

Scripts de extracción DOM para auditoría y exportación de audiencias en Instagram Web (Firefox/Chromium).

## Scripts disponibles

### 1. `extractor.js` (Espectadores de Historias)
- **Target:** Modal de visualizaciones en historias activas (`/stories/...`).
- Resuelve virtualización de nodos de React mediante scroll descendente progresivo y reset a `scrollTop: 0`.

### 2. `extractor_ocultos.js` (Historias Ocultas)
- **Target:** Ajustes de privacidad (`/accounts/privacy_and_security/`).
- Ejecuta auto-click sobre paginadores de lote masivo y filtra handles mediante análisis tipográfico seminegrita y descarte espacial del sidebar.

## Uso
1. Abre la sección correspondiente en Instagram.
2. Abre la consola de desarrollo (`F12` > Consola).
3. Pega el script respectivo y presiona Enter.
