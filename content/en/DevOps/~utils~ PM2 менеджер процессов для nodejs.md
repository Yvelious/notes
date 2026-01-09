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
PM2 (Process Manager 2) is a powerful process manager for Node.js that allows you to easily manage servers, providing automatic restarts, monitoring, and load management.

PM2 allows you to run applications in the background, manage their lifecycle, and ensures high availability and scalability.


`ecosystem.config.js` is the PM2 configuration file that allows you to describe application startup parameters, their environment, and other settings. It is placed in the root of the project.

Example file
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
      watch: false, // watch has yet in webpack config
    },
  ],
};
```


### Benefits of PM2

It can run in the background, allowing servers and applications to run even after the terminal is closed.
PM2 ensures automatic restarts of applications in case of failure, increasing server reliability.
You can configure it to start at system boot, which allows applications to be launched automatically after a server reboot.
You can manage processes from the command line, get information about the state of applications, view logs, and perform other operations such as restarting or stopping applications.


- `pm2 logs` — view server logs.
- `pm2 monit` — monitor server status.
- `pm2 restart yvelious-dev-server` — restart manually.
- `pm2 start yvelious-dev-server` — start
- `pm2 stop yvelious-dev-server` — stop
- `pm2 delete yvelious-dev-server` — delete
- `pm2 save && pm2 startup` — auto-start on system boot.