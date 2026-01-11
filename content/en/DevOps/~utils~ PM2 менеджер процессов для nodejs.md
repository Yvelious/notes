---
create: 2025-08-11
idnote: gOWzVdzN3u
vault: dev
title: PM2 Process Manager for NodeJs
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
Language: en
---


## Notes
----
PM2 (Process Manager 2) is a powerful process manager for Node.js that allows you to easily manage servers by providing automatic restarts, monitoring, and load management.

PM2 allows you to run applications in the background, manage their lifecycle, and ensures high availability and scalability.


`ecosystem.config.js` is the PM2 configuration file that describes the launch parameters of applications, their environment, and other settings. We place it in the root of the project.

Example file:
```js
module.exports = {
  apps: [
    {
      name: "webpack-dev-server",
      cwd: "/Volumes/SSD/projects/yvelious_github_io", // ← path to the project in remote machine
      script: "npm",
      args: "run server",
      env: {
        NODE_ENV: "server",
      },
      watch: false, // watch has to be configured in webpack
    },
  ],
};
```


### Benefits of PM2

It can run in the background, allowing servers and applications to run even after the terminal is closed.
PM2 provides automatic restarts of applications in case of failure, which increases server reliability.
It can be configured to start at system boot, allowing applications to automatically start after rebooting the server.
From the command line, you can manage processes, get information about the state of applications, view logs, and perform other operations like restarting or stopping applications.


- `pm2 logs` — view server logs.
- `pm2 monit` — monitor the state of servers.
- `pm2 restart yvelious-dev-server` — restart manually.
- `pm2 start yvelious-dev-server` — start.
- `pm2 stop yvelious-dev-server` — stop.
- `pm2 delete yvelious-dev-server` — delete.
- `pm2 save && pm2 startup` — enable automatic start at system boot.