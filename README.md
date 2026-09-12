# ME/CFS Symptom-Tracker (PWA)

**🌐 Zur Live-App:** <a href="https://junk495.github.io/ME.CFS/" target="_blank" rel="noopener noreferrer">https://junk495.github.io/ME.CFS/</a>

Ein reizarmer, offline-fähiger Tracker zur täglichen Dokumentation von ME/CFS-Symptomen. 
Entwickelt mit Fokus auf Pacing und minimale kognitive Belastung am Smartphone (Mobile First).

## 📚 Dokumentation & Hilfe

*   **Bedienungsanleitung** (für Anwender:innen): <a href="./BEDIENUNGSANLEITUNG.md" target="_blank" rel="noopener noreferrer">BEDIENUNGSANLEITUNG.md</a> — Schritt-für-Schritt-Erklärung aller Tabs, Skalen und der Zeitreise-Funktion, frei von Technik-Jargon.
*   **Häufige Fragen (FAQ):** <a href="./FAQ.md" target="_blank" rel="noopener noreferrer">FAQ.md</a> — Antworten zu Datensicherheit, Installation, Updates und Export.
*   **Fachliche Grundlagen** (für Ärzt:innen & Fachpersonal): <a href="./ERLAEUTERUNGEN.md" target="_blank" rel="noopener noreferrer">ERLAEUTERUNGEN.md</a> — Hintergrund zu PEM, der 0–4-Skala, GdB (Österreich) und Quellenangaben.
*   **Datenmodell & Speicherstruktur:** <a href="./DATENMODELL.md" target="_blank" rel="noopener noreferrer">DATENMODELL.md</a> — Referenz aller Felder, Skalen und der CSV-Spalten.

## 🛠 Projekt & Entwicklung

*   **Changelog:** <a href="./CHANGELOG.md" target="_blank" rel="noopener noreferrer">CHANGELOG.md</a> — Versionshistorie.
*   **Entwickler-Handbuch:** <a href="./DEV_GUIDE.md" target="_blank" rel="noopener noreferrer">DEV_GUIDE.md</a> — Projektstruktur, Datenkonventionen, Release-Prozess.
*   **Lizenz & Haftungsausschluss:** <a href="./LICENSE.md" target="_blank" rel="noopener noreferrer">LICENSE.md</a> — CC BY-NC-SA 4.0 und medizinischer Haftungsausschluss.

## Warum diese App?

Herkömmliche Excel-Tabellen zur Dokumentation (z.B. für GdB-Verfahren in Österreich oder ärztliche Begutachtungen) sind am Smartphone oft unübersichtlich und erfordern mühsames Scrollen. Diese Progressive Web App (PWA) löst das Problem durch eine strikt vertikale, für Touch-Eingaben optimierte Oberfläche.

## Kernfunktionen

*   **Pacing-optimierte Eingabe:** Unterteilung in einen täglichen Minimal- und Standardcheck. An schlechten Tagen (Crash/PEM) dauert die Eingabe nur wenige Sekunden.
*   **100 % lokaler Datenschutz:** Alle Gesundheitsdaten verbleiben ausschließlich lokal auf dem Endgerät (im `localStorage` des Browsers). Es gibt keine Cloud-Anbindung und keinen Backend-Server.
*   **Vollständig Offline-fähig:** Nach dem ersten Aufruf funktioniert die App komplett ohne aktive Internetverbindung.
*   **Reizarmes Design:** Dunkles Theme, klare Kontraste, keine Animationen, kein horizontales Scrollen.
*   **Export:** Die Daten können jederzeit als CSV-Datei (Semikolon-getrennt, direkt in Excel öffnbar) oder als JSON (Backup & Import in die Auswertungs-App ME.CFS.graph) exportiert und über die Teilen-Funktion weitergegeben werden.
*   **Auto-Save:** Eingaben werden automatisch gesichert (bei Eingabe, Tab-Wechsel und beim Verlassen der App) — kein manuelles Speichern nötig.
*   **Backup & Wiederherstellung:** Ein zuvor exportiertes Backup (JSON oder CSV) lässt sich jederzeit wieder importieren — z. B. nach einem Gerätewechsel oder Browser-Datenverlust.
*   **Zeitreise:** Über den Datums-Wähler oder die Vor/Zurück-Buttons lassen sich Einträge auch nachträglich für vergangene Tage erfassen (z. B. Crash-Tage später nachtragen).
*   **Auswertung:** Über „In ME.CFS.graph auswerten" springst du direkt in die Auswertungs-App (Verlauf, Heatmap, Crash-Risiko).
*   **Konfigurierbare Export-Erinnerung:** Erinnert auf Wunsch in einstellbaren Abständen daran, die Daten regelmäßig zu sichern.

## 🚧 Roadmap / Geplante Funktionen

*   **Verlauf/Übersicht:** In-App-Ansicht der letzten Tage (Trends auf einen Blick, ohne Excel).
*   **Code-Struktur:** `app.js` bei Bedarf weiter in kleinere Module aufteilen (reine Helfer sind bereits nach `core.js` ausgelagert).

## Installation am Smartphone

Da es sich um eine Progressive Web App (PWA) handelt, ist keine Installation über den Google Play Store oder Apple App Store nötig:

1. Den Link <a href="https://junk495.github.io/ME.CFS/" target="_blank" rel="noopener noreferrer">https://junk495.github.io/ME.CFS/</a> im mobilen Browser (z. B. Chrome, Firefox oder Safari) öffnen.
2. Im Browser-Menü die Option **"Zum Startbildschirm hinzufügen"** (Add to Home Screen) wählen.
3. Die App kann nun wie eine reguläre App über das Icon auf dem Homescreen gestartet werden.

## Technische Basis & Entwicklung

Das Projekt ist eine statische Single Page Application (SPA), die auf jegliche überflüssige Komplexität verzichtet, um maximale Stabilität und Offline-Fähigkeit zu garantieren.

*   **Frontend:** HTML5, reines CSS (kein Framework, um externe Abhängigkeiten zu vermeiden).
*   **Logik:** Vanilla JavaScript (ES6+).
*   **PWA-Kern:** `manifest.json` und Service Worker (`sw.js`).
*   **Hosting:** GitHub Pages.

**Lokale Entwicklung in VS Code:**
Da Service Worker aus Sicherheitsgründen nicht über das lokale Dateisystem (`file://`) ausgeführt werden, muss das Projekt für lokale Tests über einen Webserver laufen. In VS Code empfiehlt sich dafür die Erweiterung `Live Server`.
