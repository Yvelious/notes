---
create: 2025-07-07
idnote: TTwecsUoEd
vault: dev
title: Wie man eine SSH-Verbindung zwischen zwei Macs im lokalen Netzwerk einrichtet
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

Manchmal ist es praktisch, einen anderen Computer im lokalen Netzwerk zu verwalten — Befehle auszuführen, Projekte zu aktualisieren, auf Dateien zuzugreifen. Besonders wenn beide Geräte macOS betreiben. Zum Glück ist in macOS bereits ein SSH-Server integriert, sodass Sie eine sichere Netzwerkverbindung einfach einrichten können.

In diesem Artikel werde ich zeigen, wie man sich von einem Mac zu einem anderen Mac per SSH verbindet und wie man dies mit SSH-Schlüsseln macht.

## Warum ist das notwendig?

SSH (Secure Shell) ermöglicht es Ihnen, sich mit einem anderen Gerät im Netzwerk zu verbinden und es über das Terminal zu steuern. Dies kann nützlich sein:

- um an Projekten zu arbeiten, die auf einem anderen Gerät gehostet sind;
- zur Automatisierung von Aufgaben;
- um auf einen Mac mini zuzugreifen, der als Server verwendet wird;
- oder einfach, um nicht vom Sofa aufstehen zu müssen.

## Was wird benötigt

- Zwei Macs mit macOS, die sich im selben lokalen Netzwerk befinden (über WLAN oder Ethernet);
- Zugang zum Terminal auf beiden Geräten;
- Benutzername und Passwort des Zielcomputers.

---

## Schritt 1: SSH auf dem entfernten Mac aktivieren

Auf dem Computer, mit dem Sie sich verbinden möchten:
1. Öffnen Sie die **Systemeinstellungen** → **Freigaben**;
2. Aktivieren Sie die Option **Fernauswahl** (`Remote Login`).

Jetzt wird dieser Computer eingehende SSH-Verbindungen annehmen.

---

## Schritt 2: Die IP-Adresse des entfernten Macs herausfinden

Öffnen Sie das Terminal auf dem Zielcomputer und führen Sie aus:

```bash
ifconfig | grep inet
```

Suchen Sie nach einer Adresse im Format `192.168.x.x` — das ist seine lokale IP. Zum Beispiel: `192.168.1.42`.
Alternativ: Gehen Sie zu **Systemeinstellungen** → **WLAN** → klicken Sie auf Ihr Netzwerk → und dort wird die IP-Adresse angezeigt.

## Schritt 3: Per SSH verbinden

Jetzt gehen Sie zurück zu Ihrem Hauptcomputer und geben Sie im Terminal Folgendes ein:

```bash
ssh benutzername@192.168.1.42
```

Ersetzen Sie `benutzername` durch den Benutzernamen auf dem Zielcomputer und die IP durch die, die Sie im vorherigen Schritt herausgefunden haben.

Bei der ersten Verbindung sehen Sie eine Bestätigungsnachricht. Geben Sie `yes` ein und anschließend das Passwort.
Herzlichen Glückwunsch! Sie sind im Terminal des anderen Computers.

## Verbindung ohne Passwort mit SSH einrichten

Um nicht jedes Mal das Passwort eingeben zu müssen, können Sie SSH-Schlüssel einrichten.

### Schritt 1: Schlüssel auf Ihrem Computer erstellen

```bash
ssh-keygen -t ed25519
```

Drücken Sie Enter, um den Schlüssel im Standardverzeichnis zu speichern. Sie können ein Passwort angeben (oder das Feld leer lassen).

Es wird ein Paar von SSH-Schlüsseln erstellt:
1. ~/.ssh/id_ed25519 — privater Schlüssel (nur für Sie, nicht weitergeben)
2. ~/.ssh/id_ed25519.pub — öffentlicher Schlüssel (dieser wird auf den zweiten Mac kopiert)

Nachdem Sie die Schlüssel generiert haben, müssen Sie den öffentlichen Schlüssel auf den zweiten Mac kopieren.
### Schritt 2: Schlüssel auf den entfernten Computer kopieren

```
ssh-copy-id benutzername@192.168.1.42
```

Jetzt müssen Sie bei der nächsten Verbindung kein Passwort mehr eingeben — die Authentifizierung erfolgt über den SSH-Schlüssel.

## Fazit

Jetzt können Sie sich per SSH mit einem anderen Mac im lokalen Netzwerk verbinden. Dies ist ein einfaches, aber leistungsstarkes Werkzeug, das Ihnen viel Zeit sparen wird, insbesondere wenn Sie mit mehreren Geräten arbeiten.

Wenn Sie häufig zwischen Computern wechseln oder macOS als Heimserver verwenden — SSH wird Ihr bester Freund sein.

Wenn der Artikel hilfreich war — teilen Sie ihn mit Freunden oder speichern Sie ihn als Lesezeichen.