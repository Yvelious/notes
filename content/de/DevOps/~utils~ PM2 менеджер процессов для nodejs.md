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
PM2 (Process Manager 2) ist ein leistungsstarker Prozessmanager für Node.js, der die einfache Verwaltung von Servern ermöglicht und deren automatischen Neustart, Überwachung und Lastenverwaltung sicherstellt.

PM2 ermöglicht es, Anwendungen im Hintergrund auszuführen, ihren Lebenszyklus zu verwalten und bietet hohe Verfügbarkeit und Skalierbarkeit.


`ecosystem.config.js` ist die Konfigurationsdatei von PM2, die es ermöglicht, die Startparameter von Anwendungen, deren Umgebung und weitere Einstellungen zu beschreiben. Sie sollte im Wurzelverzeichnis des Projekts abgelegt werden.

Beispiel einer Datei
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
      watch: false, // watch ist bereits in der webpack-Konfiguration aktiviert
    },
  ],
};
```


### Was bringt PM2

Es kann im Hintergrund arbeiten, was es ermöglicht, Server und Anwendungen im Hintergrund auszuführen, selbst nach dem Schließen des Terminals.
PM2 sorgt dafür, dass Anwendungen im Falle eines Absturzes automatisch neu gestartet werden, was die Zuverlässigkeit der Server erhöht.
Man kann es so einstellen, dass es beim Systemstart gestartet wird, was es ermöglicht, Anwendungen nach einem Neustart des Servers automatisch zu starten.
Über die Kommandozeile kann man Prozesse verwalten, Informationen über den Zustand der Anwendungen abrufen, Protokolle einsehen und weitere Operationen durchführen, wie den Neustart oder das Stoppen von Anwendungen.


- `pm2 logs` — Protokolle des Servers anzeigen.
- `pm2 monit` — Überwachung des Serverzustands.
- `pm2 restart yvelious-dev-server` — manuelles Neustarten.
- `pm2 start yvelious-dev-server` — starten
- `pm2 stop yvelious-dev-server` — stoppen
- `pm2 delete yvelious-dev-server` — löschen
- `pm2 save && pm2 startup` — Autostart beim Systemstart.