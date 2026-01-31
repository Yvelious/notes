---
create: 2025-09-23
idnote: Dv6OPXUoDu
vault: dev
title: Verwendung von `:has()` in CSS
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

`:has()` ist ein **CSS-Selector der nächsten Generation**, auch bekannt als _„parent selector“_.  
Er ermöglicht es, **Elemente basierend auf dem, was sich innerhalb oder in der Nähe von ihnen befindet, auszuwählen**.

Früher konnten wir in CSS nur untergeordnete Elemente auswählen (`.card img {}`), aber wir konnten den **Elternteil nicht stylen, wenn etwas Bestimmtes darin enthalten war**. `:has()` löst dieses Problem.

Es kann **in einigen Fällen als Ersatz für JS verwendet werden** (zum Beispiel, um den Elternteil zu stylen, wenn ein untergeordnetes aktiv ist).

## Syntax

```css
element:has(selector) {
  /* styles */
}
```

- `element` — das Element, auf das die Regel angewendet wird.
- `selector` — die Bedingung, was sich innerhalb befinden soll.

Reales Beispiel
```css
.article:has(h2, h3) {
  padding-top: 2rem;
}
```
Wenn es in einem Artikel Überschriften gibt, fügen wir zusätzlichen Abstand hinzu.

## Syntax zur Verwendung von has() mit mehreren Bedingungen

In CSS kann `:has()` mit mehreren Bedingungen verwendet werden — das ist eine mächtige Möglichkeit, die CSS viel "intelligenter" und kontextbezogener macht. Die Unterstützung für `:has()` ist in den meisten modernen Browsern verfügbar.

Der Selector `:has()` kann **eine oder mehrere Bedingungen** annehmen, die durch Kommas oder logische Operatoren getrennt sind:

### ODER (`A, B`) — funktioniert wie "oder"

```css
article:has(h1, h2) {   border: 1px solid red; }
```
Wendet den Stil auf `<article>` an, wenn es **entweder `h1` oder `h2`** oder beide enthält.


### UND (`A:has(B):has(C)`) — funktioniert wie "und"

Um **mehrere Bedingungen gleichzeitig** festzulegen, müssen `:has()` ineinander geschachtelt werden:
```css
div:has(h1):has(p) {   background: lightgreen; }
```
Wendet den Stil auf `<div>` an, wenn es sowohl **`h1` als auch `p`** enthält.

### Komplexe Bedingungen mit Verschachtelung

```css
section:has(article:has(img)) {   outline: 2px dashed blue; }
```
Wendet den Stil auf `<section>` an, wenn es ein `<article>` enthält, und dieses `<article>` eine `<img>` enthält.

### Kombination mit Pseudoklassen

```css
form:has(input:invalid) {   border: 2px solid red; }
```
Wendet den Stil auf `<form>` an, wenn es mindestens ein ungültiges `<input>` gibt.

**N.B.**
Selector mit `:has()` können **leistungsintensiv sein**, insbesondere wenn sie auf großen Seiten verwendet werden. Der Browser muss **den Inhalt** jedes Elements durchsehen, um zu entscheiden, ob der Stil angewendet wird.

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> https://developer.mozilla.org/de/docs/Web/CSS/:has
> 
> ## Zero-links
> ----
> [[00 CSS]]