---
create: 2025-07-08
idnote: E8Avw7gJbx
vault: dev
title: Mounting folders over SSHFS between two MacOS computers in a local network
path:
tags:
  - macos
  - sshfs
status:
rating:
published: 2025-07-08
symlink:
symlinkchapter: DevOps
Language: en
---

![[Pasted image 20250708133544.png]]

If you have two computers running **macOS**, you can connect a folder from one Mac to another using **SSHFS**. This allows you to work with remote files as if they were on your local disk — convenient for development, distributing tasks across multiple machines, data sharing, and backups.

Our strategy: The first Mac (local) connects to a remote folder on the second Mac via SSH and mounts it in a local directory.

![[Pasted image 20250708133015.png | 700]]


## Installing SSHFS on the first computer (the one accessing)

Open the terminal and run the following commands:
```bash
brew install macfuse 
brew tap gromgit/fuse 
brew install gromgit/fuse/sshfs-mac
```
These commands install the necessary components: `macFUSE` and the `sshfs-mac` itself.

## Enabling SSH access on the second computer (the one we connect to)
- Go to `System Settings → Sharing`
- Enable **Remote Login**
- Make sure your main user has SSH access

```bash
ssh your_login_second_pc@your_ip_second_pc
```

If it connects — you're all set.


## Preparing folders

**On the second Mac** (remote):
Create the folder you want to share:
```bash
mkdir ~/remote-folder
```

**On the first Mac** (local):
Create the folder where the remote one will be mounted:
```bash
mkdir ~/remote
```

---

## Mounting the folder via SSHFS on the first computer
Now you can mount the remote folder on the first Mac. Run the following command in the terminal:

```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

This command mounts the remote folder `remote-project` from another Mac into the local folder `~/remote` on the first computer via `sshfs`.
The options used in the command are:

| Option                 | Purpose                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_other`         | Allows access to the mounted folder **not only to the user who performed the mount**, but also to other users on the system. This is necessary, for example, if you want IDEs (VS Code, WebStorm) to be able to see the contents. ⚠️ Requires permission in `/etc/fuse.conf`. |
| `default_permissions` | Uses standard Unix permission checking (owner, groups, chmod), rather than just SSH. This helps avoid issues where files are visible but cannot be opened.                                                                                                                             |
| `reconnect`           | Automatically reconnects if the SSH connection temporarily drops (for example, due to Wi-Fi disconnection). Very useful if the connection is unstable.                                                                                                                                            |


By default, the `allow_other` option may not work until permission is added to the `fuse.conf` configuration file. This is related to macOS security policies that restrict access to mounted file systems.

1. Open the terminal and create the fuse.conf file:
```bash
sudo nano /etc/fuse.conf
```

2. Add the line:
```bash
user_allow_other
```

3. Save the file and run the mount command again
```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

## How to unmount the folder

To unmount the folder, run:
```bash
umount ~/Volumes/SSD/test-remote
```

If you get a `Resource busy` error, try:
```bash
umount -f ~/Volumes/SSD/test-remote
```

N.B.
If you don't remember the name of the mounted folder, you can view the list of mounted file systems with the command:
```bash
mount
```

> [!raw-hidden]-
> ## Automating the mount process
> 
> **N.B. it did not work for me on Macs as I tried to create a network disk with autofs. But the configuration inside fstab for calling sshfs does not work.**
> 
> To avoid manually executing the mount command every time you restart your Mac, you can use `fstab` and `autofs`.
> 
> ### `fstab` — this is a configuration file
> - Located at: `/etc/fstab`
> - Describes **what and where to mount**, and with what parameters
> - Used by the system for automatic mounting
> 
> **N.B.**
> If this file does not exist, it can be created manually.
> 
> ### `autofs` — this is a system service (daemon)
> - Monitors `fstab` (and other sources)
> - **Automatically mounts file systems when accessed**
> - On macOS, it starts at the first access to the folder (e.g., `cd ~/remote`)
> 
> ### How they work together
> 
> 1. You specify in `/etc/fstab` what you want to mount `sshfs`. 
> 2. `autofs` monitors the path specified in `fstab`.
> 3. When you open this folder — `autofs` automatically mounts everything.
> 
> #### Example entry in `fstab`
> ```bash
> sshfs#your_username_second_pc@your_ip_second_pc:~/remote-project ~/remote fuse allow_other,default_permissions,reconnect 0 0
> ```
> 
> If briefly:
> > 🔹 `fstab` — what to mount and how  
> > 🔹 `autofs` — mounts on folder access
> 
> **N.B.** 
> The `autofs` daemon mounts folders **only on the first access** to the folder. So, if you simply add an entry to `fstab`, but do not open the folder, it will not be mounted until you try to access it (enter it). For example, if we have a configuration added in `fstab`, but we haven't accessed the folder yet (through the terminal or Finder), it will not be mounted until we access it.
> 
> 
> ### Applying configuration changes in `fstab`
> In order for the `autofs` daemon to recognize the configuration in `fstab`, you only need to run the command `sudo automount -vc` once. 
> This command should be run only once when we've created or changed the configuration in `fstab`.
> 
> The `autofs` daemon reads the `fstab` configuration file **only at startup or when calling `automount`**. Without the command `automount -vc`, you would have to **restart the Mac** for `autofs` to see changes in `fstab`. The command `sudo automount -vc` is a way to **soft-restart `autofs`** and immediately apply changes from the `fstab` configuration file without rebooting.
> 
> **What the arguments of the command `automount -vc` mean:**
> 
> |Argument|Value|
> |---|---|
> |`-v`|verbose — shows what the command is doing (debugging)|
> |`-c`|cache reset — resets the cache of auto-mounted points|
> **N.B.** 
> The command `automount -vc` is not mandatory, but it **helps apply changes in the `fstab` configuration without rebooting the system**.
> 
> ### Checking the activity of `autofs`
> 
> The **`automountd` daemon runs by default** on macOS as a system service. But if we want to ensure it's working, we can run a command that shows it's running and listening for mount requests.
> 
> Run the command in the terminal
> ```bash
> ps aux | grep automountd
> ```
> If the service is running, we will see a line like this:
> ```bash
> root       123   0.0  0.1  2433984   8208     Ss    1:20PM   0:00.02 /usr/sbin/automountd
> ```
> This means that `autofs` is active and listening for requests.


> [!raw-hidden]-
> ### ✨ Option 2 — manually mount (not via fstab)
> 
> If you want full control and reliability, **do not use `fstab`,** but create your own mounting script.
> 
> bash
> 
> CopyEdit
> 
> `#!/bin/bash MOUNTPOINT="/Volumes/SSD/test-remote" mkdir -p "$MOUNTPOINT" sshfs levy@192.168.178.54:/Volumes/SSD/mbp2011-test "$MOUNTPOINT" \   -o allow_other,default_permissions,reconnect,IdentityFile=/Users/levy/.ssh/mbp-2011/id_ed25519`
> 
> Add it to startup (via LaunchAgent or `cron @reboot`), and it will work more stably than `fstab`.


## Summary
Using `sshfs` between two Macs is a simple way to organize file sharing without the need for synchronization or setting up a network drive. It is especially convenient for developers working with multiple machines on a local network. Using `sshfs`, you can work with the remote folder as if it is on your local computer.

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## References
> ------------
> 
> ## Zero-links
> ----
> [[00 mac]]