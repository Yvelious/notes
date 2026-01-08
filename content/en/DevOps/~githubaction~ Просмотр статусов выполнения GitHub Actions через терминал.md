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

It is not very convenient to log into GitHub through the web interface every time to track the execution of GitHub Actions — especially if you frequently push and want to see the CI results immediately.

It is much more convenient to monitor GitHub Actions execution directly from the terminal without opening a browser. Fortunately, GitHub provides an official tool for this — **GitHub CLI**.

In this article, we will discuss how to view the status of GitHub Actions, logs, and execution progress directly from the console.


## Installing GitHub CLI

First, you need to install GitHub CLI.

Official website:  
[https://cli.github.com/](https://cli.github.com/)

On macOS, the easiest way to install it is via Homebrew:
```bash
brew install gh
```

After installation, you need to authenticate with your GitHub account:
```bash
gh auth login
```

Choose the authentication method:
- GitHub.com
- HTTPS
- Login with browser

After successful authentication, the CLI will gain access to your repositories and GitHub Actions.


## Viewing the List of GitHub Actions

To view the list of all GitHub Actions runs in a repository, use the command:
```bash
gh run list
```

![[Pasted image 20260108200706.png]]

It will show the latest runs with information about:
- status (`queued`, `in_progress`, `completed`)
- result (`success`, `failure`, `cancelled`)
- workflow
- branch
- etc.

## Filtering and Formatting Output

By default, the `gh run list` command outputs the list of runs in a standard tabular format.  
However, often you need to see only the latest runs and only the necessary fields.

### Output the Last N Runs

If, for example, you need to output **5 last runs**, you can use the `-L` flag:

```bash
gh run list -L 5
```


### Output Only Required Fields

GitHub CLI allows you to get data in JSON format and format the output using the built-in JMESPath query (`-q`).

For example, to output **5 last runs** with the fields:

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

You can specify any available fields in `--json`. The most useful ones include:
- `databaseId` — unique ID of the run
- `status` — current status: `queued`, `in_progress`, `completed`
- `conclusion` — execution result: `success`, `failure`, `cancelled` (only if `completed`)
- `workflowName` — name of the workflow
- `branch` — branch from which the workflow was triggered
- `displayTitle` — displayed name of the run
    

Thus, using `--json` and `-q`, you can flexibly configure the output and get exactly the information you need for monitoring GitHub Actions directly from the terminal.

### Filtering by Status

You can output only those workflows that are currently running:
```bash
gh run list --status in_progress
```

Similarly, you can view only those that are queued:
```bash
gh run list --status queued
```


## Viewing Details of a Specific Run

Each run has its own `id`. You can take it from the output of the `gh run list` command.
To see how a specific GitHub Action executed:
```bash
gh run view --job=59722592906
```

All steps of the workflow will be displayed in the terminal.
To view detailed logs of each step, use the `--log` flag:
```bash
gh run view --log --job=59722592906
```


## Viewing the Execution of a Specific Workflow in Real Time

To monitor the execution of a GitHub Action in real time, you can use the command:
```bash
gh run watch $(gh run list -L 1 --json databaseId -q ".[0].databaseId")
```

![[Pasted image 20260107205817.png | 700]]

This command:
- takes the last executed workflow
- connects to it
- shows the progress of execution and logs in real time

## Automating Monitoring of GitHub Actions

The problem is that GitHub CLI does not stream events in real time. It works through polling — that is, it shows the current state at the time of the request.
`gh run watch` simply polls the GitHub API at a certain interval and updates the output. This is not push notifications, but periodic status checks.
This command is convenient when we are monitoring a specific workflow that has been started. But if we need to monitor the status of 5 or 10 workflows that are running, in progress, or queued, then this command is not particularly suitable for our goals. For this, we can use the `watch` utility, which allows you to run any command every N seconds and update the output in the terminal.


## Using the watch Utility for Automatic Updates of GitHub Actions List

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
- shows the 5 last GitHub Action runs in the terminal
- automatically updates the screen

The `-L 5` flag means that we are interested in the 5 latest workflows.
As a result, we get automatic updates of the GitHub Actions list directly in the terminal.

## In Summary

**Using GitHub CLI and standard console utilities, you can:**
- view the list of GitHub Actions runs
- filter by status
- view logs
- monitor execution in real time
- organize automatic monitoring through `watch`
    
**This allows you to work with CI much faster and more conveniently, without constantly switching to the browser.**