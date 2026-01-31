---
tags:
  - git
idnote: sd99melc
cards: Yes
symlink:
symlinkchapter: GIT
title: Resolving Conflicts in GIT by Accepting All Changes from One Side
published: 2025-03-21
create: 2025-03-21
Language: en
---

When, for example, a conflict arises between two files, and there is no point in manually resolving the conflict line by line, you can fully accept the changes from one side. The following commands are used for this:

Accept changes from the other side
```bash
git checkout --theirs .
git add .
```

Accept changes from your side
```bash
git checkout --ours .
git add .
```

**N.B.**
The dot (`.`) at the end of the command means that the operation is applied to all conflicting files. If you need to apply the command to a specific file, specify the path to that file instead of the dot.

> [!raw-hidden]-
> If you're already in a conflicted state, and you want to just accept _all_ of theirs:
> If you want to do the opposite:

## Zero-links
------
[[00 GIT]]