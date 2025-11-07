---
create: 2025-09-23
idnote: Dv6OPXUoDu
vault: dev
title: Using the `:has()` Pseudo-Class in CSS
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

`:has()` is a **next-generation CSS selector**, often referred to as a _"parent selector"_.  
It allows you to **select elements based on what is inside them or nearby**.

Previously in CSS, we were able to select child elements (`.card img {}`), but we could not style the **parent if it contained something specific** inside. `:has()` resolves this issue.

It can be used **as a replacement for JS in some cases** (for example, styling the parent when a child is active).

## Syntax

```css
element:has(selector) {
  /* styles */
}
```

- `element` — the element to which we apply the rule.
- `selector` — the condition for what must be inside.

Real example:
```css
.article:has(h2, h3) {
  padding-top: 2rem;
}
```
If the article has subheadings, add extra padding.

## Syntax for using has() with multiple conditions

In CSS, you can use `:has()` with multiple conditions — this is a powerful feature that makes CSS much more "intelligent" and context-dependent. Support for `:has()` has appeared in most modern browsers.

The `:has()` selector can take **one or multiple conditions**, separated by commas or logical operators:

### OR (`A, B`) — works like "or"

```css
article:has(h1, h2) {   border: 1px solid red; }
```
Will apply the style to `<article>` if it contains **either `h1` or `h2`**, or both.


### AND (`A:has(B):has(C)`) — works like "and"

To set **multiple conditions at once**, you need to nest `:has()`:
```css
div:has(h1):has(p) {   background: lightgreen; }
```
Will apply the style to `<div>` if it contains **both `h1` and `p`**.

### Complex conditions with nesting

```css
section:has(article:has(img)) {   outline: 2px dashed blue; }
```
Will apply the style to `<section>` if it contains an `<article>`, and within it — an `<img>`.

### Combining with pseudo-classes

```css
form:has(input:invalid) {   border: 2px solid red; }
```
Will apply the style to `<form>` if it contains at least one invalid `<input>`.


**N.B.**
Selectors with `:has()` can be **heavy on performance**, especially when used on large pages. The browser has to scan the **contents** of each element to determine whether to apply the style.