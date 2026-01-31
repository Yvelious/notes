---
create: 2025-01-16
idnote: vz2hZnrhGV
vault: dev
title: Replacing symbolic links with original files
path:
tags:
  - bash
  - symlinks
symlink:
symlinkchapter: BASH
published: 2024-05-05
Language: en
---
The goal is to replace symlinks with the actual files. When is this necessary? When you need to get rid of symlinks by replacing them with the original files they point to. This may be needed when moving your files to another storage device or location.

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
    
    - Copies the real file that the symbolic link points to (`$(readlink -f {})`) back to the same location where the symbolic link is located (`{}`).
    - The `--remove-destination` option removes the target file before copying. This is important to replace the symbolic link with the actual file (otherwise, `cp` would not be able to overwrite the symlink).

### What happens as a result:

- Symbolic links are replaced with their target files.
- This is useful if you want to get rid of the symbolic links by replacing them with the content of the files they point to.

### Example:

- Suppose you have the following structure:
    
    ```plaintext
    ./file.txt
    ./link -> file.txt
    ```
    
    After executing the command:
    
    ```bash
    find . -type l -exec cp --remove-destination $(readlink -f {}) {} \;
    ```
    
    the structure changes to:
    
    ```plaintext
    ./file.txt
    ./link (this is no longer a link, but a copy of file.txt)
    ```

> [!hidden-in-public]
> 
> [[00 Bash]]
> 
