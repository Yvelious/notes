---
tags:
  - git
idnote: sd99melc
cards: Yes
symlink:
symlinkchapter: GIT
title: Behebung von Konflikten in GIT durch Annahme aller Änderungen einer Seite
published: 2025-03-21
create: 2025-03-21
Language: de
---

Wenn zum Beispiel ein Konflikt zwischen zwei Dateien auftritt und es keinen Sinn macht, den Konflikt manuell zeilenweise zu lösen, kann man die Änderungen einer der Parteien vollständig akzeptieren. Dazu werden die folgenden Befehle verwendet:

Änderungen der anderen Seite akzeptieren
```bash
git checkout --theirs .
git add .
```

Änderungen der eigenen Seite akzeptieren
```bash
git checkout --ours .
git add .
```

**N.B.**
Der Punkt (`.`) am Ende des Befehls bedeutet, dass die Operation auf alle konfliktbehafteten Dateien angewendet wird. Wenn Sie den Befehl auf eine bestimmte Datei anwenden möchten, geben Sie anstelle des Punkts den Pfad zu dieser Datei an.

## Zero-links
------
[[00 GIT]]