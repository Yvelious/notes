---
tags:
  - git
idnote: sd99melc
cards: Ja
symlink:
symlinkchapter: GIT
title: Auflösung von Konflikten in GIT durch Annahme aller Änderungen einer Seite
published: 2025-03-21
create: 2025-03-21
Language: de
---

Wenn zum Beispiel ein Konflikt zwischen zwei Dateien auftritt und es keinen Sinn macht, den Konflikt zeilenweise manuell zu lösen, kann man die Änderungen einer Seite vollständig übernehmen. Dazu werden die folgenden Befehle verwendet:

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
Der Punkt (`.`) am Ende des Befehls bedeutet, dass die Operation auf alle konfliktbehafteten Dateien angewendet wird. Wenn der Befehl auf eine bestimmte Datei angewendet werden soll, geben Sie anstelle des Punkts den Pfad zu dieser Datei an.

> [!raw-hidden]-
> Wenn Sie sich bereits im konfliktbeladenen Zustand befinden und einfach _alle_ von ihnen akzeptieren möchten:
> Wenn Sie das Gegenteil tun möchten:

## Zero-links
------
[[00 GIT]]