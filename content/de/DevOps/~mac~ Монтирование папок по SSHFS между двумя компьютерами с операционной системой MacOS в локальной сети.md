---
create: 2025-07-08
idnote: E8Avw7gJbx
vault: dev
title: Mounting folders over SSHFS between two computers with MacOS in a local network
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

Wenn Sie zwei Computer mit **macOS** haben, können Sie einen Ordner von einem Mac auf den anderen über **SSHFS** verbinden. Dies ermöglicht es Ihnen, mit entfernten Dateien zu arbeiten, als wären sie auf Ihrer lokalen Festplatte — bequem für die Entwicklung und Verteilung von Aufgaben zwischen mehreren Maschinen, den Austausch von Daten und die Sicherung.

Unsere Strategie: Der erste Mac (lokal) verbindet sich über SSH mit dem entfernten Ordner auf dem zweiten Mac und montiert ihn in ein lokales Verzeichnis.

![[Pasted image 20250708133015.png | 700]]

## Installation von SSHFS auf dem ersten Computer (der, von dem aus der Zugriff erfolgt)

Öffnen Sie das Terminal und führen Sie die folgenden Befehle aus:
```bash
brew install macfuse 
brew tap gromgit/fuse 
brew install gromgit/fuse/sshfs-mac
```
Diese Befehle installieren die notwendigen Komponenten: `macFUSE` und das `sshfs-mac`.

## Aktivierung des SSH-Zugriffs auf dem zweiten Computer (an den wir uns verbinden)
- Gehen Sie zu `Systemeinstellungen → Freigaben`
- Aktivieren Sie **Remote-Login**
- Stellen Sie sicher, dass Ihr Hauptbenutzer SSH-Zugriff hat

```bash
ssh your_login_second_pc@your_ip_second_pc
```

Wenn die Verbindung hergestellt wird — alles ist bereit.


## Vorbereitung der Ordner

**Auf dem zweiten Mac** (entfernt):
Erstellen Sie den Ordner, den Sie freigeben möchten:
```bash
mkdir ~/remote-folder
```

**Auf dem ersten Mac** (lokal):
Erstellen Sie den Ordner, in den der entfernte gemountet wird:
```bash
mkdir ~/remote
```

---

## Mounten des Ordners über SSHFS auf dem ersten Computer
Jetzt können wir den entfernten Ordner auf dem ersten Mac mounten. Führen Sie im Terminal den folgenden Befehl aus:

```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

Dieser Befehl mountet den entfernten Ordner `remote-project` von einem anderen Mac in den lokalen Ordner `~/remote` auf dem ersten Computer über `sshfs`.
Die in dem Befehl verwendeten Optionen:

| Option                 | Bedeutung                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_other`         | Erlaubt den Zugriff auf den gemounteten Ordner **nicht nur für den Benutzer, der das Mounting durchgeführt hat**, sondern auch für andere Benutzer des Systems. Dies ist notwendig, beispielsweise wenn Sie möchten, dass IDEs (VS Code, WebStorm) den Inhalt sehen können. ⚠️ Erfordert Zustimmung in `/etc/fuse.conf`. |
| `default_permissions` | Verwendet die Standard-Zugriffskontrolle von Unix (Besitzer, Gruppen, chmod) und nicht nur SSH. Dies hilft, Probleme zu vermeiden, wenn Dateien zwar sichtbar sind, aber nicht geöffnet werden können.                                                                                                                             |
| `reconnect`           | Stellt automatisch die Verbindung wieder her, wenn die SSH-Verbindung vorübergehend unterbrochen wird (z. B. bei einem WLAN-Abbruch). Sehr nützlich, wenn die Verbindung instabil ist.                                                                                                                                            |


Standardmäßig funktioniert die Option `allow_other` möglicherweise nicht, bis die Berechtigung in der Konfigurationsdatei `fuse.conf` hinzugefügt wurde. Dies liegt an den Sicherheitsrichtlinien von macOS, die den Zugriff auf gemountete Dateisysteme einschränken.

1. Öffnen Sie das Terminal und erstellen Sie die Datei fuse.conf:
```bash
sudo nano /etc/fuse.conf
```

2. Fügen Sie die Zeile hinzu:
```bash
user_allow_other
```

3. Speichern Sie die Datei und führen Sie den Befehl zum Mounten erneut aus
```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

## Wie man den Ordner aushängt

Um den Ordner auszuhängen, führen Sie aus:
```bash
umount ~/Volumes/SSD/test-remote
```

Wenn Sie die Fehlermeldung `Resource busy` erhalten, versuchen Sie es mit:
```bash
umount -f ~/Volumes/SSD/test-remote
```

N.B.
Wenn Sie sich nicht an den Namen des gemounteten Ordners erinnern, können Sie die Liste der gemounteten Dateisysteme mit dem Befehl ansehen:
```bash
mount
```

## Zusammenfassung
Die Verwendung von `sshfs` zwischen zwei Mac ist eine einfache Möglichkeit, den gemeinsamen Zugriff auf Dateien zu organisieren, ohne synchronisieren oder ein Netzwerk-Volume einrichten zu müssen. Besonders praktisch für Entwickler, die mit mehreren Maschinen in einem lokalen Netzwerk arbeiten. Mit `sshfs` können Sie mit dem entfernten Ordner arbeiten, als ob er sich auf Ihrem lokalen Computer befindet.