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
  - devops
status:
rating:
Language: en
published: 2026-01-09
symlink:
symlinkchapter: DevOps
---
![[githubaction-sequential.png]]

When working with GitHub Actions, there is often a situation where multiple workflows are set up in a repository, and it's important that they execute in a specific order.

For example:
- the `build` workflow should run first
- and only after its successful completion should the `deploy` workflow start

However, by default, if multiple workflows are triggered by the same event (e.g., `push` to the `main` branch), they run **in parallel**. This can lead to issues if the second workflow depends on the result of the first.

Let's discuss how to properly set up **sequential workflow execution in GitHub Actions**.

## The Problem of Parallel Execution

**Suppose we have two workflows:**
- `build.yml`
- `deploy.yml`

Both are set to trigger on the `push` event to the `main` branch:

```yaml
on:
  push:
    branches: [ main ]
```

With each `git push`, they will run simultaneously.  
If the `deploy` workflow depends on the results of the `build` workflow, it can lead to errors:

- deployment may begin before the build is complete
- artifacts may not be ready
- tests may still be running
- the environment may not be prepared

Therefore, the order of execution needs to be explicitly specified.

## Sequential Execution Using `workflow_run`

In GitHub Actions, there is a special event called `workflow_run` that allows one workflow to be triggered after another one completes.
### First Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...
```

This workflow is triggered on every push to `main` and executes jobs such as building and testing.

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

This workflow runs **only after the completion** of the `Build` workflow, with the condition that `Build` has successfully completed.

## How It Works

Now the process looks like this:

1. We perform `git push` to the `main` branch
2. The `Build` workflow is triggered
3. After its completion, GitHub automatically triggers `Deploy`
4. If `Build` fails, `Deploy` will not run

This ensures a strict sequence:

```
push → build → deploy
```

## When to Use This Approach

Sequential workflow execution is useful when:

- deployment depends on the build
- tests must complete before publishing
- there are database migrations
- multiple pipeline stages are utilized

## In Summary

If a project uses multiple GitHub Actions workflows with logical dependencies between them, they need to be executed sequentially.
The best and official way to achieve this is by using the `workflow_run` event.

This allows for:
- guaranteeing the order of execution
- protecting production from incorrect deployments
- building a complete CI/CD pipeline

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