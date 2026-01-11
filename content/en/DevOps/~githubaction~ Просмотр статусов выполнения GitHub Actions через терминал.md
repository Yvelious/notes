---
create: 2026-01-07
idnote: 3In99qSMv0
vault: dev
title: Viewing GitHub Actions Execution Status via Terminal
path:
tags:
  - git
  - ci
status:
rating:
published: 2026-01-08
symlink:
symlinkchapter: DevOps
Language: en
---

![[Pasted image 20260108204819.png]]

It’s not very convenient to log into GitHub through the web interface every time just to track the execution of GitHub Actions — especially if you often push and want to see the CI results immediately.

It is much more convenient to monitor GitHub Actions execution directly from the terminal without opening a browser. Fortunately, GitHub provides an official tool for this — **GitHub CLI**.

In this article, we will explore how to check the status of GitHub Actions, logs, and execution progress directly from the console.

## Installing GitHub CLI

First, you need to install GitHub CLI.

Official website:  
[https://cli.github.com/](https://cli.github.com/)

On macOS, the easiest way to install it is through Homebrew:
```bash
brew install gh
```

After installation, you need to authenticate in your GitHub account:
```bash
gh auth login
```

Choose the authentication method:
- GitHub.com
- HTTPS
- Login with browser

After successful authentication, the CLI will gain access to your repositories and GitHub Actions.

## Viewing the List of GitHub Actions

To view the list of all GitHub Actions runs in the repository, use the command:
```bash
gh run list
```

![[Pasted image 20260108200706.png]]

This will show the most recent runs with information about:
- status (`queued`, `in_progress`, `completed`)
- result (`success`, `failure`, `cancelled`)
- workflow
- branch
- etc.

## Filtering and Formatting Output

By default, the command `gh run list` outputs the list of runs in a standard tabular format.  
However, often you only need to see the latest runs and specific fields.

### Output Last N Runs

If you need to display **the last 5 runs**, you can use the `-L` flag:
```bash
gh run list -L 5
```

### Output Only Desired Fields

GitHub CLI allows you to retrieve data in JSON format and format the output using the built-in JMESPath query (`-q`).

For example, to output **the last 5 runs** with the fields:

- `databaseId`
- `status`
- `conclusion`
- `workflowName`

you can use the command:

```bash
gh run list -L 5 \   --json databaseId,status,conclusion,workflowName \   -q '.[] | "\(.status) | \(.conclusion // "null") | \(.workflowName) | #\(.databaseId)"'
```

As a result, a compact list in a convenient format will be displayed in the terminal:

```bash
in_progress | null    | build-and-test | #59722592906 
completed   | success | deploy         | #59722592810 
completed   | failure | lint           | #59722592744
```

### Available Fields for Output

In `--json`, you can specify any available fields. The most useful ones are:
- `databaseId` — unique ID of the run
- `status` — current status: `queued`, `in_progress`, `completed`
- `conclusion` — result of execution: `success`, `failure`, `cancelled` (only if `completed`)
- `workflowName` — name of the workflow
- `branch` — the branch from which the workflow was launched
- `displayTitle` — display name of the run

Thus, using `--json` and `-q`, you can flexibly configure the output and get exactly the information you need to monitor GitHub Actions directly from the terminal.

### Filtering by Status

You can output only those workflows that are currently running:
```bash
gh run list --status in_progress
```

Similarly, you can view only those that are pending in the queue:
```bash
gh run list --status queued
```

## Viewing Details of a Specific Run

Each run has its own `id`. You can obtain it from the output of the `gh run list` command. To view how a specific GitHub Action executed:
```bash
gh run view --job=59722592906
```

The terminal will display all the steps of the workflow. To view detailed logs of each step, use the `--log` flag:
```bash
gh run view --log --job=59722592906
```

## Viewing Execution of a Specific Workflow in Real-Time

To monitor the execution of GitHub Actions in real-time, you can use the command:
```bash
gh run watch $(gh run list -L 1 --json databaseId -q ".[0].databaseId")
```

![[Pasted image 20260107205817.png | 700]]

This command:
- takes the last launched workflow
- connects to it
- shows the execution progress and logs in real-time

## Automating Monitoring of GitHub Action

The problem is that GitHub CLI does not stream events in real-time. It works through polling — that is, it shows the current state at the moment of the request.  
`gh run watch` simply polls the GitHub API at a certain interval and updates the output. This is not push notifications but rather a periodic status check.  
This command is convenient when we are monitoring a specific run in the workflow. But if we need to monitor the status of 5 or 10 workflows that are running, in progress, or in the queue, then this command is not very suitable for our purposes. For that, we can use the `watch` utility, which allows running any command every N seconds and updating the output in the terminal.

## Using the watch Utility to Automatically Update the List of GitHub Actions

`watch` is a utility that allows you to run a command every N seconds and update the output in the terminal.  
On macOS, it can be installed via Homebrew:
```bash
brew install watch
```
After that, you can run, for example:
`watch -n 5 'gh run list -L 5'`

![[Pasted image 20260108200130.png | 900]]

**This command:**
- executes `gh run list -L 5` every 5 seconds
- shows the 5 most recent GitHub Action runs in the terminal
- automatically updates the screen

The flag `-L 5` means that we are interested in the last 5 workflows.  
As a result, we get an automatically updated list of GitHub Actions right in the terminal.

## In Summary

**By using GitHub CLI and standard console utilities, you can:**
- view the list of GitHub Actions runs
- filter by status
- view logs
- monitor execution in real-time
- organize automatic monitoring via `watch`

**This allows you to work with CI much faster and more conveniently without constantly switching to the browser.**