---
create: 2026-01-07
idnote: 3In99qSMv0
vault: dev
title: Überwachung des Status von GitHub Actions über das Terminal
path:
tags:
  - git
  - ci
status:
rating:
published: 2026-01-08
symlink:
symlinkchapter: DevOps
Language: de
---

![[Pasted image 20260108204819.png]]

Jedes Mal auf GitHub über die Web-Oberfläche zu gehen, um den Status von GitHub Actions zu verfolgen, ist nicht besonders bequem — besonders wenn du häufig Pushes machst und sofort das Ergebnis des CI sehen möchtest.

Es ist viel praktischer, die Ausführung von GitHub Actions direkt aus dem Terminal zu überwachen, ohne den Browser zu öffnen. Glücklicherweise bietet GitHub dafür ein offizielles Tool — **GitHub CLI**.

In diesem Artikel werden wir uns ansehen, wie man den Status von GitHub Actions, Logs und den Fortschritt der Ausführung direkt aus der Konsole anzeigen kann.


## Installation von GitHub CLI

Zunächst musst du GitHub CLI installieren.

Offizielle Website:  
[https://cli.github.com/](https://cli.github.com/)

Auf macOS ist es am einfachsten, es über Homebrew zu installieren:
```bash
brew install gh
```

Nach der Installation musst du dich in deinem GitHub-Konto authentifizieren:
```bash
gh auth login
```

Wähle die Authentifizierungsmethode:
- GitHub.com
- HTTPS
- Mit Browser anmelden

Nach erfolgreicher Authentifizierung erhält die CLI Zugriff auf deine Repositories und GitHub Actions.


## Anzeigen der Liste von GitHub Actions

Um die Liste aller Ausführungen von GitHub Actions im Repository anzuzeigen, verwendest du den Befehl:
```bash
gh run list
```

![[Pasted image 20260108200706.png]]

Dieser zeigt die letzten Ausführungen mit Informationen über:
- Status (`queued`, `in_progress`, `completed`)
- Ergebnis (`success`, `failure`, `cancelled`)
- Workflow
- Branch
- usw.

## Filterung und Formatierung der Ausgabe

Standardmäßig gibt der Befehl `gh run list` die Liste der Ausführungen im Standardtabellenformat aus.  
Oft möchte man jedoch nur die letzten Ausführungen und nur die benötigten Felder sehen.

### Ausgabe der letzten N Ausführungen

Wenn du beispielsweise die **5 letzten Ausführungen** anzeigen möchtest, kannst du den Flag `-L` verwenden:

```bash
gh run list -L 5
```


### Ausgabe nur der benötigten Felder

GitHub CLI ermöglicht es, Daten im JSON-Format zu erhalten und die Ausgabe mit einer eingebauten JMESPath-Abfrage (`-q`) zu formatieren.

Um beispielsweise die **5 letzten Ausführungen** mit den Feldern:

- `databaseId`
- `status`
- `conclusion`
- `workflowName`

anzuzeigen, kannst du den Befehl verwenden:

```bash
gh run list -L 5 \   --json databaseId,status,conclusion,workflowName \   -q '.[] | "\(.status) | \(.conclusion // "null") | \(.workflowName) | #\(.databaseId)"'
```

Das Ergebnis wird im Terminal als kompakte Liste in einem praktischen Format angezeigt:

```bash
in_progress | null    | build-and-test | #59722592906 
completed   | success | deploy         | #59722592810 
completed   | failure | lint           | #59722592744
```


### Verfügbare Felder für die Ausgabe

In `--json` kannst du beliebige verfügbare Felder angeben. Die nützlichsten sind:
- `databaseId` — eindeutige ID der Ausführung
- `status` — aktueller Status: `queued`, `in_progress`, `completed`
- `conclusion` — Ergebnis der Ausführung: `success`, `failure`, `cancelled` (nur wenn `completed`)
- `workflowName` — Name des Workflows
- `branch` — Branch, von dem der Workflow gestartet wurde
- `displayTitle` — angezeigter Titel der Ausführung
    

So kannst du mit `--json` und `-q` die Ausgabe flexibel anpassen und genau die Informationen erhalten, die du zur Überwachung von GitHub Actions direkt aus dem Terminal benötigst.

### Filterung nach Status

Du kannst nur die Workflows anzeigen, die gerade ausgeführt werden:
```bash
gh run list --status in_progress
```

Ähnlich kannst du nur die wartenden in der Warteschlange anzeigen:
```bash
gh run list --status queued
```


## Anzeigen der Details einer bestimmten Ausführung

Jede Ausführung hat ihre eigene `id`. Diese kannst du aus der Ausgabe des Befehls `gh run list` entnehmen.
Um zu sehen, wie eine bestimmte GitHub Action ausgeführt wurde:
```bash
gh run view --job=59722592906
```

Im Terminal werden alle Schritte des Workflows angezeigt.
Um die detaillierten Logs jedes Schrittes anzuzeigen, verwendest du den Flag `--log`:
```bash
gh run view --log --job=59722592906
```


## Echtzeitüberwachung eines bestimmten Workflows

Um die Ausführung einer GitHub Action in Echtzeit zu verfolgen, kannst du den Befehl verwenden:
```bash
gh run watch $(gh run list -L 1 --json databaseId -q ".[0].databaseId")
```

![[Pasted image 20260107205817.png | 700]]

Dieser Befehl:
- nimmt den zuletzt gestarteten Workflow
- verbindet sich mit ihm
- zeigt den Fortschritt der Ausführung und die Logs in Echtzeit an

## Automatisierung der Überwachung von GitHub Actions

Das Problem ist, dass GitHub CLI keine Ereignisse in Echtzeit streamt. Es funktioniert über Polling — das heißt, es zeigt den aktuellen Zustand zum Zeitpunkt der Anfrage an.
`gh run watch` fragt einfach die GitHub API in einem bestimmten Intervall ab und aktualisiert die Ausgabe. Dies sind keine Push-Benachrichtigungen, sondern eine periodische Statusüberprüfung.
Dieser Befehl ist nützlich, wenn wir einen bestimmten gestarteten Workflow überwachen. Wenn wir jedoch den Status von 5 oder 10 Workflows überwachen müssen, die gestartet, in Bearbeitung oder in der Warteschlange sind, ist dieser Befehl nicht besonders geeignet. Dafür können wir das Tool `watch` verwenden, das es ermöglicht, jeden Befehl alle N Sekunden auszuführen und die Ausgabe im Terminal zu aktualisieren.

## Verwendung des Tools watch zur automatischen Aktualisierung der Liste von GitHub Actions

`watch` ist ein Tool, das es ermöglicht, einen Befehl alle N Sekunden auszuführen und die Ausgabe im Terminal zu aktualisieren.
Auf macOS kannst du es über Homebrew installieren:
```bash
brew install watch
```
Danach kannst du beispielsweise Folgendes ausführen:
`watch -n 5 'gh run list -L 5'`

![[Pasted image 20260108200130.png | 900]]

**Dieser Befehl:**
- führt alle 5 Sekunden `gh run list -L 5` aus
- zeigt die 5 letzten Ausführungen von GitHub Actions im Terminal an
- aktualisiert automatisch den Bildschirm

Der Flag `-L 5` bedeutet, dass uns die 5 letzten Workflows interessieren.
So erhalten wir automatisch aktualisierte Listen von GitHub Actions direkt im Terminal.

## Zusammenfassung

**Mit GitHub CLI und den Standard-Terminal-Tools kannst du:**
- die Liste der Ausführungen von GitHub Actions anzeigen
- nach Status filtern
- Logs einsehen
- die Ausführung in Echtzeit verfolgen
- eine automatische Überwachung über `watch` organisieren
    
**Das ermöglicht eine viel schnellere und bequemere Arbeit mit CI, ohne ständig zwischen Browser und Terminal wechseln zu müssen.**