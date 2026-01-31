---
create: 2026-01-09
idnote: kAqzmvKP1O
vault: dev
title: So konfigurieren Sie die sequenzielle Ausführung von Workflows in GitHub Actions
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

Bei der Arbeit mit GitHub Actions tritt häufig die Situation auf, dass in einem Repository mehrere Workflows eingerichtet sind, und es wichtig ist, dass diese in einer bestimmten Reihenfolge ausgeführt werden.

Zum Beispiel:
- Zuerst muss `build` ausgeführt werden
- und erst nach dessen erfolgreichem Abschluss sollte `deploy` gestartet werden

Standardmäßig werden jedoch, wenn mehrere Workflows auf dasselbe Ereignis (z. B. `push` in den Branch `main`) reagieren, diese **parallel** gestartet. Dies kann zu Problemen führen, wenn der zweite Workflow von den Ergebnissen des ersten abhängt.

Lassen Sie uns untersuchen, wie man die **sequenzielle Ausführung von Workflows in GitHub Actions** richtig konfiguriert.

## Problem der parallelen Ausführung

**Angenommen, wir haben zwei Workflows:**
- `build.yml`
- `deploy.yml`

Beide sind auf das Ereignis `push` im Branch `main` eingestellt:

```
on:
  push:
    branches: [ main ]

```

Bei jedem `git push` werden sie gleichzeitig gestartet.  
Wenn `deploy` von den Ergebnissen von `build` abhängt, kann dies zu Fehlern führen:

- Der Deploy-Vorgang beginnt vor Abschluss des Builds
- Artefakte sind möglicherweise nicht bereit
- Tests können noch ausgeführt werden
- Die Umgebung kann nicht bereit sein

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

Dieser Workflow wird bei jedem Push in `main` gestartet und führt Jobs aus, z. B. den Build und Tests.

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

## Wie es funktioniert

Jetzt sieht der Prozess folgendermaßen aus:

1. Wir führen `git push` in den Branch `main` aus
2. Der Workflow `Build` wird gestartet
3. Nach dessen Abschluss startet GitHub automatisch `Deploy`
4. Wenn `Build` mit einem Fehler abgeschlossen wurde, wird `Deploy` nicht gestartet

Somit wird eine strikte Reihenfolge erreicht:

```
push → build → deploy
```

## Wann man diesen Ansatz verwenden sollte

Die sequenzielle Ausführung von Workflows ist nützlich, wenn:

- der Deploy von der Build-Phase abhängt
- Tests vor der Veröffentlichung abgeschlossen sein müssen
- Datenbankmigrationen vorhanden sind
- mehrere Phasen im Pipeline verwendet werden

## Zusammenfassung

Wenn in einem Projekt mehrere GitHub Actions Workflows verwendet werden und zwischen ihnen logische Abhängigkeiten bestehen, müssen sie sequenziell ausgeführt werden. 
Der beste und offizielle Weg, dies zu tun, ist die Verwendung des Ereignis `workflow_run`.

Das ermöglicht:
- die Garantie für die Reihenfolge der Ausführung
- den Schutz der Produktionsumgebung vor fehlerhaften Deploys
- den Aufbau einer vollständigen CI/CD-Pipeline

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> 
> ## Null-Links
> ----
> [[00 GITHUBACTION]]