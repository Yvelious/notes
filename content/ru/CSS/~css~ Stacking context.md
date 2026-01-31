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
Language: ru
---
![[Pasted image 20250827123900.png]]


## Что такое stacking context

В CSS **stacking context** — это концепция, которая определяет порядок наложения элементов на странице по оси Z (то есть какой элемент будет поверх какого). Проще говоря, это «контейнер» для элементов, внутри которого управляется их **z-index** и порядок отображения.

**Особенности stacking context**
- Каждый **stacking context** формирует свою собственную «слойную систему».
- Элементы внутри одного stacking context накладываются друг на друга в порядке **z-index** (или естественного потока, если z-index не задан).
- Элементы из разных stacking context не конкурируют напрямую — порядок между ними определяется родительскими контекстами.

Это не оптимизация производительности, а семантическое правило, которое влияет на то, как элементы накладываются друг на друга.

## Когда создаётся stacking context?

В CSS stacking context (контекст наложения) появляется у элемента, если:

1. У элемента явно задан `z-index`, отличный от `auto` (и при этом он `positioned` → `relative`, `absolute`, `fixed`, `sticky`).
2. У элемента `opacity < 1`.
3. У элемента есть `transform`, `filter`, `perspective`, `clip-path`, `mask`, `contain`и ещё ряд свойств.
4. Flex или grid элемент с `z-index` отличным от auto.
5. Если у элемента стоит `isolation: isolate`.


## Где это может быть полезно:

1. Когда внутри контейнера используются эффекты смешивания (`mix-blend-mode` или `filter`), и нужно ограничить их область действия только этим контейнером.
2. Когда нужно гарантировать, что z-index потомков не будет конфликтовать с внешними элементами.

#### Пример c `mix-blend-mode` и `isolation`

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

Без `isolation: isolate` ребёнок будет смешиваться с **всем фоном страницы**, а с `isolate` — только с фоном `.parent`.
Когда вы устанавливаете `isolation: isolate`, вы создаёте "изолированный" контейнер, и любые эффекты смешивания (blending) внутри него не будут выходить за его пределы и влиять на элементы вне этого контейнера.

## position: relative ≠ stacking context.  

Само свойство `position: relative` **не создаёт stacking context**.  
Оно лишь даёт возможность задать `z-index`. Но пока `z-index: auto` → stacking context не создаётся, элемент участвует в общем потоке наложения родителя. Только в совокупности двух этих свойств z-index и position: relative будет создан отдельный stacking context, если задать только `position: relative`, то stacking context не будет создан.

## isolation: isolate = stacking context

Свойство **`isolation`** в CSS управляет **изоляцией** элемента. Когда его значение установлено в **`isolate`**, оно создаёт **новый контекст наложения (stacking context)** для этого элемента и его потомков. Это изолирует потомков от остальной части страницы.

- `isolation: auto;` (значение по умолчанию)  
    → элемент **не создаёт** новый stacking context сам по себе (только если у него есть свойства, которые это делают — например `position: fixed`, `z-index` и т.д.).
    
- `isolation: isolate;`  
    → элемент **всегда создаёт** новый stacking context, даже если у него нет `z-index` или других свойств.

## stacking context ≠ compositing layer
**Stacking context** → это логическая группа элементов для управления наложением (`z-index`).
**Compositing layer** → это отдельный GPU-слой для рендеринга.

Браузеры используют **`compositing layer`** как внутренний механизм оптимизации. Когда браузер видит, что элемент часто меняется или требует сложной перерисовки (например, из-за анимаций, 3D-трансформаций или, в нашем случае, создания нового контекста наложения), он может решить "вынести" этот элемент на отдельный слой. Это позволяет браузеру перерисовывать и анимировать только этот слой, не затрагивая всю страницу, что значительно повышает производительность.

**Каждый compositing layers — stacking context,  но не каждый stacking context — compositing layers**.

```css
div {
  position: relative;
  z-index: 1; /* stacking context */
}
```
Тут **создаётся stacking context**, но **композитный слой не обязательно** создаться.

Также нет гарантии, что `isolation: isolate` создаст **compositing layers**, но оно создаёт новый **stacking context.**
Весьма вероятно повысит его до отдельного слоя композиции. Однако это решение принимает **сам браузер** на основе своих внутренних эвристик и доступных ресурсов (например, памяти GPU). 

Если ваша цель не только создать **stacking context**, но еще и **оптимизация производительности**, и вы хотите подсказать браузеру создать новый compositing layer, лучше использовать `will-change: transform` или `will-change: opacity`. Это более явные "подсказки" для браузера, которые имеют меньше побочных семантических эффектов, чем `isolation`.


> [!hidden-in-public]-
> ## Links
> ----------
> https://web.dev/learn/css/z-index хорошая статья
> https://www.bennadel.com/blog/3371-stacking-context-is-the-key-to-understanding-the-css-z-index.htm хорошая статья
> https://www.hackfrontend.com/docs/html-and-css/stacking-order хорошая статья
> https://www.freecodecamp.org/news/the-css-isolation-property/
> https://flexicajourney.com/linkedin-posts/css-isolation-stacking-context
> https://css-tricks.com/almanac/properties/i/isolation/
> 
> https://codepen.io/SitePoint/pen/GJjobw пример
> 
> ## References
> ------------
> 
> 
> ## Zero-links
> ----
> [[00 СSS]]