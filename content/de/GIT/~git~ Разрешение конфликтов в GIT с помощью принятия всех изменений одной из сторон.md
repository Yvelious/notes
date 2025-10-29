---
tags:
  - git
idnote: sd99melc
cards: Ja
symlink:
symlinkchapter: GIT
title: Konfliktlösungen in GIT durch Annahme aller Änderungen einer Seite
published: 2025-03-21
create: 2025-03-21
Language: de
---

Wenn zum Beispiel ein Konflikt zwischen zwei Dateien auftritt und es keinen Sinn macht, den Konflikt Zeile für Zeile manuell zu lösen, kann man die Änderungen einer Seite vollständig akzeptieren. Dazu werden die folgenden Befehle verwendet:

Änderungen von der anderen Seite akzeptieren
```bash
git checkout --theirs .
git add .
```

Änderungen von der eigenen Seite akzeptieren
```bash
git checkout --ours .
git add .
```

**N.B.**
Der Punkt (`.`) am Ende des Befehls bedeutet, dass die Operation auf alle konfliktbehafteten Dateien angewendet wird. Wenn der Befehl nur auf eine bestimmte Datei angewendet werden soll, geben Sie anstelle des Punktes den Pfad zu dieser Datei an.

## Zero-Links
------
[[00 GIT]]