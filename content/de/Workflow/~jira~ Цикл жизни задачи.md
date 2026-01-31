---
created: 2025-03-11
idnote: 7Gzdydj2NN
vault: dev
title: Lebenszyklus einer Aufgabe
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
Language: de
---
![[Pasted image 20250316172014.png]]

## Lebenszyklus einer Aufgabe

Der Lebenszyklus einer Aufgabe ist die Abfolge von Zuständen, durch die eine Aufgabe geht, beginnend mit der Erstellung und endend mit dem Abschluss.

Es gibt keinen allgemeinen Standard, der von allen Unternehmen akzeptiert wird. Jedes Unternehmen kann seinen eigenen Lebenszyklus einer Aufgabe definieren, der zu seinen Prozessen und Methoden der Softwareentwicklung passt.

Im Folgenden wird ein Beispiel für den Lebenszyklus einer Aufgabe gegeben, den ich in meiner Arbeit verwende. Er ist nicht verbindlich und kann je nach den Bedürfnissen des Projekts geändert werden.

**Der Lebenszyklus einer Aufgabe besteht aus folgenden Zuständen:**
1. **Created** - die Aufgabe wurde erstellt und ist noch keinem zugewiesen. Liegt in der allgemeinen Aufgabenliste (Backlog).
2. **To Do** - die Aufgabe ist bereit zur Ausführung, und es ist ein Ausführender zugewiesen. Wartet auf ihre Erledigung.
3. **In Progress** - die Aufgabe wird bearbeitet.
4. **Ready for Review** - die Aufgabe ist abgeschlossen und bereit zur Überprüfung.
5. **In Review** - die Aufgabe wird überprüft.
6. **Ready for Testing** - die Aufgabe wurde überprüft und ist bereit für Tests.
7. **In Testing** - die Aufgabe befindet sich im Test.
8. **Ready for Deploy** - die Aufgabe wurde getestet und ist bereit zum Deployment.
9. **In Deploy** - die Aufgabe ist in Produktion.
10. **Done** - die Aufgabe ist erledigt.

Dies ist die Abfolge von Zuständen, durch die eine Aufgabe geht, beginnend mit der Erstellung und endend mit dem Abschluss.

Es gibt auch Zustände, die der Aufgabe in jedem Stadium ihres Lebenszyklus unabhängig von ihrem aktuellen Zustand hinzugefügt werden können:
1. **Blocked** - die Aufgabe ist blockiert und kann aus bestimmten Gründen nicht bearbeitet werden. Gewöhnlich, wenn die Ausführung der Aufgabe von einer anderen abhängt, die noch nicht abgeschlossen ist.
2. **On Hold** - die Aufgabe ist pausiert. Zum Beispiel, wenn es eine prioritärere Aufgabe gibt, die erledigt werden muss.
3. **Canceled** - die Aufgabe wurde storniert. Wenn die Aufgabe nicht mehr relevant ist.

> [!hidden-in-public]
> ## Entwurf
> ---
> **N.B.**
> In einigen Unternehmen erfolgt die Testung nicht vor der Überprüfung. In einigen Fällen findet das Testen nach der Überprüfung statt – alles hängt von den Prozessen und der Methodologie der Softwareentwicklung ab.
> 
> ✅ Wenn der Reviewer nicht nur den Code auf Einhaltung der Standards und Optimalität überprüft, sondern auch die Funktionalität tiefer analysiert, erfolgt das Testen **nach der Überprüfung**.
> 
> ✅ Wenn der Reviewer jedoch hauptsächlich den Code hinsichtlich der Sauberkeit und Effizienz bewertet, **ohne in die Funktionalität einzutauchen**, kann das Testen **vor der Überprüfung** stattfinden.
> 
> Somit hängt die Reihenfolge von der Rolle des Reviewers im Prozess und den Anforderungen an die Codequalität ab.
> 
> Persönlich bin ich der Meinung, dass der Reviewer den Code auf Einhaltung der Standards und Optimalität überprüfen sollte, während die Funktionalität Aufgabe des Testers ist.
> 
> Der Reviewer ist in der Regel ein **Senior-Entwickler**, dessen Zeit teurer ist als die Zeit des Testers. Außerdem hat er eigene Aufgaben und sollte seine Arbeitszeit nicht mit Tests verbringen, anstatt sich um wichtigere Aufgaben zu kümmern.
> 
> Daher ist der optimale Prozess: **Reviewer überprüft die Qualität des Codes, und Tester überprüft dessen Funktionalität**.

> [!hidden-in-public]
> ## Referenzen
> ---
> 1. https://www.atlassian.com/de/software/jira/guides/workflows/tutorials#create-new-workflow
> ## Schlüsselwörter
> ----
> Workflow-Schema in Jira
> 
> ## Null
> ----
> [[00 JIRA]]
