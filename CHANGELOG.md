# Changelog

Alle Änderungen an der App, geordnet nach Version.
Die Version wird in `sw.js` (`const VERSION`) gepflegt — bei jedem Release hochzählen und hier einen Eintrag ergänzen.

Nur Änderungen, die die App selbst betreffen (Funktionen, Felder, UI, Verhalten), werden aufgeführt. Änderungen an Dokumentation, Lizenz oder anderen Nicht-App-Dateien gehören nicht hierher. Versionen ohne App-Änderungen werden übersprungen.

## [v4] – aktuell

- **Konfigurierbare Export-Erinnerung** (Haken + Intervall in Tagen, Standard 3 Tage).
- **Export-Erinnerung** + Datensicherheits-Hinweis im Export-Tab.
- **Update-Hinweis** „Neue Version verfügbar" mit „Neu laden" + Service-Worker-Update-Logik.

## [v1] – Erstveröffentlichung

- **Tagescheck** (Minimal / Standard / Optional) mit 0–4-Skalen als Tap-Buttons.
- **PEM-Crash-Erfassung** (Auslöser / Verlauf).
- **Detailcheck** (Schmerzen, Kognition, Autonom, Immun/MCAS) mit Sub-Tabs **Basis / Spezifisch / Funktion**.
- **Bell-Skala (0–100)**.
- **Zeitreise:** globaler Datums-Wähler im Header.
- **CSV-Export** (Semikolon, BOM, Komma-Dezimal, Text-Sanitizing) + „Alle Daten löschen".
- **Web Share API** („Datei teilen / senden") + Hilfe-Boxen (📖).
- Antrag auf **persistenten Speicher** (`navigator.storage.persist()`).
- **PWA-Grundgerüst:** `manifest.json`, Service Worker (Cache-First), Offline-Betrieb.
- **Dark-Theme, Mobile-First,** Touch-Flächen ≥ 44 px.
