---
create: 2025-01-16
idnote: vz2hZnrhGV
vault: dev
title: Replacing Symbolic Links with Original Files
path:
tags:
  - bash
  - symlinks
symlink:
symlinkchapter: BASH
published: 2024-05-05
Language: en
---
The goal is to replace symlinks with the actual files. When is this necessary? When you need to get rid of symlinks by replacing them with the original files they point to. This can be necessary when we move our files to another medium or location.

### The command that does this:

```bash
find . -type l -exec cp --remove-destination $(readlink -f {}) {} \;
```

### Breakdown:

1. **`find . -type l`:**
    
    - Finds all symbolic links (`-type l`) in the current directory (`.`) and its subdirectories.
2. **`-exec ... \;`:**
    
    - Executes the specified command (`cp --remove-destination $(readlink -f {}) {}`) for each found item.
3. **`readlink -f {}`:**
    
    - Returns the absolute path to the file that the symbolic link `{}` points to.
4. **`cp --remove-destination $(readlink -f {}) {}`:**
    
    - Copies the real file that the symlink points to (`$(readlink -f {})`) back to the same position where the symlink resides (`{}`).
    - The `--remove-destination` option removes the target file before copying. This is important to replace the symlink with the actual file (otherwise, `cp` cannot overwrite the link).

### What happens in the end:

- Symbolic links are replaced with their target files.
- This is useful if you want to eliminate symbolic links by replacing them with the content of the files they point to.

### Example:

- Suppose you have the structure:
    
    ```plaintext
    ./file.txt
    ./link -> file.txt
    ```
    
    After running the command:
    
    ```bash
    find . -type l -exec cp --remove-destination $(readlink -f {}) {} \;
    ```
    
    the structure will change to:
    
    ```plaintext
    ./file.txt
    ./link (this is no longer a symlink, but a copy of file.txt)
    ```