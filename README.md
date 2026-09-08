# ME/CFS Symptom-Tracker (PWA)

**🌐 Zur Live-App:** <a href="https://junk495.github.io/ME.CFS/" target="_blank" rel="noopener noreferrer">https://junk495.github.io/ME.CFS/</a>

Ein reizarmer, offline-fähiger Tracker zur täglichen Dokumentation von ME/CFS-Symptomen. 
Entwickelt mit Fokus auf Pacing und minimale kognitive Belastung am Smartphone (Mobile First).

## 📚 Dokumentation & Hilfe

*   **Bedienungsanleitung** (für Anwender:innen): <a href="./BEDIENUNGSANLEITUNG.md" target="_blank" rel="noopener noreferrer">BEDIENUNGSANLEITUNG.md</a> — Schritt-für-Schritt-Erklärung aller Tabs, Skalen und der Zeitreise-Funktion, frei von Technik-Jargon.
*   **Fachliche Grundlagen** (für Ärzt:innen & Fachpersonal): <a href="./ERLAEUTERUNGEN.md" target="_blank" rel="noopener noreferrer">ERLAEUTERUNGEN.md</a> — Hintergrund zu PEM, der 0–4-Skala, GdB (Österreich) und Quellenangaben.

## Warum diese App?

Herkömmliche Excel-Tabellen zur Dokumentation (z.B. für GdB-Verfahren in Österreich oder ärztliche Begutachtungen) sind am Smartphone oft unübersichtlich und erfordern mühsames Scrollen. Diese Progressive Web App (PWA) löst das Problem durch eine strikt vertikale, für Touch-Eingaben optimierte Oberfläche.

## Kernfunktionen

*   **Pacing-optimierte Eingabe:** Unterteilung in einen täglichen Minimal- und Standardcheck. An schlechten Tagen (Crash/PEM) dauert die Eingabe nur wenige Sekunden.
*   **100 % lokaler Datenschutz:** Alle Gesundheitsdaten verbleiben ausschließlich lokal auf dem Endgerät (im `localStorage` des Browsers). Es gibt keine Cloud-Anbindung und keinen Backend-Server.
*   **Vollständig Offline-fähig:** Nach dem ersten Aufruf funktioniert die App komplett ohne aktive Internetverbindung.
*   **Reizarmes Design:** Dunkles Theme, klare Kontraste, keine Animationen, kein horizontales Scrollen.
*   **Excel-Export:** Die gesammelten Daten können jederzeit per Knopfdruck als formatierte `.xlsx`-Datei exportiert werden.

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
