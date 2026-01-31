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
Ziel ist es, symbolische Links durch echte Dateien zu ersetzen. Wann ist dies notwendig? Wenn es erforderlich ist, die symbolischen Links abzubauen, indem man sie durch die Originaldateien ersetzt, auf die sie verweisen. Dies kann notwendig sein, wenn wir unsere Dateien auf ein anderes Medium oder an einen anderen Ort verschieben.

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
    
    - Kopiert die echte Datei, auf die der symbolische Link (`$(readlink -f {})`) verweist, zurück an die Position, an der sich der symbolische Link (`{}`) befindet.
    - Die Option `--remove-destination` entfernt die Zieldatei vor dem Kopieren. Dies ist wichtig, um den symbolischen Link durch eine echte Datei zu ersetzen (sonst könnte `cp` nicht über den Link schreiben).

### Was passiert letztendlich:

- Symbolische Links werden durch ihre Ziel-Dateien ersetzt.
- Dies ist nützlich, wenn Sie die symbolischen Links loswerden möchten, indem Sie sie durch den Inhalt der Dateien ersetzen, auf die sie verweisen.

### Beispiel:

- Angenommen, Sie haben die folgende Struktur:
    
    ```plaintext
    ./file.txt
    ./link -> file.txt
    ```
    
    Nach dem Ausführen des Befehls:
    
    ```bash
    find . -type l -exec cp --remove-destination $(readlink -f {}) {} \;
    ```
    
    wird die Struktur zu:
    
    ```plaintext
    ./file.txt
    ./link (dies ist kein Link mehr, sondern eine Kopie von file.txt)
    ```

> [!hidden-in-public]
> 
> [[00 Bash]]
> 

