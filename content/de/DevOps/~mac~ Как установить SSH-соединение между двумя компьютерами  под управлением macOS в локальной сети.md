---
create: 2025-07-07
idnote: TTwecsUoEd
vault: dev
title: So stellen Sie eine SSH-Verbindung zwischen zwei macOS-Computern im lokalen Netzwerk her
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

Manchmal ist es praktisch, einen anderen Computer im lokalen Netzwerk zu steuern — Befehle auszuführen, Projekte zu aktualisieren, auf Dateien zuzugreifen. Besonders wenn beide Geräte mit macOS betrieben werden. Glücklicherweise ist ein SSH-Server bereits in macOS integriert, sodass Sie ganz einfach eine sichere Netzwerkverbindung einrichten können.

In diesem Artikel zeige ich Ihnen, wie Sie sich über SSH von einem macOS-Computer mit einem anderen verbinden und wie Sie dies mit SSH-Schlüsseln tun können.

## Wozu braucht man das?

SSH (Secure Shell) ermöglicht es Ihnen, sich mit einem anderen Gerät im Netzwerk zu verbinden und es über das Terminal zu steuern. Das kann hilfreich sein:

- für die Arbeit an Projekten, die auf einem anderen Gerät gehostet sind;
- für die Automatisierung von Aufgaben;
- für den Zugriff auf einen Mac mini, der als Server verwendet wird;
- oder einfach nur, um nicht vom Sofa aufstehen zu müssen.

## Was wird benötigt?

- Zwei Computer mit macOS, die sich im selben lokalen Netzwerk (über Wi-Fi oder Ethernet) befinden;
- Zugriff auf das Terminal auf beiden Geräten;
- Benutzername und Passwort auf dem Zielcomputer.

---

## Schritt 1: SSH auf dem Remote-Computer mit macOS aktivieren

Auf dem Computer, zu dem Sie eine Verbindung herstellen möchten:
1. Öffnen Sie **Systemeinstellungen** → **Sharing**;
2. Aktivieren Sie die Option **Remote Login**.

Jetzt wird dieser Computer auf eingehende SSH-Verbindungen hören.

---

## Schritt 2: Ermitteln der IP-Adresse des Remote-Computers

Öffnen Sie das Terminal auf dem Zielcomputer und führen Sie aus:

```bash
ifconfig | grep inet
```

Suchen Sie nach einer Adresse im Format `192.168.x.x` — das ist seine lokale IP. Zum Beispiel: `192.168.1.42`.
Alternative: Gehen Sie zu **Systemeinstellungen** → **Wi-Fi** → klicken Sie auf Ihr Netzwerk → dort finden Sie die IP-Adresse.

## Schritt 3: Mit SSH verbinden

Jetzt kehren Sie zu Ihrem Hauptcomputer zurück und geben im Terminal Folgendes ein:

```bash
ssh benutzername@192.168.1.42
```

Ersetzen Sie `benutzername` durch den Benutzernamen auf dem Remote-Computer und die IP durch die, die Sie im vorherigen Schritt ermittelt haben.

Bei der ersten Verbindung sehen Sie eine Bestätigungsnachricht. Geben Sie `yes` ein und dann das Passwort.
Herzlichen Glückwunsch! Sie sind im Terminal eines anderen Computers.

## Einrichtung einer passwortlosen Verbindung mit SSH

Um nicht jedes Mal ein Passwort eingeben zu müssen, können Sie SSH-Schlüssel einrichten.

### Schritt 1: Schlüssel auf Ihrem Computer erstellen

```bash
ssh-keygen -t ed25519
```

Drücken Sie Enter, um den Schlüssel im Standardordner zu speichern. Wenn gewünscht, legen Sie ein Passwort fest (oder lassen es leer).

Es wird ein Paar von SSH-Schlüsseln erstellt:
1. ~/.ssh/id_ed25519 — privater Schlüssel (nur für Sie, nicht weitergeben)
2. ~/.ssh/id_ed25519.pub — öffentlicher Schlüssel (dieser wird auf den zweiten Mac kopiert)

Nachdem Sie die Schlüssel generiert haben, müssen Sie den öffentlichen Schlüssel auf den zweiten Mac kopieren.
### Schritt 2: Schlüssel auf den Remote-Computer kopieren

```
ssh-copy-id benutzername@192.168.1.42
```

Jetzt müssen Sie beim nächsten Verbindungsversuch kein Passwort mehr eingeben — die Authentifizierung erfolgt mit Hilfe des SSH-Schlüssels.

## Fazit

Jetzt wissen Sie, wie man über SSH eine Verbindung zu einem anderen macOS-Computer im lokalen Netzwerk herstellt. Dies ist ein einfaches, aber mächtiges Werkzeug, das Ihnen eine Menge Zeit spart, besonders wenn Sie mit mehreren Geräten arbeiten.

Wenn Sie häufig zwischen Computern wechseln oder macOS als Heimserver nutzen — wird SSH Ihr bester Freund sein.

Wenn Ihnen der Artikel hilfreich war — teilen Sie ihn mit Freunden oder speichern Sie ihn in Ihren Lesezeichen.


> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> 
> ## Null-Links
> ----
> [[00 mac]]