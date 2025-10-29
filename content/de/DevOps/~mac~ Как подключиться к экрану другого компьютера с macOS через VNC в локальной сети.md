---
create: 2025-07-07
idnote: MC1vHrPou0
vault: dev
title: So verbinden Sie sich mit dem Bildschirm eines anderen Computers, der unter macOS läuft, über VNC im lokalen Netzwerk
path:
tags:
  - macos
status:
rating:
symlink:
symlinkchapter: DevOps
published: 2025-05-20
Language: de
---
![[Pasted image 20250707223700.png]]

Wenn Sie zwei Computer mit macOS haben und einen von dem anderen aus steuern möchten, ohne auf Drittanbieter-Apps zurückgreifen zu müssen – dann haben Sie bereits alles Notwendige. macOS verfügt über einen integrierten VNC-Server, der es Ihnen ermöglicht, den Bildschirm eines anderen Geräts über das Netzwerk remote zu sehen und zu steuern.

Das ist besonders praktisch, wenn sich einer der Computer in einem anderen Raum befindet, an einen Fernseher angeschlossen ist oder als Heimserver verwendet wird (zum Beispiel ein Mac mini).

## Was ist VNC und wozu wird es benötigt?

**VNC (Virtual Network Computing)** ist ein Protokoll, das es ermöglicht, das Bild des Bildschirms eines Computers auf einen anderen zu übertragen und in Echtzeit damit zu interagieren. Das bedeutet, dass Sie:

- sehen können, was auf dem Remote-Mac passiert;
- den Cursor und die Tastatureingaben steuern können;
- Programme starten und stoppen können;
- Dateien öffnen, das Terminal verwenden und vieles mehr.

## So richten Sie einen Remote-Bildschirm zwischen zwei macOS-Computern ein

### Schritt 1: Aktivieren Sie den Zugriff auf dem Remote-Computer

Das ist der Mac, **dessen Bildschirm Sie sehen möchten**.

1. Öffnen Sie **Systemeinstellungen** → **Allgemein** → **Freigabe**
2. Aktivieren Sie die Option **Bildschirmfreigabe** (`Screen Sharing`)
3. Kopieren oder merken Sie sich den Namen des Computers und/oder die IP-Adresse – diese werden im nächsten Schritt benötigt.

Die IP-Adresse kann in `Systemeinstellungen → Netzwerk` oder über das Terminal mit dem Befehl `ifconfig` ermittelt werden.

### Schritt 2: Stellen Sie eine Verbindung vom Hauptcomputer her

Das ist der Mac, von dem aus Sie den anderen steuern werden.

1. Drücken Sie in einem beliebigen Finder-Fenster die Tastenkombination **⌘ + K**
2. Geben Sie im angezeigten Fenster die Adresse im Format ein: `vnc://name_oder_IP_des_zweiten_Computers`
3. Klicken Sie auf **Verbinden**
4. Geben Sie den Benutzernamen und das Passwort des Nutzers des zweiten Macs ein.

Stellen Sie sicher, dass Sie die Anmeldedaten eines Benutzers eingeben, der Berechtigungen zum Anmelden am Remote-Computer hat.

## Was passiert als Nächstes?

Nach der Verbindung sehen Sie **den Bildschirm des zweiten Computers in einem separaten Fenster**. Jetzt können Sie:

- den Cursor und die Tastatur steuern;
- Anwendungen starten;
- den Finder und das Terminal verwenden;
- remote jemandem helfen oder einfach den zweiten Mac kontrollieren.

## Zusammenfassend

Remote-Management über VNC ist eine leistungsstarke und unterschätzte Möglichkeit von macOS, die bereits integriert ist und „out of the box“ funktioniert. Sie müssen keine zusätzliche Software installieren oder für Drittanbieter-Lösungen bezahlen – alles, was Sie benötigen, ist bereits im System vorhanden.

Nutzen Sie diese Lösung, um:
- Heimserver zu administrieren,
- von einem anderen Raum aus auf Ihren Arbeitscomputer zuzugreifen.