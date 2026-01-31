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

In CSS, a **stacking context** is a concept that determines the layering order of elements on the page along the Z-axis (that is, which element will be on top of which). Simply put, it is a "container" for elements, inside which their **z-index** and display order are managed.

**Features of the stacking context**
- Each **stacking context** forms its own "layered system."
- Elements within a single stacking context overlay each other in order of **z-index** (or natural order if z-index is not set).
- Elements from different stacking contexts do not compete directly — the order between them is determined by their parent contexts.

This is not a performance optimization but a semantic rule that affects how elements overlap one another.

## When is a stacking context created?

In CSS, a stacking context is created for an element if:

1. The element has a explicitly defined `z-index` that is not `auto` (and it is `positioned` → `relative`, `absolute`, `fixed`, `sticky`).
2. The element has `opacity < 1`.
3. The element has properties such as `transform`, `filter`, `perspective`, `clip-path`, `mask`, `contain`, and several others.
4. A flex or grid item with a `z-index` that is not auto.
5. If the element has `isolation: isolate`.

## Where it can be useful:

1. When blending effects (`mix-blend-mode` or `filter`) are used inside a container, and you need to limit their scope solely to that container.
2. When you need to ensure that the z-index of descendants does not conflict with external elements.

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

Without `isolation: isolate`, the child will blend with **the entire page background**, while with `isolate` — only with the background of `.parent`.
When you set `isolation: isolate`, you create an "isolated" container, and any blending effects within it will not extend beyond its boundaries and affect elements outside this container.

## position: relative ≠ stacking context.  

The `position: relative` property **does not create a stacking context**.  
It only allows for the `z-index` to be set. But as long as `z-index: auto` → a stacking context is not created, the element participates in the parent's general overlay flow. Only in combination of both properties `z-index` and `position: relative` will a separate stacking context be created; if only `position: relative` is specified, then no stacking context will be created.

## isolation: isolate = stacking context

The **`isolation`** property in CSS manages the **isolation** of an element. When its value is set to **`isolate`**, it creates a **new stacking context** for that element and its descendants. This isolates the descendants from the rest of the page.

- `isolation: auto;` (default value)  
    → the element **does not create** a new stacking context by itself (only if it has properties that do — e.g., `position: fixed`, `z-index`, etc.).
    
- `isolation: isolate;`  
    → the element **always creates** a new stacking context, even if it does not have `z-index` or other properties.

## stacking context ≠ compositing layer
A **stacking context** → is a logical grouping of elements for managing overlays (`z-index`).
A **compositing layer** → is a separate GPU layer for rendering.

Browsers use **`compositing layers`** as an internal optimization mechanism. When the browser sees that an element is frequently changing or requires complex re-rendering (e.g., due to animations, 3D transformations, or, in our case, the creation of a new stacking context), it may decide to "move" that element to a separate layer. This allows the browser to re-render and animate only that layer without affecting the entire page, greatly improving performance.

**Every compositing layer is a stacking context, but not every stacking context is a compositing layer**.

```css
div {
  position: relative;
  z-index: 1; /* stacking context */
}
```
Here, **a stacking context is created**, but **a compositing layer does not necessarily need to be created**.

There is also no guarantee that `isolation: isolate` will create **compositing layers**, but it does create a new **stacking context**.
It is quite likely to promote it to a separate compositing layer. However, this decision is left to the **browser** based on its internal heuristics and available resources (e.g., GPU memory).

If your goal is not only to create a **stacking context**, but also to **optimize performance**, and you want to hint the browser to create a new compositing layer, it is better to use `will-change: transform` or `will-change: opacity`. These are more explicit "hints" for the browser which have fewer side semantic effects than `isolation`.


> [!hidden-in-public]-
> ## Links
> ----------
> https://web.dev/learn/css/z-index a good article
> https://www.bennadel.com/blog/3371-stacking-context-is-the-key-to-understanding-the-css-z-index.htm a good article
> https://www.hackfrontend.com/docs/html-and-css/stacking-order a good article
> https://www.freecodecamp.org/news/the-css-isolation-property/
> https://flexicajourney.com/linkedin-posts/css-isolation-stacking-context
> https://css-tricks.com/almanac/properties/i/isolation/
> 
> https://codepen.io/SitePoint/pen/GJjobw an example
> 
> ## References
> ------------
> 
> ## Zero-links
> ----
> [[00 CSS]]