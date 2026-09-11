(() => {
  const uiId = 'ig-followers-net-ui';
  const styleId = 'ig-followers-net-styles';
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
      background: rgba(18, 18, 20, 0.94);
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
      <span class="ig-title">Seguidores (Red)</span>
      <div id="ext-spinner" class="ig-spinner"></div>
    </div>
    <div class="ig-metric-box">
      <span id="ext-count" class="ig-count">0</span>
      <span id="ext-status" class="ig-status">Esperando apertura...</span>
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
  const seen = new Map();
  let isBackendFinished = false;

  const updateUI = () => {
    countEl.textContent = seen.size;
    countEl.classList.remove('bump');
    void countEl.offsetWidth;
    countEl.classList.add('bump');
  };

  const OriginalXHR = window.XMLHttpRequest;
  function PatchedXHR() {
    const xhr = new OriginalXHR();
    const originalOpen = xhr.open;
    let capturedUrl = '';

    xhr.open = function(method, url, ...rest) {
      capturedUrl = url;
      return originalOpen.call(xhr, method, url, ...rest);
    };

    xhr.addEventListener('load', function() {
      if (capturedUrl.includes('/friendships/') && capturedUrl.includes('/followers/')) {
        try {
          const data = JSON.parse(xhr.responseText);
          const users = data.users || [];
          users.forEach(u => {
            if (u.pk && !seen.has(u.pk)) {
              seen.set(u.pk, u.username);
            }
          });
          updateUI();
          if (data.big_list === false || !data.next_max_id) {
            isBackendFinished = true;
          }
        } catch (e) {}
      }
    });

    return xhr;
  }
  window.XMLHttpRequest = PatchedXHR;

  const locateActiveScroller = () => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return null;

    const candidates = Array.from(dialog.querySelectorAll('div')).filter(el => {
      const style = window.getComputedStyle(el);
      const ov = style.overflowY || style.overflow;
      return (ov === 'auto' || ov === 'scroll' || ov.includes('auto')) && el.scrollHeight > el.clientHeight;
    });

    return candidates.length > 0 ? candidates[candidates.length - 1] : null;
  };

  (async () => {
    if (document.querySelector('div[role="dialog"]')) {
      statusEl.textContent = 'Cierra el modal de seguidores';
      while (document.querySelector('div[role="dialog"]')) {
        await wait(200);
      }
    }

    statusEl.textContent = 'Abre el modal de seguidores';

    while (seen.size === 0) {
      await wait(150);
    }

    statusEl.textContent = 'Enganchando scroll...';
    await wait(400);

    let scroller = locateActiveScroller();
    let retries = 0;
    while (!scroller && retries < 15) {
      await wait(200);
      scroller = locateActiveScroller();
      retries++;
    }

    if (!scroller) {
      spinnerEl.style.display = 'none';
      statusEl.textContent = 'Error: Contenedor no hallado';
      window.XMLHttpRequest = OriginalXHR;
      return;
    }

    statusEl.textContent = 'Auto-scrolleando...';

    let prevCount = seen.size;
    let stagnant = 0;

    while (!isBackendFinished && stagnant < 8) {
      scroller.scrollTop += 600;
      scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
      await wait(1100);

      if (seen.size === prevCount) {
        stagnant++;
        statusEl.textContent = `Esperando red (${stagnant}/8)...`;

        scroller.scrollTop -= 150;
        scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
        await wait(250);
        scroller.scrollTop += 200;
        scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
      } else {
        stagnant = 0;
        prevCount = seen.size;
        statusEl.textContent = 'Escaneando...';
      }
    }

    window.XMLHttpRequest = OriginalXHR;
    spinnerEl.style.display = 'none';
    statusEl.textContent = 'Completado';
    actionsEl.classList.add('visible');

    const payload = Array.from(seen.values()).sort().join('\n');

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
      a.download = `seguidores_red_${Date.now()}.txt`;
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
