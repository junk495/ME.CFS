/* =========================================================
   ME/CFS Symptom-Tracker – core.js
   Reine Hilfsfunktionen (ohne DOM-Abhängigkeit).
   Ausgelagert, damit sie über tests.html testbar sind.
   ========================================================= */
(function (global) {
  'use strict';

  // Dezimalkomma → Dezimalpunkt; leer/null → null
  function parseNumber(raw) {
    if (raw === null || raw === undefined) return null;
    if (typeof raw === 'number') return raw;

    let s = String(raw).trim();
    if (s === '') return null;

    if (s.indexOf(',') !== -1 && s.indexOf('.') === -1) {
      // z. B. "7,5" -> "7.5"
      s = s.replace(/,/g, '.');
    } else if (s.indexOf(',') !== -1 && s.indexOf('.') !== -1) {
      // z. B. "1.234,56" -> "1234.56"
      s = s.replace(/\./g, '').replace(',', '.');
    }

    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  // Semikolon-getrennte Zeile splitten; Anführungszeichen ("..." und "") beachten
  function parseCSVLine(line) {
    const out = [];
    let cur = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (line[i + 1] === '"') { cur += '"'; i++; }
          else inQuotes = false;
        } else {
          cur += ch;
        }
      } else {
        if (ch === '"') inQuotes = true;
        else if (ch === ';') { out.push(cur); cur = ''; }
        else cur += ch;
      }
    }
    out.push(cur);
    return out;
  }

  // Zelle für den CSV-Export formatieren:
  // - Zahlen → Dezimalkomma
  // - Text → Zeilenumbrüche neutralisieren (eine Zeile pro Datensatz),
  //          Semikolons/Anführungszeichen durch Quoting erhalten
  function csvCell(value) {
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value).replace('.', ',');

    const s = String(value).replace(/\r?\n/g, ' ');
    if (/[;"]/.test(s)) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  global.MECFS_core = {
    parseNumber: parseNumber,
    parseCSVLine: parseCSVLine,
    csvCell: csvCell
  };
})(window);
