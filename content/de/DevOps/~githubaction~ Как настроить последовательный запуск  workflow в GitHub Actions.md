---
create: 2026-01-09
idnote: kAqzmvKP1O
vault: dev
title: So richten Sie die sequenzielle Ausführung von Workflows in GitHub Actions ein
path:
tags:
  - ci
  - git
  - githubaction
status:
rating:
Language: de
published: 2026-01-09
symlink:
symlinkchapter: DevOps
---
![[githubaction-sequential.png]]

Bei der Arbeit mit GitHub Actions tritt häufig die Situation auf, dass im Repository mehrere Workflows eingerichtet sind und es wichtig ist, dass sie in einer bestimmten Reihenfolge ausgeführt werden.

Zum Beispiel:
- Zuerst muss `build` ausgeführt werden
- und erst nach dessen erfolgreichem Abschluss sollte `deploy` gestartet werden

Standardmäßig werden jedoch, wenn mehrere Workflows auf dasselbe Ereignis (zum Beispiel `push` in den Branch `main`) reagieren, diese **parallel** ausgeführt. Dies kann zu Problemen führen, wenn der zweite Workflow von dem Ergebnis des ersten abhängt.

Lassen Sie uns ansehen, wie man die **sequenzielle Ausführung von Workflows in GitHub Actions** richtig einrichtet.

## Problem der parallelen Ausführung

Angenommen, wir haben zwei Workflows:

- `build.yml`
- `deploy.yml`

Beide sind auf das Ereignis `push` in den Branch `main` eingestellt:

```
on:
  push:
    branches: [ main ]
```

Bei jedem `git push` werden sie gleichzeitig gestartet.  
Wenn `deploy` von dem Ergebnis von `build` abhängt, kann dies zu Fehlern führen:

- Der Deployment-Prozess beginnt vor Abschluss des Builds
- Die Artefakte sind möglicherweise nicht bereit
- Tests könnten noch ausgeführt werden
- Die Umgebung könnte nicht bereit sein

Deshalb muss die Reihenfolge der Ausführung ausdrücklich festgelegt werden.

## Sequenzielle Ausführung über `workflow_run`

In GitHub Actions gibt es ein spezielles Ereignis `workflow_run`, das es ermöglicht, einen Workflow nach Abschluss eines anderen zu starten.

### Erster Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...
```

Dieser Workflow wird bei jedem Push in `main` gestartet und führt Jobs aus, wie zum Beispiel das Bauen und Testen.

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

Dieser Workflow wird **nur nach Abschluss** des Workflows `Build` gestartet. Zudem mit der Bedingung, dass `Build` erfolgreich abgeschlossen wurde.

## Wie das funktioniert

Jetzt sieht der Prozess so aus:

1. Wir führen `git push` in den Branch `main` aus
2. Der Workflow `Build` wird gestartet
3. Nach dessen Abschluss startet GitHub automatisch `Deploy`
4. Wenn `Build` mit einem Fehler endet, wird `Deploy` nicht gestartet

So wird eine strenge Reihenfolge erreicht:

```
push → build → deploy
```

## Wann sollte man diesen Ansatz verwenden

Die sequenzielle Ausführung von Workflows ist nützlich, wenn:

- das Deployment von dem Build abhängt
- Tests vor der Veröffentlichung abgeschlossen sein müssen
- Datenbankmigrationen erforderlich sind
- mehrere Stufen im Pipeline verwendet werden

## Zusammenfassung

Wenn in einem Projekt mehrere GitHub Actions Workflows verwendet werden und zwischen ihnen eine logische Abhängigkeit besteht, sollten sie sequenziell ausgeführt werden. 
Der beste und offizielle Weg, dies zu tun, ist die Verwendung des Ereignisses `workflow_run`.

Das ermöglicht:
- die Gewährleistung der Ausführungsreihenfolge
- den Schutz der Produktion vor fehlerhaften Deployments
- den Aufbau einer vollständigen CI/CD-Pipeline