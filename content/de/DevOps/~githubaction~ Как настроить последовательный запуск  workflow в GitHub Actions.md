---
create: 2026-01-09
idnote: kAqzmvKP1O
vault: dev
title: So richten Sie einen sequenziellen Ablauf von Workflows in GitHub Actions ein
path:
tags:
  - ci
  - git
  - githubaction
  - devops
status:
rating:
Language: de
published: 2026-01-09
symlink:
symlinkchapter: DevOps
---
![[githubaction-sequential.png]]

Bei der Arbeit mit GitHub Actions kommt häufig die Situation vor, dass in einem Repository mehrere Workflows eingerichtet sind und es wichtig ist, dass sie in einer bestimmten Reihenfolge ausgeführt werden.

Zum Beispiel:
- zuerst muss `build` ausgeführt werden
- und erst nach dessen erfolgreichem Abschluss sollte `deploy` gestartet werden

Standardmäßig, wenn mehrere Workflows auf dasselbe Ereignis (z.B. `push` in den Branch `main`) hören, werden sie **parallel** gestartet. Das kann zu Problemen führen, wenn der zweite Workflow vom Ergebnis des ersten abhängt.

Lassen Sie uns ansehen, wie man den **sequenziellen Ablauf von Workflows in GitHub Actions** richtig einrichtet.

## Problem der parallelen Ausführung

**Angenommen, wir haben zwei Workflows:**
- `build.yml`
- `deploy.yml`

Beide sind auf das Ereignis `push` im Branch `main` konfiguriert:

```
on:
  push:
    branches: [ main ]

```

Bei jedem `git push` werden sie gleichzeitig gestartet.  
Wenn `deploy` vom Ergebnis `build` abhängt, kann dies zu Fehlern führen:

- Der Deploy beginnt, bevor der Build abgeschlossen ist
- Die Artefakte sind möglicherweise nicht bereit
- Tests könnten noch durchgeführt werden
- Die Umgebung könnte nicht bereit sein

Daher muss die Reihenfolge der Ausführung ausdrücklich festgelegt werden.

## Sequenzieller Ablauf über `workflow_run`

In GitHub Actions gibt es ein spezielles Ereignis `workflow_run`, das es ermöglicht, einen Workflow nach dem Abschluss eines anderen Workflow auszuführen.
### Erster Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...

```

Dieser Workflow wird bei jedem Push in `main` gestartet und führt Jobs aus, z.B. Build und Test.

### Zweiter Workflow — `deploy.yml`

```yaml
name: Deploy

on:
  workflow_run:
    workflows: ["Build"]
    types:
      - completed

jobs:
  deploy:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    ...
```

Dieser Workflow wird **nur nach Abschluss** des Workflows `Build` gestartet. Außerdem mit der Bedingung, dass `Build` erfolgreich abgeschlossen wurde.

## Wie es funktioniert

Jetzt sieht der Prozess so aus:

1. Wir führen `git push` in den Branch `main` aus
2. Der Workflow `Build` wird gestartet
3. Nach dessen Abschluss startet GitHub automatisch `Deploy`
4. Wenn `Build` mit einem Fehler endet, wird `Deploy` nicht gestartet

Somit wird eine strikte Reihenfolge erreicht:

```
push → build → deploy
```

## Wann man diesen Ansatz verwenden sollte

Der sequenzielle Ablauf von Workflows ist nützlich, wenn:

- der Deploy von der Build abhängt
- Tests vor der Veröffentlichung abgeschlossen sein müssen
- Datenbankmigrationen durchgeführt werden
- mehrere Phasen im Pipeline verwendet werden

## Zusammenfassend

Wenn in einem Projekt mehrere GitHub Actions Workflows verwendet werden und zwischen ihnen eine logische Abhängigkeit besteht, sollten sie nacheinander ausgeführt werden.
Der beste und offizielle Weg, dies zu tun, ist die Verwendung des Ereignisses `workflow_run`.

Das ermöglicht:
- die Gewährleistung der Ausführungsreihenfolge
- den Schutz der Produktionsumgebung vor fehlerhaften Deployments
- den Aufbau einer vollständigen CI/CD-Pipeline