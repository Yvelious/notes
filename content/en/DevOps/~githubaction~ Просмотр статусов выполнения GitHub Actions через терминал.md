---
create: 2026-01-07
idnote: 3In99qSMv0
vault: dev
title: Viewing GitHub Actions Statuses via Terminal
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

Accessing GitHub through the web interface every time to track GitHub Actions execution is not very convenient — especially if you frequently push and want to immediately see the CI result.

It's much more convenient to monitor GitHub Actions execution directly from the terminal without opening a browser. Fortunately, GitHub provides an official tool for this — **GitHub CLI**.

In this article, we will cover how to view the status of GitHub Actions, logs, and progress right from the console.


## Installing GitHub CLI

First, you need to install GitHub CLI.

Official website:  
[https://cli.github.com/](https://cli.github.com/)

On macOS, the easiest way to install it is via Homebrew:
```bash
brew install gh
```

After installation, you need to authenticate into your GitHub account:
```bash
gh auth login
```

Choose the authentication method:
- GitHub.com
- HTTPS
- Login with browser

After successful authentication, the CLI will gain access to your repositories and GitHub Actions.


## Viewing the List of GitHub Actions

To view the list of all runs of GitHub Actions in a repository, use the command:
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
However, often you only need to see the latest runs and only the necessary fields.

### Outputting the Last N Runs

If, for example, you need to output the **5 latest runs**, you can use the `-L` flag:

```bash
gh run list -L 5
```


### Outputting Only the Required Fields

GitHub CLI allows you to get data in JSON format and format output using the built-in JMESPath query (`-q`).

For example, to output the **5 latest runs** with fields:

- `databaseId`
- `status`
- `conclusion`
- `workflowName`

you can use the command:

```bash
gh run list -L 5 \   --json databaseId,status,conclusion,workflowName \   -q '.[] | "\(.status) | \(.conclusion // "null") | \(.workflowName) | #\(.databaseId)"'
```

As a result, a compact list will be displayed in the terminal in a convenient format:

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
- `branch` — the branch from which the workflow was triggered
- `displayTitle` — the display title of the run

Thus, with `--json` and `-q`, you can flexibly configure the output and get exactly the information you need for monitoring GitHub Actions right from the terminal.

### Filtering by Status

You can output only those workflows that are currently running:
```bash
gh run list --status in_progress
```

Similarly, you can view only those waiting in the queue:
```bash
gh run list --status queued
```


## Viewing Details of a Specific Run

Each run has its own `id`. You can get it from the output of the `gh run list` command.
To see how a specific GitHub Action has executed:
```bash
gh run view --job=59722592906
```

The terminal will display all steps of the workflow.
To view detailed logs for each step, use the `--log` flag:
```bash
gh run view --log --job=59722592906
```


## Viewing the Execution of a Specific Workflow in Real-Time

To monitor the execution of a GitHub Action in real-time, use the command:
```bash
gh run watch $(gh run list -L 1 --json databaseId -q ".[0].databaseId")
```

![[Pasted image 20260107205817.png | 700]]

This command:
- takes the last triggered workflow
- connects to it
- shows the progress and logs in real-time

## Automating Monitoring of GitHub Actions

The problem is that GitHub CLI does not stream events in real-time. It works through polling — that is, it shows the current state at the time of the request.
`gh run watch` simply polls the GitHub API at a given interval and updates the output. This is not push notifications but a periodic status check.
This command is convenient when we monitor a specific workflow run. However, if we need to monitor the status of 5 or 10 workflows that are running, in progress, or in queue, then this command doesn't suit our needs. For that, we can use the `watch` utility, which allows running any command every N seconds and updating the output in the terminal.

## Using the watch Utility for Automatic Updates of GitHub Actions List

`watch` is a utility that allows you to execute a command every N seconds and update the output in the terminal.
On macOS, it can be installed via Homebrew:
```bash
brew install watch
```
After that, you can run, for example:
`watch -n 5 'gh run list -L 5'`

![[Pasted image 20260108200130.png | 900]]

**This command:**
- executes `gh run list -L 5` every 5 seconds
- shows the 5 latest GitHub Action runs in the terminal
- automatically updates the screen

The `-L 5` flag means we are interested in the last 5 workflows.
As a result, we get automatic updates of the GitHub Actions list right in the terminal.

## In Summary

**Using GitHub CLI and standard console utilities, you can:**
- view the list of GitHub Actions runs
- filter by status
- view logs
- monitor execution in real-time
- organize automatic monitoring through `watch`
    
**This allows for much faster and more convenient work with CI, without constantly switching to the browser.**


> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## References
> ------------
> 
> 
> ## Zero-links
> ----
> [[00 GITHUBACTION]]