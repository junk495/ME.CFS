# ME/CFS Symptom-Tracker (PWA)

**🌐 Zur Live-App:** [https://junk495.github.io/ME.CFS/](https://junk495.github.io/ME.CFS/)

Ein reizarmer, offline-fähiger Tracker zur täglichen Dokumentation von ME/CFS-Symptomen — entwickelt mit Fokus auf Pacing und minimale kognitive Belastung am Smartphone (Mobile First).

## 📚 Dokumentation

Die vollständige Dokumentation liegt im **[Projekt-Wiki](https://github.com/junk495/ME.CFS/wiki)** (für Tracker und Auswertungs-App): Bedienungsanleitung, FAQ, fachliche Grundlagen, Datenmodell und Entwickler-Handbuch.

## 🚧 Roadmap / Geplante Funktionen

### Idee 1: Grunddaten-Blatt & Medikations-Erfassung

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

### Idee 2: Ja/Nein-Schalter mit bedingter Detailerfassung

**Idee:** Statt jeden Tag alle Symptome auf einer 0–4-Skala durchzuklicken, wird pro Symptom/Messwert zuerst nur binär gefragt: **„Heute aufgetreten / auffällig? Ja / Nein"**.

- **Nein** → das Feld gilt als „nicht vorhanden / Normalzustand" (die **Grunddaten** gelten), man springt weiter — minimaler Aufwand.
- **Ja** → ein Detailbereich klappt auf: Schwere (0–4), konkrete **Messwerte** (z. B. Puls/Blutdruck bei Schwindel), Dauer, ggf. Auslöser/Notiz.

**Beispiele:**
- **PEM:** heute nicht da → „Nein", fertig. Heute da → „Ja" → Details (Schwere, Dauer, Auslöser).
- **Schwindel:** „Ja" → Fenster mit Messwerten (Schwere + Puls/Blutdruck, da oft POTS-bedingt). „Nein" → Grunddaten/Normalzustand gelten.

**Warum sinnvoll?**
- **Massiv weniger kognitive Belastung:** An schlechten Tagen ist fast alles „Nein" → Erfassung in Sekunden; an guten Tagen bei „Ja" in die Tiefe.
- Passt zum Prinzip **energieabhängige Erfassungstiefe** (Pacing First).

**Zusammenhang mit Idee 1:**
- Beide folgen demselben Muster **„Grunddaten = Standard, Tageslog = Abweichung"**.
- Idee 1 liefert das **Grunddaten-Blatt** (Stammdaten/Normalwerte); Idee 2 nutzt es als Fallback bei „Nein".
- Beide ergänzen sich: Idee 1 hält die dauerhaften Werte, Idee 2 erfasst nur die täglichen Abweichungen.

**Offene Punkte (zur Bewertung):**
- Ersetzt der Ja/Nein-Schalter die 0–4-Skala, oder führt „Ja" erst zur 0–4-Skala?
- Welche „Messwerte" pro Symptom? (Schwindel → Puls/Blutdruck; Schmerz → Intensität/Ort; …)
- Gilt „Nein" als 0 oder als im Grunddaten-Blatt hinterlegter „persönlicher Normalwert"?
- Welche Felder bekommen einen Ja/Nein-Schalter? (alle Symptome oder nur bestimmte?)

## 📄 Weitere Dateien in diesem Repository

- **[CHANGELOG.md](./CHANGELOG.md)** — Versionshistorie.
- **[LICENSE.md](./LICENSE.md)** — Lizenz (CC BY-NC-SA 4.0) und medizinischer Haftungsausschluss.

## Technische Basis

Statische Single Page Application (SPA) auf GitHub Pages: HTML5, reines CSS, Vanilla JavaScript (ES6+), PWA (`manifest.json`, `sw.js`). Keine Frameworks, keine externen Abhängigkeiten, 100 % lokal.
