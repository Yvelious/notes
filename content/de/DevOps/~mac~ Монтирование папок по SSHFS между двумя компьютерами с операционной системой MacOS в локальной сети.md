---
create: 2025-07-08
idnote: E8Avw7gJbx
vault: dev
title: Ordner über SSHFS zwischen zwei Computern mit macOS im lokalen Netzwerk einbinden
path:
tags:
  - macos
  - sshfs
status:
rating:
published: 2025-07-08
symlink:
symlinkchapter: DevOps
Language: de
---

![[Pasted image 20250708133544.png]]

Wenn Sie zwei Computer mit **macOS** haben, können Sie einen Ordner von einem Mac auf den anderen mit **SSHFS** verbinden. Dadurch können Sie mit entfernten Dateien so arbeiten, als ob sie sich auf Ihrer lokalen Festplatte befinden – praktisch für die Entwicklung und Verteilung von Aufgaben zwischen mehreren Maschinen, Daten Austausch und Backup.

Unsere Strategie: Der erste Mac (lokal) verbindet sich über SSH mit dem entfernten Ordner auf dem zweiten Mac und bindet ihn in ein lokales Verzeichnis ein.

![[Pasted image 20250708133015.png | 700]]

## Installation von SSHFS auf dem ersten Computer (von dem aus der Zugriff erfolgt)

Öffnen Sie das Terminal und führen Sie die folgenden Befehle aus:
```bash
brew install macfuse 
brew tap gromgit/fuse 
brew install gromgit/fuse/sshfs-mac
```
Diese Befehle installieren die erforderlichen Komponenten: `macFUSE` und das eigentliche `sshfs-mac`.

## Aktivierung des SSH-Zugangs auf dem zweiten Computer (mit dem wir uns verbinden)
- Gehen Sie zu `Systemeinstellungen → Freigaben`
- Aktivieren Sie **Remote-Zugang**
- Stellen Sie sicher, dass Ihr Hauptbenutzer über SSH-Zugriff hat

```bash
ssh your_login_second_pc@your_ip_second_pc
```

Wenn die Verbindung hergestellt wird, ist alles bereit.


## Vorbereitung der Ordner

**Auf dem zweiten Mac** (entfernt):
Erstellen Sie den Ordner, den Sie freigeben möchten:
```bash
mkdir ~/remote-folder
```

**Auf dem ersten Mac** (lokal):
Erstellen Sie den Ordner, in den der entfernte Ordner montiert werden soll:
```bash
mkdir ~/remote
```

---

## Montage des Ordners über SSHFS auf dem ersten Computer
Nun kann der entfernte Ordner auf dem ersten Mac gemountet werden. Führen Sie im Terminal den folgenden Befehl aus:

```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

Dieser Befehl bindet den entfernten Ordner `remote-project` von einem anderen Mac in den lokalen Ordner `~/remote` auf dem ersten Computer über `sshfs`.
Verwendete Optionen in dem Befehl:

| Option                 | Zweck                                                                                                                                                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_other`         | Erlaubt den Zugriff auf den gemounteten Ordner **nicht nur für den Benutzer, der die Einbindung durchgeführt hat**, sondern auch für andere Benutzer des Systems. Dies ist wichtig, wenn Sie möchten, dass IDEs (VS Code, WebStorm) den Inhalt sehen können. ⚠️ Benötigt eine Erlaubnis in `/etc/fuse.conf`. |
| `default_permissions` | Verwendet die standardmäßige Unix-Zugriffsprüfung (Besitzer, Gruppen, chmod) und nicht nur SSH. Dies hilft, Probleme zu vermeiden, bei denen Dateien sichtbar sind, aber nicht geöffnet werden können.                                                                                           |
| `reconnect`           | Stellt automatisch die Verbindung wieder her, wenn die SSH-Verbindung vorübergehend unterbrochen wird (z. B. bei Verlust einer WLAN-Verbindung). Sehr nützlich, wenn die Verbindung instabil ist.                                                                                             |


Standardmäßig funktioniert die Option `allow_other` möglicherweise nicht, bis die Erlaubnis in der Konfigurationsdatei `fuse.conf` hinzugefügt wird. Dies hängt mit den Sicherheitsrichtlinien von macOS zusammen, die den Zugriff auf gemountete Dateisysteme einschränken.

1. Öffnen Sie das Terminal und erstellen Sie die Datei fuse.conf:
```bash
sudo nano /etc/fuse.conf
```

2. Fügen Sie die Zeile hinzu:
```bash
user_allow_other
```

