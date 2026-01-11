---
aliases:
  - .gitignore
tags:
  - git
  - gitignore
idnote: 1234
symlink:
symlinkchapter: GIT
title: Konfiguration der Dateiausblendung in Git
published: 2025-04-05
create: 2025-04-05
Language: de
---

![[git-ignore-diagram.webp]]
##  Mehrstufiges System zur Dateiausblendung in Git

Die Ausblendung von Dateien in einem Repository kann auf mehreren Ebenen konfiguriert werden, von denen jede ihre eigenen Besonderheiten hat:

1. **Globale Ebene**: Ausblendung von Dateien für alle Repositories auf dem Computer. Dies wird in der Konfigurationsdatei festgelegt, die für alle Repositories des Benutzers gilt.
    
2. **Repository-Ebene**: Ausblendung von Dateien für ein bestimmtes Repository, die für alle Benutzer, die an diesem Projekt arbeiten, gilt. Die Einstellungen werden in der Datei `.gitignore` gespeichert, die im Stammverzeichnis des Repositories vorhanden ist.
    
3. **Benutzerebene**: Ausblendung von Dateien nur für einen bestimmten Benutzer und dessen Arbeitsverzeichnis im Repository. Diese Einstellungen werden über die Datei `.git/info/exclude` vorgenommen, die nicht in die Versionskontrolle aufgenommen wird und nur lokal für diesen Benutzer verfügbar ist.
    

Ein solches mehrstufiges System ermöglicht eine flexible Verwaltung von Dateiausnahmen aus der Versionskontrolle, je nach den eigenen Bedürfnissen.

### Konfiguration von gitignore auf globaler Ebene

Es ist notwendig, eine Datei `.gitignore` zu erstellen, wie wir sie in jedem Repository erstellen. Normalerweise wird sie im Home-Verzeichnis erstellt, kann aber überall auf dem Computer angelegt werden.

Nach der Erstellung der Datei muss Git mitgeteilt werden, wo sich die globale gitignore befindet:
```
git config --global core.excludesfile <pfad_zur_datei>/.gitignore
```

### Einstellungen von gitignore auf Repository-Ebene

Die Datei `.gitignore` ist eine Regel für alle Teilnehmer des Projekts, die der Git-Software mitteilt, welche Dateien im Repository ignoriert werden sollen. Diese Einstellungen gelten für alle Benutzer, die mit diesem Repository arbeiten.

Das ist genau die `.gitignore`, die sich im Stammverzeichnis des Repositories befindet. Hier sollten hauptsächlich nur Dinge abgelegt werden, die unmittelbar mit dem Projekt und seiner Architektur zu tun haben. Zum Beispiel haben alle Projektbeteiligten ein Verzeichnis mit lokalen Daten oder Passwörtern, oder an einem bestimmten Ort werden temporäre Dateien erstellt. Wenn diese Regeln für alle Projektteilnehmer gelten, sollten die Ausblendungsregeln in der `.gitignore` platziert werden, die zusammen mit dem Repository verteilt wird.

Früher dachte ich, dass jeder seine eigene **.gitignore** haben sollte und dass diese nicht committiert werden sollte, aber es stellt sich heraus, dass sie es tun sollte, damit alle Projektteilnehmer dieselben Dateien und Ordner ignorieren.

### Konfiguration von gitignore auf Benutzerebene

Dieser Ansatz ermöglicht es dem Benutzer, Dateien und Verzeichnisse in Git **ausschließlich für seine lokale Arbeitskopie des Repositories** auszublenden. Dies ist nützlich, wenn temporäre Dateien, die von diesem Benutzer generiert werden (z.B. Editor-Dateien, lokale Builds, Logs usw.), nicht indiziert werden sollen, ohne die Einstellungen anderer Projektteilnehmer zu betreffen.

Die Hauptvorteile der Verwendung von `.git/info/exclude`:

1. **Lokalität**: Diese Datei wirkt nur im aktuellen Repository auf dem lokalen Computer und wird nicht an andere Benutzer weitergegeben.
2. **Isolation**: Die Ausblendeeinstellungen bleiben privat und beeinflussen nicht die Zusammenarbeit im Repository.

Dieser Ansatz eignet sich für Benutzer, die ihre lokalen Einstellungen beibehalten möchten, ohne die allgemeinen Vereinbarungen des Teams zu stören.

## Beispiele für das Schreiben von Regeln und Ausnahmen in der gitignore-Datei

