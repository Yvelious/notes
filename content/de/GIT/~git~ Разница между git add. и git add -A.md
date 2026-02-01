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
- **Erfasst keine Dateien über der Hierarchie**, wenn du dich in einem Unterordner befindest.
- **Verfolgt keine entfernten Dateien** oberhalb des Levels, an dem der Befehl ausgeführt wird.

```bash
cd src/utils
git add .
```
**Fügt nur Änderungen in `src/utils/` und deren Unterordnern hinzu.**

## `git add -A`

- Fügt **alle Änderungen im gesamten Repository** hinzu: neue Dateien, geänderte, gelöschte.
- Funktioniert **unabhängig davon, in welchem Ordner du dich befindest**.

```bash
cd src/utils 
git add -A
```
**Fügt Änderungen im gesamten Projekt hinzu, einschließlich gelöschter Dateien.**

#### **Zusammenfassung**
Die Befehle `git add -A` und `git add .` machen dasselbe, sie indizieren neue, gelöschte und geänderte Dateien, aber der Unterschied liegt im Verantwortungsbereich. Der Befehl `git add .` funktioniert nur innerhalb des aktuellen Verzeichnisses und darin enthaltenen Ordnern, während der Befehl `git add -A` das gesamte Repository abdeckt.

> [!raw-hidden]-
> ### Long-form flags:
> 
> -   `git add -A` entspricht `git add --all`
> -   `git add -u` entspricht `git add --update`
>
> Sowohl `git add .` als auch `git add -A` werden in neueren Versionen von Git alle neuen, geänderten und gelöschten Dateien zum Staging hinzufügen.
>
> Der Unterschied ist, dass `git add -A` Dateien in "höheren, aktuellen und Unterverzeichnissen" hinzufügt, die zu deinem Arbeits-Git-Repository gehören. Aber ein `git add .` fügt nur Dateien im aktuellen Verzeichnis und den nachfolgenden Unterverzeichnissen hinzu (*nicht* die Dateien, die außerhalb liegen, d.h. übergeordnete Verzeichnisse).
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
> Wenn dein aktuelles Arbeitsverzeichnis `/my-repo` ist und du `rm rootfile.txt` machst, dann `cd subfolder`, gefolgt von `git add .`, wird die gelöschte Datei *nicht* zum Staging hinzugefügt. Aber ein `git add -A` wird diese Änderung auf jeden Fall zum Staging hinzufügen, egal wo du den Befehl ausführst.
>

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> 
> ## Null-Links
> ----
> [[00 GIT]]