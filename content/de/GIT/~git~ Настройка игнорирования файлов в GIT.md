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

1. **Globale Ebene**: Ausblendung von Dateien für alle Repositories auf dem Computer. Dies wird in einer Konfigurationsdatei eingerichtet, die für alle Repositories des Benutzers gilt.
    
2. **Repository-Ebene**: Ausblendung von Dateien für ein bestimmtes Repository, die für alle Benutzer gilt, die an diesem Projekt arbeiten. Die Einstellungen werden in der Datei `.gitignore` gespeichert, die sich im Stammverzeichnis des Repositories befindet.
    
3. **Benutzer-Ebene**: Ausblendung von Dateien nur für einen bestimmten Benutzer und dessen Arbeitsverzeichnis im Repository. Diese Einstellungen werden über die Datei `.git/info/exclude` festgelegt, die nicht in die Versionskontrolle eingeschlossen wird und nur lokal für diesen Benutzer zugänglich ist.
    

Ein solches mehrstufiges System ermöglicht eine flexible Verwaltung von Dateiausnahmen aus der Versionskontrolle, abhängig von Ihren Bedürfnissen.

### Konfiguration von gitignore auf globaler Ebene

Sie müssen eine Datei `.gitignore` erstellen, die genauso ist wie die, die wir in jedem Repository erstellen. Normalerweise wird sie im Home-Verzeichnis erstellt, kann aber an jedem Ort auf dem Computer erstellt werden.

Nachdem Sie die Datei erstellt haben, müssen Sie dem Git-System mitteilen, wo sich der globale gitignore befindet.
```
git config --global core.excludesfile <pfad_zur_datei>/.gitignore
```

### Einstellungen für gitignore auf Repository-Ebene

Die Datei `.gitignore` ist eine Regel für alle Projektbeteiligten, die dem Git-System angibt, welche Dateien im Repository ignoriert werden sollen. Diese Einstellungen gelten für alle Benutzer, die mit diesem Repository arbeiten.

Dies ist genau das .gitignore, das sich im Stammverzeichnis des Repositories befindet. Darin sollten hauptsächlich nur Dinge platziert werden, die direkten Bezug zum Projekt und seiner Architektur haben. Zum Beispiel haben alle Projektbeteiligten ein Verzeichnis mit lokalen Daten oder Passwörtern, oder alle erstellen an derselben Stelle temporäre Dateien. Wenn diese Regeln für alle Projektbeteiligten relevant sind, sollten die Ignorierregeln in .gitignore platziert werden, die zusammen mit dem Repository verteilt wird.

Vor einiger Zeit dachte ich, jeder habe sein eigenes **.gitignore** und es sollte nicht committet werden, aber es stellt sich heraus, dass es das sollte, damit alle Projektbeteiligten die gleichen Dateien und Ordner ignorieren.

### Konfiguration von gitignore auf Benutzerebene

Dieser Ansatz ermöglicht es dem Benutzer, Dateien und Verzeichnisse in Git **ausschließlich für seine lokale Arbeitskopie des Repositories** auszublenden. Dies ist nützlich, wenn temporäre Dateien, die von diesem Benutzer persönlich generiert werden (zum Beispiel Dateien von Editoren, lokale Builds, Protokolle usw.), von der Indizierung ausgeschlossen werden sollen, ohne die Einstellungen anderer Projektbeteiligter zu beeinträchtigen.

Die Hauptvorteile der Verwendung von `.git/info/exclude`:

1. **Lokalität**: Diese Datei wirkt nur im aktuellen Repository auf dem lokalen Computer und wird nicht auf andere Benutzer übertragen.
2. **Isolation**: Die Einstellungen zur Ausblendung bleiben privat und beeinflussen die Zusammenarbeit im Repository nicht.

Dieser Ansatz eignet sich für Benutzer, die ihre lokalen Einstellungen beibehalten möchten, ohne die allgemeinen Vereinbarungen des Teams zu stören.

## Beispiele für das Schreiben von Regeln und Ausnahmen in der Datei gitignore

Regeln in `.gitignore` können einfach oder komplex sein, was eine genaue Anpassung des Verhaltens von Git ermöglicht.

