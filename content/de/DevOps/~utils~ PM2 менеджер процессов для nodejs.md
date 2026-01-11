---
create: 2025-08-11
idnote: gOWzVdzN3u
vault: dev
title: PM2 Prozessmanager für NodeJs
path:
tags:
  - pm2
  - utilitäten
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
PM2 (Process Manager 2) ist ein leistungsstarker Prozessmanager für Node.js, der es ermöglicht, Server einfach zu verwalten, indem er deren automatischen Neustart, Überwachung und Lastmanagement gewährleistet.

PM2 ermöglicht es, Anwendungen im Hintergrund auszuführen, ihren Lebenszyklus zu verwalten und sorgt für hohe Verfügbarkeit und Skalierbarkeit.


`ecosystem.config.js` ist eine Konfigurationsdatei für PM2, die es ermöglicht, die Startparameter von Anwendungen, ihre Umgebung und andere Einstellungen zu beschreiben. Diese legen wir im Stammverzeichnis des Projekts ab.

Beispiel für die Datei
```js
module.exports = {
  apps: [
    {
      name: "webpack-dev-server",
      cwd: "/Volumes/SSD/projects/yvelious_github_io", // ← Pfad zum Projekt auf einer Remote-Maschine
      script: "npm",
      args: "run server",
      env: {
        NODE_ENV: "server",
      },
      watch: false, // watch wird noch in der webpack-Konfiguration verwendet
    },
  ],
};
```


### Nutzen von PM2

Es kann im Hintergrund arbeiten, was es ermöglicht, Server und Anwendungen im Hintergrund auszuführen, auch nach dem Schließen des Terminals.
PM2 sorgt für den automatischen Neustart von Anwendungen im Falle eines Ausfalls, was die Zuverlässigkeit der Server erhöht.
Es kann so konfiguriert werden, dass es beim Systemstart ausgeführt wird, was es ermöglicht, Anwendungen nach einem Serverneustart automatisch zu starten.
Über die Befehlszeile können Prozesse verwaltet, Informationen über den Status der Anwendungen abgerufen, Protokolle angesehen und andere Operationen wie Neustart oder Stopp von Anwendungen durchgeführt werden.


- `pm2 logs` — Protokolle des Servers anzeigen.
- `pm2 monit` — Überwachung des Serverstatus.
- `pm2 restart yvelious-dev-server` — manuelles Neustarten.
- `pm2 start yvelious-dev-server` — starten
- `pm2 stop yvelious-dev-server` — stoppen
- `pm2 delete yvelious-dev-server` — löschen
- `pm2 save && pm2 startup` — automatischer Start beim Systemstart.