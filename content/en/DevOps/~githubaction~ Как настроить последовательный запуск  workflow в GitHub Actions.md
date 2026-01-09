---
create: 2026-01-09
idnote: kAqzmvKP1O
vault: dev
title: How to Set Up Sequential Workflow Execution in GitHub Actions
path:
tags:
  - ci
  - git
  - githubaction
status:
rating:
Language: en
published: 2026-01-09
symlink:
symlinkchapter: DevOps
---
![[ChatGPT Image Jan 9, 2026, 05_43_52 PM.png]]

When working with GitHub Actions, you often encounter a situation where multiple workflows are set up in a repository, and it is important for them to execute in a specific order.

For example:
- first, `build` should run
- and only after its successful completion should `deploy` be triggered

However, by default, if multiple workflows are subscribed to the same event (for example, `push` to the `main` branch), they are triggered **in parallel**. This can lead to problems if the second workflow depends on the result of the first.

Let's explore how to properly set up **sequential workflow execution in GitHub Actions**.

## The Problem of Parallel Execution

Suppose we have two workflows:

- `build.yml`
- `deploy.yml`

Both are configured for the `push` event to the `main` branch:

```yaml
on:
  push:
    branches: [ main ]
```

With each `git push`, they will run simultaneously.  
If `deploy` depends on the result of `build`, this can lead to errors:

- deployment may start before the build is complete
- artifacts may not be ready
- tests may still be running
- the environment may not be ready

Therefore, the order of execution needs to be explicitly defined.

## Sequential Execution via `workflow_run`

In GitHub Actions, there is a special event called `workflow_run` that allows one workflow to run after another has completed.

### First Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...
```

This workflow is triggered on every push to `main` and executes jobs, such as building and testing.

### Second Workflow — `deploy.yml`

```yaml
name: Deploy

on:
  workflow_run:
    workflows: ["Build"]
    types:
      - completed

jobs:
  deploy:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    ...
```

This workflow runs **only after the completion** of the `Build` workflow, and it also has the condition that `Build` must have completed successfully.

## How It Works

Now the process looks like this:

1. We perform a `git push` to the `main` branch
2. The `Build` workflow is triggered
3. After its completion, GitHub automatically triggers `Deploy`
4. If `Build` fails, `Deploy` will not run

Thus, a strict sequence is achieved:

```
push → build → deploy
```

## When to Use This Approach

Sequential workflow execution is useful if:

- deployment depends on the build
- tests must finish before publication
- there are database migrations
- multiple stages in the pipeline are used

## In Summary

If a project uses multiple GitHub Actions workflows and there are logical dependencies between them, they must be executed sequentially.  
The best and official way to do this is to use the `workflow_run` event.

This allows you to:
- guarantee the order of execution
- protect production from incorrect deployments
- build a full-fledged CI/CD pipeline