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

When working with GitHub Actions, it's common to have multiple workflows set up in a repository, and it's important that they are executed in a specific order.

For example:
- first, `build` should run
- and only after it successfully completes should `deploy` be triggered

However, by default, if multiple workflows are triggered by the same event (for example, a `push` to the `main` branch), they are executed **in parallel**. This can lead to issues if the second workflow depends on the result of the first.

Let's explore how to properly configure **sequential workflow execution in GitHub Actions**.

## The Parallel Execution Problem

**Suppose we have two workflows:**
- `build.yml`
- `deploy.yml`

Both are set to trigger on the `push` event to the `main` branch:

```yaml
on:
  push:
    branches: [ main ]
```

With every `git push`, they will start executing simultaneously.  
If `deploy` relies on the result of `build`, this could lead to errors:

- the deployment may start before the build is completed
- artifacts may not be ready
- tests may still be running
- the environment may not be ready

Therefore, the order of execution needs to be defined explicitly.

## Sequential Execution Through `workflow_run`

In GitHub Actions, there is a special event called `workflow_run`, which allows one workflow to start after another has completed.
### First Workflow — `build.yml`

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  ...
```

This workflow runs on every push to `main` and executes jobs such as building and testing.

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

This workflow is triggered **only after the completion** of the `Build` workflow, with the condition that `Build` has succeeded.

## How This Works

Now the process looks like this:

1. A `git push` is made to the `main` branch
2. The `Build` workflow is triggered
3. After its completion, GitHub automatically starts `Deploy`
4. If `Build` fails, `Deploy` will not run

Thus, a strict sequence is achieved:

```
push → build → deploy
```

## When to Use This Approach

Sequential workflow execution is beneficial when:

- deployment depends on the build
- tests must finish before publishing
- there are database migrations
- multiple stages in the pipeline are used

## In Summary

If multiple GitHub Actions workflows are used in a project and there is a logical dependency between them, they should be executed sequentially.
The best and official way to achieve this is to use the `workflow_run` event.

This allows:
- to guarantee the order of execution
- to protect production from incorrect deployments
- to build a complete CI/CD pipeline