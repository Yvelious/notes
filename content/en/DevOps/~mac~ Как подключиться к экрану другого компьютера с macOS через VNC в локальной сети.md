---
create: 2025-07-07
idnote: MC1vHrPou0
vault: dev
title: How to connect to the screen of another computer running macOS via VNC on the local network
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

If you have two macOS computers and you want to control one from the other without using third-party applications — you already have everything you need. macOS comes with a built-in VNC server that allows you to remotely view and control the screen of another device over the network.

This is especially convenient if one of the computers is in another room, connected to a TV, or used as a home server (for example, Mac mini).

## What is VNC and why is it needed?

**VNC (Virtual Network Computing)** is a protocol that allows you to transmit the image from the screen of one computer to another and interact with it in real-time. This means that you can:

- see what is happening on the remote Mac;
- control the cursor and keyboard input;
- launch and stop programs;
- open files, use the terminal, and much more.

## How to set up remote screen access between two macOS computers

### Step 1: Enable access on the remote computer

This is the Mac **whose screen you want to see**.

1. Open **System settings** → **General** → **Sharing**
2. Enable the **Screen Sharing** option
3. Copy or remember the computer name and/or its IP address — you will need it in the next step

You can find the IP address in `System settings → Networking`, or through the terminal with the command `ifconfig`.

### Step 2: Connect from the main computer

This is the Mac you will use to control the other.

1. In any Finder window, press the key combination **⌘ + K**
2. In the pop-up window, enter the address in the format: `vnc://name_or_IP_of_the_second_computer`
3. Click **Connect**
4. Enter the username and password of the second Mac's user

Make sure you are entering the credentials of a user who has login rights on the remote computer.

## What happens next?

After connecting, you will see **the screen of the second computer in a separate window**. Now you can:

- control the cursor and keyboard;
- run applications;
- use Finder and the terminal;
- provide remote assistance or simply monitor the second Mac.

## In summary

Remote control via VNC is a powerful and underrated feature of macOS that is built-in and works "out of the box." You don't need to install additional software or pay for third-party solutions — everything you need is already in the system.

Use this solution to:
- administer home servers,
- access your work computer from another room.