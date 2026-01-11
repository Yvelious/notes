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
![[githubaction-sequential.png]]

When working with GitHub Actions, a situation often arises where multiple workflows are set up in a repository, and it is important for them to execute in a specific order.

For example:
- first, `build` should run
- and only after its successful completion, `deploy` should start

However, by default, if multiple workflows are subscribed to the same event (e.g., `push` to the `main` branch), they are executed **in parallel**. This can lead to problems if the second workflow depends on the result of the first.

Let’s examine how to correctly set up **sequential execution of workflows in GitHub Actions**.

## The Problem of Parallel Execution

**Suppose we have two workflows:**
1
- `build.yml`
- `deploy.yml`

Both are configured to trigger on the `push` event to the `main` branch:

```
on:
  push:
    branches: [ main ]

```

On each `git push`, they will start simultaneously.  
If `deploy` depends on the result of `build`, this can cause errors:

- deployment may start before the build is complete
- artifacts may not be ready
- tests may still be running
- the environment may not be ready

Therefore, the order of execution needs to be explicitly defined.

## Sequential Execution via `workflow_run`

In GitHub Actions, there is a special event called `workflow_run` that allows one workflow to start after another has completed.

### First Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...

```

This workflow runs on every push to `main` and executes jobs, for example, building and testing.

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

This workflow only starts **after the `Build` workflow has finished**. It also has the condition that `Build` must have completed successfully.

## How It Works

Now the process looks like this:

1. We `git push` to the `main` branch
2. The `Build` workflow is triggered
3. After it completes, GitHub automatically starts `Deploy`
4. If `Build` fails — `Deploy` will not run

Thus, a strict sequence is achieved:

```
push → build → deploy
```

## When to Use This Approach

Sequential workflow execution is useful if:

- deployment depends on the build
- tests need to complete before publishing
- there are database migrations
- multiple pipeline stages are used

## In Summary

If a project uses multiple GitHub Actions workflows and there are logical dependencies between them, they need to be executed sequentially.
The best and official way to do this is by using the `workflow_run` event.

This allows for:
- guaranteeing the order of execution
- protecting production from incorrect deployments
- building a full-fledged CI/CD pipeline