3. Speichern Sie die Datei und führen Sie den Montagebefehl erneut aus
```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

## Wie man den Ordner aushängt

Um den Ordner auszuhängen, führen Sie aus:
```bash
umount ~/Volumes/SSD/test-remote
```

Wenn Sie einen Fehler `Resource busy` erhalten, versuchen Sie:
```bash
umount -f ~/Volumes/SSD/test-remote
```

N.B.
Wenn Sie sich nicht an den Namen des gemounteten Ordners erinnern, können Sie die Liste der gemounteten Dateisysteme mit dem Befehl anzeigen:
```bash
mount
```

> [!raw-hidden]-
> ## Automatisierung des Montageprozesses
> 
> **N.B. Es hat bei mir auf den Macs nicht funktioniert, wie ich es versucht habe, ein Netzlaufwerk mit autofs zu erstellen. Aber die Konfiguration innerhalb von fstab für den Aufruf von sshfs funktioniert nicht.**
> 
> Damit Sie nach jedem Neustart des Mac nicht manuell den Montagebefehl ausführen müssen, können Sie `fstab` und `autofs` verwenden.
> 
> ### `fstab` — dies ist die Konfigurationsdatei
> - Befindet sich im Pfad: `/etc/fstab`
> - Beschreibt, **was und wohin montiert werden soll**, und mit welchen Parametern
> - Wird vom System zum automatischen Mounten verwendet
> 
> **N.B.**
> Wenn diese Datei nicht vorhanden ist, können Sie sie manuell erstellen.
> 
> ### `autofs` — dies ist ein Systemdienst (Daemon)
> - Überwacht `fstab` (und andere Quellen)
> - **Montiert automatisch Dateisysteme, wenn sie aufgerufen werden**
> - Wird in macOS bei der ersten Verwendung des Ordners (z.B. `cd ~/remote`) gestartet
> 
> ### Wie sie zusammenarbeiten
> 
> 1. Sie geben in `/etc/fstab` an, was Sie ``sshfs`` montieren möchten. 
> 2. `autofs` überwacht den in `fstab` angegebenen Pfad.
> 3. Wenn Sie diesen Ordner öffnen — montiert `autofs` alles automatisch.
> 
> #### Beispiel für einen Eintrag in `fstab`
> ```bash
> sshfs#your_username_second_pc@your_ip_second_pc:~/remote-project ~/remote fuse allow_other,default_permissions,reconnect 0 0
> 
> ```
> 
> Wenn es ganz kurz zusammengefasst werden soll:
> > 🔹 `fstab` — was zu montieren ist und wie  
> > 🔹 `autofs` — montiert beim Zugriff auf den Ordner
> 
> **N.B.** 
> Der Daemon `autofs` montiert Ordner **nur beim ersten Zugriff** auf den Ordner. Das bedeutet, dass der Ordner nicht montiert wird, wenn Sie nur den Eintrag in `fstab` hinzufügen, aber nicht auf den Ordner zugreifen (d.h. nicht hinein wechseln). Zum Beispiel wird der Ordner nicht montiert, wenn wir die Konfiguration in `fstab` hinzugefügt haben, aber noch nicht auf den Ordner zugegriffen haben (über das Terminal oder den Finder).
> 
> ### Anwendung der Konfigurationsänderungen in `fstab`
> Damit der Daemon `autofs` die Konfiguration in `fstab` erkennt, müssen Sie einmal den Befehl `sudo automount -vc` ausführen.
> Diesen Befehl müssen Sie nur einmal ausführen, wenn wir die Konfiguration in `fstab` erstellt oder geändert haben.
> 
> Der Daemon `autofs` liest die Konfigurationsdatei `fstab` **nur beim Start oder beim Aufruf von `automount`.** Ohne den Befehl `automount -vc` müsste der Mac **neu gestartet werden**, damit `autofs` die Änderungen in `fstab` erkennt. Der Befehl `sudo automount -vc` ist eine Möglichkeit, **`autofs` sanft neu zu starten** und sofort Änderungen aus der Konfigurationsdatei `fstab` anzuwenden, ohne den Computer neu zu starten.
> 
> **Was die Argumente des Befehls `automount -vc` bedeuten:**
> 
> |Argument|Wert|
> |---|---|
> |`-v`|verbose – zeigt an, was der Befehl tut (Debugging)|
> |`-c`|cache reset – setzt den Cache der automatisch gemounteten Punkte zurück|
> **N.B.** 
> Der Befehl `automount -vc` ist nicht zwingend erforderlich, hilft jedoch, die Änderungen in der `fstab`-Konfiguration **ohne Neustart des Systems** anzuwenden.
> 
> ### Überprüfung der Aktivität von `autofs`
> 
> Der Daemon **`automountd` läuft standardmäßig** immer in macOS als Systemdienst. Wenn wir jedoch sicherstellen möchten, dass er läuft, können wir einen Befehl ausführen, der zeigt, dass er aktiv ist und Anfragen zum Mounten bearbeitet.
> 
> Im Terminal führen Sie den Befehl aus
> ```bash
> ps aux | grep automountd
> ```
> Wenn der Dienst funktioniert, sehen wir etwa folgende Zeile:
> ```bash
> root       123   0.0  0.1  2433984   8208     Ss    1:20PM   0:00.02 /usr/sbin/automountd
> ```
> Das bedeutet, dass `autofs` aktiv ist und Anfragen hört.


> [!raw-hidden]-
> ### ✨ Variante 2 — manuelles Mounten (nicht über fstab)
> 
> Wenn Sie vollständige Kontrolle und Zuverlässigkeit wünschen, **verwenden Sie nicht `fstab`**, sondern erstellen Sie Ihr eigenes Skript zum Mounten.
> 
> bash
> 
> CopyEdit
> 
> `#!/bin/bash MOUNTPOINT="/Volumes/SSD/test-remote" mkdir -p "$MOUNTPOINT" sshfs levy@192.168.178.54:/Volumes/SSD/mbp2011-test "$MOUNTPOINT" \   -o allow_other,default_permissions,reconnect,IdentityFile=/Users/levy/.ssh/mbp-2011/id_ed25519`
> 
> Fügen Sie es beim Systemstart hinzu (über LaunchAgent oder `cron @reboot`), und es wird stabiler funktionieren als `fstab`.


## Zusammenfassung
Die Verwendung von `sshfs` zwischen zwei Macs ist eine einfache Möglichkeit, den Dateizugriff zu organisieren, ohne eine Synchronisierung oder eine Netzlaufwerkseinrichtung vornehmen zu müssen. Besonders nützlich für Entwickler, die mit mehreren Maschinen im lokalen Netzwerk arbeiten. Mit `sshfs` können Sie mit dem entfernten Ordner arbeiten, als ob er sich auf Ihrem lokalen Computer befindet.

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> 
> ## Zero-links
> ----
> [[00 mac]]