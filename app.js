/* =========================================================
   ME/CFS Symptom-Tracker – app.js
   Vanilla JS (ES6+), keine Frameworks, rein lokale Speicherung.
   ========================================================= */
(() => {
  'use strict';

  // ---------- Konstanten ----------
  const STORAGE_PREFIX = 'mecfs_tagescheck_';
  const EXPORT_REMINDER_KEY = 'mecfs_export_reminder_ts';
  const SETTINGS_KEY = 'mecfs_settings';
  const DEFAULT_REMINDER_INTERVAL_DAYS = 3;
  const MIN_REMINDER_INTERVAL_DAYS = 1;

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
    { key: 'bell_0_100', header: 'Bell (0-100)' },
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
    { key: 'notiz', header: 'Notiz' },
    { key: 'pem_belastungsdatum', header: 'Belastungsdatum' },
    { key: 'pem_ausloeser', header: 'Ausloeser' },
    { key: 'pem_verzoegerung_h', header: 'Verzoegerung (h)' },
    { key: 'pem_dauer_h', header: 'PEM Dauer (h)' },
    { key: 'pem_gesamt_0_4', header: 'PEM Gesamtschwere (0-4)' },
    { key: 'pem_erholung_0_4', header: 'PEM Erholungsdauer (0-4)' },
    { key: 'pem_fatigue_0_4', header: 'PEM Zunahme Fatigue (0-4)' },
    { key: 'pem_kognition_0_4', header: 'PEM Zunahme Kognition (0-4)' },
    { key: 'pem_schmerz_0_4', header: 'PEM Zunahme Schmerzen (0-4)' },
    { key: 'pem_grippe_0_4', header: 'PEM Zunahme Krankheitsgefuehl (0-4)' },
    { key: 'pem_symptome', header: 'PEM Symptome' },
    { key: 'schmerz_muskel', header: 'Schmerz Muskel (0-4)' },
    { key: 'schmerz_gelenk', header: 'Schmerz Gelenk (0-4)' },
    { key: 'schmerz_kopf', header: 'Schmerz Kopf (0-4)' },
    { key: 'schmerz_neuro', header: 'Schmerz Neuropathisch (0-4)' },
    { key: 'schmerz_beruehrung', header: 'Schmerz Beruehrung (0-4)' },
    { key: 'kognition_konzentration', header: 'Kognition Konzentration (0-4)' },
    { key: 'kognition_gedaechtnis', header: 'Kognition Gedaechtnis (0-4)' },
    { key: 'kognition_sprache', header: 'Kognition Sprache (0-4)' },
    { key: 'kognition_koordination', header: 'Kognition Koordination (0-4)' },
    { key: 'reiz_licht', header: 'Reiz Licht (0-4)' },
    { key: 'reiz_geraeusch', header: 'Reiz Geraeusch (0-4)' },
    { key: 'autonom_schwindel', header: 'Autonom Schwindel (0-4)' },
    { key: 'autonom_herzrasen', header: 'Autonom Herzrasen (0-4)' },
    { key: 'autonom_atem', header: 'Autonom Atem (0-4)' },
    { key: 'autonom_verdauung', header: 'Autonom Verdauung (0-4)' },
    { key: 'autonom_blase', header: 'Autonom Blase (0-4)' },
    { key: 'autonom_temperatur', header: 'Autonom Temperatur (0-4)' },
    { key: 'immun_grippegefuehl', header: 'Immun Grippegefuehl (0-4)' },
    { key: 'immun_hals', header: 'Immun Hals (0-4)' },
    { key: 'mcas_flush', header: 'MCAS Flush (0-4)' },
    { key: 'schlaf_durchschlaf', header: 'Schlaf Durchschlafen (0-4)' },
    { key: 'schlaf_rhythmus', header: 'Schlaf Rhythmus (0-4)' },
    { key: 'schlaf_hypersomnie', header: 'Schlaf Hypersomnie (0-4)' },
    { key: 'kognition_verlangsamt', header: 'Kognition Verlangsamt (0-4)' },
    { key: 'kognition_multitasking', header: 'Kognition Multitasking (0-4)' },
    { key: 'kognition_desorientierung', header: 'Kognition Desorientierung (0-4)' },
    { key: 'reiz_geruch', header: 'Reiz Geruch (0-4)' },
    { key: 'autonom_praesynkope', header: 'Autonom Praesynkope (0-4)' },
    { key: 'autonom_synkope', header: 'Autonom Synkope (0-4)' },
    { key: 'autonom_stehintoleranz', header: 'Autonom Stehintoleranz (0-4)' },
    { key: 'neuroendokrin_hitze', header: 'Neuroendokrin Hitze (0-4)' },
    { key: 'neuroendokrin_kaelte', header: 'Neuroendokrin Kaelte (0-4)' },
    { key: 'neuroendokrin_appetit', header: 'Neuroendokrin Appetit (0-4)' },
    { key: 'neuroendokrin_stress', header: 'Neuroendokrin Stress (0-4)' },
    { key: 'immun_fieber', header: 'Immun Fieber (0-4)' },
    { key: 'immun_allergie', header: 'Immun Allergie (0-4)' },
    { key: 'mcas_uebelkeit', header: 'MCAS Uebelkeit (0-4)' },
    { key: 'mcas_bauchschmerz', header: 'MCAS Bauchschmerz (0-4)' },
    { key: 'mcas_durchfall', header: 'MCAS Durchfall (0-4)' },
    { key: 'mcas_nahrung', header: 'MCAS Nahrung (0-4)' },
    { key: 'mcas_medikament', header: 'MCAS Medikament (0-4)' },
    { key: 'funktion_koerperpflege', header: 'Funktion Koerperpflege (0-4)' },
    { key: 'funktion_anziehen', header: 'Funktion Anziehen (0-4)' },
    { key: 'funktion_essen', header: 'Funktion Essen (0-4)' },
    { key: 'funktion_gehen', header: 'Funktion Gehen (0-4)' },
    { key: 'funktion_aufrecht', header: 'Funktion Aufrecht (0-4)' },
    { key: 'funktion_haushalt', header: 'Funktion Haushalt (0-4)' },
    { key: 'funktion_kommunikation', header: 'Funktion Kommunikation (0-4)' },
    { key: 'funktion_ausser_haus', header: 'Funktion Ausser Haus (0-4)' },
    { key: 'funktion_sonne', header: 'Funktion Sonne (0-4)' }
  ];

  // Alle bekannten Feld-Keys (Whitelist für den JSON-Import)
  const KNOWN_KEYS = new Set(EXPORT_COLUMNS.map((col) => col.key));

  // ---------- Datums-Helfer ----------
  const todayKey = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const storageKey = (dateStr) => STORAGE_PREFIX + dateStr;

  // Gewähltes Datum aus dem Date-Picker (Fallback: heute)
  const selectedDate = () => {
    const el = document.getElementById('date-picker');
    return el && el.value ? el.value : todayKey();
  };

  // ---------- Tab-Navigation ----------
  const switchView = (viewName) => {
    // Auto-Save: aktuellen Stand speichern, bevor gewechselt wird
    saveAll(selectedDate());

    document.querySelectorAll('.view').forEach((view) => {
      view.classList.toggle('is-active', view.id === `view-${viewName}`);
    });
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.view === viewName);
    });
  };

  // ---------- PEM-Sub-Tab-Navigation ----------
  const switchPemTab = (tabName) => {
    const showAusloeser = tabName === 'ausloeser';
    document.getElementById('pem-ausloeser-view').style.display = showAusloeser ? 'block' : 'none';
    document.getElementById('pem-verlauf-view').style.display = showAusloeser ? 'none' : 'block';
    document.getElementById('tab-pem-ausloeser').classList.toggle('is-active', showAusloeser);
    document.getElementById('tab-pem-verlauf').classList.toggle('is-active', !showAusloeser);
  };

  // ---------- Detailcheck-Sub-Tab-Navigation ----------
  const switchDetailTab = (tabName) => {
    const views = {
      basis: 'detail-basis-view',
      spezifisch: 'detail-spezifisch-view',
      funktion: 'detail-funktion-view'
    };
    Object.keys(views).forEach((name) => {
      const el = document.getElementById(views[name]);
      if (el) el.style.display = name === tabName ? 'block' : 'none';
    });
    ['basis', 'spezifisch', 'funktion'].forEach((name) => {
      const btn = document.getElementById(`tab-detail-${name}`);
      if (btn) btn.classList.toggle('is-active', name === tabName);
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

    // Für Screenreader ansagen (visuell unsichtbar)
    const status = document.getElementById('save-status');
    if (status) status.textContent = 'Gespeichert';

    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
      if (status) status.textContent = '';
    }, 2000);
  };

  // ---------- Speichern-Handler ----------
  const handleSave = () => {
    saveAll(selectedDate());
    showSavedFeedback(document.getElementById('btn-save-tagescheck'));
  };

  // ---------- PEM-Daten lesen & speichern ----------
  const collectPemData = () => {
    const data = {};
    const container = document.getElementById('view-pem-crash');

    // Skalen (Radio-Gruppen): gewählt = Zahl, sonst null
    const radioNames = [];
    container.querySelectorAll('input[type="radio"]').forEach((radio) => {
      if (!radioNames.includes(radio.name)) radioNames.push(radio.name);
    });

    radioNames.forEach((name) => {
      const checked = container.querySelector(`input[name="${name}"]:checked`);
      data[name] = checked ? Number(checked.value) : null;
    });

    // Text-/Zahlen-/Datumsfelder
    container
      .querySelectorAll('input[type="date"], input[type="text"], input[type="number"], textarea')
      .forEach((input) => {
        const name = input.name;
        if (!name) return;
        const trimmed = input.value ? String(input.value).trim() : '';

        if (trimmed === '') {
          data[name] = null; // leer = null
        } else if (input.type === 'number') {
          const num = Number(trimmed);
          data[name] = Number.isFinite(num) ? num : null;
        } else {
          data[name] = trimmed; // date / text / textarea
        }
      });

    return data;
  };

  const handleSavePem = () => {
    saveAll(selectedDate());
    showSavedFeedback(document.getElementById('btn-save-pem'));
  };

  const handleAkutTime = () => {
    const input = document.getElementById('pem_ausloeser');
    if (!input) return;
    const now = new Date();
    const timeString = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}] `;

    if (!input.value.includes('[')) {
      input.value = timeString + input.value;
    }

    // Zeitstempel sofort speichern
    saveAll(selectedDate());
    showSavedFeedback(document.getElementById('btn-akut-time'));
  };

  // ---------- Detailcheck-Daten lesen & speichern ----------
  const collectDetailData = () => {
    const data = {};
    const container = document.getElementById('view-detailcheck');

    const radioNames = [];
    container.querySelectorAll('input[type="radio"]').forEach((radio) => {
      if (!radioNames.includes(radio.name)) radioNames.push(radio.name);
    });

    radioNames.forEach((name) => {
      const checked = container.querySelector(`input[name="${name}"]:checked`);
      data[name] = checked ? Number(checked.value) : null;
    });

    return data;
  };

  // ---------- Alles speichern (alle drei Tabs) ----------
  const saveAll = (dateStr) => {
    const data = Object.assign({}, collectFormData(), collectPemData(), collectDetailData());
    return saveEntry(dateStr, data);
  };

  const handleSaveDetail = () => {
    saveAll(selectedDate());
    showSavedFeedback(document.getElementById('btn-save-detail'));
  };

  // ---------- Datum im Header initialisieren ----------
  const initDateDisplay = () => {
    const dateStr = todayKey();
    const el = document.getElementById('date-picker');
    if (el) el.value = dateStr;
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

  const formatCell = (value) => MECFS_core.csvCell(value);

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
    markExportReminded();
  };

  const handleShare = async () => {
    const entries = getAllEntries();
    if (entries.length === 0) {
      alert('Keine gespeicherten Daten vorhanden.');
      return;
    }
    markExportReminded();

    const csvString = buildCSV(entries);
    const filename = 'mecfs_export.csv';
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });

    if (navigator.share && navigator.canShare) {
      const file = new File([blob], filename, { type: 'text/csv' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'ME/CFS Symptom-Tracker Export',
            files: [file]
          });
        } catch (err) {
          console.log('Teilen abgebrochen:', err);
        }
      } else {
        alert('Dein Browser unterstützt das direkte Teilen von Dateien leider nicht.');
      }
    } else {
      alert('Die Teilen-Funktion wird auf diesem Gerät/Browser nicht unterstützt. Nutze den normalen Export.');
    }
  };

  const buildJSON = (entries) => JSON.stringify(entries, null, 2);

  const downloadJSON = (jsonString, filename) => {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const entries = getAllEntries();
    if (entries.length === 0) {
      alert('Keine gespeicherten Daten vorhanden.');
      return;
    }
    downloadJSON(buildJSON(entries), 'mecfs_export.json');
    markExportReminded();
  };

  const handleShareJSON = async () => {
    const entries = getAllEntries();
    if (entries.length === 0) {
      alert('Keine gespeicherten Daten vorhanden.');
      return;
    }
    markExportReminded();

    const jsonString = buildJSON(entries);
    const filename = 'mecfs_export.json';
    const blob = new Blob([jsonString], { type: 'application/json' });

    if (navigator.share && navigator.canShare) {
      const file = new File([blob], filename, { type: 'application/json' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'ME/CFS Symptom-Tracker Export (JSON)',
            files: [file]
          });
        } catch (err) {
          console.log('Teilen abgebrochen:', err);
        }
      } else {
        alert('Dein Browser unterstützt das direkte Teilen von Dateien leider nicht.');
      }
    } else {
      alert('Die Teilen-Funktion wird auf diesem Gerät/Browser nicht unterstützt. Nutze den normalen Export.');
    }
  };

  // ---------- JSON-Import (Backup-Wiederherstellung) ----------
  const recordsFromJSON = (text) => {
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error('Die Datei ist kein gültiges JSON.');
    }

    const arr = Array.isArray(data)
      ? data
      : Array.isArray(data && data.records)
        ? data.records
        : Array.isArray(data && data.data)
          ? data.data
          : null;

    if (!arr) {
      throw new Error('Die JSON-Datei enthält keine Datensätze.');
    }
    return arr;
  };

  // Text-/Datumsfelder (nicht numerisch) für den CSV-Import
  const TEXT_KEYS = new Set([
    'datum',
    'erfassungs_typ',
    'kontext',
    'notiz',
    'pem_ausloeser',
    'pem_symptome',
    'pem_belastungsdatum'
  ]);

  // CSV-Header → Key (aus EXPORT_COLUMNS)
  const HEADER_TO_KEY = {};
  EXPORT_COLUMNS.forEach((col) => { HEADER_TO_KEY[col.header] = col.key; });

  const recordsFromCSV = (text) => {
    const clean = String(text).replace(/\uFEFF/g, '');
    const lines = clean.split(/\r?\n/).filter((l) => l.trim() !== '');
    if (lines.length < 2) return [];

    const headers = MECFS_core.parseCSVLine(lines[0]).map((h) => String(h).trim());
    const keyByIndex = headers.map((h) => HEADER_TO_KEY[h] || null);

    const out = [];
    for (let r = 1; r < lines.length; r++) {
      const cells = MECFS_core.parseCSVLine(lines[r]);
      const rec = {};
      for (let c = 0; c < cells.length; c++) {
        const key = keyByIndex[c];
        if (!key) continue;
        const raw = cells[c];
        if (raw === '') {
          rec[key] = null;
        } else if (TEXT_KEYS.has(key)) {
          rec[key] = raw;
        } else {
          rec[key] = MECFS_core.parseNumber(raw);
        }
      }
      out.push(rec);
    }
    return out;
  };

  // Bereinigt einen Import-Eintrag: nur bekannte Keys, leer = null, datum prüfen.
  const sanitizeImportedEntry = (item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;

    const datum = String(item.datum || '').trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return null;

    const rec = {};
    KNOWN_KEYS.forEach((key) => {
      if (!(key in item)) return;
      const value = item[key];
      // null-Konvention: leere Werte als null speichern (niemals 0 oder "")
      if (value === null || value === undefined || value === '') {
        rec[key] = null;
      } else {
        rec[key] = value;
      }
    });

    rec.datum = datum;

    // erfassungs_typ konsistent ableiten (wie in saveEntry)
    const hasStandard = STANDARD_FIELDS.some(
      (field) => rec[field] !== null && rec[field] !== undefined
    );
    rec.erfassungs_typ = hasStandard ? 'standard' : 'minimal';

    return rec;
  };

  const handleImportFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result);
      const ext = (file.name || '').toLowerCase();
      const trimmed = text.trim();
      const isJSON = ext.endsWith('.json') || trimmed.charAt(0) === '{' || trimmed.charAt(0) === '[';

      let rawRecords;
      try {
        rawRecords = isJSON ? recordsFromJSON(text) : recordsFromCSV(text);
      } catch (e) {
        alert('Import fehlgeschlagen: ' + e.message);
        return;
      }

      // Bereinigen & nur gültige Einträge behalten; letzter Eintrag je Datum gewinnt.
      const byDate = {};
      rawRecords.forEach((item) => {
        const rec = sanitizeImportedEntry(item);
        if (rec) byDate[rec.datum] = rec;
      });

      const dates = Object.keys(byDate);
      if (!dates.length) {
        alert('Es wurden keine gültigen Tageseinträge gefunden (es fehlt ein gültiges Datum).');
        return;
      }

      // Konfliktprüfung: bereits vorhandene Tage
      const conflicts = dates.filter((dateStr) => localStorage.getItem(storageKey(dateStr)) !== null);
      if (conflicts.length > 0) {
        const ok = window.confirm(
          conflicts.length + ' von ' + dates.length + ' Tagen sind bereits lokal vorhanden.\n\n' +
          'OK = vorhandene Tage überschreiben\nAbbrechen = Import abbrechen'
        );
        if (!ok) return;
      }

      let added = 0;
      let overwritten = 0;
      dates.forEach((dateStr) => {
        const key = storageKey(dateStr);
        if (localStorage.getItem(key) !== null) overwritten += 1;
        else added += 1;
        localStorage.setItem(key, JSON.stringify(byDate[dateStr]));
      });

      markExportReminded();

      // Aktuell angezeigten Tag aktualisieren, falls er importiert wurde
      const currentDate = selectedDate();
      if (byDate[currentDate]) loadEntry(currentDate);

      const status = document.getElementById('import-status');
      if (status) {
        status.textContent = added + ' Tage neu importiert, ' + overwritten + ' Tage überschrieben.';
      }
      alert('Import abgeschlossen: ' + added + ' Tage neu, ' + overwritten + ' überschrieben.');
    };
    reader.onerror = () => {
      alert('Datei konnte nicht gelesen werden.');
    };
    reader.readAsText(file);
  };

  // ---------- Alle Daten löschen ----------
  const resetForm = () => {
    ['view-tagescheck', 'view-pem-crash', 'view-detailcheck'].forEach((viewId) => {
      const container = document.getElementById(viewId);
      if (!container) return;
      container.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });
      container
        .querySelectorAll('input[type="number"], input[type="text"], input[type="date"], textarea')
        .forEach((input) => {
          input.value = '';
        });
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

  // ---------- Auto-Save & Datums-Navigation ----------
  let activeDate = null;
  let autoSaveTimer = null;

  const scheduleAutoSave = () => {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => saveAll(selectedDate()), 300);
  };

  const navigateToDate = (dateStr) => {
    clearTimeout(autoSaveTimer);
    if (activeDate) saveAll(activeDate);
    activeDate = dateStr;
    const el = document.getElementById('date-picker');
    if (el) el.value = dateStr;
    resetForm();
    loadEntry(dateStr);
  };

  const shiftDate = (deltaDays) => {
    if (!activeDate) return;
    const d = new Date(activeDate + 'T00:00:00');
    d.setDate(d.getDate() + deltaDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    navigateToDate(`${y}-${m}-${day}`);
  };

  // ---------- Export-Erinnerung (konfigurierbar) ----------
  const getSettings = () => {
    const defaults = {
      reminderEnabled: true,
      reminderIntervalDays: DEFAULT_REMINDER_INTERVAL_DAYS
    };
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      const days = Number(parsed.reminderIntervalDays);
      return {
        reminderEnabled:
          typeof parsed.reminderEnabled === 'boolean' ? parsed.reminderEnabled : defaults.reminderEnabled,
        reminderIntervalDays:
          Number.isFinite(days) && days >= MIN_REMINDER_INTERVAL_DAYS ? days : defaults.reminderIntervalDays
      };
    } catch (e) {
      return defaults;
    }
  };

  const saveSettings = (settings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  };

  const hasAnyData = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) return true;
    }
    return false;
  };

  const markExportReminded = () => {
    localStorage.setItem(EXPORT_REMINDER_KEY, String(Date.now()));
  };

  const isExportReminderDue = () => {
    const settings = getSettings();
    if (!settings.reminderEnabled) return false;
    if (!hasAnyData()) return false;
    const raw = localStorage.getItem(EXPORT_REMINDER_KEY);
    if (!raw) return true;
    const last = Number(raw);
    if (!Number.isFinite(last)) return true;
    return Date.now() - last >= settings.reminderIntervalDays * 24 * 60 * 60 * 1000;
  };

  const showExportReminder = () => {
    const toast = document.getElementById('reminder-toast');
    if (toast) toast.classList.add('is-visible');
  };

  const hideExportReminder = () => {
    const toast = document.getElementById('reminder-toast');
    if (toast) toast.classList.remove('is-visible');
  };

  const initReminderSettings = () => {
    const checkbox = document.getElementById('reminder-enabled');
    const intervalInput = document.getElementById('reminder-interval');
    if (!checkbox || !intervalInput) return;

    const settings = getSettings();
    checkbox.checked = settings.reminderEnabled;
    intervalInput.value = String(settings.reminderIntervalDays);
    intervalInput.disabled = !settings.reminderEnabled;

    checkbox.addEventListener('change', () => {
      const current = getSettings();
      current.reminderEnabled = checkbox.checked;
      saveSettings(current);
      intervalInput.disabled = !checkbox.checked;
    });

    intervalInput.addEventListener('change', () => {
      let days = parseInt(intervalInput.value, 10);
      if (!Number.isFinite(days) || days < MIN_REMINDER_INTERVAL_DAYS) {
        days = DEFAULT_REMINDER_INTERVAL_DAYS;
      }
      intervalInput.value = String(days);
      const current = getSettings();
      current.reminderIntervalDays = days;
      saveSettings(current);
    });
  };

  const gotoExportBtn = document.getElementById('btn-goto-export');
  if (gotoExportBtn) {
    gotoExportBtn.addEventListener('click', () => {
      hideExportReminder();
      switchView('export');
    });
  }

  const dismissReminderBtn = document.getElementById('btn-dismiss-reminder');
  if (dismissReminderBtn) {
    dismissReminderBtn.addEventListener('click', hideExportReminder);
  }

  // ---------- Initialisierung ----------
  const init = () => {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then((persistent) => {
        if (persistent) {
          console.log("Speicher ist persistent.");
        } else {
          console.log("Speicher ist flüchtig.");
        }
      });
    }

    const dateStr = initDateDisplay();
    activeDate = dateStr;

    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => switchView(tab.dataset.view));
    });

    // Date-Picker: beim Wechsel den neuen Tag laden (alter Tag wird vorher gesichert)
    const datePicker = document.getElementById('date-picker');
    if (datePicker) {
      datePicker.addEventListener('change', () => {
        navigateToDate(datePicker.value);
      });
    }

    // Vor/Zurück-Navigation (Zeitreise)
    const prevDayBtn = document.getElementById('btn-prev-day');
    const nextDayBtn = document.getElementById('btn-next-day');
    if (prevDayBtn) prevDayBtn.addEventListener('click', () => shiftDate(-1));
    if (nextDayBtn) nextDayBtn.addEventListener('click', () => shiftDate(1));

    // Auto-Save: Eingaben automatisch sichern (nervenschonend, kein „Speichern" nötig)
    ['view-tagescheck', 'view-pem-crash', 'view-detailcheck'].forEach((viewId) => {
      const container = document.getElementById(viewId);
      if (!container) return;
      container.addEventListener('input', scheduleAutoSave);
      container.addEventListener('change', scheduleAutoSave);
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveAll(selectedDate());
    });
    window.addEventListener('pagehide', () => saveAll(selectedDate()));

    // PEM-Sub-Tabs
    const tabPemAusloeser = document.getElementById('tab-pem-ausloeser');
    const tabPemVerlauf = document.getElementById('tab-pem-verlauf');
    if (tabPemAusloeser) tabPemAusloeser.addEventListener('click', () => switchPemTab('ausloeser'));
    if (tabPemVerlauf) tabPemVerlauf.addEventListener('click', () => switchPemTab('verlauf'));

    const akutTimeBtn = document.getElementById('btn-akut-time');
    if (akutTimeBtn) akutTimeBtn.addEventListener('click', handleAkutTime);

    // Detailcheck-Sub-Tabs
    const tabDetailBasis = document.getElementById('tab-detail-basis');
    const tabDetailSpezifisch = document.getElementById('tab-detail-spezifisch');
    const tabDetailFunktion = document.getElementById('tab-detail-funktion');
    if (tabDetailBasis) tabDetailBasis.addEventListener('click', () => switchDetailTab('basis'));
    if (tabDetailSpezifisch) tabDetailSpezifisch.addEventListener('click', () => switchDetailTab('spezifisch'));
    if (tabDetailFunktion) tabDetailFunktion.addEventListener('click', () => switchDetailTab('funktion'));

    const saveBtn = document.getElementById('btn-save-tagescheck');
    if (saveBtn) saveBtn.addEventListener('click', handleSave);

    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) exportBtn.addEventListener('click', handleExport);

    const shareBtn = document.getElementById('btn-share-csv');
    if (shareBtn) shareBtn.addEventListener('click', handleShare);

    const exportJsonBtn = document.getElementById('btn-export-json');
    if (exportJsonBtn) exportJsonBtn.addEventListener('click', handleExportJSON);

    const shareJsonBtn = document.getElementById('btn-share-json');
    if (shareJsonBtn) shareJsonBtn.addEventListener('click', handleShareJSON);

    const importBtn = document.getElementById('btn-import-json');
    const importFile = document.getElementById('import-file');
    if (importBtn && importFile) {
      importBtn.addEventListener('click', () => importFile.click());
      importFile.addEventListener('change', () => {
        if (importFile.files && importFile.files[0]) {
          handleImportFile(importFile.files[0]);
        }
        importFile.value = '';
      });
    }

    const importCsvBtn = document.getElementById('btn-import-csv');
    const importCsvFile = document.getElementById('import-csv-file');
    if (importCsvBtn && importCsvFile) {
      importCsvBtn.addEventListener('click', () => importCsvFile.click());
      importCsvFile.addEventListener('change', () => {
        if (importCsvFile.files && importCsvFile.files[0]) {
          handleImportFile(importCsvFile.files[0]);
        }
        importCsvFile.value = '';
      });
    }

    const deleteBtn = document.getElementById('btn-delete-all');
    if (deleteBtn) deleteBtn.addEventListener('click', handleDeleteAll);

    const pemSaveBtn = document.getElementById('btn-save-pem');
    if (pemSaveBtn) pemSaveBtn.addEventListener('click', handleSavePem);

    const detailSaveBtn = document.getElementById('btn-save-detail');
    if (detailSaveBtn) detailSaveBtn.addEventListener('click', handleSaveDetail);

    loadEntry(dateStr);

    initReminderSettings();

    // Export-Erinnerung (falls fällig)
    if (isExportReminderDue()) {
      showExportReminder();
      markExportReminded();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---------- Update-Hinweis (weiches Update) ----------
  const showUpdateToast = () => {
    const toast = document.getElementById('update-toast');
    if (toast) toast.classList.add('is-visible');
  };

  const hideUpdateToast = () => {
    const toast = document.getElementById('update-toast');
    if (toast) toast.classList.remove('is-visible');
  };

  const reloadBtn = document.getElementById('btn-reload');
  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => window.location.reload());
  }

  const dismissBtn = document.getElementById('btn-dismiss-update');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', hideUpdateToast);
  }

  // ---------- Service Worker registrieren (PWA/Offline) ----------
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'UPDATE_READY') {
        showUpdateToast();
      }
    });

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .catch((err) => console.error('Service Worker-Registrierung fehlgeschlagen:', err));
    });
  }
})();
