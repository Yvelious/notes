---
create: 2025-04-24
idnote: vi8qp6xIYs
vault: dev
title: Difference between "git add" . and "git add -A"
path:
tags:
  - git
  - git_add
status:
rating:
symlink:
symlinkchapter: GIT
published: 2025-04-24
Language: en
---
![[Pasted image 20221104172417.png]]

## `git add .`

- Adds **only changes in the current directory and below**.
- **Does not capture files higher in the hierarchy** if you are in a subfolder.
- **Does not track deleted files** above the level where the command was called.

```bash
cd src/utils
git add .
```
**Will add only changes in `src/utils/` and its subfolders.**

## `git add -A`

- Adds **all changes across the entire repository**: new files, modified, deleted.
- Works **regardless of where you are located** in the directory structure.

```bash
cd src/utils 
git add -A
```
**Will add changes across the entire project, including deleted files.**

#### **In summary**
The commands `git add -A` and `git add .` do the same thing, indexing new, deleted, and modified files, but the difference lies in the scope. The command `git add .` only works within the current directory and nested folders, while the command `git add -A` covers the entire repository.

> [!raw-hidden]-
> ### Long-form flags:
> 
> -   `git add -A` is equivalent to `git add --all`
> -   `git add -u` is equivalent to `git add --update`
> 
> Both `git add .` and `git add -A` will stage all new, modified, and deleted files in the newer versions of Git.
> 
> The difference is that `git add -A` stages files in "higher, current, and subdirectories" that belong to your working Git repository. But doing a `git add .` only stages files in the current directory and subdirectories following it (*not* the files lying outside, i.e., higher directories).
> 
> Here's an example:
> ```
>  /my-repo
>    .git/
>    subfolder/
>    nested-file.txt
>    rootfile.txt
>  ```
> 
> If your current working directory is `/my-repo`, and you do `rm rootfile.txt`, then `cd subfolder`, followed by `git add .`, then it will *not* stage the deleted file. But doing `git add -A` will certainly stage this change no matter where you perform the command from..
>

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## References
> ------------
> 
> ## Zero-links
> ----
> [[00 GIT]]