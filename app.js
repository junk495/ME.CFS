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

  // Spaltenreihenfolge für den CSV-Export (key → Excel-Spalte)
  const EXPORT_COLUMNS = [
    { key: 'datum', header: 'Datum' },
    { key: 'erfassungs_typ', header: 'Erfassungs-Typ' },
    { key: 'zustand_0_10', header: 'Zustand (0-10)' },
    { key: 'fatigue_0_4', header: 'Fatigue (0-4)' },
    { key: 'pem_heute_0_4', header: 'PEM heute (0-4)' },
    { key: 'liegezeit_h', header: 'Liegezeit (h)' },
    { key: 'hilfebedarf_min', header: 'Hilfebedarf (min)' },
    { key: 'schlafqualitaet_0_4', header: 'Schlafqualitaet (0-4)' },
    { key: 'belastung_koerperlich_0_4', header: 'Koerperliche Belastung (0-4)' },
    { key: 'belastung_kognitiv_0_4', header: 'Kognitive Belastung (0-4)' },
    { key: 'belastung_reiz_0_4', header: 'Reizbelastung (0-4)' },
    { key: 'pacing_0_4', header: 'Pacing (0-4)' },
    { key: 'arbeitsfaehigkeit_0_4', header: 'Arbeitsfaehigkeit (0-4)' },
    { key: 'teilhabe_0_4', header: 'Teilhabe (0-4)' },
    { key: 'schlafdauer_h', header: 'Schlafdauer (h)' },
    { key: 'schritte', header: 'Schritte' },
    { key: 'kontext', header: 'Kontext' },
    { key: 'notiz', header: 'Notiz' }
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

  // ---------- CSV-Export ----------
  const getAllEntries = () => {
    const entries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        try {
          entries.push(JSON.parse(localStorage.getItem(key)));
        } catch (e) {
          // beschädigte Einträge überspringen
        }
      }
    }
    // chronologisch aufsteigend nach Datum sortieren (YYYY-MM-DD)
    entries.sort((a, b) => String(a.datum || '').localeCompare(String(b.datum || '')));
    return entries;
  };

  const formatCell = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') {
      // Dezimalpunkt → Komma für Excel (deutsches Zahlenformat)
      return String(value).replace('.', ',');
    }
    // Textwerte: Zeilenumbrüche und Semikolons neutralisieren
    return String(value)
      .replace(/\r?\n/g, ' ')
      .replace(/;/g, ',');
  };

  const buildCSV = (entries) => {
    const header = EXPORT_COLUMNS.map((col) => col.header).join(';');
    const rows = entries.map((entry) =>
      EXPORT_COLUMNS.map((col) => formatCell(entry[col.key])).join(';')
    );
    return [header, ...rows].join('\r\n');
  };

  const downloadCSV = (csvString, filename) => {
    // BOM für korrekte UTF-8-Erkennung in Excel
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const entries = getAllEntries();
    if (entries.length === 0) {
      alert('Keine gespeicherten Daten vorhanden.');
      return;
    }
    downloadCSV(buildCSV(entries), 'mecfs_export.csv');
  };

  // ---------- Alle Daten löschen ----------
  const resetForm = () => {
    const container = document.getElementById('view-tagescheck');
    container.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });
    container
      .querySelectorAll('input[type="number"], input[type="text"], textarea')
      .forEach((input) => {
        input.value = '';
      });
  };

  const handleDeleteAll = () => {
    const confirmed = window.confirm(
      'Bist du sicher? Alle lokal gespeicherten Daten werden unwiderruflich gelöscht.'
    );
    if (!confirmed) return;

    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) keysToRemove.push(key);
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    alert('Daten gelöscht');
    resetForm();
  };

  // ---------- Initialisierung ----------
  const init = () => {
    const dateStr = initDateDisplay();

    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => switchView(tab.dataset.view));
    });

    const saveBtn = document.getElementById('btn-save-tagescheck');
    if (saveBtn) saveBtn.addEventListener('click', handleSave);

    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) exportBtn.addEventListener('click', handleExport);

    const deleteBtn = document.getElementById('btn-delete-all');
    if (deleteBtn) deleteBtn.addEventListener('click', handleDeleteAll);

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
