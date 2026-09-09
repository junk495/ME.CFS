# Entwickler-Handbuch (DEV_GUIDE)

Kurze Referenz für die Wartung und Weiterentwicklung des ME/CFS Symptom-Trackers.

## Projektstruktur

| Datei | Zweck |
|---|---|
| `index.html` | SPA — alle Ansichten als `<section>`, Navigation per `display` |
| `style.css` | Reines CSS (Dark-Theme, Mobile-First, keine Frameworks) |
| `app.js` | Komplette Logik (Vanilla JS, IIFE) |
| `manifest.json` | PWA-Manifest |
| `sw.js` | Service Worker (Cache-First, Versionierung) |
| `*.md` | Dokumentation |

## Datenkonventionen

- **Speicherschlüssel:** `mecfs_tagescheck_YYYY-MM-DD` (flaches JSON pro Tag).
- **null-Konvention:** Leere Felder werden als `null` gespeichert (nie `0` oder `""`).
- **Einstellungen:** `mecfs_settings` (JSON: `reminderEnabled`, `reminderIntervalDays`).
- **Erinnerungs-Zeitstempel:** `mecfs_export_reminder_ts`.
- Ausführliche Feld-Referenz: siehe `DATENMODELL.md`.

## Wo liegt was in `app.js`?

| Bereich | Funktionen |
|---|---|
| Konstanten | `STORAGE_PREFIX`, `EXPORT_COLUMNS`, `STANDARD_FIELDS`, Settings-Konstanten |
| Navigation | `switchView`, `switchPemTab`, `switchDetailTab` |
| Formular lesen | `collectFormData` (Tagescheck), `collectPemData`, `collectDetailData` |
| Speichern/Laden | `saveEntry`, `loadEntry`, `resetForm`, `selectedDate` |
| Export | `getAllEntries`, `buildCSV`, `downloadCSV`, `handleExport`, `handleShare` |
| Erinnerung | `getSettings`, `saveSettings`, `isExportReminderDue`, `initReminderSettings` |

## Neues Feld hinzufügen (Checkliste)

1. HTML-Feld mit eindeutigem `name` im passenden Tab ergänzen.
2. Key in `EXPORT_COLUMNS` (app.js) eintragen — bestimmt die CSV-Spaltenreihenfolge.
3. Bei Skalen (0–4): als Radio-Gruppe mit dem `name`-Key anlegen; `collect*` liest sie automatisch über `name`.

## Release-Prozess

1. Code ändern.
2. `VERSION` in `sw.js` erhöhen (z. B. `'v2'` → `'v3'`).
3. Eintrag in `CHANGELOG.md` ergänzen.
4. Pushen → GitHub Pages deployt automatisch.
5. Nutzer erhalten beim nächsten Öffnen den Hinweis „Neue Version verfügbar".

## Lokale Entwicklung

- Service Worker laufen nur über **HTTPS** oder `localhost` — nicht über `file://`.
- In VS Code: die Erweiterung **Live Server** verwenden.
- Zum Testen des Update-Mechanismus: `VERSION` in `sw.js` ändern und neu laden.

## Hinweise zur `.clinerules`

- Keine Frameworks, kein Build-Tool, kein Backend.
- Reines Vanilla JS + CSS, 100 % lokal, Offline-first.
