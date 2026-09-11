# Instagram User Extractor Suite

Suite modular de extractores DOM y de intercepción de tráfico de red para auditoría técnica de audiencias, interacciones y configuraciones de privacidad en Instagram Web.

## Módulos disponibles

| Archivo | Vista Objetivo | Mecánica de Extracción | Mitigación Técnica |
| :--- | :--- | :--- | :--- |
| `extractor_historias.js` | Visualizaciones de Historias (`/stories/...`) | DOM Scraping reactivo | Scroll incremental con reseteo a `scrollTop: 0` |
| `extractor_ocultos.js` | Historias Ocultas (`/accounts/privacy_and_security/`) | DOM Scraping tipográfico | Auto-click sobre paginadores y filtrado por peso seminegrita |
| `extractor_restringidos.js` | Cuentas Restringidas (Meta Bloks) | Anclaje estructural | Cruce de botones de acción y avatares |
| `extractor_bloqueados.js` | Cuentas Bloqueadas (Meta Bloks) | Anclaje estructural | Extracción adyacente a botones de desbloqueo |
| `extractor_seguidos.js` | Cuentas Seguidas (`/{usuario}/following/`) | DOM Scraping asistido | Paginación por micro-rebotes y despacho de eventos sintéticos |
| `extractor_seguidores.js` | Lista de Seguidores (`/{usuario}/followers/`) | Intercepción de red XHR | Espera pasiva de apertura, auto-scroll reactivo y deduplicación por PK |

## Uso
1. Navega a la vista de Instagram correspondiente al módulo.
2. Abre la consola de desarrollo (`F12` > Consola).
3. Pega el script respectivo y presiona Enter.
