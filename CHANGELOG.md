# Changelog

Alle Änderungen an der App, geordnet nach Version.
Die Version wird in `sw.js` (`const VERSION`) gepflegt und folgt Semantic Versioning (`MAJOR.MINOR.PATCH`) — bei jedem Release `sw.js` und diesen Eintrag gemeinsam aktualisieren.

Nur Änderungen, die die App selbst betreffen (Funktionen, Felder, UI, Verhalten), werden aufgeführt. Änderungen an Dokumentation, Lizenz oder anderen Nicht-App-Dateien gehören nicht hierher. Versionen ohne App-Änderungen werden übersprungen.

## v9.0.2 – 2026-09-12

- **Installations-Hinweis aktualisiert:** Der Text im Export-Tab nennt jetzt „App installieren" (Android/Chrome) bzw. „Zum Home-Bildschirm" (iOS/Safari).

## v9.0.1 – 2026-09-12

- **Icon überarbeitet:** Neues, maskierbares Batterie-Icon (SVG + PNG 192/512). Auf Android erscheint es jetzt ohne den weißen Kreis (Legacy-Mask) als vollwertiges Adaptive Icon.

## v9.0.0 – 2026-09-12

- **Auto-Save:** Eingaben werden jetzt automatisch gesichert (bei Eingabe, Tab-Wechsel und beim Verlassen der App) — kein manuelles Speichern mehr nötig.
- **CSV-Import:** Zuvor exportierte CSV-Dateien lassen sich wieder importieren (zusätzlich zum JSON-Backup).
- **CSV-Export verbessert:** Semikolons in Textfeldern bleiben erhalten (korrektes Quoting statt Ersetzen).
- **Vor/Zurück-Navigation:** Pfeil-Buttons neben dem Datum erleichtern das Nachtragen vergangener Tage.
- **Link zur Auswertung:** „In ME.CFS.graph auswerten" öffnet die Auswertungs-App direkt.
- **Offline-Icons:** App-Icons werden jetzt mit gecacht.

## v8.0.0

- **JSON-Import (Backup-Wiederherstellung):** Ein zuvor exportiertes JSON-Backup lässt sich jetzt wieder importieren (z. B. nach Gerätewechsel oder Datenverlust). Fehlende Tage werden ergänzt; bereits vorhandene Tage werden nur nach Rückfrage überschrieben.

## v7.0.0

- **JSON-Export:** Daten können jetzt zusätzlich als JSON heruntergeladen oder geteilt werden (verlustfreies Backup & direkter Import in die Auswertungs-App **ME.CFS.graph**).

## v6.0.0

- Einheitliche **„Speichern"**-Buttons auf allen drei Tabs.
- **Auto-Save:** Beim Wechsel des Haupt-Tabs wird automatisch gespeichert.
- **„Speichern" speichert jetzt immer alles** (alle drei Tabs zusammengeführt).
- **⚡-Knopf** „Crash-Beginn jetzt eintragen" speichert den Zeitstempel sofort mit.
- **Barrierefreiheit:** „Gespeichert"-Ansage für Screenreader (aria-live).
- **iOS:** Meta-Tags für die „Zum Home-Bildschirm"-Darstellung ergänzt.

## v5.0.0

- **PEM-Tab** Pacing-gerecht in **Akut** (Crash-Beginn) und **Auswertung** (rückwirkend) geteilt.
- **Zeitstempel-Button** „⚡ Crash-Beginn jetzt eintragen" im Akut-Tab (setzt automatisch die Uhrzeit in die Kurznotiz).

## v4.0.0

- **Konfigurierbare Export-Erinnerung** (Haken + Intervall in Tagen, Standard 3 Tage).
- **Export-Erinnerung** + Datensicherheits-Hinweis im Export-Tab.
- **Update-Hinweis** „Neue Version verfügbar" mit „Neu laden" + Service-Worker-Update-Logik.

## v1.0.0 – Erstveröffentlichung

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
