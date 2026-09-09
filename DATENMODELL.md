# Datenmodell & Speicherstruktur

Dieses Dokument beschreibt die technische Datenstruktur des ME/CFS Symptom-Trackers: Speicherschlüssel, Feld-Keys, Skalen und die CSV-Spaltenzuordnung. Es dient als Referenz für die Entwicklung und für die Auswertung der exportierten CSV-Datei.

## Speicherung (localStorage)

| Schlüssel | Inhalt |
|---|---|
| `mecfs_tagescheck_YYYY-MM-DD` | Ein Tagesprotokoll (flaches JSON-Objekt) |
| `mecfs_settings` | Einstellungen (`{"reminderEnabled":true,"reminderIntervalDays":3}`) |
| `mecfs_export_reminder_ts` | Zeitstempel der letzten Export-Erinnerung (Millisekunden) |

**Wichtig — null-Konvention:** Nicht ausgefüllte Felder werden zwingend als `null` gespeichert (niemals `0` oder `""`), damit Durchschnittsberechnungen beim Export nicht verfälscht werden.

## Meta-Felder

| Key | Typ | Bedeutung |
|---|---|---|
| `datum` | String `YYYY-MM-DD` | Datum des Protokolls (Teil des Speicherschlüssels) |
| `erfassungs_typ` | String | `"minimal"` (nur Minimalblock) oder `"standard"` (Standardblock ausgefüllt) |

## Felder nach Tab

### Tagescheck — Minimal

| Key | Label | Typ |
|---|---|---|
| `zustand_0_10` | Zustand | Skala 0–10 |
| `fatigue_0_4` | Fatigue / Erschöpfung | Skala 0–4 |
| `pem_heute_0_4` | PEM heute | Skala 0–4 |
| `schlafdauer_h` | Schlafdauer | Zahl (Stunden, Dezimal) |
| `liegezeit_h` | Liegezeit | Zahl (Stunden, Dezimal) |
| `hilfebedarf_min` | Hilfebedarf | Zahl (Minuten) |

### Tagescheck — Standard

| Key | Label | Typ |
|---|---|---|
| `schlafqualitaet_0_4` | Schlafqualität | Skala 0–4 |
| `belastung_koerperlich_0_4` | Belastung körperlich | Skala 0–4 |
| `belastung_kognitiv_0_4` | Belastung kognitiv | Skala 0–4 |
| `belastung_reiz_0_4` | Belastung Reize | Skala 0–4 |
| `pacing_0_4` | Pacing | Skala 0–4 |
| `arbeitsfaehigkeit_0_4` | Arbeitsfähigkeit | Skala 0–4 |
| `teilhabe_0_4` | Teilhabe | Skala 0–4 |
| `bell_0_100` | Bell-Selbsteinschätzung | Skala 0–100 |

### Tagescheck — Optional

| Key | Label | Typ |
|---|---|---|
| `schritte` | Schritte | Zahl (Ganzzahl) |
| `kontext` | Kontext | Text |
| `notiz` | Notiz | Text (mehrzeilig) |

### PEM-Crash

| Key | Label | Typ |
|---|---|---|
| `pem_belastungsdatum` | Datum der Belastung | Datum `YYYY-MM-DD` |
| `pem_ausloeser` | Auslöser | Text |
| `pem_verzoegerung_h` | Verzögerung bis Crash | Zahl (Stunden) |
| `pem_dauer_h` | Bisherige Dauer | Zahl (Stunden) |
| `pem_gesamt_0_4` | Gesamtschwere | Skala 0–4 |
| `pem_erholung_0_4` | Erholungsdauer gefühlt | Skala 0–4 |
| `pem_fatigue_0_4` | Zunahme: Fatigue | Skala 0–4 |
| `pem_kognition_0_4` | Zunahme: Kognition | Skala 0–4 |
| `pem_schmerz_0_4` | Zunahme: Schmerzen | Skala 0–4 |
| `pem_grippe_0_4` | Zunahme: Krankheitsgefühl | Skala 0–4 |
| `pem_symptome` | Stärkste Symptomzunahme | Text (mehrzeilig) |

### Detailcheck — Basis

