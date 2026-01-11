---
create: 2025-07-07
idnote: MC1vHrPou0
vault: dev
title: Wie man sich über VNC mit dem Bildschirm eines anderen Computers unter macOS im lokalen Netzwerk verbindet
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

Wenn Sie zwei Computer mit macOS haben und einen von ihnen von dem anderen steuern möchten, ohne auf Drittanbieteranwendungen zurückgreifen zu müssen – dann haben Sie bereits alles, was Sie benötigen. macOS verfügt über einen integrierten VNC-Server, der es ermöglicht, den Bildschirm eines anderen Geräts über das Netzwerk fernzusehen und zu steuern.

Das ist besonders praktisch, wenn sich einer der Computer in einem anderen Raum befindet, mit einem Fernseher verbunden ist oder als Heimserver verwendet wird (zum Beispiel ein Mac mini).

## Was ist VNC und wofür ist es gut?

**VNC (Virtual Network Computing)** ist ein Protokoll, das es ermöglicht, das Bildschirmbild eines Computers auf einen anderen zu übertragen und in Echtzeit mit ihm zu interagieren. Das bedeutet, dass Sie:

- sehen können, was auf dem entfernten Mac passiert;
- den Cursor und die Tastatureingabe steuern können;
- Programme starten und stoppen können;
- Dateien öffnen, das Terminal nutzen und vieles mehr.

## So richten Sie den Remote-Bildschirm zwischen zwei Computern mit macOS ein

### Schritt 1: Zugriff auf dem Remote-Computer aktivieren

Das ist der Mac, **dessen Bildschirm Sie sehen möchten**.

1. Öffnen Sie **Systemeinstellungen** → **Allgemein** → **Freigabe**
2. Aktivieren Sie die Option **Bildschirmfreigabe** (`Screen Sharing`)
3. Kopieren oder merken Sie sich den Namen des Computers und/oder seine IP-Adresse – diese werden im nächsten Schritt benötigt

Die IP-Adresse kann in `Systemeinstellungen → Netzwerk` oder über das Terminal mit dem Befehl `ifconfig` ermittelt werden.

### Schritt 2: Verbinden Sie sich vom Hauptcomputer aus

Das ist der Mac, von dem aus Sie den anderen steuern werden.

1. Drücken Sie in einem beliebigen Finder-Fenster die Tastenkombination **⌘ + K**
2. Geben Sie im sich öffnenden Fenster die Adresse im Format ein: `vnc://name_oder_IP_des_zweiten_Computers`
3. Klicken Sie auf **Verbinden**
4. Geben Sie den Benutzernamen und das Passwort des zweiten Macs ein

Stellen Sie sicher, dass Sie die Anmeldedaten des Benutzers eingeben, der Zugriffsrechte auf dem Remote-Computer hat.

## Was passiert als Nächstes?

Nach der Verbindung sehen Sie **den Bildschirm des zweiten Computers in einem separaten Fenster**. Jetzt können Sie:

- den Cursor und die Tastatur steuern;
- Anwendungen starten;
- den Finder und das Terminal verwenden;
- jemandem aus der Ferne helfen oder einfach den zweiten Mac überwachen.

## Zusammenfassung

Die Fernsteuerung über VNC ist eine leistungsstarke und unterschätzte Funktion von macOS, die bereits integriert ist und „out of the box“ funktioniert. Sie müssen keine zusätzliche Software installieren oder für Drittanbieterlösungen bezahlen – alles, was Sie benötigen, ist bereits im System vorhanden.

Nutzen Sie diese Lösung, um:
- Heimserver zu verwalten,
- auf Ihren Arbeitscomputer aus einem anderen Raum zuzugreifen.