---
create: 2025-04-24
idnote: vi8qp6xIYs
vault: dev
title: Разница между git add. и git add -A
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
Language: ru
---
![[Pasted image 20221104172417.png]]

## `git add .`

- Adds **only changes in the current directory and below**.
- **Does not capture files higher in the hierarchy** if you are in a subfolder.
- **Does not track deleted files** above the level where the command is invoked.

```bash
cd src/utils
git add .
```
**Will only add changes in `src/utils/` and its subfolders.**

## `git add -A`

- Adds **all changes throughout the repository**: new files, modified, deleted.
- Works **regardless of which folder you are in**.

```bash
cd src/utils 
git add -A
```
**Will add changes across the entire project, including deleted files.**

#### **In summary**
The commands `git add -A` and `git add .` do the same thing, indexing new, deleted, and modified files, but the difference lies in the scope of responsibility. The command `git add .` operates only within the current directory and its nested folders, while the command `git add -A` covers the entire repository.