---
create: 2026-01-09
idnote: kAqzmvKP1O
vault: dev
title: So richten Sie eine sequenzielle Ausführung von Workflows in GitHub Actions ein
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

Bei der Arbeit mit GitHub Actions kommt es häufig vor, dass im Repository mehrere Workflows konfiguriert sind und es wichtig ist, dass sie in einer bestimmten Reihenfolge ausgeführt werden.

Beispielsweise:
- Zuerst muss `build` ausgeführt werden
- und erst nach dessen erfolgreichem Abschluss sollte `deploy` gestartet werden

Standardmäßig werden jedoch, wenn mehrere Workflows auf dasselbe Ereignis (z. B. `push` in den Branch `main`) reagieren, diese **parallel** gestartet. Dies kann zu Problemen führen, wenn der zweite Workflow von den Ergebnissen des ersten abhängt.

Lassen Sie uns ansehen, wie man die **sequenzielle Ausführung von Workflows in GitHub Actions** richtig einrichtet.

## Problem der parallelen Ausführung

**Angenommen, wir haben zwei Workflows:**
1
- `build.yml`
- `deploy.yml`

Beide sind auf das Ereignis `push` in den Branch `main` eingestellt:

```
on:
  push:
    branches: [ main ]

```

Bei jedem `git push` werden sie gleichzeitig ausgeführt.  
Wenn `deploy` von den Ergebnissen von `build` abhängt, kann dies zu Fehlern führen:

- Die Bereitstellung beginnt vor Abschluss des Builds
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

Dieser Workflow wird bei jedem Push in `main` ausgelöst und führt Aufgaben aus, z. B. den Build- und Testvorgang.

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

Dieser Workflow wird **nur nach Abschluss** des Workflows `Build` gestartet, und auch nur unter der Bedingung, dass `Build` erfolgreich abgeschlossen wurde.

## Wie das funktioniert

Jetzt sieht der Prozess folgendermaßen aus:

1. Führen Sie einen `git push` in den Branch `main` durch
2. Der Workflow `Build` wird gestartet
3. Nach seinem Abschluss wird `Deploy` automatisch von GitHub gestartet
4. Wenn `Build` mit einem Fehler abgeschlossen wurde, wird `Deploy` nicht gestartet

Auf diese Weise wird eine strikte Reihenfolge erreicht:

```
push → build → deploy
```

## Wann es sinnvoll ist, diesen Ansatz zu verwenden

Die sequenzielle Ausführung von Workflows ist nützlich, wenn:

- die Bereitstellung von dem Build abhängt
- Tests vor der Veröffentlichung abgeschlossen sein müssen
- es Datenbankmigrationen gibt
- mehrere Phasen im Pipeline verwendet werden

## Zusammenfassung

Wenn in einem Projekt mehrere GitHub Actions Workflows verwendet werden und zwischen ihnen eine logische Abhängigkeit besteht, sollten sie sequenziell ausgeführt werden. 
Der beste und offizielle Weg, dies zu tun, ist die Verwendung des Ereignisses `workflow_run`.

Dies ermöglicht:
- die Gewährleistung der Ausführungsreihenfolge
- den Schutz der Produktion vor fehlerhaften Bereitstellungen
- den Aufbau einer vollständigen CI/CD-Pipeline