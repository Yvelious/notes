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

When working with GitHub Actions, it's common to have multiple workflows set up in a repository, and it's important for them to execute in a specific order.

For example:
- first, `build` must run
- only after its successful completion should `deploy` be triggered

However, by default, if multiple workflows are subscribed to the same event (e.g., `push` to the `main` branch), they run **in parallel**. This can lead to issues if the second workflow depends on the result of the first.

Let's see how to properly configure **sequential workflow execution in GitHub Actions**.

## The Problem of Parallel Execution

**Assume we have two workflows:**
- `build.yml`
- `deploy.yml`

Both are set to trigger on the `push` event to the `main` branch:

```
on:
  push:
    branches: [ main ]
```

On every `git push`, they will run simultaneously.  
If `deploy` depends on the result of `build`, it can cause errors:

- deployment might start before the build is completed,
- artifacts may not be ready,
- tests might still be running,
- the environment may not be prepared.

Therefore, the order of execution needs to be explicitly defined.

## Sequential Execution via `workflow_run`

In GitHub Actions, there is a special event called `workflow_run` that allows one workflow to be triggered after another has completed.

### First Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...
```

This workflow runs on every push to `main` and performs jobs, such as building and testing.

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

This workflow runs **only after the `Build` workflow has completed** and only if `Build` has finished successfully.

## How It Works

Now the process looks like this:

1. Make a `git push` to the `main` branch.
2. The `Build` workflow starts.
3. After it completes, GitHub automatically triggers `Deploy`.
4. If `Build` fails, `Deploy` will not run.

Thus, strict sequence is achieved:

```
push → build → deploy
```

## When to Use This Approach

Sequential workflow execution is helpful when:

- deployment depends on the build,
- tests need to finish before publishing,
- there are database migrations,
- multiple stages in the pipeline are involved.

## In Summary

If a project uses multiple GitHub Actions workflows and there are logical dependencies between them, they must be executed sequentially.
The best and official way to do this is by using the `workflow_run` event.

This allows:
- ensuring the order of execution,
- protecting production from incorrect deployments,
- building a complete CI/CD pipeline.