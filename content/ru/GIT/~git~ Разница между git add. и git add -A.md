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

- Добавляет **только изменения в текущей директории и ниже**.
- **Не захватывает файлы выше по иерархии**, если ты находишься в подпапке.
- **Не отслеживает удалённые файлы** выше уровня, где вызвана команда.

```bash
cd src/utils
git add .
```
**Добавит только изменения в `src/utils/` и её подпапках.**

## `git add -A`

- Добавляет **все изменения по всему репозиторию**: новые файлы, изменённые, удалённые.
- Работает **независимо от того, в какой папке  ты находишься**.

```bash
cd src/utils 
git add -A
```
**Добавит изменения по всему проекту, включая удалённые файлы**

#### **Резюмирую**
Команды `git add -A` и `git add .` делают одно и тоже, индексируют новые, удаленные и измененные файлы, но различие в зоне ответсвенности. Команда `git add .` работает только в пределах текущей директории и вложенных папок, тогда как команда `git add -A` охватывает весь репозиторий.

> [!raw-hidden]-
> ### Long-form flags:
> 
> -   `git add -A` is equivalent to `git add --all`
> -   `git add -u` is equivalent to `git add --update`
> 
> 
> Both `git add .` and `git add -A` will stage all new, modified and deleted files in the newer versions of Git.
> 
> The difference is that `git add -A` stages files in "higher, current and subdirectories" that belong to your working Git repository. But doing a `git add .` only stages files in the current directory and subdirectories following it (*not* the files lying outside, i.e., higher directories).
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
> If your current working directory is `/my-repo`, and you do `rm rootfile.txt`, then `cd subfolder`, followed by `git add .`, then it will *not* stage the deleted file. But doing `git add -A` will certainly stage this change no matter where you perform the command from.
>


> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## References
> ------------
> 
> 
> ## Zero-links
> ----
> [[00 GIT]]