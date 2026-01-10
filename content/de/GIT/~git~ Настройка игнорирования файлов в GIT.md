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

Die Ausblendung von Dateien im Repository kann auf mehreren Ebenen konfiguriert werden, von denen jede ihre eigenen Besonderheiten hat:

1. **Globale Ebene**: Ausblendung von Dateien für alle Repositories auf dem Computer. Dies wird in der Konfigurationsdatei festgelegt, die für alle Repositories des Benutzers gilt.
    
2. **Repository-Ebene**: Ausblendung von Dateien für ein bestimmtes Repository, die für alle Benutzer gilt, die an diesem Projekt arbeiten. Die Einstellungen werden in der Datei `.gitignore` gespeichert, die sich im Stammverzeichnis des Repositories befindet.
    
3. **Benutzerebene**: Ausblendung von Dateien nur für einen bestimmten Benutzer und dessen Arbeitsverzeichnis im Repository. Diese Einstellungen werden über die Datei `.git/info/exclude` festgelegt, die nicht in die Versionskontrolle aufgenommen wird und nur lokal für diesen Benutzer verfügbar ist.
    

Ein solches mehrstufiges System ermöglicht eine flexible Verwaltung von Ausnahmen für Dateien aus der Versionskontrolle, je nach Ihren Bedürfnissen.

### Konfiguration von gitignore auf globaler Ebene

Sie müssen eine Datei `.gitignore` erstellen, ähnlich wie wir sie in jedem Repository erstellen. Normalerweise wird sie im Home-Verzeichnis erstellt, kann aber an jedem Ort auf dem Computer angelegt werden.

Nach der Erstellung der Datei müssen Sie Git mitteilen, wo sich das globale gitignore befindet:
```
git config --global core.excludesfile <pfad_zur_datei>/.gitignore
```

### Einstellungen von gitignore auf Repository-Ebene

Die Datei `.gitignore` ist eine Regel für alle Teilnehmer des Projekts, die dem Git-System angibt, welche Dateien im Repository ignoriert werden sollen. Diese Einstellungen gelten für alle Benutzer, die mit diesem Repository arbeiten.

Dies ist genau das `.gitignore`, das sich im Stammverzeichnis des Repositories befindet. Darin sollten hauptsächlich nur die Dinge platziert werden, die direkt mit dem Projekt und seiner Architektur zu tun haben. Zum Beispiel haben alle Teilnehmer des Projekts ein Verzeichnis mit lokalen Daten oder Passwörtern, oder an einem bestimmten Ort werden temporäre Dateien erstellt. Wenn diese Regeln für alle Teilnehmer des Projekts relevant sind, sollten die Ausblendungsregeln in das `.gitignore` aufgenommen werden, das zusammen mit dem Repository verteilt wird.

Früher dachte ich, dass jeder einen eigenen **.gitignore** hat und dieser nicht committet werden sollte, aber es stellt sich heraus, dass er das sollte, damit alle Teilnehmer des Projekts dieselben Dateien und Ordner ignorieren.

### Konfiguration von gitignore auf Benutzerebene

Dieser Ansatz ermöglicht es dem Benutzer, Dateien und Verzeichnisse in Git **ausschließlich für seine lokale Arbeitskopie des Repositories** auszublenden. Dies ist nützlich, wenn temporäre Dateien, die von diesem Benutzer generiert werden (z. B. Editor-Dateien, lokale Builds, Logs usw.), von der Indizierung ausgeschlossen werden sollen, ohne die Einstellungen anderer Projektteilnehmer zu beeinträchtigen.

Die Hauptvorteile der Verwendung von `.git/info/exclude`:

1. **Lokalität**: Diese Datei gilt nur für das aktuelle Repository auf dem lokalen Computer und wird nicht auf andere Benutzer übertragen.
2. **Isolation**: Die Ausblendungseinstellungen bleiben privat und beeinflussen die Zusammenarbeit im Repository nicht.

Dieser Ansatz eignet sich für Benutzer, die ihre lokalen Einstellungen beibehalten möchten, ohne die allgemeinen Vereinbarungen des Teams zu stören.

## Beispiele für das Schreiben von Regeln und Ausnahmen in der Datei gitignore

Regeln in `.gitignore` können sowohl einfach als auch komplex sein, was eine präzise Anpassung des Verhaltens von Git ermöglicht.

