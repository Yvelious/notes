---
create: 2025-01-16
idnote: vz2hZnrhGV
vault: dev
title: Ersetzen von symbolischen Links durch Originaldateien
path:
tags:
  - bash
  - symlinks
symlink:
symlinkchapter: BASH
published: 2024-05-05
Language: de
---
Ziel ist es, symbolische Links durch reale Dateien zu ersetzen. Wann ist das notwendig? Wenn man sich von symbolischen Links trennen möchte, indem man sie durch die Originaldateien ersetzt, auf die sie verweisen. Dies kann erforderlich sein, wenn wir unsere Dateien auf ein anderes Medium oder an einen anderen Ort verschieben.

### Befehl, der dies tut:

```bash
find . -type l -exec cp --remove-destination $(readlink -f {}) {} \;
```

### Analyse:

1. **`find . -type l`:**
    
    - Findet alle symbolischen Links (`-type l`) im aktuellen Verzeichnis (`.`) und seinen Unterverzeichnissen.
2. **`-exec ... \;`:**
    
    - Führt den angegebenen Befehl (`cp --remove-destination $(readlink -f {}) {}`) für jedes gefundene Element aus.
3. **`readlink -f {}`:**
    
    - Gibt den absoluten Pfad zur Datei zurück, auf die der symbolische Link `{}` verweist.
4. **`cp --remove-destination $(readlink -f {}) {}`:**
    
    - Kopiert die reale Datei, auf die der symbolische Link verweist (`$(readlink -f {})`), zurück an die gleiche Stelle, an der sich der symbolische Link befindet (`{}`).
    - Die Option `--remove-destination` entfernt die Zieldatei vor dem Kopieren. Dies ist wichtig, um den symbolischen Link durch die reale Datei zu ersetzen (sonst kann `cp` nicht über den Link hinweg schreiben).

### Was passiert am Ende:

- Symbolische Links werden durch ihre Ziel-Dateien ersetzt.
- Dies ist nützlich, wenn Sie symbolische Links entfernen und sie durch den Inhalt der Dateien ersetzen möchten, auf die sie zeigen.

### Beispiel:

- Angenommen, Sie haben die Struktur:
    
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