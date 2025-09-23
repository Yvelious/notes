---
create: 2025-09-23
idnote: sdZQ2eEyix
vault: dev
title: Используем NVM для установки и переключения между разными версиям NodeJS
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
---

![[Pasted image 20250923212028.png]]

Данная утила позволяет легко переключаться между разными версиями Node.js. Можно устанавливать и использовать разные версии Node для разных проектов.

## Установка nvm
----

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

После установки надо перезагрузить терминал или выполнить команду:

- `source ~/.bashrc` если используете bash
- `source ~/.zshrc` если используете zsh


## Команды nvm для работы

```bash
nvm install --lts   # последняя LTS версия
nvm install node    # последняя стабильная
nvm use node        # использовать последнюю
nvm use 18          # использовать версию 18
nvm ls-remote 	    # посмотреть доступные версии
```