| Key | Label | Typ |
|---|---|---|
| `schmerz_muskel` | Muskelschmerz | Skala 0–4 |
| `schmerz_gelenk` | Gelenkschmerz | Skala 0–4 |
| `schmerz_kopf` | Kopfschmerz | Skala 0–4 |
| `schmerz_neuro` | Neuropathisch/Brennend | Skala 0–4 |
| `schmerz_beruehrung` | Berührungs-/Druckschmerz | Skala 0–4 |
| `kognition_konzentration` | Konzentration | Skala 0–4 |
| `kognition_gedaechtnis` | Kurzzeitgedächtnis | Skala 0–4 |
| `kognition_sprache` | Wortfindung/Sprache | Skala 0–4 |
| `kognition_koordination` | Bewegungskoordination | Skala 0–4 |
| `reiz_licht` | Lichtempfindlichkeit | Skala 0–4 |
| `reiz_geraeusch` | Geräuschempfindlichkeit | Skala 0–4 |
| `autonom_schwindel` | Schwindel beim Stehen | Skala 0–4 |
| `autonom_herzrasen` | Herzrasen/Palpitationen | Skala 0–4 |
| `autonom_atem` | Atemprobleme/Luftnot | Skala 0–4 |
| `autonom_verdauung` | Verdauungsstörung/Reizdarm | Skala 0–4 |
| `autonom_blase` | Blasenstörung | Skala 0–4 |
| `autonom_temperatur` | Schwitzen/Temperaturregulation | Skala 0–4 |
| `immun_grippegefuehl` | Grippeähnliches Gefühl | Skala 0–4 |
| `immun_hals` | Halsschmerzen/Lymphknoten | Skala 0–4 |
| `mcas_flush` | Flush/Juckreiz | Skala 0–4 |

### Detailcheck — Spezifisch

| Key | Label | Typ |
|---|---|---|
| `schlaf_durchschlaf` | Ein-/Durchschlafstörung | Skala 0–4 |
| `schlaf_rhythmus` | Verschobener Schlafrhythmus | Skala 0–4 |
| `schlaf_hypersomnie` | Hypersomnie | Skala 0–4 |
| `kognition_verlangsamt` | Info-Verarbeitung verlangsamt | Skala 0–4 |
| `kognition_multitasking` | Multitasking | Skala 0–4 |
| `kognition_desorientierung` | Desorientierung/Verwirrtheit | Skala 0–4 |
| `reiz_geruch` | Geruchs-/Berührungsempfindlichkeit | Skala 0–4 |
| `autonom_praesynkope` | Benommenheit/Präsynkope | Skala 0–4 |
| `autonom_synkope` | Synkope | Skala 0–4 |
| `autonom_stehintoleranz` | Stehintoleranz | Skala 0–4 |
| `neuroendokrin_hitze` | Hitzeintoleranz | Skala 0–4 |
| `neuroendokrin_kaelte` | Kälteintoleranz | Skala 0–4 |
| `neuroendokrin_appetit` | Appetit-/Gewichtsveränderung | Skala 0–4 |
| `neuroendokrin_stress` | Stressintoleranz | Skala 0–4 |
| `immun_fieber` | Fiebergefühl | Skala 0–4 |
| `immun_allergie` | Neue Allergie | Skala 0–4 |
| `mcas_uebelkeit` | Übelkeit | Skala 0–4 |
| `mcas_bauchschmerz` | Bauchschmerz/Blähung | Skala 0–4 |
| `mcas_durchfall` | Durchfall/Verstopfung | Skala 0–4 |
| `mcas_nahrung` | Nahrungsunverträglichkeit | Skala 0–4 |
| `mcas_medikament` | Medikamentenüberempfindlichkeit | Skala 0–4 |

### Detailcheck — Funktion

| Key | Label | Typ |
|---|---|---|
| `funktion_koerperpflege` | Körperpflege | Skala 0–4 |
| `funktion_anziehen` | Anziehen | Skala 0–4 |
| `funktion_essen` | Essen/Trinken zubereiten | Skala 0–4 |
| `funktion_gehen` | Gehen/Bewegung | Skala 0–4 |
| `funktion_aufrecht` | Aufrechte Position | Skala 0–4 |
| `funktion_haushalt` | Haushalt | Skala 0–4 |
| `funktion_kommunikation` | Kommunikation | Skala 0–4 |
| `funktion_ausser_haus` | Außer-Haus-Aktivität | Skala 0–4 |
| `funktion_sonne` | Reaktion auf Licht/Sonne | Skala 0–4 |

## CSV-Export

- **Trennzeichen:** Semikolon (`;`) — für deutsches/österreichisches Excel.
- **Kodierung:** UTF-8 mit BOM (`\uFEFF`).
- **Formatierung:**
  - Leere Felder → leeres Feld (`;;`).
  - Zahlen mit Dezimalstellen → Dezimal**komma** (z. B. `7.5` → `7,5`).
  - Textfelder: Zeilenumbrüche und Semikolons werden ersetzt, damit die Struktur erhalten bleibt.
- **Spaltenreihenfolge:** entspricht der Reihenfolge in `EXPORT_COLUMNS` (app.js) — die Tabellen oben folgen dieser Reihenfolge (Datum → … → Funktion Sonne).

## Anzahl der Felder

Insgesamt **80 CSV-Spalten**: 2 Meta-Felder + 78 erfasste Werte (Tagescheck, PEM, Detailcheck).

