---
create: 2025-08-27
idnote: OUH4rf47Af
vault: dev
title: Stacking context in CSS
path:
tags:
  - compositing_layers
  - stacking_context
status:
rating:
symlink:
symlinkchapter: CSS
published: 2025-08-27
Language: en
---
![[Pasted image 20250827123900.png]]


## What is a stacking context

In CSS, a **stacking context** is a concept that defines the stacking order of elements on the page along the Z-axis (i.e., which element will be on top of which). Simply put, it is a "container" for elements, within which their **z-index** and display order are managed.

**Features of stacking context**
- Each **stacking context** forms its own "layer system."
- Elements within the same stacking context are layered on top of each other according to **z-index** (or the natural flow if z-index is not specified).
- Elements from different stacking contexts do not compete directly — the order between them is determined by their parent contexts.

This is not a performance optimization, but a semantic rule that affects how elements are layered over each other.

## When is a stacking context created?

In CSS, a stacking context (overlapping context) is created for an element if:

1. The element has an explicitly set `z-index` that is not `auto` (and at the same time, it is `positioned` → `relative`, `absolute`, `fixed`, `sticky`).
2. The element has `opacity < 1`.
3. The element has `transform`, `filter`, `perspective`, `clip-path`, `mask`, `contain`, and several other properties.
4. A flex or grid element with `z-index` different from auto.
5. If the element has `isolation: isolate`.

## Where can this be useful:

1. When blending effects (`mix-blend-mode` or `filter`) are used inside a container, and you need to limit their scope to just this container.
2. When you need to ensure that the z-index of descendants will not conflict with external elements.

#### Example with `mix-blend-mode` and `isolation`

```html
<div class="parent">   
	<div class="child">text</div> 
<div>
```

```css
.parent {   
	background: yellow;   
	isolation: isolate; /* create new stacking context */ 
}  
.child {   
	mix-blend-mode: multiply; 
}
```

Without `isolation: isolate`, the child will blend with **the entire background of the page**, but with `isolate` — only with the background of `.parent`.
When you set `isolation: isolate`, you create an "isolated" container, and any blending effects within it will not extend beyond its borders and affect elements outside this container.

## position: relative ≠ stacking context.  

The property `position: relative` **does not create a stacking context**.  
It only allows you to set a `z-index`. However, as long as `z-index: auto` → a stacking context is not created, the element participates in the general layering flow of its parent. Only in the combination of these two properties, `z-index` and `position: relative`, will a separate stacking context be created; if only `position: relative` is set, then no stacking context will be created.

## isolation: isolate = stacking context

The CSS property **`isolation`** manages the **isolation** of an element. When its value is set to **`isolate`**, it creates a **new stacking context** for this element and its descendants. This isolates the descendants from the rest of the page.

- `isolation: auto;` (default value)  
    → the element **does not create** a new stacking context by itself (only if it has properties that do — for example, `position: fixed`, `z-index`, etc.).
    
- `isolation: isolate;`  
    → the element **always creates** a new stacking context, even if it has no `z-index` or other properties.

## stacking context ≠ compositing layer
**Stacking context** → is a logical group of elements for managing layering (`z-index`).
**Compositing layer** → is a separate GPU layer for rendering.

Browsers use **`compositing layers`** as an internal optimization mechanism. When the browser sees that an element changes frequently or requires complex re-rendering (for example, due to animations, 3D transformations, or, in our case, the creation of a new stacking context), it may decide to "move" this element to a separate layer. This allows the browser to redraw and animate only this layer without affecting the entire page, significantly improving performance.

**Every compositing layer is a stacking context, but not every stacking context is a compositing layer**.

```css
div {
  position: relative;
  z-index: 1; /* stacking context */
}
```
Here, **a stacking context is created**, but a **composite layer is not necessarily** created.

There is also no guarantee that `isolation: isolate` will create **compositing layers**, but it does create a new **stacking context**.
It is quite probable that it will elevate it to a separate composition layer. However, this decision is made by **the browser** based on its internal heuristics and available resources (e.g., GPU memory).

If your goal is not only to create a **stacking context**, but also to **optimize performance**, and you want to suggest to the browser to create a new compositing layer, it is better to use `will-change: transform` or `will-change: opacity`. These are more explicit "hints" for the browser that have fewer side semantic effects than `isolation`.