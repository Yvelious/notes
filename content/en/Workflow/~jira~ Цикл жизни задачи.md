---
created: 2025-03-11
idnote: 7Gzdydj2NN
vault: dev
title: Task Lifecycle
path:
tags:
  - jira
  - workflow
  - management
symlink:
published: 2025-03-12
symlinkchapter: Workflow
date: 2025-02-06
create: 2025-03-12
Language: en
---
![[Pasted image 20250316172014.png]]

## Task Lifecycle

The task lifecycle is a sequence of states through which a task passes, starting from its creation and ending at completion.

There is no single standard that is accepted by all companies. Each company can define its own task lifecycle that fits its processes and development methodology.

Below is an example of the task lifecycle that I use in my work. It is not mandatory and can be altered according to the project's needs.

**The task lifecycle consists of the following states:**
1. **Created** - the task is created and not assigned to anyone. It lies in the general task list (Backlog).
2. **To Do** - the task is ready for execution and has an assignee. It is waiting for its turn.
3. **In Progress** - the task is in progress.
4. **Ready for Review** - the task is completed and ready for review.
5. **In Review** - the task is under review.
6. **Ready for Testing** - the task has been reviewed and is ready for testing.
7. **In Testing** - the task is being tested.
8. **Ready for Deploy** - the task has been tested and is ready for deployment.
9. **In Deploy** - the task is in production.
10. **Done** - the task is completed.

This is the sequence of states through which a task passes, from creation to completion.

Additionally, there are states that can be added to the task at any stage of its lifecycle regardless of its current state:
1. **Blocked** - the task is blocked and cannot be executed for some reason. Usually occurs when the execution of a task depends on another task that has not yet been completed.
2. **On Hold** - the task is on hold. For example, if a higher priority task has come up.
3. **Canceled** - the task is canceled. If the task is no longer relevant.

> [!hidden-in-public]
> ## Draft
> ---
> **N.B.**
> Testing does not always occur before the review. In some companies, testing happens after the review - it all depends on the processes and development methodology. 
> 
> ✅ If the reviewer not only checks the code for standards and efficiency but also analyzes functionality in-depth, then testing occurs **after the review**.
> 
> ✅ If the reviewer primarily evaluates the code for clarity and efficiency, **without delving into its functionality**, then testing may take place **before the review**. 
> 
> Thus, the order depends on the reviewer's role in the process and the quality requirements for the code.
> 
> Personally, I believe that the reviewer should check the code for compliance with standards and efficiency, whereas its functionality is the tester's responsibility.
> 
> Typically, the reviewer is a **Senior Developer**, whose time is more valuable than that of the tester. Moreover, they have their own tasks and should not waste work time on testing instead of focusing on more priority tasks.
> 
> Therefore, the optimal process is that **the reviewer checks the code quality, and the tester checks its functionality**.
> 

> [!hidden-in-public]
> ## References
> ---
> 1. https://www.atlassian.com/software/jira/guides/workflows/tutorials#create-new-workflow
> ## Keywords
> ----
> workflow scheme in a Jira 1
> 
> ## Zero
> ----
> [[00 JIRA]]