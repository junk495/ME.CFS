# Häufige Fragen (FAQ)

## Werden meine Daten auf dem Handy gelöscht?

Deine Daten liegen **ausschließlich lokal** auf deinem Gerät (im `localStorage` des Browsers) — es gibt keinen Server und keine Cloud. Browser können lokale Daten jedoch in bestimmten Situationen entfernen:

- bei **Speicherknappheit** auf dem Gerät,
- bei **längerer Nicht-Nutzung** (iOS-Safari teils schon nach 7 Tagen, wenn die App **nicht** installiert ist),
- wenn du **Browser-/Website-Daten löschst** oder die App deinstallierst.

**Gegenmaßnahmen:** Installiere die App als PWA („Zum Home-Bildschirm") und **exportiere regelmäßig** — das ist die einzige echte Sicherung.

## Wie installiere ich die App?

Öffne die App im mobilen Browser und wähle **„Zum Home-Bildschirm hinzufügen"** (Add to Home Screen). Danach startet sie wie eine normale App über das Icon. Es ist kein App-Store nötig.

## Warum exportiert die App CSV und nicht Excel (.xlsx)?

CSV ist ein einfaches, universelles Textformat, das sich **direkt in Excel öffnen** lässt — ohne zusätzliche Bibliotheken und damit ohne externe Abhängigkeiten (wichtig für die Offline-Fähigkeit). Die Datei nutzt **Semikolon** als Trennzeichen und **Komma** als Dezimalzeichen, damit deutsches/österreichisches Excel sie korrekt erkennt.

## Wie bekomme ich ein Update aufs Handy?

Ein Update erscheint **nicht automatisch** beim Git-Sync. Der Ablauf: Der Entwickler veröffentlicht eine neue Version → du öffnest die App (online) → unten erscheint „**Neue Version verfügbar**" mit „Neu laden". Nach dem Antippen bist du auf dem neuesten Stand. Deine Daten bleiben dabei erhalten.

## Was ist die Export-Erinnerung?

Eine sanfte Erinnerung, die dich in einstellbaren Abständen (Standard: alle 3 Tage) daran erinnert, deine Daten zu exportieren. Du kannst sie im Export-Tab ein- oder ausschalten und das Intervall anpassen.

## Wie stelle ich mein Backup wieder her?

Öffne den Tab **Export** und tippe auf **„JSON-Backup importieren"**. Wähle die zuvor als JSON exportierte Datei. Die Daten werden ausschließlich lokal auf deinem Gerät wiederhergestellt — fehlende Tage werden ergänzt, bereits vorhandene Tage nur nach Rückfrage überschrieben.

## Sind meine Daten privat?

Ja. Alle Gesundheitsdaten bleiben auf deinem Gerät. Es findet **keine Übertragung** an externe Server statt. Erst wenn du selbst „Teilen / senden" nutzt, übergibst du die Datei bewusst an eine Ziel-App (z. B. E-Mail oder Cloud).

## Was bedeutet die 0–4-Skala?

- **0** = Nicht vorhanden
- **1** = Leicht
- **2** = Mittel
- **3** = Schwer
- **4** = Sehr schwer

Ausnahme: Beim **Zustand (0–10)** und der **Bell-Skala (0–100)** bedeuten höhere Werte einen **besseren** Zustand.
