---
tags:
  - git
  - ssh
  - config
symlink: 
symlinkchapter: SSH
idnote:
---


![[Pasted image 20240717125544.png]]


## Notes
----
Например, когда вы работаете с несколькими Git-репозиториями, доступ к которым осуществляется через разные акаунты, важно правильно настроить SSH-ключи для каждого репозитория. В этом случае вы можете использовать конфигурационный файл, чтобы указать, какой ключ отвечает за конкретный репозиторий.


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
1. Для каждого аккаунта указаны параметры подключения, такие как имя пользователя, порт и путь к ключу.
2. Созданы алиасы, которые позволяют подключаться к хосту через SSH с использованием более коротких и удобных команд. 

Например, раньше, чтобы подключиться через SSH к дев-репозиторию, нужно было использовать подобную команду `ssh user1@github:22`. Но после настройки конфигурационного файла  команда для подключения через SSH к определенном серверу можно упростить к примеру до такой`ssh dev`













## References
------------
1. https://phoenixnap.com/kb/ssh-config
2. https://linuxize.com/post/using-the-ssh-config-file/















 