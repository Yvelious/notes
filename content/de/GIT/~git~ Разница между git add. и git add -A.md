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

- Fügt **nur Änderungen im aktuellen Verzeichnis und darunter** hinzu.
- **Erfasst keine Dateien höher in der Hierarchie**, wenn du dich in einem Unterverzeichnis befindest.
- **Verfolgt keine entfernten Dateien** über dem Niveau, wo der Befehl aufgerufen wurde.

```bash
cd src/utils
git add .
```
**Fügt nur Änderungen in `src/utils/` und ihren Unterverzeichnissen hinzu.**

## `git add -A`

- Fügt **alle Änderungen im gesamten Repository** hinzu: neue, geänderte und gelöschte Dateien.
- Funktioniert **unabhängig davon, in welchem Verzeichnis du dich befindest**.

```bash
cd src/utils 
git add -A
```
**Fügt Änderungen im gesamten Projekt hinzu, einschließlich gelöschter Dateien.**

#### **Zusammenfassung**
Die Befehle `git add -A` und `git add .` tun im Wesentlichen dasselbe, indem sie neue, gelöschte und geänderte Dateien indizieren, jedoch besteht der Unterschied im Verantwortungsbereich. Der Befehl `git add .` arbeitet nur innerhalb des aktuellen Verzeichnisses und der darin enthaltenen Unterverzeichnisse, während der Befehl `git add -A` das gesamte Repository abdeckt.