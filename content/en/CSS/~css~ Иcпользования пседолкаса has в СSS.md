---
create: 2025-09-23
idnote: Dv6OPXUoDu
vault: dev
title: Using `:has()` in CSS
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

`:has()` is a **new generation CSS selector** often referred to as a _“parent selector”_.  
It allows you to **select elements based on what is inside them or nearby**.

Previously in CSS, we could select child elements (`.card img {}`), but we couldn't style the **parent if it contained something specific** inside it. `:has()` solves this issue.

It can also be used **as a replacement for JS in some cases** (for example, styling a parent when an active child is present).

## Syntax

```css
element:has(selector) {
  /* styles */
}
```

- `element` — the element to which the rule is applied.
- `selector` — the condition that must be inside.

Real-world example:
```css
.article:has(h2, h3) {
  padding-top: 2rem;
}
```
If there are subheadings in the article, an additional margin is added.

## Syntax for using `has()` with multiple conditions

In CSS, you can use `:has()` with multiple conditions — this is a powerful feature that makes CSS much more "smart" and context-dependent. Support for `:has()` has appeared in most modern browsers.

The `:has()` selector can take **one or more conditions**, separated by commas or logical operators:

### OR (`A, B`) — works like "or"

```css
article:has(h1, h2) {   border: 1px solid red; }
```
This will apply the style to `<article>` if it contains **either `h1`, or `h2`**, or both.

### AND (`A:has(B):has(C)`) — works like "and"

To set **multiple conditions at the same time**, `:has()` needs to be nested:
```css
div:has(h1):has(p) {   background: lightgreen; }
```
This will apply the style to `<div>` if it contains **both `h1` and `p`**.

### Complex conditions with nesting

```css
section:has(article:has(img)) {   outline: 2px dashed blue; }
```
This will apply the style to `<section>` if it contains an `<article>`, which in turn contains an `<img>`.

### Combining with pseudo-classes

```css
form:has(input:invalid) {   border: 2px solid red; }
```
This will apply the style to `<form>` if it has at least one invalid `<input>`.

**N.B.**
Selectors with `:has()` can be **heavy on performance**, especially if used on large pages. The browser has to examine the **contents** of every element to determine whether to apply the style.