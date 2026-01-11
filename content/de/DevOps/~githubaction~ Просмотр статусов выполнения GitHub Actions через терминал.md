---
create: 2026-01-07
idnote: 3In99qSMv0
vault: dev
title: Überwachung der Ausführungsstatus von GitHub Actions über das Terminal
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

Es ist nicht sehr bequem, jedes Mal über die Web-Oberfläche von GitHub zu gehen, um den Fortschritt der GitHub Actions zu verfolgen – besonders wenn du oft pushst und sofort das Ergebnis von CI sehen möchtest.

Es ist viel bequemer, die Ausführung von GitHub Actions direkt aus dem Terminal zu überwachen, ohne den Browser zu öffnen. Glücklicherweise bietet GitHub dafür ein offizielles Tool – **GitHub CLI**.

In diesem Artikel werden wir uns ansehen, wie man den Status von GitHub Actions, Logs und den Ausführungsfortschritt direkt aus der Konsole abruft.


## Installation von GitHub CLI

Zunächst muss GitHub CLI installiert werden.

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
- Anmelden mit Browser

Nach erfolgreicher Authentifizierung hat die CLI Zugriff auf deine Repositories und GitHub Actions.


## Anzeigen der Liste von GitHub Actions

Um die Liste aller Ausführungen von GitHub Actions im Repository anzuzeigen, wird der Befehl verwendet:
```bash
gh run list
```

![[Pasted image 20260108200706.png]]

Er zeigt die letzten Ausführungen mit Informationen zu:
- Status (`queued`, `in_progress`, `completed`)
- Ergebnis (`success`, `failure`, `cancelled`)
- Workflow
- Branch
- usw.

## Filtern und Formatieren der Ausgabe

Standardmäßig gibt der Befehl `gh run list` eine list der Ausführungen im Standard-Tabellenformat aus.  
Doch oft möchte man nur die letzten Ausführungen und nur die benötigten Felder sehen.

### Ausgabe der letzten N Ausführungen

Wenn du beispielsweise die **5 letzten Ausführungen** anzeigen möchtest, kannst du den Schalter `-L` verwenden:

```bash
gh run list -L 5
```


### Ausgabe nur der benötigten Felder

GitHub CLI ermöglicht es, Daten im JSON-Format abzurufen und die Ausgabe mit einer eingebauten JMESPath-Abfrage (`-q`) zu formatieren.

Um beispielsweise die **5 letzten Ausführungen** mit den Feldern:

- `databaseId`
- `status`
- `conclusion`
- `workflowName`

auszugeben, kannst du den Befehl verwenden:

```bash
gh run list -L 5 \   --json databaseId,status,conclusion,workflowName \   -q '.[] | "\(.status) | \(.conclusion // "null") | \(.workflowName) | #\(.databaseId)"'
```

Das Ergebnis zeigt in der Konsole eine kompakte Liste in einem angenehmen Format:

```bash
in_progress | null    | build-and-test | #59722592906 
completed   | success | deploy         | #59722592810 
completed   | failure | lint           | #59722592744
```

### Verfügbare Felder für die Ausgabe

In `--json` können beliebige verfügbare Felder angegeben werden. Die nützlichsten sind:
- `databaseId` — eindeutige ID der Ausführung
- `status` — aktueller Status: `queued`, `in_progress`, `completed`
- `conclusion` — Ergebnis der Ausführung: `success`, `failure`, `cancelled` (nur wenn `completed`)
- `workflowName` — Name des Workflows
- `branch` — Branch, von dem der Workflow gestartet wurde
- `displayTitle` — sichtbarer Name der Ausführung

So kann man mit `--json` und `-q` die Ausgabe flexibel anpassen und genau die Informationen erhalten, die zur Überwachung von GitHub Actions direkt aus dem Terminal benötigt werden.

### Filtern nach Status

Es ist möglich, nur die Workflows anzuzeigen, die derzeit ausgeführt werden:
```bash
gh run list --status in_progress
```

Ebenso kann man nur die wartenden in der Warteschlange sehen:
```bash
gh run list --status queued
```


## Anzeigen der Details einer bestimmten Ausführung

Jede Ausführung hat eine eigene `id`. Diese kann aus der Ausgabe des Befehls `gh run list` entnommen werden.
Um zu sehen, wie eine bestimmte GitHub Action ausgeführt wurde:
```bash
gh run view --job=59722592906
```

In der Konsole werden alle Schritte des Workflows angezeigt.
Für detaillierte Logs jedes Schrittes kann der Schalter `--log` verwendet werden:
```bash
gh run view --log --job=59722592906
```


## Überwachung der Ausführung eines bestimmten Workflows in Echtzeit

Um die Ausführung von GitHub Action in Echtzeit zu verfolgen, kannst du den Befehl verwenden:
```bash
gh run watch $(gh run list -L 1 --json databaseId -q ".[0].databaseId")
```

![[Pasted image 20260107205817.png | 700]]

Dieser Befehl:
- nimmt den zuletzt gestarteten Workflow
- verbindet sich damit
- zeigt den Fortschritt und die Logs in Echtzeit an

## Automatisierung der Überwachung von Github Action

Das Problem ist, dass GitHub CLI nicht in Echtzeit streamt. Es funktioniert über Polling – das heißt, es zeigt den aktuellen Status zum Zeitpunkt der Anfrage an.
`gh run watch` fragt die GitHub API einfach in bestimmten Intervallen ab und aktualisiert die Ausgabe. Dies sind keine Push-Benachrichtigungen, sondern eine regelmäßige Statusüberprüfung.
Dieser Befehl ist nützlich, wenn wir einen bestimmten gestarteten Workflow überwachen. Wenn wir jedoch den Status von 5 oder 10 Workflows, die gestartet, in Bearbeitung oder in Warteschlange sind, überwachen müssen, eignet sich dieser Befehl nicht gut für unsere Zwecke. Dafür können wir das Tool `watch` verwenden, das es ermöglicht, jeden Befehl alle N Sekunden auszuführen und die Ausgabe im Terminal zu aktualisieren.

## Verwendung des Tools watch zur automatischen Aktualisierung der Liste von GitHub Actions

`watch` ist ein Tool, das es ermöglicht, einen Befehl alle N Sekunden auszuführen und die Ausgabe im Terminal zu aktualisieren.
Auf macOS kann es ebenfalls über Homebrew installiert werden:
```bash
brew install watch
```
Danach kannst du zum Beispiel Folgendes starten:
`watch -n 5 'gh run list -L 5'`

![[Pasted image 20260108200130.png | 900]]

**Dieser Befehl:**
- führt alle 5 Sekunden `gh run list -L 5` aus
- zeigt die 5 letzten Ausführungen von GitHub Action im Terminal an
- aktualisiert automatisch den Bildschirm

Der Schalter `-L 5` bedeutet, dass uns die 5 letzten Workflows interessieren.
Dadurch erhalten wir automatische Aktualisierungen der Liste von GitHub Actions direkt im Terminal.

## Zusammenfassung

**Mit GitHub CLI und den integrierten Konsolenwerkzeugen ist es möglich:**
- die Liste der Ausführungen von GitHub Actions anzuzeigen
- nach Status zu filtern
- die Logs zu überprüfen
- die Ausführung in Echtzeit zu verfolgen
- die automatische Überwachung über `watch` zu organisieren
    
**Das ermöglicht eine viel schnellere und bequemere Arbeit mit CI, ohne ständig im Browser wechseln zu müssen.**