Die Regeln in `.gitignore` können einfach oder komplex sein, was eine präzise Konfiguration des Verhaltens von Git ermöglicht.

Hier sind Beispiele für verschiedene Ignorierungsregeln in Git und deren Erklärung:
```bash
# Kommentar — diese Zeile wird ignoriert

# Keine Verarbeitung von Dateien, deren Namen auf .a enden
*.a

# ABER die Datei lib.a soll nachverfolgt werden, obwohl wir alle .a-Dateien mit der vorherigen Regel ignorieren
!lib.a

# Nur die Datei TODO im Stammverzeichnis ignorieren, nicht die Dateien mit demselben Namen in Unterverzeichnissen wie z.B. subdir/TODO
/TODO
# Alle Dateien im Verzeichnis build/ ignorieren
build/
# doc/notes.txt ignorieren, aber nicht doc/server/arch.txt
doc/*.txt
# Alle .txt-Dateien im Verzeichnis doc/ und seinen Unterverzeichnissen ignorieren
doc/**/*.txt
```

In der Datei `.gitignore` müssen relative Pfade angegeben werden. Diese Pfade sind **relativ zum Stammverzeichnis Ihres Repositories** (dem Verzeichnis, in dem sich der Ordner `.git` befindet).

Ignorieren Sie eine Datei oder einen Ordner im Stammverzeichnis:
```
secret.txt 
/build/
```
Dies ignoriert die Datei `secret.txt` und den Ordner `build`, die sich im Stammverzeichnis des Repositories befinden.

## Was tun, wenn Dateien nach dem Hinzufügen zur gitignore weiterhin verfolgt werden

Wenn Sie einen Ordner in `.gitignore` hinzugefügt haben, `git status` jedoch immer noch Änderungen an Dateien in diesem Ordner anzeigt, liegt das daran, dass Git diese Dateien bereits verfolgt (d.h. sie wurden zum Repository hinzugefügt, bevor Sie sie in `.gitignore` aufgenommen haben).

Git wird die Dateien nicht automatisch aufhören zu verfolgen, wenn sie bereits hinzugefügt wurden. Um dies zu beheben, sind einige Schritte erforderlich:

#### 1. Beenden Sie die Verfolgung von Dateien, die bereits im Repository vorhanden sind
Verwenden Sie den Befehl `git rm` mit dem Flag `--cached`, um die Dateien aus dem Index zu entfernen (d.h. ihre Verfolgung zu beenden), ohne sie physisch von der Festplatte zu löschen:

```
git rm -r --cached name_des_ordners/
```

Dieser Befehl entfernt alle Dateien des angegebenen Ordners aus dem Index (der Index ist der Bereich, in dem Git Informationen darüber speichert, welche Dateien verfolgt werden). Die Dateien bleiben auf der Festplatte, aber Git wird aufhören, sie zu verfolgen.

#### 2. Committen Sie die Änderungen

Nachdem Sie die Verfolgung der Dateien beendet haben, müssen Sie die Änderungen committen:

```
git commit -m "Verfolgung des Ordners beendet"
```

Jetzt wird Git die Dateien in diesem Ordner nicht mehr verfolgen und `.gitignore` wird korrekt für diesen Ordner funktionieren.

## Temporäres Ignorieren von Änderungen an einer Datei

In Git gibt es einen Befehl, der es ermöglicht, **Änderungen an einer bereits verfolgten Datei vorübergehend zu ignorieren**.

Wenn Sie diesen Befehl für eine bestimmte Datei verwenden, wird Git "annehmen", dass diese Datei unverändert bleibt, und sie nicht in der Liste der geänderten Dateien anzeigen, wenn Sie den Befehl `git status` ausführen, selbst wenn lokale Änderungen an der Datei vorgenommen wurden.

==Dies ist nützlich, wenn Sie eine Datei nur für lokale Arbeiten ändern möchten, ohne die Hauptversion der Datei im Repository zu beeinträchtigen==

Um Änderungen an einer Datei vorübergehend zu ignorieren, können Sie den Befehl verwenden:
```
git update-index --assume-unchanged <datei>
```

Deaktiviert wird dies mit dem Befehl:
```
git update-index --no-assume-unchanged <datei>
```

## Nützliche Befehle im Zusammenhang mit der Ausblendung von Dateien im Repository 

Anzeigen, was sich in der Datei **.gitignore** auf Repository-Ebene befindet:
```
git status --ignored
```