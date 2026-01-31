---
create: 2025-09-23
idnote: sdZQ2eEyix
vault: dev
title: Verwenden von NVM zur Installation und zum Wechseln zwischen verschiedenen NodeJS-Versionen
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
Language: de
---

![[Pasted image 20250923212028.png]]

Dieses Tool ermöglicht es, einfach zwischen verschiedenen Versionen von Node.js zu wechseln. Man kann unterschiedliche Versionen von Node für verschiedene Projekte installieren und verwenden.

## Installation von nvm
----

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Nach der Installation muss das Terminal neu gestartet oder der Befehl ausgeführt werden:

- `source ~/.bashrc`, wenn Sie bash verwenden
- `source ~/.zshrc`, wenn Sie zsh verwenden


## NVM-Befehle zur Arbeit

```bash
nvm install --lts   # letzte LTS-Version
nvm install node    # letzte stabile Version
nvm use node        # die letzte verwenden
nvm use 18          # Version 18 verwenden
nvm ls-remote 	    # verfügbare Versionen anzeigen
```



> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> https://github.com/nvm-sh/nvm?tab=readme-ov-file
> 
> ## Zero-links
> ----
> [[00 UTILS]]