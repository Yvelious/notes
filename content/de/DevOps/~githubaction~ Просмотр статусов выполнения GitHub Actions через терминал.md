---
create: 2026-01-07
idnote: 3In99qSMv0
vault: dev
title: Anzeige des Status der GitHub Actions über das Terminal
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

Jedes Mal auf GitHub über die Weboberfläche zu gehen, um den Status der GitHub Actions zu verfolgen, ist nicht besonders praktisch — insbesondere wenn man häufig Pushes macht und sofort das CI-Ergebnis sehen möchte.

Es ist viel bequemer, den Verlauf der GitHub Actions direkt aus dem Terminal heraus zu überwachen, ohne den Browser zu öffnen. Glücklicherweise bietet GitHub ein offizielles Tool dafür — **GitHub CLI**.

In diesem Artikel werden wir besprechen, wie man den Status der GitHub Actions, die Protokolle und den Fortschritt der Ausführung direkt aus der Konsole heraus anzeigen kann.


## Installation von GitHub CLI

Zunächst muss GitHub CLI installiert werden.

Offizielle Webseite:  
[https://cli.github.com/](https://cli.github.com/)

Auf macOS ist es am bequemsten, es über Homebrew zu installieren:
```bash
brew install gh
```

Nach der Installation muss man sich in seinem GitHub-Konto anmelden:
```bash
gh auth login
```

Wählen Sie die Anmeldemethode aus:
- GitHub.com
- HTTPS
- Mit dem Browser anmelden

Nach erfolgreicher Authentifizierung hat das CLI Zugriff auf Ihre Repositories und GitHub Actions.


## Anzeige der Liste von GitHub Actions

Um die Liste aller Ausführungen von GitHub Actions im Repository anzuzeigen, wird der Befehl verwendet:
```bash
gh run list
```

![[Pasted image 20260108200706.png]]

Dieser Befehl zeigt die letzten Ausführungen mit Informationen über:
- Status (`queued`, `in_progress`, `completed`)
- Ergebnis (`success`, `failure`, `cancelled`)
- Workflow
- Branch
- usw.

## Filterung und Formatierung der Ausgabe

Standardmäßig gibt der Befehl `gh run list` die Liste der Ausführungen im standardmäßigen Tabellenformat aus.  
Oftmals möchte man jedoch nur die letzten Ausführungen und nur die benötigten Felder sehen.

### Ausgabe der letzten N Ausführungen

Wenn Sie beispielsweise die **5 letzten Ausführungen** ausgeben möchten, können Sie das Flag `-L` verwenden:

```bash
gh run list -L 5
```


### Ausgabe nur der benötigten Felder

GitHub CLI ermöglicht es, Daten im JSON-Format abzurufen und die Ausgabe mit Hilfe einer eingebauten JMESPath-Abfrage (`-q`) zu formatieren.

Um beispielsweise die **5 letzten Ausführungen** mit den Feldern:

- `databaseId`
- `status`
- `conclusion`
- `workflowName`

anzuzeigen, kann der folgende Befehl verwendet werden:

```bash
gh run list -L 5 \   --json databaseId,status,conclusion,workflowName \   -q '.[] | "\(.status) | \(.conclusion // "null") | \(.workflowName) | #\(.databaseId)"'
```

Das Ergebnis wird im Terminal in einer kompakten Liste im bequemen Format angezeigt:

```bash
in_progress | null    | build-and-test | #59722592906 
completed   | success | deploy         | #59722592810 
completed   | failure | lint           | #59722592744
```

### Verfügbare Felder zur Ausgabe

In `--json` können beliebige verfügbare Felder angegeben werden. Die nützlichsten sind:
- `databaseId` — eindeutige ID der Ausführung
- `status` — aktueller Status: `queued`, `in_progress`, `completed`
- `conclusion` — Ausführungsergebnis: `success`, `failure`, `cancelled` (nur wenn `completed`)
- `workflowName` — Name des Workflows
- `branch` — Branch, von dem der Workflow gestartet wurde
- `displayTitle` — angezeigter Name der Ausführung

So kann durch die Verwendung von `--json` und `-q` die Ausgabe flexibel angepasst werden, um genau die Informationen zu erhalten, die für die Überwachung von GitHub Actions direkt aus dem Terminal erforderlich sind.

### Filterung nach Status

Man kann nur die Workflows anzeigen, die derzeit ausgeführt werden:
```bash
gh run list --status in_progress
```

Ähnlich kann man nur die in der Warteschlange befindlichen anzeigen:
```bash
gh run list --status queued
```


## Anzeige der Details einer bestimmten Ausführung

Jede Ausführung hat ihre eigene `id`. Diese kann aus der Ausgabe des Befehls `gh run list` entnommen werden.
Um zu sehen, wie eine bestimmte GitHub Action ausgeführt wurde:
```bash
gh run view --job=59722592906
```

Im Terminal werden alle Schritte des Workflows angezeigt.
Zur Ansicht der detaillierten Protokolle jedes Schrittes kann das Flag `--log` verwendet werden:
```bash
gh run view --log --job=59722592906
```


## Anzeige der Ausführung eines bestimmten Workflows in Echtzeit

Um die Ausführung einer GitHub Action in Echtzeit zu verfolgen, kann der Befehl verwendet werden:
```bash
gh run watch $(gh run list -L 1 --json databaseId -q ".[0].databaseId")
```

![[Pasted image 20260107205817.png | 700]]

Dieser Befehl:
- holt sich den zuletzt gestarteten Workflow
- verbindet sich mit ihm
- zeigt den Fortschritt der Ausführung und die Protokolle in Echtzeit an

## Automatisierung der Überwachung von Github Actions

Das Problem ist, dass GitHub CLI die Ereignisse nicht in Echtzeit streamt. Es funktioniert über Polling — dh. es zeigt den aktuellen Status zum Zeitpunkt der Anfrage an.
`gh run watch` befragt einfach die GitHub API in bestimmten Intervallen und aktualisiert die Ausgabe. Dies sind keine Push-Benachrichtigungen, sondern eine regelmäßige Statusüberprüfung.
Dieser Befehl ist bequem, wenn wir einen bestimmten in einem Workflow laufenden Prozess überwachen. Wenn wir jedoch den Status von 5 oder 10 Workflows überwachen möchten, die gestartet, im Prozess sind oder in der Warteschlange stehen, ist dieser Befehl nicht besonders geeignet. Dafür können wir das Tool `watch` verwenden, das es ermöglicht, jeden Befehl alle N Sekunden auszuführen und die Ausgabe im Terminal zu aktualisieren.

## Verwendung des Tools watch für die automatische Aktualisierung der Liste von GitHub Actions

`watch` ist ein Tool, das es ermöglicht, einen Befehl alle N Sekunden auszuführen und die Ausgabe im Terminal zu aktualisieren.
Auf macOS kann es über Homebrew installiert werden:
```bash
brew install watch
```
Nach der Installation kann man beispielsweise Folgendes ausführen:
`watch -n 5 'gh run list -L 5'`

![[Pasted image 20260108200130.png | 900]]

**Dieser Befehl:**
- führt alle 5 Sekunden `gh run list -L 5` aus
- zeigt die 5 letzten Ausführungen der GitHub Actions im Terminal an
- aktualisiert den Bildschirm automatisch

Das Flag `-L 5` bedeutet, dass wir an den 5 letzten Workflows interessiert sind.
Somit erhalten wir eine automatisch aktualisierte Liste der GitHub Actions direkt im Terminal.

## Zusammenfassung

**Mit der Verwendung von GitHub CLI und den Standard-Terminal-Tools können Sie:**
- die Liste der Ausführungen von GitHub Actions anzeigen
- nach Status filtern
- Protokolle einsehen
- die Ausführung in Echtzeit verfolgen
- die automatische Überwachung über `watch` organisieren
    
**Dies ermöglicht eine viel schnellere und bequemere Arbeit mit CI, ohne ständig in den Browser wechseln zu müssen.**


> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> 
> ## Zero-links
> ----
> [[00 GITHUBACTION]]