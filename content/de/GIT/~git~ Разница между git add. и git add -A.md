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
- **Erfasst keine Dateien höher in der Hierarchie**, wenn du dich in einem Unterordner befindest.
- **Verfolgt keine entfernten Dateien** über die Ebene, von der der Befehl ausgeführt wird.

```bash
cd src/utils
git add .
```
**Fügt nur Änderungen in `src/utils/` und deren Unterordnern hinzu.**

## `git add -A`

- Fügt **alle Änderungen im gesamten Repository** hinzu: neue Dateien, geänderte, gelöschte.
- Funktioniert **unabhängig von dem Verzeichnis, in dem du dich befindest**.

```bash
cd src/utils 
git add -A
```
**Fügt Änderungen im gesamten Projekt hinzu, einschließlich gelöschter Dateien.**

#### **Zusammenfassung**
Die Befehle `git add -A` und `git add .` tun im Grunde dasselbe, nämlich das Indizieren von neuen, gelöschten und geänderten Dateien, aber der Unterschied liegt im Verantwortungsbereich. Der Befehl `git add .` funktioniert nur innerhalb des aktuellen Verzeichnisses und dessen Unterordnern, während der Befehl `git add -A` das gesamte Repository abdeckt.

> [!raw-hidden]-
> ### Long-form flags:
> 
> -   `git add -A` ist gleichwertig mit `git add --all`
> -   `git add -u` ist gleichwertig mit `git add --update`
> 
> Sowohl `git add .` als auch `git add -A` werden alle neuen, geänderten und gelöschten Dateien in den neueren Versionen von Git auf die Staging-Area setzen.
> 
> Der Unterschied besteht darin, dass `git add -A` Dateien in "höheren, aktuellen und Unterverzeichnissen", die zu deinem Arbeits-Git-Repository gehören, staggt. Aber mit `git add .` werden nur Dateien im aktuellen Verzeichnis und den darauffolgenden Unterverzeichnissen gestaggt (*nicht* die Dateien, die außerhalb liegen, d.h. in höheren Verzeichnissen).
> 
> Hier ist ein Beispiel:
> ```
>  /my-repo
>    .git/
>    subfolder/
>    nested-file.txt
>    rootfile.txt
>  ```
> 
> Wenn dein aktuelles Arbeitsverzeichnis `/my-repo` ist und du `rm rootfile.txt` machst, dann `cd subfolder` gehst und anschließend `git add .` ausführst, wird die gelöschte Datei *nicht* gestaggt. Aber mit `git add -A` wird diese Änderung auf jeden Fall gestaggt, egal wo du den Befehl ausführst.
>


> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> 
> ## Zero-links
> ----
> [[00 GIT]]