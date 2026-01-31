---
create: 2025-09-23
idnote: Dv6OPXUoDu
vault: dev
title: Using the pseudo-class `:has()` in CSS
path:
tags:
  - css
status:
rating:
published: 2025-09-23
symlink:
symlinkchapter: CSS
Language: en
---

![[Pasted image 20250923224005.png]]
## What is `:has()` in CSS?

`:has()` is a **next-generation CSS selector**, often referred to as the _“parent selector”_.  
It allows you to **select elements based on what is inside them or close to them**.

Previously in CSS, we could select child elements (`.card img {}`), but we could not style the **parent based on something specific inside it**. `:has()` solves this problem.

It can be used **as a replacement for JavaScript in some cases** (for example, styling the parent when a child is active).

## Syntax

```css
element:has(selector) {
  /* styles */
}
```

- `element` — the element to which we apply the rule.
- `selector` — the condition that must be inside.

Real example
```css
.article:has(h2, h3) {
  padding-top: 2rem;
}
```
If the article has subheadings, add extra padding.

## Syntax of using has() with multiple conditions

In CSS, you can use `:has()` with multiple conditions — this is a powerful feature that makes CSS much more "intelligent" and context-dependent. Support for `:has()` is available in most modern browsers.

The `:has()` selector can accept **one or multiple conditions**, separated by commas or logical operators:

### OR (`A, B`) — works as "or"

```css
article:has(h1, h2) {   border: 1px solid red; }
```
This will apply the style to `<article>` if it contains **either `h1` or `h2`**, or both.

### AND (`A:has(B):has(C)`) — works as "and"

To set **multiple conditions simultaneously**, you need to nest `:has()` within each other:
```css
div:has(h1):has(p) {   background: lightgreen; }
```
This will apply the style to `<div>` if it contains **both `h1` and `p`**.

### Complex conditions with nesting

```css
section:has(article:has(img)) {   outline: 2px dashed blue; }
```
This will apply the style to `<section>` if it contains an `<article>`, and that `<article>` has an `<img>`.

### Combining with pseudo-classes

```css
form:has(input:invalid) {   border: 2px solid red; }
```
This will apply the style to `<form>` if it contains at least one invalid `<input>`.

**N.B.**
Selectors with `:has()` can be **heavy on performance**, especially if used on large pages. The browser has to inspect the **contents** of each element to determine whether to apply the style.

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## References
> ------------
> https://developer.mozilla.org/de/docs/Web/CSS/:has
> 
> ## Zero-links
> ----
> [[00 CSS]]