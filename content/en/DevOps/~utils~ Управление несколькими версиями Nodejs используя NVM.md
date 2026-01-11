---
create: 2025-09-23
idnote: sdZQ2eEyix
vault: dev
title: Using NVM for Installing and Switching Between Different NodeJS Versions
titleEn: Managing Multiple NodeJS Versions with NVM
path:
tags:
  - utils
  - nvm
  - node
status:
rating:
symlink:
symlinkchapter: DevOps
published: 2025-09-23
Language: en
---

![[Pasted image 20250923212028.png]]

This utility allows you to easily switch between different versions of Node.js. You can install and use different versions of Node for different projects.

## Installing nvm
----

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

After installation, you need to restart the terminal or run the command:

- `source ~/.bashrc` if you are using bash
- `source ~/.zshrc` if you are using zsh

## nvm Commands for Work

```bash
nvm install --lts   # the latest LTS version
nvm install node    # the latest stable version
nvm use node        # use the latest
nvm use 18          # use version 18
nvm ls-remote       # list available versions
```