Hier sind Beispiele für verschiedene Regeln zur Ausblendung von Dateien in Git und deren Erklärung:
```bash
# Kommentar — diese Zeile wird ignoriert

# keine Dateien verarbeiten, deren Name auf .a endet
*.a

# ABER die Datei lib.a verfolgen, obwohl wir alle .a-Dateien mit der vorherigen Regel ignorieren
!lib.a

# nur die Datei TODO im Stammverzeichnis ignorieren, betrifft nicht Dateien mit demselben Namen in Unterverzeichnissen wie z. B. subdir/TODO
/TODO
# alle Dateien im Verzeichnis build/ ignorieren
build/
# doc/notes.txt ignorieren, aber nicht doc/server/arch.txt
doc/*.txt
# alle .txt-Dateien im Verzeichnis doc/ und dessen Unterverzeichnissen ignorieren
doc/**/*.txt
```

In der Datei `.gitignore` sollten relative Pfade angegeben werden. Diese Pfade werden **relativ zum Stammverzeichnis Ihres Repositories** angegeben (dem Verzeichnis, in dem sich der Ordner `.git` befindet).

Eine Datei oder einen Ordner im Stammverzeichnis ignorieren:
```
secret.txt 
/build/
```
Das ignoriert die Datei `secret.txt` und den Ordner `build`, die sich im Stammverzeichnis des Repositories befinden.

## Was tun, wenn nach dem Hinzufügen zur gitignore Dateien weiterhin verfolgt werden

Wenn Sie einen Ordner in `.gitignore` hinzugefügt haben, `git status` jedoch weiterhin Änderungen an den Dateien dieses Ordners anzeigt, liegt das daran, dass Git diese Dateien bereits verfolgt (d. h. sie wurden zum Repository hinzugefügt, bevor Sie sie in `.gitignore` aufgenommen haben).

Git wird die Dateien nicht automatisch nicht mehr verfolgen, wenn sie bereits hinzugefügt wurden. Um dies zu beheben, müssen Sie mehrere Schritte unternehmen:

#### 1. Verfolgen Sie die bereits im Repository vorhandenen Dateien nicht mehr
Verwenden Sie den Befehl `git rm` mit dem Flag `--cached`, um Dateien aus dem Index zu entfernen (d. h. die Verfolgung dieser Dateien zu beenden), ohne sie physisch von der Festplatte zu löschen:

```
git rm -r --cached name_des_ordners/
```

Dieser Befehl entfernt alle Dateien aus dem angegebenen Ordner aus dem Index (der Index ist der Bereich, in dem Git Informationen darüber speichert, welche Dateien verfolgt werden). Die Dateien bleiben auf der Festplatte, aber Git wird sie nicht mehr verfolgen.

#### 2. Änderungen committen


Nachdem Sie die Verfolgung der Dateien gestoppt haben, müssen Sie die Änderungen committen:

```
git commit -m "Verfolgung des Ordners gestoppt"
```

Jetzt wird Git die Dateien in diesem Ordner nicht mehr verfolgen, und `.gitignore` beginnt korrekt für diesen Ordner zu arbeiten.

## Temporäres Ignorieren von Änderungen an einer Datei

In Git gibt es einen Befehl, der es ermöglicht, **das Verfolgen von Änderungen** an einer bereits verfolgten Datei vorübergehend zu stoppen.

Wenn Sie diesen Befehl für eine bestimmte Datei verwenden, wird Git "annehmen", dass diese Datei unverändert bleibt, und sie wird nicht in der Liste der geänderten Dateien angezeigt, wenn Sie den Befehl `git status` ausführen, auch wenn lokale Änderungen an der Datei vorgenommen wurden.

==Das ist nützlich, wenn eine Datei nur für lokale Arbeiten geändert werden muss, ohne die Hauptversion der Datei im Repository zu beeinträchtigen==

Um Änderungen an einer Datei vorübergehend zu ignorieren, können Sie folgenden Befehl verwenden:
```
git update-index --assume-unchanged <datei>
```

Um den Befehl zu deaktivieren:
```
git update-index --no-assume-unchanged <datei>
```

## Nützliche Befehle im Zusammenhang mit der Ausblendung von Dateien im Repository 

Um zu sehen, was in der Datei **.gitignore** auf Repository-Ebene steht
```
git status --ignored
```