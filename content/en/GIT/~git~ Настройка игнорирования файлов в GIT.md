---
aliases:
  - .gitignore
tags:
  - git
  - gitignore
idnote: 1234
symlink:
symlinkchapter: GIT
title: Configuring File Ignoring in Git
published: 2025-04-05
create: 2025-04-05
Language: en
---

![[git-ignore-diagram.webp]]
##  Multi-level File Ignoring System in Git

File ignoring in a repository can be configured at several levels, each with its own features:

1. **Global Level**: Ignoring files for all repositories on the computer. This is configured in a configuration file that applies to all the user's repositories. 

2. **Repository Level**: Ignoring files for a specific repository that affects all users working on that project. The settings are stored in the `.gitignore` file located in the root folder of the repository.

3. **User Level**: Ignoring files only for a specific user and their working directory in the repository. These settings are specified through the `.git/info/exclude` file, which is not included in version control and is only available locally to that user.

This multi-level system allows for flexible management of file exclusions from version control based on your needs.

### Setting Up gitignore at the Global Level

You need to create a `.gitignore` file just like you create in each repository. It is typically created in the home directory, but it can be located anywhere on your computer.

After creating the file, you need to inform Git where the global gitignore is located:
```
git config --global core.excludesfile <path_to_file>/.gitignore
```

### gitignore Settings at the Repository Level

The `.gitignore` file is a rule for all participants in the project, indicating to Git which files should be ignored in the repository. These settings apply to all users working with this repository.

This is the `.gitignore` file located in the root of the repository. It should primarily include items that are directly related to the project and its architecture. For example, if all project participants have a directory with local data or passwords, or temporary files are created in the same location, and these rules apply to everyone involved in the project—then it makes sense to place the ignoring rules in the `.gitignore`, which will be distributed along with the repository.

A long time ago, I thought that everyone had their own **.gitignore** and it shouldn’t be committed, but it turns out it should be, so that all project participants ignore the same files and folders.

### Setting Up gitignore at the User Level

This approach allows the user to ignore files and directories in Git **exclusively for their local working copy of the repository**. It is useful if a user needs to exclude temporary files generated specifically by them (for example, editor files, local builds, logs, etc.) without affecting the settings of other project participants.

The main advantages of using `.git/info/exclude`:

1. **Locality**: This file only acts in the current repository on the local machine and does not affect other users.
2. **Isolation**: Ignoring settings remain private and do not impact collaboration in the repository.

This approach is suitable for users who want to maintain their local settings without disrupting the team's common agreements.

## Examples of Writing Rules and Exceptions in the gitignore File

Rules in `.gitignore` can be both simple and complex, allowing precise configuration of Git's behavior.

Below are examples of various file ignoring rules in Git and their explanations:
```bash
# comment — this line is ignored

# do not track files whose names end with .a
*.a

# BUT track the file lib.a, even though we ignore all .a files with the previous rule
!lib.a

# ignore only the TODO file located in the root directory, does not apply to files with the same name in subdirectories like subdir/TODO
/TODO
# ignore all files in the build/ directory
build/
# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt
# ignore all .txt files in the doc/ directory and its subdirectories
doc/**/*.txt
```

In the `.gitignore` file, relative paths should be specified. These paths are specified **relative to the root directory of your repository** (the directory where the `.git` folder is located).

To ignore a file or folder in the root directory:
```
secret.txt 
/build/
```
This ignores the file `secret.txt` and the folder `build`, which are located at the root of the repository.

## What to Do If Files Continue to Be Tracked After Adding to gitignore

If you added a folder to `.gitignore`, but `git status` still shows changes in the files of that folder, it's because Git is already tracking those files (i.e., they were added to the repository before you included them in `.gitignore`).

Git will not automatically stop tracking files if they have already been added. To fix this, you need to follow a few steps:

#### 1. Stop Tracking Files That Are Already in the Repository
Use the `git rm` command with the `--cached` flag to remove files from the index (i.e., stop tracking them), without physically deleting them from the disk:

```
git rm -r --cached folder_name/
```

This command will remove all files from the specified folder from the index (the index is the area where Git stores information about which files are tracked). The files will remain on disk, but Git will stop tracking them.

#### 2. Commit the Changes

After stopping tracking of the files, you need to commit the changes:

```
git commit -m "Stopped tracking the folder"
```

Now Git will stop tracking files in this folder, and `.gitignore` will work correctly for this folder.

## Temporarily Ignore Changes in a File

In Git, there is a command that allows you to **temporarily stop tracking changes** in an already tracked file.

When you use this command for a specific file, Git will "assume" that this file remains unchanged and will not display it in the list of modified files when you run the `git status` command, even if local changes have been made to the file.

==This is useful when you need to modify a file only for local work without affecting the main version of the file in the repository==

You can temporarily ignore changes in a file with the command:
```
git update-index --assume-unchanged <file>
```

To disable it, use:
```
git update-index --no-assume-unchanged <file>
```

## Useful Commands Related to Ignoring Files in the Repository

To view what's in the **.gitignore** file at the repository level:
```
git status --ignored
```

> [!hidden-in-public]-
> ### Flash-cards
> -----
> 
> ### Links
> ----------
> 
> ### References
> ------------
> https://ru.hexlet.io/courses/git_base/lessons/git_gitignore/theory_unit
> https://sergeymukhin.com/blog/nastroyka-globalnogo-fayla-gitignore#
> https://medium.com/@yoga055/unlocking-gits-gitignore-the-gitignore-refresh-guide-0bbc51aa57be
> 
> ### Original
> ----------
> [[Ignoring Files in Git  Git Basics]]
> 
> ### Zero-links
> ----
> [[00 GIT]]