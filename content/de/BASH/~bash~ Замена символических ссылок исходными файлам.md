---
create: 2025-01-16
idnote: vz2hZnrhGV
vault: dev
title: Ersetzen von symbolischen Links durch die Originaldateien
path:
tags:
  - bash
  - symlinks
symlink:
symlinkchapter: BASH
published: 2024-05-05
Language: de
---
Ziel ist es, symbolische Links durch echte Dateien zu ersetzen. Wann ist das notwendig? Wenn man symbolische Links loswerden möchte, indem man sie durch die Originaldateien ersetzt, auf die sie verweisen. Dies kann erforderlich sein, wenn wir unsere Dateien auf ein anderes Medium oder an einen anderen Ort verschieben.

### Befehl, der dies tut:

```bash
find . -type l -exec cp --remove-destination $(readlink -f {}) {} \;
```

### Analyse:

1. **`find . -type l`:**
    
    - Findet alle symbolischen Links (`-type l`) im aktuellen Verzeichnis (`.`) und dessen Unterverzeichnissen.
2. **`-exec ... \;`:**
    
    - Führt den angegebenen Befehl (`cp --remove-destination $(readlink -f {}) {}`) für jedes gefundene Element aus.
3. **`readlink -f {}`:**
    
    - Gibt den absoluten Pfad zur Datei zurück, auf die der symbolische Link `{}` verweist.
4. **`cp --remove-destination $(readlink -f {}) {}`:**
    
    - Kopiert die echte Datei, auf die der symbolische Link verweist (`$(readlink -f {})`), zurück an die Stelle, an der sich der symbolische Link befindet (`{}`).
    - Die Option `--remove-destination` entfernt die Zieldatei vor dem Kopieren. Dies ist wichtig, um den symbolischen Link durch die echte Datei zu ersetzen (ansonsten kann `cp` nicht über den Link schreiben).

### Was passiert am Ende:

- Symbolische Links werden durch ihre Ziel-Dateien ersetzt.
- Dies ist nützlich, wenn Sie symbolische Links loswerden möchten, indem Sie sie durch den Inhalt der Dateien ersetzen, auf die sie verweisen.

### Beispiel:

- Angenommen, Sie haben eine Struktur:
    
    ```plaintext
    ./file.txt
    ./link -> file.txt
    ```
    
    Nach Ausführung des Befehls:
    
    ```bash
    find . -type l -exec cp --remove-destination $(readlink -f {}) {} \;
    ```
    
    wird die Struktur:
    
    ```plaintext
    ./file.txt
    ./link (dies ist kein Link mehr, sondern eine Kopie von file.txt)
    ```