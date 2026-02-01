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

Der Lebenszyklus einer Aufgabe ist eine Abfolge von Zuständen, die eine Aufgabe durchläuft, beginnend mit der Erstellung und endend mit dem Abschluss.

Es gibt keinen allgemeinen Standard, der von allen Unternehmen anerkannt wird. Jedes Unternehmen kann seinen eigenen Lebenszyklus einer Aufgabe definieren, der zu seinen Prozessen und der Entwicklungsmethodik passt.

Im Folgenden ist ein Beispiel für den Lebenszyklus einer Aufgabe aufgeführt, den ich in meiner Arbeit verwende. Er ist nicht verbindlich und kann je nach den Bedürfnissen des Projekts angepasst werden.

**Der Lebenszyklus einer Aufgabe besteht aus den folgenden Zuständen:**
1. **Created** - Die Aufgabe wurde erstellt und ist noch nicht zugewiesen. Liegt in der allgemeinen Aufgabenliste (Backlog).
2. **To Do** - Die Aufgabe ist bereit zur Ausführung, ein Ausführender ist zugewiesen. Wartet auf seine Bearbeitung.
3. **In Progress** - Die Aufgabe wird bearbeitet.
4. **Ready for Review** - Die Aufgabe ist abgeschlossen und bereit zur Überprüfung.
5. **In Review** - Die Aufgabe wird überprüft.
6. **Ready for Testing** - Die Aufgabe wurde überprüft und ist bereit zum Testen.
7. **In Testing** - Die Aufgabe wird getestet.
8. **Ready for Deploy** - Die Aufgabe wurde getestet und ist bereit zum Deployment.
9. **In Deploy** - Die Aufgabe ist im Produktionsumfeld (Prod).
10. **Done** - Die Aufgabe ist abgeschlossen.

Dies ist die Reihenfolge der Zustände, die eine Aufgabe durchläuft, beginnend mit der Erstellung und endend mit dem Abschluss.

Es gibt auch Zustände, die der Aufgabe in jedem Stadium ihres Lebenszyklus unabhängig von ihrem aktuellen Zustand hinzugefügt werden können:
1. **Blocked** - Die Aufgabe ist blockiert und kann aus bestimmten Gründen nicht ausgeführt werden. Normalerweise, wenn die Ausführung einer Aufgabe von einer anderen abhängt, die noch nicht abgeschlossen ist.
2. **On Hold** - Die Aufgabe ist pausiert. Zum Beispiel, wenn eine prioritärere Aufgabe aufgetaucht ist.
3. **Canceled** - Die Aufgabe wurde storniert. Wenn die Aufgabe nicht mehr relevant ist.

> [!hidden-in-public]
> ## Entwurf
> ---
> **N.B.**
> Nicht immer erfolgt das Testen vor der Überprüfung. In einigen Unternehmen geschieht das Testen nach der Überprüfung – alles hängt von den Prozessen und der Entwicklungsmethodik ab.
>
> ✅ Wenn der Reviewer den Code nicht nur auf Übereinstimmung mit den Standards und auf Optimierung prüft, sondern auch die Funktionalität eingehender analysiert, dann erfolgt das Testen **nach der Überprüfung**.
>
> ✅ Wenn der Reviewer hingegen hauptsächlich den Code hinsichtlich Sauberkeit und Effizienz beurteilt, **ohne sich mit seiner Funktionsfähigkeit zu vertiefen**, dann kann das Testen **vor der Überprüfung** stattfinden.
>
> Damit hängt die Reihenfolge von der Rolle des Reviewers im Prozess und den Qualitätsanforderungen an den Code ab.
>
> Persönlich halte ich es für notwendig, dass der Reviewer den Code auf Übereinstimmung mit den Standards und auf Optimierung prüft, während die Funktionsfähigkeit Aufgabe des Testers bleibt.
>
> Der Reviewer ist in der Regel ein **Senior-Entwickler**, dessen Zeit wertvoller ist als die des Testers. Darüber hinaus hat er eigene Aufgaben und sollte seine Arbeitszeit nicht mit Tests verbringen, sondern sich auf prioritärere Aufgaben konzentrieren.
>
> Daher ist der optimale Prozess, dass **der Reviewer die Codequalität prüft und der Tester die Funktionsfähigkeit**.

> [!hidden-in-public]
> ## Referenzen
> ---
> 1. https://www.atlassian.com/de/software/jira/guides/workflows/tutorials#create-new-workflow
> ## Schlüsselwörter
> ----
> Workflow-Schema in Jira 1
> 
> ## Null
> ----
> [[00 JIRA]]