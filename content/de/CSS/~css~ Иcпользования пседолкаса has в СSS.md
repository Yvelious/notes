---
create: 2025-09-23
idnote: Dv6OPXUoDu
vault: dev
title: Verwendung des Pseudoselektors `:has()` in CSS
path:
tags:
  - css
status:
rating:
published: 2025-09-23
symlink:
symlinkchapter: CSS
Language: de
---

![[Pasted image 20250923224005.png]]
## Was ist `:has()` in CSS?

`:has()` ist ein **CSS-Selektor der neuen Generation**, der als _„Eltern-Selektor“_ bezeichnet wird.  
Er ermöglicht es, **Elemente basierend auf dem, was sich in oder um sie herum befindet, auszuwählen**.

Früher konnten wir in CSS Kind-Elemente auswählen (`.card img {}`), aber wir konnten **das Eltern-Element nicht stylen, wenn es etwas Bestimmtes darin hatte**. `:has()` löst dieses Problem.

Es kann **in bestimmten Fällen als Ersatz für JS verwendet werden** (zum Beispiel das Stylen des Eltern-Elements, wenn ein Kind-Element aktiv ist).

## Syntax

```css
element:has(selector) {
  /* Stile */
}
```

- `element` — das Element, auf das die Regel angewendet wird.
- `selector` — die Bedingung, was sich innen befinden muss.

Echtes Beispiel:
```css
.article:has(h2, h3) {
  padding-top: 2rem;
}
```
Wenn es in einem Artikel Überschriften gibt, fügen wir zusätzlichen Abstand hinzu.

## Syntax zur Verwendung von `has()` mit mehreren Bedingungen

In CSS kann `:has()` mit mehreren Bedingungen verwendet werden — dies ist eine mächtige Funktion, die CSS viel „intelligenter“ und kontextabhängiger macht. Die Unterstützung für `:has()` ist in den meisten modernen Browsern verfügbar.

Der Selektor `:has()` kann **eine oder mehrere Bedingungen** akzeptieren, die durch Kommas oder logische Operatoren getrennt sind:

### ODER (`A, B`) — funktioniert wie "oder"

```css
article:has(h1, h2) {   border: 1px solid red; }
```
Wendet den Stil auf `<article>` an, wenn sich darin **entweder `h1` oder `h2`** oder beide befinden.


### UND (`A:has(B):has(C)`) — funktioniert wie "und"

Um **mehrere Bedingungen gleichzeitig** festzulegen, müssen wir `:has()` ineinander verschachteln:
```css
div:has(h1):has(p) {   background: lightgreen; }
```
Wendet den Stil auf `<div>` an, wenn es **sowohl `h1` als auch `p`** enthält.

### Komplexe Bedingungen mit Verschachtelung

```css
section:has(article:has(img)) {   outline: 2px dashed blue; }
```
Wendet den Stil auf `<section>` an, wenn sich darin ein `<article>` befindet und darin ein `<img>`.

### Kombination mit Pseudoklassen

```css
form:has(input:invalid) {   border: 2px solid red; }
```
Wendet den Stil auf `<form>` an, wenn es mindestens ein ungültiges `<input>` gibt.

**N.B.**
Selektoren mit `:has()` können **leistungsintensiv** sein, insbesondere wenn sie auf großen Seiten verwendet werden. Der Browser muss **innere** Strukturen jedes Elements durchgehen, um zu entscheiden, ob der Stil angewendet werden soll.