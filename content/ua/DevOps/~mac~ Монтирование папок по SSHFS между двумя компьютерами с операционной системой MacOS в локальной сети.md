---
create: 2025-07-08
idnote: E8Avw7gJbx
vault: dev
title: Mounting Folders via SSHFS Between Two macOS Computers on a Local Network
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

If you have two computers running **macOS**, you can connect one of the folders from one Mac to the other using **SSHFS**. This allows you to work with remote files as if they were on your local disk — convenient for development, distributing tasks among multiple machines, sharing data, and backups.

Our strategy: The first Mac (local) connects to a remote folder on the second Mac via SSH and mounts it in a local directory.

![[Pasted image 20250708133015.png | 700]]


## Installing SSHFS on the First Computer (the one from which you will access)

Open the terminal and run the following commands:
```bash
brew install macfuse 
brew tap gromgit/fuse 
brew install gromgit/fuse/sshfs-mac
```
These commands install the necessary components: `macFUSE` and `sshfs-mac`.

## Enabling SSH Access on the Second Computer (the one we are connecting to)
- Go to `System Settings → Sharing`
- Enable **Remote Login**
- Make sure your main user has SSH access

```bash
ssh your_login_second_pc@your_ip_second_pc
```

If it connects — everything is ready.


## Preparing Folders

**On the Second Mac** (remote):
Create the folder you want to share:
```bash
mkdir ~/remote-folder
```

**On the First Mac** (local):
Create the folder where the remote one will be mounted:
```bash
mkdir ~/remote
```

---

## Mounting a Folder with SSHFS on the First Computer
Now you can mount the remote folder on the first Mac. Run the following command in the terminal:

```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

This command mounts the remote folder `remote-project` from another Mac into the local folder `~/remote` on the first computer via `sshfs`.
Options used in the command:

| Option                 | Purpose                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_other`         | Allows access to the mounted folder **not only for the user who performed the mount**, but also for other users on the system. This is necessary, for example, if you want IDEs (VS Code, WebStorm) to see the contents. ⚠️ Requires permission in `/etc/fuse.conf`. |
| `default_permissions` | Uses standard Unix permission checks (owner, groups, chmod) instead of only SSH. This helps avoid issues where files are visible but cannot be opened.                                                                                                                             |
| `reconnect`           | Automatically reconnects if the SSH connection is temporarily interrupted (for example, due to a Wi-Fi drop). Very useful if the connection is unstable.                                                                                                                                            |


By default, the `allow_other` option may not work until permission is added in the `fuse.conf` configuration file. This is due to macOS security policies that restrict access to mounted file systems.

1. In the terminal, create the fuse.conf file:
```bash
sudo nano /etc/fuse.conf
```

2. Add the line:
```bash
user_allow_other
```

3. Save the file and re-run the mount command
```bash
sshfs your_login_second_pc@your_ip_second_pc:~/remote-project ~/remote -o allow_other,default_permissions,reconnect
```

## How to Unmount the Folder

To unmount the folder, run:
```bash
umount ~/Volumes/SSD/test-remote
```

If you get the error `Resource busy`, try:
```bash
umount -f ~/Volumes/SSD/test-remote
```

N.B.
If you cannot remember the name of the mounted folder, you can view the list of mounted file systems with the command:
```bash
mount
```



## In Summary
Using `sshfs` between two Macs is a simple way to set up shared file access without the need for synchronization or network drive configuration. It is especially convenient for developers working with multiple machines on a local network. With `sshfs`, you can work with a remote folder as if it were on your local computer.