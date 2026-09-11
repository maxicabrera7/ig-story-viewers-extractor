// Extractor DOM para la vista de Cuentas Bloqueadas (Meta Bloks Web)
// Requiere ejecución en: https://www.instagram.com/accounts/blocked_accounts/
(() => {
  const uiId = 'ig-blocked-accounts-ui';
  const styleId = 'ig-blocked-accounts-styles';
  document.getElementById(uiId)?.remove();
  document.getElementById(styleId)?.remove();

  const styleSheet = document.createElement('style');
  styleSheet.id = styleId;
  styleSheet.textContent = `
    @keyframes ig-slide-in {
      from { opacity: 0; transform: translateY(-16px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes ig-spin { to { transform: rotate(360deg); } }
    @keyframes ig-pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
    #${uiId} {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 999999;
      width: 290px;
      background: rgba(18, 18, 20, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 18px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #fff;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
      animation: ig-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
    }
    #${uiId} * { box-sizing: border-box; }
    .ig-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .ig-title {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.3px;
      color: #a1a1aa;
      text-transform: uppercase;
    }
    .ig-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.15);
      border-top-color: #38ef7d;
      border-radius: 50%;
      animation: ig-spin 0.7s linear infinite;
    }
    .ig-metric-box {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 16px;
    }
    .ig-count {
      font-size: 36px;
      font-weight: 700;
      line-height: 1;
      background: linear-gradient(135deg, #11998e, #38ef7d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: transform 0.15s ease-out;
    }
    .ig-count.bump { animation: ig-pop 0.15s ease-out; }
    .ig-status {
      font-size: 12px;
      color: #71717a;
      max-width: 170px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ig-btn-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      opacity: 0;
      pointer-events: none;
      transform: translateY(6px);
      transition: all 0.25s ease-out;
    }
    .ig-btn-group.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
    .ig-btn {
      position: relative;
      width: 100%;
      border: none;
      outline: none;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s, box-shadow 0.2s, color 0.2s;
    }
    .ig-btn:active { transform: scale(0.96) !important; }
    .ig-btn-primary {
      background: #0095f6;
      color: #fff;
      box-shadow: 0 4px 12px rgba(0, 149, 246, 0.3);
    }
    .ig-btn-primary:hover {
      background: #1877f2;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 149, 246, 0.4);
    }
    .ig-btn-primary.success {
      background: #10b981;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    .ig-btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: #e4e4e7;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .ig-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }
    .ig-btn-close {
      background: transparent;
      color: #52525b;
      font-size: 12px;
      padding: 6px;
      border: none;
      cursor: pointer;
      margin-top: 4px;
      transition: color 0.15s;
    }
    .ig-btn-close:hover { color: #a1a1aa; }
  `;
  document.head.appendChild(styleSheet);

  const ui = document.createElement('div');
  ui.id = uiId;
  ui.innerHTML = `
    <div class="ig-header">
      <span class="ig-title">Cuentas Bloqueadas</span>
      <div id="ext-spinner" class="ig-spinner"></div>
    </div>
    <div class="ig-metric-box">
      <span id="ext-count" class="ig-count">0</span>
      <span id="ext-status" class="ig-status">Iniciando...</span>
    </div>
    <div id="ext-actions" class="ig-btn-group">
      <button id="ext-btn-copy" class="ig-btn ig-btn-primary">
        <span>Copiar al portapapeles</span>
      </button>
      <button id="ext-btn-dl" class="ig-btn ig-btn-secondary">
        <span>Descargar lista (.txt)</span>
      </button>
      <button id="ext-btn-close" class="ig-btn-close">Descartar</button>
    </div>
  `;
  document.body.appendChild(ui);

  const statusEl = ui.querySelector('#ext-status');
  const countEl = ui.querySelector('#ext-count');
  const spinnerEl = ui.querySelector('#ext-spinner');
  const actionsEl = ui.querySelector('#ext-actions');
  const btnCopy = ui.querySelector('#ext-btn-copy');
  const btnDl = ui.querySelector('#ext-btn-dl');
  const btnClose = ui.querySelector('#ext-btn-close');

  const wait = ms => new Promise(r => setTimeout(r, ms));

  const getScroller = () => {
    const candidates = Array.from(document.querySelectorAll('div')).filter(el => {
      const rect = el.getBoundingClientRect();
      if (rect.left < 250) return false;
      const style = window.getComputedStyle(el);
      const ov = style.overflowY || style.overflow;
      return (ov === 'auto' || ov === 'scroll' || ov.includes('auto')) && el.scrollHeight > el.clientHeight;
    });
    return candidates[0] || window;
  };

  const usernames = new Set();

  const harvest = () => {
    const actionButtons = Array.from(document.querySelectorAll('*')).filter(el => {
      if (el.children.length > 0) return false;
      const txt = (el.textContent || '').trim().toLowerCase();
      return txt === 'desbloquear' || txt === 'unblock';
    });

    actionButtons.forEach(btn => {
      let row = btn.parentElement;
      while (row && !row.querySelector('img') && row !== document.body) {
        row = row.parentElement;
      }

      if (!row) return;

      const textNodes = Array.from(row.querySelectorAll('*'))
        .filter(el => {
          if (el.children.length > 0) return false;
          const t = (el.textContent || '').trim().toLowerCase();
          return t.length > 0 && t !== 'desbloquear' && t !== 'unblock';
        })
        .map(el => el.textContent.trim());

      const handle = textNodes.find(t => /^[a-zA-Z0-9._]{1,30}$/.test(t));
      if (handle) {
        usernames.add(handle.toLowerCase());
      }
    });

    if (usernames.size !== parseInt(countEl.textContent, 10)) {
      countEl.textContent = usernames.size;
      countEl.classList.remove('bump');
      void countEl.offsetWidth;
      countEl.classList.add('bump');
    }
  };

  (async () => {
    const scroller = getScroller();

    if (scroller !== window && scroller.scrollTop > 0) {
      statusEl.textContent = 'Rebobinando...';
      scroller.scrollTop = 0;
      await wait(500);
    }

    statusEl.textContent = 'Escaneando...';
    harvest();

    let prevCount = usernames.size;
    let stagnant = 0;

    while (stagnant < 4) {
      if (scroller === window) {
        window.scrollBy(0, 650);
      } else {
        scroller.scrollTop += 650;
      }

      await wait(500);
      harvest();

      if (usernames.size === prevCount) {
        stagnant++;
      } else {
        stagnant = 0;
        prevCount = usernames.size;
      }

      const isBottom = scroller === window
        ? (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight)
        : (Math.ceil(scroller.scrollTop + scroller.clientHeight) >= scroller.scrollHeight);

      if (isBottom && stagnant >= 2) break;
    }

    spinnerEl.style.display = 'none';
    statusEl.textContent = 'Completado';
    actionsEl.classList.add('visible');

    const payload = Array.from(usernames).sort().join('\n');

    btnCopy.onclick = async () => {
      try {
        await navigator.clipboard.writeText(payload);
        btnCopy.classList.add('success');
        btnCopy.querySelector('span').textContent = '✔ Copiado al portapapeles';
      } catch (e) {
        btnCopy.style.background = '#ef4444';
        btnCopy.querySelector('span').textContent = 'Error al copiar';
      }
    };

    btnDl.onclick = () => {
      const blob = new Blob([payload], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cuentas_bloqueadas_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    btnClose.onclick = () => {
      ui.remove();
      styleSheet.remove();
    };
  })();
})();
