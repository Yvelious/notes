---
create: 2025-07-07
idnote: MC1vHrPou0
vault: dev
title: So verbinden Sie sich mit dem Bildschirm eines anderen Mac-Computers über VNC im lokalen Netzwerk
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

Wenn Sie zwei Macs haben und einen von ihnen von dem anderen aus steuern möchten, ohne auf Drittanbieteranwendungen zurückgreifen zu müssen, haben Sie bereits alles, was Sie brauchen. macOS verfügt über einen integrierten VNC-Server, der es Ihnen ermöglicht, den Bildschirm eines anderen Geräts über das Netzwerk zu sehen und zu steuern.

Dies ist besonders praktisch, wenn sich einer der Computer in einem anderen Raum befindet, an einen Fernseher angeschlossen ist oder als Heimserver (z.B. Mac mini) verwendet wird.

## Was ist VNC und wozu wird es benötigt?

**VNC (Virtual Network Computing)** ist ein Protokoll, das es ermöglicht, das Bild des Bildschirms eines Computers auf einen anderen zu übertragen und in Echtzeit mit ihm zu interagieren. Das bedeutet, dass Sie:

- sehen können, was auf dem entfernten Mac passiert;
- den Cursor und die Texteingabe steuern können;
- Programme starten und anhalten können;
- Dateien öffnen, das Terminal verwenden und vieles mehr.

## So richten Sie den Fernbildschirm zwischen zwei Macs ein

###  Schritt 1: Aktivieren Sie den Zugriff auf dem entfernten Computer

Dies ist der Mac, **dessen Bildschirm Sie sehen möchten**.

1. Öffnen Sie **Systemeinstellungen** → **Allgemein** → **Freigaben**
2. Aktivieren Sie die Option **Bildschirmfreigabe** (`Screen Sharing`)
3. Kopieren oder merken Sie sich den Namen des Computers und/oder seine IP-Adresse – diese werden im nächsten Schritt benötigt

Die IP-Adresse kann unter `Systemeinstellungen → Netzwerk` oder über das Terminal mit dem Befehl `ifconfig` ermittelt werden.

### Schritt 2: Stellen Sie eine Verbindung vom Hauptcomputer her

Dies ist der Mac, von dem aus Sie den anderen steuern werden.

1. Drücken Sie in jedem Finder-Fenster die Tastenkombination **⌘ + K**
2. Geben Sie im erscheinenden Fenster die Adresse im Format: `vnc://name_oder_IP_des_zweiten_Computers` ein
3. Klicken Sie auf **Verbinden**
4. Geben Sie den Benutzernamen und das Passwort des Benutzers des zweiten Macs ein

Stellen Sie sicher, dass Sie die Anmeldeinformationen eines Benutzers eingeben, der auf dem entfernten Computer Anmelderechte hat.

## Was passiert als Nächstes?

Nach der Verbindung sehen Sie **den Bildschirm des zweiten Computers in einem separaten Fenster**. Jetzt können Sie:

- den Cursor und die Tastatur steuern;
- Anwendungen starten;
- den Finder und das Terminal verwenden;
- jemandem aus der Ferne helfen oder einfach den zweiten Mac kontrollieren.

## Zusammenfassung

Die Fernsteuerung über VNC ist eine leistungsstarke und unterschätzte Funktion von macOS, die bereits integriert ist und „out of the box“ funktioniert. Sie müssen keine zusätzliche Software installieren oder für Drittanbieterlösungen bezahlen – alles, was Sie brauchen, ist bereits im System vorhanden.

Nutzen Sie diese Lösung, um:
- Heimserver zu verwalten,
- von einem anderen Raum auf Ihren Arbeitscomputer zuzugreifen.


> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> 
> 
> ## Null-Links
> ----
> [[00 mac]]