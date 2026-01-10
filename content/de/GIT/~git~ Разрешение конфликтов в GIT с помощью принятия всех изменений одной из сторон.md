---
tags:
  - git
idnote: sd99melc
cards: Yes
symlink:
symlinkchapter: GIT
title: Konfliktlösung in GIT durch Annahme aller Änderungen einer Seite
published: 2025-03-21
create: 2025-03-21
Language: de
---

Wenn beispielsweise ein Konflikt zwischen zwei Dateien auftritt und es keinen Sinn macht, den Konflikt manuell zeilenweise zu lösen, kann man die Änderungen einer Seite vollständig annehmen. Dazu werden die folgenden Befehle verwendet:

Änderungen von der anderen Seite annehmen
```bash
git checkout --theirs .
git add .
```

Änderungen von der eigenen Seite annehmen
```bash
git checkout --ours .
git add .
```

**N.B.**
Der Punkt (`.`) am Ende des Befehls bedeutet, dass die Operation auf alle konfliktbehafteten Dateien angewendet wird. Wenn der Befehl auf eine bestimmte Datei angewendet werden soll, geben Sie anstelle des Punktes den Pfad zu dieser Datei an.

## Zero-links
------
[[00 GIT]]