---
create: 2025-07-07
idnote: MC1vHrPou0
vault: dev
title: How to Connect to Another macOS Computer's Screen via VNC on a Local Network
path:
tags:
  - macos
status:
rating:
symlink:
symlinkchapter: DevOps
published: 2025-05-20
Language: en
---
![[Pasted image 20250707223700.png]]

If you have two macOS computers and you want to control one from the other without resorting to third-party applications — you already have everything you need. macOS includes a built-in VNC server that allows you to remotely see and control another device's screen over the network.

This is especially handy if one of the computers is in another room, connected to a TV, or used as a home server (for example, a Mac mini).

## What is VNC and Why Do You Need It?

**VNC (Virtual Network Computing)** is a protocol that allows you to transmit the image from one computer's screen to another and interact with it in real-time. This means you can:

- see what is happening on the remote Mac;
- control the cursor and keyboard input;
- launch and stop programs;
- open files, use the terminal, and much more.

## How to Set Up Remote Screen Between Two macOS Computers

### Step 1: Enable Access on the Remote Computer

This is the Mac whose **screen you want to see**.

1. Open **System settings** → **General** → **Sharing** 
2. Enable the **Screen Sharing** option
3. Copy or remember the computer's name and/or IP address — you will need it in the next step

You can find the IP address in `System settings → Networking`, or through the terminal using the `ifconfig` command.

### Step 2: Connect from the Main Computer

This is the Mac from which you will control the other one.

1. In any Finder window, press the key combination **⌘ + K**
2. In the window that appears, enter the address in the format: `vnc://computer_name_or_IP_of_the_second_computer`
3. Click **Connect**
4. Enter the username and password of the second Mac's user

Ensure that you enter the credentials for a user who has login rights on the remote computer.

## What Happens Next?

After connecting, you will see the **screen of the second computer in a separate window**. Now you can:

- control the cursor and keyboard;
- launch applications;
- use Finder and the terminal;
- provide remote assistance to someone or just monitor the second Mac.

## In Summary

Remote management via VNC is a powerful and underrated feature of macOS that is already built-in and works "out of the box." You don’t need to install additional software or pay for third-party solutions — everything you need is already in the system.

Use this solution to:
- administer home servers,
- access your work computer from another room.


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