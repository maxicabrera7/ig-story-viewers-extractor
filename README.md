# Instagram Viewers & Privacy Extractor

Scripts de extracción DOM para auditoría y exportación de audiencias y configuraciones en Instagram Web (Firefox/Chromium).

## Scripts disponibles

### 1. `extractor.js` (Espectadores de Historias)
- **Target:** Modal de visualizaciones en historias activas (`/stories/...`).
- Supera virtualización de React mediante scroll incremental y rebobinado inicial.

### 2. `extractor_ocultos.js` (Historias Ocultas)
- **Target:** Ajustes de privacidad (`/accounts/privacy_and_security/` > Ocultar historia).
- Resuelve paginadores de lote masivo y filtra handles mediante análisis tipográfico.

### 3. `extractor_restringidos.js` (Cuentas Restringidas)
- **Target:** Ajustes de privacidad (`/accounts/privacy_and_security/` > Cuentas restringidas).
- Anclaje estructural sobre contenedores de Meta Bloks Web vinculando botones de acción y avatares.

## Uso
1. Abre la sección correspondiente en Instagram.
2. Abre la consola de desarrollo (`F12` > Consola).
3. Pega el contenido del script correspondiente y presiona Enter.
