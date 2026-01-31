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
Language: de
---
![[Pasted image 20250827123900.png]]


## Was ist ein Stacking-Kontext

In CSS ist ein **Stacking-Kontext** ein Konzept, das die Reihenfolge definiert, in der Elemente auf der Seite entlang der Z-Achse übereinanderliegen (das heißt, welches Element über welchem liegt). Einfach gesagt, ist es ein „Container“ für Elemente, innerhalb dessen deren **z-index** und Anzeigereihenfolge verwaltet wird.

**Eigenschaften des Stacking-Kontexts**
- Jeder **Stacking-Kontext** bildet sein eigenes „Schichtsystem“.
- Elemente innerhalb eines Stacking-Kontexts überlagern sich in der Reihenfolge ihres **z-index** (oder des natürlichen Flusses, wenn kein z-index angegeben ist).
- Elemente aus unterschiedlichen Stacking-Kontexten stehen nicht in direkter Konkurrenz zueinander - die Reihenfolge zwischen ihnen wird durch die übergeordneten Kontexte festgelegt.

Dies ist keine Leistungsoptimierung, sondern eine semantische Regel, die beeinflusst, wie Elemente einander überlagern.

## Wann wird ein Stacking-Kontext erstellt?

Ein Stacking-Kontext (Überelagerungskontext) wird für ein Element in CSS erstellt, wenn:

1. Das Element hat einen ausdrücklich festgelegten `z-index`, der von `auto` abweicht (und ist dabei `positioniert` → `relative`, `absolute`, `fixed`, `sticky`).
2. Das Element hat `opacity < 1`.
3. Das Element hat `transform`, `filter`, `perspective`, `clip-path`, `mask`, `contain` und eine Reihe anderer Eigenschaften.
4. Flex- oder Grid-Element mit `z-index`, der von `auto` abweicht.
5. Wenn das Element `isolation: isolate` hat.


## Wo kann das nützlich sein:

1. Wenn innerhalb eines Containers Mischmodi (`mix-blend-mode` oder `filter`) verwendet werden und deren Wirkungsbereich auf diesen Container beschränkt werden muss.
2. Wenn sichergestellt werden muss, dass der z-index der Nachkommen nicht mit äußeren Elementen in Konflikt steht.

#### Beispiel mit `mix-blend-mode` und `isolation`

```html
<div class="parent">   
	<div class="child">text</div> 
<div>
```

```css
.parent {   
	background: yellow;   
	isolation: isolate; /* neuen Stacking-Kontext erstellen */ 
}  
.child {   
	mix-blend-mode: multiply; 
}
```

Ohne `isolation: isolate` wird das Kind mit **dem gesamten Hintergrund der Seite** gemischt, und mit `isolate` nur mit dem Hintergrund der `.parent`.
Wenn Sie `isolation: isolate` setzen, erstellen Sie einen "isolierten" Container, und alle Mischmodi innerhalb davon werden nicht über seine Grenzen hinauswirken und die Elemente außerhalb dieses Containers nicht beeinflussen.

## position: relative ≠ Stacking-Kontext.  

Die Eigenschaft `position: relative` **erstellt keinen Stacking-Kontext**.  
Sie ermöglicht lediglich das Setzen eines `z-index`. Solange `z-index: auto` bleibt, → wird kein Stacking-Kontext geschaffen, das Element bleibt im allgemeinen Überlagerungsfluss des übergeordneten Elements. Nur in der Kombination dieser beiden Eigenschaften, `z-index` und `position: relative`, wird ein separater Stacking-Kontext erstellt; wenn nur `position: relative` festgelegt wird, wird kein Stacking-Kontext erstellt.

## isolation: isolate = Stacking-Kontext

Die Eigenschaft **`isolation`** in CSS steuert die **Isolation** eines Elements. Wenn ihr Wert auf **`isolate`** gesetzt wird, erstellt sie einen **neuen Stacking-Kontext** für dieses Element und seine Nachkommen. Dies isoliert die Nachkommen vom Rest der Seite.

- `isolation: auto;` (Standardwert)  
    → das Element **erstellt keinen** neuen Stacking-Kontext für sich selbst (nur wenn es Eigenschaften hat, die dies tun - zum Beispiel `position: fixed`, `z-index` usw.).
    
- `isolation: isolate;`  
    → das Element **erstellt immer** einen neuen Stacking-Kontext, selbst wenn es keinen `z-index` oder andere Eigenschaften hat.

## Stacking-Kontext ≠ Compositing-Schicht
**Stacking-Kontext** → ist eine logische Gruppe von Elementen zur Verwaltung der Überlagerung (`z-index`).
**Compositing-Schicht** → ist eine separate GPU-Schicht für das Rendering.

Browser verwenden eine **`Compositing-Schicht`** als internes Optimierungsmechanismus. Wenn der Browser sieht, dass ein Element häufig geändert wird oder eine komplexe Neuzeichnung erfordert (zum Beispiel aufgrund von Animationen, 3D-Transformationen oder in unserem Fall dem Erstellen eines neuen Überlagerungskontexts), kann er entscheiden, dieses Element auf eine separate Schicht zu „verschieben“. Dies ermöglicht es dem Browser, nur diese Schicht neu zu zeichnen und zu animieren, ohne die gesamte Seite zu beeinträchtigen, was die Leistung erheblich steigert.

**Jede Compositing-Schicht ist ein Stacking-Kontext, aber nicht jeder Stacking-Kontext ist eine Compositing-Schicht**.

```css
div {
  position: relative;
  z-index: 1; /* Stacking-Kontext */
}
```
Hier **wird ein Stacking-Kontext erstellt**, aber eine **Compositing-Schicht wird nicht unbedingt** erstellt.

Es gibt auch keine Garantie, dass `isolation: isolate` eine **Compositing-Schicht** erstellt, aber es erstellt einen neuen **Stacking-Kontext**.
Es ist sehr wahrscheinlich, dass es auf eine separate Compositing-Schicht erhöht wird. Diese Entscheidung trifft jedoch **der Browser selbst** basierend auf seinen internen Heuristiken und verfügbaren Ressourcen (z.B. GPU-Speicher). 

Wenn Ihr Ziel nicht nur das Erstellen eines **Stacking-Kontexts**, sondern auch **Leistungsoptimierung** ist, und Sie dem Browser raten möchten, eine neue Compositing-Schicht zu erstellen, sollten Sie besser `will-change: transform` oder `will-change: opacity` verwenden. Diese sind klarere "Hinweise" für den Browser, die weniger Nebenwirkungen in der Semantik haben als `isolation`.


> [!hidden-in-public]-
> ## Links
> ----------
> https://web.dev/learn/css/z-index ein guter Artikel
> https://www.bennadel.com/blog/3371-stacking-context-is-the-key-to-understanding-the-css-z-index.htm ein guter Artikel
> https://www.hackfrontend.com/docs/html-and-css/stacking-order ein guter Artikel
> https://www.freecodecamp.org/news/the-css-isolation-property/
> https://flexicajourney.com/linkedin-posts/css-isolation-stacking-context
> https://css-tricks.com/almanac/properties/i/isolation/
> 
> https://codepen.io/SitePoint/pen/GJjobw ein Beispiel
> 
> ## Referenzen
> ------------
> 
> ## Null-Links
> ----
> [[00 CSS]]