---
create: 2025-07-07
idnote: TTwecsUoEd
vault: dev
title: So stellen Sie eine SSH-Verbindung zwischen zwei Computern mit macOS im lokalen Netzwerk her
path:
tags:
  - macos
  - ssh
status: reading
rating:
symlink:
symlinkchapter: DevOps
published: 2025-07-07
Language: de
---
![[Pasted image 20250707211642.png]]

Manchmal ist es praktisch, einen anderen Computer im lokalen Netzwerk zu steuern – Befehle auszuführen, Projekte zu aktualisieren und auf Dateien zuzugreifen. Besonders wenn beide Geräte unter macOS arbeiten. Zum Glück ist in macOS bereits ein SSH-Server integriert, sodass Sie ganz einfach eine sichere Verbindung im Netzwerk einrichten können.

In diesem Artikel zeige ich Ihnen, wie Sie von einem Computer mit macOS zu einem anderen über SSH verbinden und wie Sie dies unter Verwendung von SSH-Schlüsseln tun.

## Warum ist das notwendig?

SSH (Secure Shell) ermöglicht es, eine Verbindung zu einem anderen Gerät im Netzwerk herzustellen und es über das Terminal zu steuern. Das kann nützlich sein:

- um an Projekten zu arbeiten, die auf einem anderen Gerät gehostet sind;
- um Aufgaben zu automatisieren;
- um auf einen Mac mini zuzugreifen, der als Server verwendet wird;
- oder einfach nur, um nicht vom Sofa aufzustehen.

## Was wird benötigt

- Zwei Computer mit macOS, die sich im selben lokalen Netzwerk befinden (über Wi-Fi oder Ethernet);
- Zugriff auf das Terminal auf beiden Geräten;
- Benutzername und Passwort auf dem Zielcomputer.

---

## Schritt 1: SSH auf dem entfernten Computer mit macOS aktivieren

Auf dem Computer, zu dem Sie sich verbinden möchten:
1. Öffnen Sie **Systemeinstellungen** → **Freigaben**;
2. Aktivieren Sie die Option **Remote-Login**.

Jetzt wird dieser Computer eingehende SSH-Verbindungen akzeptieren.

---

## Schritt 2: IP-Adresse des entfernten Computers herausfinden

Öffnen Sie das Terminal auf dem Zielcomputer und führen Sie aus:

```bash
ifconfig | grep inet
```

Suchen Sie nach einer Adresse im Format `192.168.x.x` — das ist seine lokale IP. Zum Beispiel: `192.168.1.42`.
Alternativ: Gehen Sie zu **Systemeinstellungen** → **Wi-Fi** → klicken Sie auf Ihr Netzwerk → dort finden Sie die IP-Adresse.

## Schritt 3: SSH-Verbindung herstellen

Kehren Sie jetzt zu Ihrem Hauptcomputer zurück und geben Sie im Terminal Folgendes ein:

```bash
ssh benutzername@192.168.1.42
```

Ersetzen Sie `benutzername` durch den Kontonamen auf dem entfernten Computer und die IP durch die, die Sie im vorherigen Schritt herausgefunden haben.

Bei der ersten Verbindung sehen Sie eine Bestätigungsnachricht. Geben Sie `yes` ein und dann Ihr Passwort.
Herzlichen Glückwunsch! Sie sind im Terminal des anderen Computers.

## Einrichtung der Verbindung ohne Passwort mit SSH

Um nicht jedes Mal das Passwort eingeben zu müssen, können Sie SSH-Schlüssel einrichten.

### Schritt 1: Schlüssel auf Ihrem Computer erstellen

```bash
ssh-keygen -t ed25519
```

Drücken Sie Enter, um den Schlüssel im Standardverzeichnis zu speichern. Wenn gewünscht, setzen Sie ein Passwort (oder lassen Sie es leer).

Es wird ein Paar SSH-Schlüssel erstellt:
1. ~/.ssh/id_ed25519 — privater Schlüssel (nur für Sie, nicht weitergeben)
2. ~/.ssh/id_ed25519.pub — öffentlicher Schlüssel (der wird auf den zweiten Mac kopiert)

Nachdem Sie die Schlüssel erstellt haben, müssen Sie den öffentlichen Schlüssel auf den zweiten Mac kopieren.
### Schritt 2: Schlüssel auf den entfernten Computer kopieren

```
ssh-copy-id benutzername@192.168.1.42
```

Jetzt müssen Sie beim nächsten Verbinden Ihr Passwort nicht eingeben – die Authentifizierung erfolgt über den SSH-Schlüssel.

## Fazit

Jetzt wissen Sie, wie Sie sich über SSH mit einem anderen Computer mit macOS im lokalen Netzwerk verbinden können. Es ist ein einfaches, aber leistungsfähiges Werkzeug, das Ihnen viel Zeit sparen kann, insbesondere wenn Sie mit mehreren Geräten arbeiten.

Wenn Sie häufig zwischen Computern wechseln oder macOS als Heimserver verwenden – wird SSH Ihr bester Freund sein.

Wenn Ihnen der Artikel hilfreich war – teilen Sie ihn mit Freunden oder speichern Sie ihn als Lesezeichen!