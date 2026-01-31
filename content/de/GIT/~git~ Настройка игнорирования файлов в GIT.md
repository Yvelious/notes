---
aliases:
  - .gitignore
tags:
  - git
  - gitignore
idnote: 1234
symlink:
symlinkchapter: GIT
title: Konfiguration der Dateiausklammerung in Git
published: 2025-04-05
create: 2025-04-05
Language: de
---

![[git-ignore-diagram.webp]]
##  Mehrstufiges System zur Dateiausklammerung in Git

Die Ausklammerung von Dateien in einem Repository kann auf mehreren Ebenen konfiguriert werden, von denen jede ihre eigenen Besonderheiten hat:

1. **Globale Ebene**: Ausklammerung von Dateien für alle Repositories auf dem Computer. Dies wird in der Konfigurationsdatei konfiguriert, die sich auf alle Repositories des Benutzers erstreckt. 
    
2. **Repository-Ebene**: Ausklammerung von Dateien für ein bestimmtes Repository, die für alle Benutzer gilt, die an diesem Projekt arbeiten. Die Einstellungen werden in der Datei `.gitignore` gespeichert, die sich im Wurzelverzeichnis des Repositories befindet.
    
3. **Benutzer-Ebene**: Ausklammerung von Dateien nur für einen bestimmten Benutzer und dessen Arbeitsverzeichnis im Repository. Diese Einstellungen werden über die Datei `.git/info/exclude` festgelegt, die nicht unter Versionskontrolle steht und nur lokal für diesen Benutzer verfügbar ist.
    

Ein solches mehrstufiges System ermöglicht eine flexible Verwaltung von Dateiausschlüssen aus der Versionskontrolle je nach Ihren Bedürfnissen.

### Konfiguration von gitignore auf globaler Ebene

Es muss eine `.gitignore`-Datei erstellt werden, wie wir sie in jedem Repository erstellen. Normalerweise wird sie im Heimatverzeichnis erstellt, kann aber auch an jedem anderen Ort auf dem Computer platziert werden.

Nachdem die Datei erstellt wurde, muss Git mitgeteilt werden, wo sich die globale gitignore befindet:
```
git config --global core.excludesfile <pfad_zur_datei>/.gitignore
```

### Einstellungen von gitignore auf Repository-Ebene

Die Datei `.gitignore` ist eine Regel für alle Projektmitglieder, die Git mitteilt, welche Dateien im Repository ausgeschlossen werden sollen. Diese Einstellungen gelten für alle Benutzer, die mit diesem Repository arbeiten.

Dies ist genau die `.gitignore`, die sich im Wurzelverzeichnis des Repositories befindet. Hier sollten hauptsächlich nur die Dinge platziert werden, die einen direkten Bezug zum Projekt und seiner Architektur haben. Zum Beispiel haben alle Projektteilnehmer ein Verzeichnis mit lokalen Daten oder Passwörtern, oder an jedem wird am selben Ort temporäre Dateien erstellt. Wenn diese Regeln für alle Projektteilnehmer gelten, sollten die Ausklammerungsregeln in der `.gitignore` platziert werden, die zusammen mit dem Repository verteilt wird.

Früher dachte ich, dass jeder einen eigenen **.gitignore** hat und dieser nicht versioniert werden sollte, aber es stellt sich heraus, dass er versioniert werden sollte, damit alle Projektteilnehmer dieselben Dateien und Ordner ignorieren.

### Konfiguration von gitignore auf Benutzer-Ebene

Dieser Ansatz ermöglicht es dem Benutzer, Dateien und Verzeichnisse in Git **ausschließlich für seine lokale Kopie des Repositories** auszuschließen. Dies ist nützlich, wenn temporäre Dateien, die von diesem Benutzer generiert werden (z. B. Editor-Dateien, lokale Builds, Protokolle usw.), aus der Indizierung ausgeschlossen werden sollen, ohne die Einstellungen anderer Projektmitglieder zu beeinträchtigen.

Hauptvorteile der Verwendung von `.git/info/exclude`:

1. **Lokalisierung**: Diese Datei wirkt nur im aktuellen Repository auf dem lokalen Rechner und wird nicht auf andere Benutzer verteilt.
2. **Isolation**: Die Ausklammerungseinstellungen bleiben privat und beeinträchtigen die Zusammenarbeit im Repository nicht.

Dieser Ansatz eignet sich für Benutzer, die ihre lokalen Einstellungen bewahren möchten, ohne die allgemeinen Vereinbarungen des Teams zu stören.

## Beispiele für das Schreiben von Regeln und Ausnahmen in der gitignore-Datei

Die Regeln in `.gitignore` können sowohl einfach als auch komplex sein, was eine genaue Anpassung des Verhaltens von Git ermöglicht.

