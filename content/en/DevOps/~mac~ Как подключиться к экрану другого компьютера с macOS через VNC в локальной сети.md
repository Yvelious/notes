---
create: 2025-07-07
idnote: MC1vHrPou0
vault: dev
title: How to connect to the screen of another macOS computer via VNC on a local network
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

If you have two computers running macOS and want to control one from the other without resorting to third-party applications—you already have everything you need. macOS has a built-in VNC server that allows you to remotely view and control the screen of another device over the network.

This is especially convenient if one of the computers is in another room, connected to a TV, or used as a home server (for example, a Mac mini).

## What is VNC and why is it needed?

**VNC (Virtual Network Computing)** is a protocol that enables the transmission of the display from one computer to another and allows interaction in real time. This means that you can:

- see what is happening on the remote Mac;
- control the cursor and keyboard input;
- run and stop programs;
- open files, use the terminal, and much more.

## How to set up remote screen access between two macOS computers

### Step 1: Enable access on the remote computer

This is the Mac **whose screen you want to see**.

1. Open **System settings** → **General** → **Sharing**
2. Enable the **Screen Sharing** option
3. Copy or remember the computer name and/or its IP address — you will need it in the next step

You can find the IP address in `System settings → Networking`, or via the terminal using the command `ifconfig`.

### Step 2: Connect from the main computer

This is the Mac from which you will control the other.

1. In any Finder window, press the keyboard shortcut **⌘ + K**
2. In the window that appears, enter the address in the format: `vnc://name_or_IP_of_second_computer`
3. Click **Connect**
4. Enter the login and password for the user on the second Mac

Make sure you enter the credentials of a user who has login rights on the remote computer.

## What happens next?

After connecting, you will see the **screen of the second computer in a separate window**. Now you can:

- control the cursor and keyboard;
- launch applications;
- use Finder and the terminal;
- provide remote assistance to someone or simply monitor the second Mac.

## In summary

Remote control via VNC is a powerful and underrated feature of macOS that is already built-in and works "out of the box." You don't need to install additional software or pay for third-party solutions—everything you need is already in the system.

Use this solution to:
- administer home servers,
- access your work computer from another room.