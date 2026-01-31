---
create: 2025-08-11
idnote: gOWzVdzN3u
vault: dev
title: PM2 Prozessmanager für NodeJs
path:
tags:
  - pm2
  - utils
  - devops
status:
rating:
published: 2025-09-25
symlink:
symlinkchapter: DevOps
Language: de
---


## Notizen
----
PM2 (Process Manager 2) ist ein leistungsstarker Prozessmanager für Node.js, der es ermöglicht, Server einfach zu verwalten, indem er deren automatischen Neustart, Überwachung und Lastverteilung sicherstellt.

PM2 ermöglicht das Starten von Anwendungen im Hintergrund, das Verwalten ihres Lebenszyklus sowie hohe Verfügbarkeit und Skalierbarkeit.


`ecosystem.config.js` ist eine Konfigurationsdatei von PM2, die es ermöglicht, die Parameter für den Start von Anwendungen, deren Umgebung und andere Einstellungen zu beschreiben. Wir legen sie in das Stammverzeichnis des Projekts.

Beispiel für eine Datei
```js
module.exports = {
  apps: [
    {
      name: "webpack-dev-server",
      cwd: "/Volumes/SSD/projects/yvelious_github_io", // ← Pfad zum Projekt auf der Remote-Maschine
      script: "npm",
      args: "run server",
      env: {
        NODE_ENV: "server",
      },
      watch: false, // watch ist bereits in der webpack-Konfiguration
    },
  ],
};
```


### Wozu ist PM2 nützlich

Er kann im Hintergrund arbeiten, was es ermöglicht, Server und Anwendungen auch nach dem Schließen des Terminals im Hintergrund zu starten.
PM2 gewährleistet den automatischen Neustart von Anwendungen im Falle eines Fehlers, was die Zuverlässigkeit der Server erhöht.
Es kann so konfiguriert werden, dass es beim Systemstart ausgeführt wird, was das automatische Starten von Anwendungen nach einem Neustart des Servers ermöglicht.
Über die Kommandozeile können Prozesse verwaltet, Informationen über den Status von Anwendungen abgerufen, Protokolle angezeigt und andere Operationen wie Neustart oder Stoppen von Anwendungen durchgeführt werden.


- `pm2 logs` — Protokolle des Servers anzeigen.
- `pm2 monit` — Überwachung des Serverstatus.
- `pm2 restart yvelious-dev-server` — manuelles Neustarten.
- `pm2 start yvelious-dev-server` — starten
- `pm2 stop yvelious-dev-server` — stoppen
- `pm2 delete yvelious-dev-server` — löschen
- `pm2 save && pm2 startup` — Autostart beim Systemstart.


> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> https://pm2.keymetrics.io/
> 
> ## Zero-Links
> ----
> [[00 UTILS]]