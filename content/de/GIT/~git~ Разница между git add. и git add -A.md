---
create: 2025-04-24
idnote: vi8qp6xIYs
vault: dev
title: Unterschied zwischen "git add ." und "git add -A"
title_en: Difference between "git add" . and "git add -A"
path:
tags:
  - git
  - git_add
status:
rating:
symlink:
symlinkchapter: GIT
published: 2025-04-24
Language: de
---
![[Pasted image 20221104172417.png]]

## `git add .`

- Fügt **nur die Änderungen im aktuellen Verzeichnis und darunter** hinzu.
- **Erfasst keine Dateien höher in der Hierarchie**, wenn du dich in einem Unterordner befindest.
- **Verfolgt keine entfernten Dateien** über dem Level, auf dem der Befehl aufgerufen wurde.

```bash
cd src/utils
git add .
```
**Fügt nur Änderungen in `src/utils/` und dessen Unterordnern hinzu.**

## `git add -A`

- Fügt **alle Änderungen im gesamten Repository** hinzu: neue, geänderte, gelöschte Dateien.
- Funktioniert **unabhängig davon, in welchem Ordner du dich befindest**.

```bash
cd src/utils 
git add -A
```
**Fügt Änderungen im gesamten Projekt hinzu, einschließlich gelöschter Dateien.**

#### **Zusammenfassung**
Die Befehle `git add -A` und `git add .` tun im Grunde dasselbe, indem sie neue, gelöschte und geänderte Dateien indizieren, aber der Unterschied liegt im Verantwortungsbereich. Der Befehl `git add .` funktioniert nur innerhalb des aktuellen Verzeichnisses und seiner Unterordner, während der Befehl `git add -A` das gesamte Repository abdeckt.