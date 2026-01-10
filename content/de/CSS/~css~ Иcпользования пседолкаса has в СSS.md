---
create: 2025-09-23
idnote: Dv6OPXUoDu
vault: dev
title: Verwendung von :has() in CSS
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

`:has()` ist ein **CSS-Selektor der neuen Generation**, der als _„Parent-Selektor“_ bezeichnet wird.  
Er ermöglicht es, **Elemente basierend auf dem, was sich innerhalb oder in der Nähe von ihnen befindet, auszuwählen**.

Früher konnten wir in CSS Kind-Elemente auswählen (`.card img {}`), aber wir konnten **den Elternteil nicht stylen, wenn er etwas Bestimmtes darin hatte**. `:has()` löst dieses Problem.

Es kann **in einigen Fällen als Ersatz für JS verwendet werden** (zum Beispiel das Stylen des Elternteils, wenn ein Kind aktiv ist).

## Syntax

```css
element:has(selector) {
  /* Stile */
}
```

- `element` — das Element, auf das die Regel angewendet wird.
- `selector` — die Bedingung, was sich im Inneren befinden muss.

Echtes Beispiel
```css
.article:has(h2, h3) {
  padding-top: 2rem;
}
```
Wenn in einem Artikel Unterüberschriften vorhanden sind, fügen wir zusätzlichen Abstand hinzu.

## Syntax der Verwendung von has() mit mehreren Bedingungen

In CSS kann `:has()` mit mehreren Bedingungen verwendet werden — das ist eine mächtige Möglichkeit, die CSS viel "intelligenter" und kontextabhängiger macht. Die Unterstützung von `:has()` ist in den meisten modernen Browsern verfügbar.

Der Selektor `:has()` kann **eine oder mehrere Bedingungen** annehmen, die durch Kommas oder logische Operatoren getrennt sind:

### ODER (`A, B`) — funktioniert wie "oder"

```css
article:has(h1, h2) {   border: 1px solid red; }
```
Wendet den Stil auf `<article>` an, wenn darin **entweder `h1` oder `h2`** oder beide vorhanden sind.


### UND (`A:has(B):has(C)`) — funktioniert wie "und"

Um **mehrere Bedingungen gleichzeitig** festzulegen, müssen `:has()` ineinander verschachtelt werden:
```css
div:has(h1):has(p) {   background: lightgreen; }
```
Wendet den Stil auf `<div>` an, wenn es **sowohl `h1` als auch `p`** enthält.

### Komplexe Bedingungen mit Verschachtelung

```css
section:has(article:has(img)) {   outline: 2px dashed blue; }
```
Wendet den Stil auf `<section>` an, wenn darin ein `<article>` vorhanden ist, und in diesem — ein `<img>`.

### Kombination mit Pseudoklassen

```css
form:has(input:invalid) {   border: 2px solid red; }
```
Wendet den Stil auf `<form>` an, wenn darin mindestens ein ungültiges `<input>` vorhanden ist.

**N.B.**
Selektoren mit `:has()` können **leistungsintensiv sein**, insbesondere wenn sie auf großen Seiten verwendet werden. Der Browser muss die **Innereien** jedes Elements durchsuchen, um zu verstehen, ob der Stil angewendet werden soll.