# ME/CFS Symptom-Tracker (PWA)

**🌐 Zur Live-App:** [https://junk495.github.io/ME.CFS/](https://junk495.github.io/ME.CFS/)

Ein reizarmer, offline-fähiger Tracker zur täglichen Dokumentation von ME/CFS-Symptomen — entwickelt mit Fokus auf Pacing und minimale kognitive Belastung am Smartphone (Mobile First).

## 📚 Dokumentation

Die vollständige Dokumentation liegt im **[Projekt-Wiki](https://github.com/junk495/ME.CFS/wiki)** (für Tracker und Auswertungs-App): Bedienungsanleitung, FAQ, fachliche Grundlagen, Datenmodell und Entwickler-Handbuch.

## 🚧 Roadmap / Geplante Funktionen

### Grunddaten-Blatt & Medikations-Erfassung

**Idee:** Zwei getrennte Ebenen für „Stammdaten" und „tägliche Ereignisse":

- **Grunddaten (einmal ausfüllen):** Ein eigenes Datenblatt für dauerhafte Angaben — vor allem die **Dauermedikation** (Name, Dosierung, Einnahme-Rhythmus, seit wann). Ergänzend denkbar: Diagnosen, Allergien/Unverträglichkeiten, behandelnde Ärzt:innen.
- **Tageslog (täglich):** Im Tagescheck zusätzlich **Akut-/Bedarfsmedikation** und **Einmalgaben** (z. B. „heute 1× Schmerzmittel wegen Crash").

**Warum sinnvoll?**
- Für Arzt-/Gutachtertermine hat man eine **vollständige Medikamentenliste** griffbereit (→ Grunddaten).
- Im Verlauf lassen sich **Zusammenhänge** erkennen (z. B. „an Tagen mit Bedarfsmedikation war der Crash stärker") — akute Gaben gehören deshalb in die Tageshistorie.
- Saubere Trennung: **stabile Stammdaten** (ändern sich selten) vs. **tagesbezogene Ereignisse** (variieren täglich).

**Offene Punkte (zur Bewertung):**
- Welche Grunddaten-Felder genau? (nur Medikation oder auch Diagnosen/Allergien/Ärzt:innen?)
- Akutmedikation als Freitext oder als strukturierte Liste (Wirkstoff, Dosis, Uhrzeit)?
- Soll der Graph später Medikamenten-Marker im Verlauf anzeigen?

## 📄 Weitere Dateien in diesem Repository

- **[CHANGELOG.md](./CHANGELOG.md)** — Versionshistorie.
- **[LICENSE.md](./LICENSE.md)** — Lizenz (CC BY-NC-SA 4.0) und medizinischer Haftungsausschluss.

## Technische Basis

Statische Single Page Application (SPA) auf GitHub Pages: HTML5, reines CSS, Vanilla JavaScript (ES6+), PWA (`manifest.json`, `sw.js`). Keine Frameworks, keine externen Abhängigkeiten, 100 % lokal.