Hier sind Beispiele für verschiedene Regeln zur Ausblendung von Dateien in Git und deren Erklärung:
```bash
# Kommentar — diese Zeile wird ignoriert

# keine Dateien verarbeiten, deren Name auf .a endet
*.a

# ABER die Datei lib.a verfolgen, obwohl wir alle .a-Dateien mit der vorherigen Regel ignorieren
!lib.a

# nur die Datei TODO im Stammverzeichnis ignorieren, nicht die Dateien mit demselben Namen in Unterverzeichnissen, z. B. subdir/TODO
/TODO
# alle Dateien im Verzeichnis build/ ignorieren
build/
# doc/notes.txt ignorieren, aber nicht doc/server/arch.txt
doc/*.txt
# alle .txt-Dateien im Verzeichnis doc/ und seinen Unterverzeichnissen ignorieren
doc/**/*.txt
```

In der Datei `.gitignore` müssen relative Pfade angegeben werden. Diese Pfade beziehen sich **auf das Stammverzeichnis Ihres Repositories** (das Verzeichnis, in dem sich der Ordner `.git` befindet).

Eine Datei oder einen Ordner im Stammverzeichnis ignorieren:
```
secret.txt 
/build/
```
Dies ignoriert die Datei `secret.txt` und den Ordner `build`, die sich im Stammverzeichnis des Repositories befinden.

## Was tun, wenn Dateien nach dem Hinzufügen zu gitignore weiterhin verfolgt werden

Wenn Sie einen Ordner in `.gitignore` hinzugefügt haben, `git status` jedoch weiterhin Änderungen an den Dateien dieses Ordners anzeigt, liegt das daran, dass Git diese Dateien bereits verfolgt (d. h. sie wurden dem Repository hinzugefügt, bevor Sie sie in `.gitignore` aufgenommen haben).

Git wird nicht automatisch aufhören, Dateien zu verfolgen, wenn sie bereits hinzugefügt wurden. Um dies zu beheben, müssen Sie einige Schritte ausführen:

#### 1. Das Verfolgen von Dateien, die sich bereits im Repository befinden, einstellen
Verwenden Sie den Befehl `git rm` mit dem Flag `--cached`, um Dateien aus dem Index zu entfernen (d. h. das Verfolgen einzustellen), ohne sie physisch von der Festplatte zu löschen:

```
git rm -r --cached name_des_ordners/
```

Dieser Befehl entfernt alle Dateien aus dem angegebenen Ordner aus dem Index (der Index ist der Bereich, in dem Git Informationen darüber speichert, welche Dateien verfolgt werden). Die Dateien bleiben auf der Festplatte, aber Git wird aufhören, sie zu verfolgen.

#### 2. Änderungen committen

Nachdem Sie das Verfolgen der Dateien eingestellt haben, müssen Sie die Änderungen committen:

```
git commit -m "Das Verfolgen des Ordners gestoppt"
```

Jetzt wird Git aufhören, die Dateien in diesem Ordner zu verfolgen, und `.gitignore` wird für diesen Ordner korrekt funktionieren.

## Änderungen an einer Datei vorübergehend ignorieren

In Git gibt es einen Befehl, der es ermöglicht, **das Verfolgen von Änderungen** an einer bereits verfolgten Datei vorübergehend zu stoppen.

Wenn Sie diesen Befehl für eine bestimmte Datei verwenden, wird Git "annehmen", dass diese Datei unverändert bleibt, und sie wird nicht in der Liste der geänderten Dateien angezeigt, wenn Sie den Befehl `git status` ausführen, selbst wenn lokale Änderungen an der Datei vorgenommen wurden.

==Das ist nützlich, wenn Sie eine Datei nur für lokale Arbeiten ändern möchten, ohne die Hauptversion der Datei im Repository zu beeinträchtigen==

Um Änderungen an einer Datei vorübergehend zu ignorieren, können Sie den Befehl verwenden:
```
git update-index --assume-unchanged <datei>
```

Um dies zu deaktivieren, verwenden Sie den Befehl:
```
git update-index --no-assume-unchanged <datei>
```

## Nützliche Befehle im Zusammenhang mit der Ausblendung von Dateien im Repository 

Um zu sehen, was in der Datei **.gitignore** auf Repository-Ebene steht:
```
git status --ignored
```