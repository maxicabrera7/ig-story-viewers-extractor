# Instagram Viewers & Privacy Extractor

Scripts de extracción DOM para auditoría y exportación de audiencias y configuraciones en Instagram Web (Firefox/Chromium).

## Scripts disponibles

### 1. `extractor.js` (Espectadores de Historias)
- **Target:** Modal de visualizaciones en historias activas (`/stories/...`).
- Resuelve virtualización de React mediante scroll incremental y reset a `scrollTop: 0`.

### 2. `extractor_ocultos.js` (Historias Ocultas)
- **Target:** Ajustes de privacidad (`/accounts/privacy_and_security/` > Ocultar historia).
- Resuelve paginadores de lote masivo y filtra handles mediante análisis tipográfico seminegrita.

### 3. `extractor_restringidos.js` (Cuentas Restringidas)
- **Target:** Ajustes de privacidad (`/accounts/privacy_and_security/` > Cuentas restringidas).
- Anclaje estructural sobre contenedores de Meta Bloks Web vinculando botones "Quitar restricción" y avatares.

### 4. `extractor_bloqueados.js` (Cuentas Bloqueadas)
- **Target:** Cuentas bloqueadas (`/accounts/blocked_accounts/`).
- Anclaje estructural sobre Meta Bloks Web asociando botones "Desbloquear" y extracción de handles adyacentes.

### 5. `extractor_seguidos.js` (Cuentas Seguidas)
- **Target:** Modal de seguidos en perfil propio (`/{usuario}/following/`).
- Bypass de lazy-loading por lotes de 24 elementos mediante micro-rebotes de scroll y despacho de eventos sintéticos para evitar cortes tempranos de red.

## Uso
1. Abre la sección correspondiente en Instagram.
2. Abre la consola de desarrollo (`F12` > Consola).
3. Pega el script respectivo y presiona Enter.
