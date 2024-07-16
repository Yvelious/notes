---
tags:
  - git
  - ssh
  - config
symlink: 
symlinkchapter: SSH
---
[[FILES/345693b8d96773d3303704bd0aa73b1a_MD5.jpeg|Open: Pasted image 20240716230042.png]]
![[FILES/345693b8d96773d3303704bd0aa73b1a_MD5.jpeg]]


## Notes
----
Когда вы работаете с несколькими Git-репозиториями, доступ к которым осуществляется через разные аккаунты, важно правильно настроить SSH-ключи для каждого репозитория. В этом случае вы можете использовать конфигурационный файл, чтобы указать, какой ключ отвечает за конкретный репозиторий.


Путь где  нужно создать  конфигурационный файл для управления ssh-ключами 
`~/.ssh/config`


Пример конфигурационного файла:
```
Host my-website.dev
  HostName my-website.com 
  User my-user
  Port 2322
  IdentityFile ~/.ssh/id_rsa

Host my-website.com 
  HostName my-website.com 
  User my-user
  Port 2322
  IdentityFile ~/.ssh/id_rsa
  
Host github
    HostName github.com
    User someusername
    IdentityFile ~/.ssh/id_edsdsfsf
```

После нужно дать права данному файлу
```bash
chmod 600 ~/.ssh/config
```

В этом конфигурационном файле было решено две задачи:
1. Для каждого репозитория указаны параметры подключения, такие как имя пользователя, порт и путь к ключу.
2. Созданы алиасы, которые позволяют подключаться к хосту через SSH с использованием более коротких и удобных команд. 

Например, раньше, чтобы подключиться к дев-репозиторию, нужно было использовать команду `ssh user1@github:22`. Но после настройки конфигурационного файла и алиасов с преднастройками  упростить команду и просто ввести `ssh dev`.
## Flash-cards
-----

## Links
----------

## References
------------
https://phoenixnap.com/kb/ssh-config

## Zero-links
----
