# Changelog

Alle relevanten Änderungen an dieser App, geordnet nach Version.
Die Version wird in `sw.js` (`const VERSION`) gepflegt — bei jedem Release hochzählen und hier einen Eintrag ergänzen.

## [v2] – aktuell

- **Detailcheck** in drei Sub-Tabs gegliedert: **Basis**, **Spezifisch** (21 neue Symptome), **Funktion** (9 Alltagsfunktionen).
- **Bell-Skala (0–100)** im Tagescheck ergänzt.
- **PEM-Crash** in Sub-Tabs **Auslöser / Verlauf** gegliedert + 6 neue PEM-Skalen.
- **Zeitreise:** globaler Datums-Wähler im Header (nachträgliches Erfassen an Crash-Tagen).
- **Web Share API:** „Datei teilen / senden" zusätzlich zum CSV-Download.
- **Konfigurierbare Export-Erinnerung** (Haken + Intervall in Tagen, Standard 3 Tage).
- **Hilfe-Boxen** (📖, aufklappbar) in jedem Tab.
- **Update-Hinweis** „Neue Version verfügbar" mit „Neu laden".
- Antrag auf **persistenten Speicher** (`navigator.storage.persist()`).
- CSV-Export auf **80 Spalten** erweitert.

## [v1] – Erstveröffentlichung

- **Tagescheck** (Minimal / Standard / Optional) mit 0–4-Skalen als Tap-Buttons.
- Flaches JSON-Datenmodell mit **`null`-Konvention** für leere Felder.
- **CSV-Export** (Semikolon, BOM, Komma-Dezimal, Text-Sanitizing).
- **PWA-Grundgerüst:** `manifest.json`, Service Worker (Cache-First), Offline-Betrieb.
- **Dark-Theme, Mobile-First,** Touch-Flächen ≥ 44 px.