Im Folgenden finden Sie Beispiele für verschiedene Ausklammerungsregeln in Git und deren Erklärung:
```bash
# Kommentar — diese Zeile wird ignoriert

# keine Dateien verarbeiten, deren Name auf .a endet
*.a

# ABER die Datei lib.a verfolgen, obwohl wir alle .a-Dateien mit der vorherigen Regel ignorieren
!lib.a

# nur die Datei TODO im Wurzelverzeichnis ausklammern, nicht die gleichnamigen Dateien in Unterverzeichnissen wie subdir/TODO
/TODO
# alle Dateien im Verzeichnis build/ ignorieren
build/
# doc/notes.txt ignorieren, aber nicht doc/server/arch.txt
doc/*.txt
# alle .txt-Dateien im Verzeichnis doc/ und dessen Unterverzeichnissen ignorieren
doc/**/*.txt
```

In der `.gitignore`-Datei müssen relative Pfade angegeben werden. Diese Pfade beziehen sich **auf das Wurzelverzeichnis Ihres Repositories** (dort, wo sich der `.git`-Ordner befindet).

Eine Datei oder einen Ordner im Wurzelverzeichnis ignorieren:
```
secret.txt 
/build/
```
Dies ignoriert die Datei `secret.txt` und den Ordner `build`, die sich im Wurzelverzeichnis des Repositories befinden.

## Was tun, wenn nach dem Hinzufügen zur gitignore Dateien weiterhin verfolgt werden

Wenn Sie einen Ordner in `.gitignore` hinzugefügt haben, `git status` jedoch weiterhin Änderungen in den Dateien dieses Ordners anzeigt, liegt das daran, dass Git diese Dateien bereits verfolgt (d.h. sie wurden dem Repository hinzugefügt, bevor Sie sie in `.gitignore` eingetragen haben).

Git wird nicht automatisch aufhören, Dateien zu verfolgen, wenn sie bereits hinzugefügt wurden. Um dies zu beheben, müssen Sie mehrere Schritte ausführen:

#### 1. Stoppen Sie die Verfolgung von Dateien, die sich bereits im Repository befinden
Verwenden Sie den Befehl `git rm` mit der Option `--cached`, um die Dateien aus dem Index zu entfernen (d.h. das Verfolgen zu stoppen), ohne sie physisch von der Festplatte zu löschen:

```
git rm -r --cached ordnername/
```

Dieser Befehl entfernt alle Dateien im angegebenen Ordner aus dem Index (der Index ist der Bereich, in dem Git Informationen über verfolgte Dateien speichert). Die Dateien bleiben auf der Festplatte, aber Git hört auf, sie zu verfolgen.

#### 2. Änderungen commiten

Nachdem Sie die Verfolgung von Dateien eingestellt haben, müssen Sie die Änderungen committen:

```
git commit -m "Stoppe Verfolgung des Ordners"
```

Jetzt wird Git aufhören, die Dateien in diesem Ordner zu verfolgen, und `.gitignore` wird korrekt für diesen Ordner funktionieren.

## Änderungen an einer Datei vorübergehend ignorieren

In Git gibt es einen Befehl, der es ermöglicht, **die Verfolgung von Änderungen** in einer bereits verfolgten Datei vorübergehend zu stoppen.

Wenn Sie diesen Befehl für eine bestimmte Datei verwenden, wird Git "annehmen", dass diese Datei unverändert bleibt, und sie wird nicht in der Liste der geänderten Dateien angezeigt, wenn Sie den Befehl `git status` ausführen, selbst wenn lokale Änderungen in die Datei eingefügt wurden.

==Das ist nützlich, wenn Sie eine Datei nur für lokale Arbeiten ändern möchten, ohne die Hauptversion der Datei im Repository zu beeinträchtigen==

Um Änderungen an einer Datei vorübergehend zu ignorieren, verwenden Sie den Befehl:
```
git update-index --assume-unchanged <file>
```

Um dies auszuschalten, verwenden Sie den Befehl:
```
git update-index --no-assume-unchanged <file>
```

## Nützliche Befehle im Zusammenhang mit der Ausklammerung von Dateien im Repository 

Sehen Sie sich an, was in der Datei **.gitignore** auf Repository-Ebene steht:
```
git status --ignored
```






> [!hidden-in-public]-
> ### Lernkarten
> -----
> 
> ### Links
> ----------
> 
> ### Quellen
> ------------
> https://de.hexlet.io/courses/git_base/lessons/git_gitignore/theory_unit
> https://sergeymukhin.com/blog/nastroyka-globalnogo-fayla-gitignore#
> https://medium.com/@yoga055/unlocking-gits-gitignore-the-gitignore-refresh-guide-0bbc51aa57be
> 
> ### Original
> ----------
> [[Dateiausklammerung in Git  Grundlagen von Git]]
> 
> ### Null-Links
> ----
> [[00 GIT]]
> 