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

Wenn beispielsweise ein Konflikt zwischen zwei Dateien auftritt und es keinen Sinn macht, den Konflikt manuell zeilenweise zu lösen, können die Änderungen einer Seite vollständig angenommen werden. Dazu werden die folgenden Befehle verwendet:

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
Der Punkt (`.`) am Ende des Befehls bedeutet, dass die Operation auf alle konflikterfüllenden Dateien angewendet wird. Wenn Sie den Befehl auf eine bestimmte Datei anwenden möchten, geben Sie anstelle des Punkts den Pfad zu dieser Datei an.

> [!raw-hidden]-
> Wenn Sie sich bereits im Konfliktzustand befinden und einfach _alle_ Änderungen von ihnen annehmen möchten:
> Wenn Sie das Gegenteil tun möchten:

> [!hidden-in-public]-
> ## Null-Links
> ------
> [[00 GIT]]