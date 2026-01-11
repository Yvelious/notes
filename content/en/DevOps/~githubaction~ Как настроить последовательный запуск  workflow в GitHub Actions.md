---
create: 2026-01-09
idnote: kAqzmvKP1O
vault: dev
title: How to Configure Sequential Execution of Workflows in GitHub Actions
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
![[githubaction-sequential.png]]

When working with GitHub Actions, there often arises a situation where multiple workflows are configured in the repository, and it's important for them to be executed in a specific order.

For example:
- first `build` should be executed
- and only after its successful completion should `deploy` be triggered

However, by default, if multiple workflows are subscribed to the same event (like `push` to the `main` branch), they run **in parallel**. This can lead to issues if the second workflow depends on the result of the first.

Let's explore how to properly configure **sequential execution of workflows in GitHub Actions**.

## The Problem of Parallel Execution

**Suppose we have two workflows:**
- `build.yml`
- `deploy.yml`

Both are configured for the `push` event on the `main` branch:

```
on:
  push:
    branches: [ main ]

```

With every `git push`, they will run simultaneously.  
If `deploy` relies on the results of `build`, this can lead to errors:

- deployment may begin before the build is complete
- artifacts may not be ready
- tests could still be running
- the environment may not be ready

Therefore, the order of execution must be explicitly defined.

## Sequential Execution via `workflow_run`

GitHub Actions provides a special event, `workflow_run`, which allows one workflow to be triggered after the completion of another.

### First Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...

```

This workflow runs on every push to `main` and executes jobs, such as building and testing.

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

This workflow runs **only after the completion** of the `Build` workflow, and it is conditioned on the `Build` workflow's successful completion.

## How It Works

Now the process looks like this:

1. We make a `git push` to the `main` branch
2. The `Build` workflow is triggered
3. After its completion, GitHub automatically triggers `Deploy`
4. If `Build` fails, `Deploy` will not run

Thus, a strict sequence is achieved:

```
push → build → deploy
```

## When to Use This Approach

Sequential execution of workflows is beneficial when:

- deployment depends on the build
- tests must finish before publication
- there are database migrations
- several stages in the pipeline are used

## In Summary

If a project uses multiple GitHub Actions workflows and there are logical dependencies among them, they need to be executed sequentially.
The best and official way to achieve this is to use the `workflow_run` event.

This allows:
- to guarantee the execution order
- to protect production from incorrect deployments
- to build a complete CI/CD pipeline