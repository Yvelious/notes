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

The task lifecycle is a sequence of states that a task goes through, starting from the moment of creation to the moment of completion.

There is no common standard that is accepted by all companies. Each company can define its own task lifecycle that will align with their processes and development methodology.

Below is an example of the task lifecycle that I use in my work. It is not mandatory and can be modified according to the needs of the project.

**The task lifecycle consists of the following states:**
1. **Created** - the task has been created and is not yet assigned to anyone. It lies in the general task list (Backlog).
2. **To Do** - the task is ready to be executed, and an assignee has been assigned to it. It is waiting for its turn. 
3. **In Progress** - the task is in the process of execution.
4. **Ready for Review** - the task is completed and ready for review.
5. **In Review** - the task is under review.
6. **Ready for Testing** - the task has been reviewed and is ready for testing.
7. **In Testing** - the task is being tested.
8. **Ready for Deploy** - the task has been tested and is ready for deployment.
9. **In Deploy** - the task is in production.
10. **Done** - the task is completed.

This is the sequence of states that a task goes through, starting from the moment of creation to the moment of completion. 

There are also states that can be added to a task at any stage of its lifecycle regardless of its current state:
1. **Blocked** - the task is blocked and cannot be executed for some reason. This usually happens when the execution of the task depends on another task that has not been completed yet.
2. **On Hold** - the task is paused. For example, if a more prioritized task has come up.
3. **Canceled** - the task is canceled. If the task is no longer relevant.

> [!hidden-in-public]
> ## Draft
> ---
> **N.B.**
> Testing does not always occur before the review. In some companies, testing occurs after the review – it all depends on the processes and development methodology.
> 
> ✅ If the reviewer not only checks the code for compliance with standards and optimization but also analyzes functionality more thoroughly, then testing occurs **after the review**.
> 
> ✅ If the reviewer mainly evaluates the code from the perspective of cleanliness and efficiency, **without delving into its functionality**, then testing can take place **before the review**.
> 
> Thus, the order depends on the role of the reviewer in the process and the quality requirements for the code.
> 
> Personally, I believe that the reviewer should check the code for compliance with standards and optimization, while its functionality is the responsibility of the tester.
> 
> Generally, the reviewer is a **Senior Developer**, whose time is more valuable than that of a tester. Additionally, they have their own tasks and should not spend work time on testing instead of focusing on more prioritized tasks.
> 
> Therefore, the optimal process is that **the reviewer checks the quality of the code, while the tester evaluates its functionality**.
> 






> [!hidden-in-public]
> ## References
> ---
> 1. https://www.atlassian.com/software/jira/guides/workflows/tutorials#create-new-workflow
> ## Keywords
> ----
> workflow scheme in a Jira
> 
> ## Zero
> ----
> [[00 JIRA]]