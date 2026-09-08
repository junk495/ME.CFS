/* =========================================================
   ME/CFS Symptom-Tracker – app.js
   Vanilla JS (ES6+), keine Frameworks, rein lokale Speicherung.
   ========================================================= */
(() => {
  'use strict';

  // ---------- Konstanten ----------
  const STORAGE_PREFIX = 'mecfs_tagescheck_';

  // Felder des "Standard"-Checks; bestimmen den erfassungs_typ.
  const STANDARD_FIELDS = [
    'schlafqualitaet_0_4',
    'belastung_koerperlich_0_4',
    'belastung_kognitiv_0_4',
    'belastung_reiz_0_4',
    'pacing_0_4',
    'arbeitsfaehigkeit_0_4',
    'teilhabe_0_4'
  ];

  // ---------- Datums-Helfer ----------
  const todayKey = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const storageKey = (dateStr) => STORAGE_PREFIX + dateStr;

  // ---------- Tab-Navigation ----------
  const switchView = (viewName) => {
    document.querySelectorAll('.view').forEach((view) => {
      view.classList.toggle('is-active', view.id === `view-${viewName}`);
    });
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.view === viewName);
    });
  };

  // ---------- Formular lesen (leer = null) ----------
  const collectFormData = () => {
    const data = {};
    const container = document.getElementById('view-tagescheck');

    // Skalen (Radio-Gruppen): gewählt = Zahl, sonst null
    const radioNames = [];
    container.querySelectorAll('input[type="radio"]').forEach((radio) => {
      if (!radioNames.includes(radio.name)) radioNames.push(radio.name);
    });

    radioNames.forEach((name) => {
      const checked = container.querySelector(`input[name="${name}"]:checked`);
      data[name] = checked ? Number(checked.value) : null;
    });

    // Text-/Zahlenfelder: leer = null, Zahlen = Zahl, Text = String
    container
      .querySelectorAll('input[type="number"], input[type="text"], textarea')
      .forEach((input) => {
        const name = input.name;
        if (!name) return;
        const trimmed = input.value ? String(input.value).trim() : '';

        if (trimmed === '') {
          data[name] = null; // wichtig: nicht 0 und nicht ""
        } else if (input.type === 'number') {
          const num = Number(trimmed);
          data[name] = Number.isFinite(num) ? num : null;
        } else {
          data[name] = trimmed;
        }
      });

    return data;
  };

  // ---------- Speichern (mit Merge bestehender Daten) ----------
  const saveEntry = (dateStr, data) => {
    const key = storageKey(dateStr);
    let existing = {};

    try {
      const raw = localStorage.getItem(key);
      if (raw) existing = JSON.parse(raw);
    } catch (e) {
      existing = {};
    }

    const merged = Object.assign({}, existing, data);
    merged.datum = dateStr;

    // erfassungs_typ ableiten: "standard", wenn mind. ein Standard-Feld gefüllt ist
    const hasStandard = STANDARD_FIELDS.some(
      (field) => merged[field] !== null && merged[field] !== undefined
    );
    merged.erfassungs_typ = hasStandard ? 'standard' : 'minimal';

    localStorage.setItem(key, JSON.stringify(merged));
    return merged;
  };

  // ---------- Formular befüllen (beim Öffnen) ----------
  const loadEntry = (dateStr) => {
    let raw;
    try {
      raw = localStorage.getItem(storageKey(dateStr));
    } catch (e) {
      return;
    }
    if (!raw) return;

    let entry;
    try {
      entry = JSON.parse(raw);
    } catch (e) {
      return;
    }

    Object.keys(entry).forEach((key) => {
      const value = entry[key];
      const nodes = document.querySelectorAll(`[name="${key}"]`);
      if (nodes.length === 0) return;

      if (nodes[0].type === 'radio') {
        nodes.forEach((node) => {
          node.checked = node.value === String(value);
        });
      } else {
        nodes[0].value = value === null || value === undefined ? '' : String(value);
      }
    });
  };

  // ---------- Visuelles Feedback am Speichern-Button ----------
  const showSavedFeedback = (button) => {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Gespeichert ✓';

    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 2000);
  };

  // ---------- Speichern-Handler ----------
  const handleSave = () => {
    const dateStr = todayKey();
    saveEntry(dateStr, collectFormData());
    showSavedFeedback(document.getElementById('btn-save-tagescheck'));
  };

  // ---------- Datumsanzeige im Header ----------
  const initDateDisplay = () => {
    const dateStr = todayKey();
    const el = document.getElementById('datum-anzeige');
    if (el) {
      el.textContent = new Date(`${dateStr}T00:00:00`).toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return dateStr;
  };

  // ---------- Initialisierung ----------
  const init = () => {
    const dateStr = initDateDisplay();

    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => switchView(tab.dataset.view));
    });

    const saveBtn = document.getElementById('btn-save-tagescheck');
    if (saveBtn) saveBtn.addEventListener('click', handleSave);

    loadEntry(dateStr);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---------- Service Worker registrieren (PWA/Offline) ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .catch((err) => console.error('Service Worker-Registrierung fehlgeschlagen:', err));
    });
  }
})();
