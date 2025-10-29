---
create: 2025-07-08
idnote: E8Avw7gJbx
vault: dev
title: Ordner über SSHFS zwischen zwei Computern mit MacOS im lokalen Netzwerk einbinden
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

Wenn Sie zwei Computer mit **macOS** haben, können Sie einen Ordner von einem Mac auf den anderen über **SSHFS** verbinden. Dies ermöglicht es Ihnen, mit entfernten Dateien so zu arbeiten, als wären sie auf Ihrer lokalen Festplatte — praktisch für die Entwicklung und Aufgabenverteilung zwischen mehreren Maschinen, Datenaustausch und Backup.

Unsere Strategie: Der erste Mac (lokal) verbindet sich per SSH mit einem freigegebenen Ordner auf dem zweiten Mac und bindet ihn in ein lokales Verzeichnis ein.

![[Pasted image 20250708133015.png | 700]]


## Installation von SSHFS auf dem ersten Computer (der, von dem aus zugegriffen wird)

Öffnen Sie das Terminal und führen Sie die folgenden Befehle aus:
```bash
brew install macfuse 
brew tap gromgit/fuse 
brew install gromgit/fuse/sshfs-mac
```
Diese Befehle installieren die notwendigen Komponenten: `macFUSE` und `sshfs-mac` selbst.

## Aktivierung des SSH-Zugangs auf dem zweiten Computer (der, zu dem wir uns verbinden)
- Gehen Sie zu `Systemeinstellungen → Freigaben`
- Aktivieren Sie **Remote-Login**
- Stellen Sie sicher, dass Ihr Hauptbenutzer Zugriff per SSH hat

```bash
ssh your_login_second_pc@your_ip_second_pc
```

Wenn die Verbindung hergestellt wird, ist alles bereit.


## Ordner vorbereiten

**Auf dem zweiten Mac** (entfernt):
Erstellen Sie den Ordner, den Sie freigeben möchten:
```bash
mkdir ~/remote-folder
```

**Auf dem ersten Mac** (lokal):
Erstellen Sie den Ordner, in den der entfernte Ordner eingebunden wird:
```bash
mkdir ~/remote
```

---

## Einbinden des Ordners über SSHFS auf dem ersten Computer
Jetzt können Sie den entfernten Ordner auf dem ersten Mac einbinden. Führen Sie im Terminal den folgenden Befehl aus:

```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

Dieser Befehl bindet den entfernten Ordner `remote-project` von einem anderen Mac im lokalen Ordner `~/remote` auf dem ersten Computer über `sshfs` ein.
Optionen, die im Befehl verwendet werden:

| Option                 | Zweck                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_other`         | Erlaubt den Zugriff auf den eingebundenen Ordner **nicht nur für den Benutzer, der die Einbindung durchgeführt hat**, sondern auch für andere Benutzer des Systems. Dies ist erforderlich, falls Sie möchten, dass IDEs (VS Code, WebStorm) den Inhalt sehen können. ⚠️ Erfordert Berechtigung in `/etc/fuse.conf`. |
| `default_permissions` | Verwendet die Standard-Zugriffsprüfung von Unix (Besitzer, Gruppen, chmod), und nicht nur SSH. Dies hilft, Probleme zu vermeiden, bei denen Dateien sichtbar sind, aber nicht geöffnet werden können.                                                                                                                             |
| `reconnect`           | Stellt automatisch die Verbindung wieder her, wenn die SSH-Verbindung vorübergehend unterbrochen wird (z.B. bei einem WLAN-Abbruch). Sehr nützlich, wenn die Verbindung instabil ist.                                                                                                                                            |


Standardmäßig funktioniert die Option `allow_other` möglicherweise nicht, bis die Berechtigung in der Konfigurationsdatei `fuse.conf` hinzugefügt wurde. Dies liegt an den Sicherheitsrichtlinien von macOS, die den Zugriff auf eingebundene Dateisysteme einschränken.

1. Öffnen Sie das Terminal und erstellen Sie die Datei fuse.conf:
```bash
sudo nano /etc/fuse.conf
```

2. Fügen Sie die Zeile hinzu:
```bash
user_allow_other
```

3. Speichern Sie die Datei und führen Sie den Einbindungsbefehl erneut aus:
```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

## Wie man den Ordner aushängt

Um den Ordner auszuhängen, führen Sie aus:
```bash
umount ~/Volumes/SSD/test-remote
```

Wenn Sie die Fehlermeldung `Resource busy` erhalten, versuchen Sie:
```bash
umount -f ~/Volumes/SSD/test-remote
```

N.B.
Wenn Sie sich nicht an den Namen des eingebundenen Ordners erinnern, können Sie die Liste der eingebundenen Dateisysteme mit dem Befehl anzeigen:
```bash
mount
```



## Zusammenfassung
Die Verwendung von `sshfs` zwischen zwei Macs ist eine einfache Möglichkeit, den Zugriff auf Dateien zu organisieren, ohne eine Synchronisierung oder die Einrichtung eines Netzwerkordners durchführen zu müssen. Besonders praktisch für Entwickler, die mit mehreren Maschinen im lokalen Netzwerk arbeiten. Mit `sshfs` können Sie mit einem entfernten Ordner arbeiten, als ob er sich auf Ihrem lokalen Computer befindet.