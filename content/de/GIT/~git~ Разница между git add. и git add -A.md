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
- **Erfasst keine Dateien weiter oben in der Hierarchie**, wenn du dich in einem Unterordner befindest.
- **Überwacht keine entfernten Dateien** über dem Level, wo der Befehl aufgerufen wurde.

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
Die Befehle `git add -A` und `git add .` tun im Wesentlichen dasselbe, indem sie neue, gelöschte und geänderte Dateien indizieren, aber der Unterschied liegt im Verantwortungsbereich. Der Befehl `git add .` funktioniert nur im aktuellen Verzeichnis und in den darin enthaltenen Ordnern, während der Befehl `git add -A` das gesamte Repository abdeckt.

> [!raw-hidden]-
> ### Langform-Flags:
> 
> -   `git add -A` ist gleichbedeutend mit `git add --all`
> -   `git add -u` ist gleichbedeutend mit `git add --update`
> 
> Sowohl `git add .` als auch `git add -A` werden alle neuen, geänderten und gelöschten Dateien in neueren Versionen von Git zur Vorbereitung hinzufügen.
> 
> Der Unterschied ist, dass `git add -A` Dateien in "höheren, aktuellen und Unterverzeichnissen" indiziert, die zu deinem Arbeits-Git-Repository gehören. Aber `git add .` indiziert nur Dateien im aktuellen Verzeichnis und untergeordneten Verzeichnissen (*nicht* die Dateien außerhalb, d.h. in höheren Verzeichnissen).
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
> Wenn dein aktuelles Arbeitsverzeichnis `/my-repo` ist und du `rm rootfile.txt` machst, gefolgt von `cd subfolder` und dann `git add .`, wird die gelöschte Datei *nicht* zur Vorbereitung hinzugefügt. Aber `git add -A` wird diese Änderung auf jeden Fall zur Vorbereitung hinzufügen, egal von wo du den Befehl ausführst..
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