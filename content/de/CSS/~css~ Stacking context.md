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


## Was ist ein Stacking-Kontext?

In CSS ist ein **Stacking-Kontext** ein Konzept, das die Reihenfolge der Überlagerung von Elementen auf der Seite entlang der Z-Achse definiert (d.h. welches Element über welchem anderen liegt). Einfach gesagt, es ist ein „Container“ für Elemente, innerhalb dessen deren **z-index** und die Anzeige-Reihenfolge gesteuert werden.

**Besonderheiten des Stacking-Kontextes**
- Jeder **Stacking-Kontext** bildet sein eigenes „Schichtsystem“.
- Elemente innerhalb eines Stacking-Kontexts überlagern sich in der Reihenfolge des **z-index** (oder des natürlichen Flusses, wenn der z-index nicht festgelegt ist).
- Elemente aus verschiedenen Stacking-Kontexten stehen in keinem direkten Wettbewerb — die Reihenfolge untereinander wird durch die übergeordneten Kontexte bestimmt.

Dies ist keine Leistungsoptimierung, sondern eine semantische Regel, die beeinflusst, wie Elemente übereinander liegen.

## Wann wird ein Stacking-Kontext erstellt?

Ein Stacking-Kontext in CSS entsteht für ein Element, wenn:

1. Dem Element ist explizit ein `z-index` zugewiesen, der von `auto` abweicht (und es ist `positioned` → `relative`, `absolute`, `fixed`, `sticky`).
2. Das Element hat `opacity < 1`.
3. Das Element hat Eigenschaften wie `transform`, `filter`, `perspective`, `clip-path`, `mask`, `contain` und eine Reihe weiterer.
4. Ein Flex- oder Gitterelement hat einen z-index, der von auto abweicht.
5. Wenn am Element `isolation: isolate` gesetzt ist.


## Wo kann das nützlich sein:

1. Wenn innerhalb eines Containers Mischmodi (`mix-blend-mode` oder `filter`) verwendet werden und deren Wirkung nur auf diesen Container beschränkt werden soll.
2. Wenn sichergestellt werden muss, dass der z-index von Nachkommen nicht mit externen Elementen in Konflikt steht.

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

Ohne `isolation: isolate` wird das Kind mit **dem gesamten Hintergrund der Seite** gemischt, und mit `isolate` nur mit dem Hintergrund von `.parent`.
Wenn Sie `isolation: isolate` festlegen, erstellen Sie einen "isolierten" Container, und alle Mischmodi innerhalb davon werden nicht über die Grenzen hinaus wirken und keine Elemente außerhalb dieses Containers beeinflussen.

## position: relative ≠ Stacking-Kontext.  

Die Eigenschaft `position: relative` **erstellt keinen Stacking-Kontext**.  
Sie ermöglicht nur die Festlegung des `z-index`. Solange `z-index: auto` → kein Stacking-Kontext entsteht, bleibt das Element Teil des allgemeinen Überlagerungsflusses des Elternteils. Nur in Kombination dieser beiden Eigenschaften `z-index` und `position: relative` wird ein separater Stacking-Kontext erstellt. Wenn nur `position: relative` festgelegt ist, wird kein Stacking-Kontext erstellt.

## isolation: isolate = Stacking-Kontext

Die Eigenschaft **`isolation`** in CSS steuert die **Isolation** eines Elements. Wenn ihr Wert auf **`isolate`** gesetzt wird, erstellt es einen **neuen Stacking-Kontext** für dieses Element und dessen Nachkommen. Dies isoliert die Nachkommen vom Rest der Seite.

- `isolation: auto;` (Standardwert)  
    → Das Element **erstellt** keinen neuen Stacking-Kontext von sich aus (nur wenn es Eigenschaften hat, die dies tun — z. B. `position: fixed`, `z-index` usw.).
    
- `isolation: isolate;`  
    → Das Element **erstellt immer** einen neuen Stacking-Kontext, selbst wenn es keinen `z-index` oder andere Eigenschaften hat.

## Stacking-Kontext ≠ Compositing Layer
**Stacking-Kontext** → ist eine logische Gruppe von Elementen zur Steuerung der Überlagerung (`z-index`).
**Compositing Layer** → ist eine separate GPU-Schicht für das Rendering.

Browser verwenden **`Compositing Layer`** als internes Optimierungsmechanismus. Wenn der Browser sieht, dass ein Element häufig geändert wird oder eine komplexe Neurendering erfordert (z. B. aufgrund von Animationen, 3D-Transformationen oder in unserem Fall der Erstellung eines neuen Stacking-Kontexts), kann er entscheiden, dieses Element auf eine separate Schicht „auszulagern“. Dies ermöglicht es dem Browser, nur diese Schicht neu zu zeichnen und zu animieren, ohne die gesamte Seite zu beeinflussen, was die Leistung erheblich steigert.

**Jede Compositing Layer ist ein Stacking-Kontext, aber nicht jeder Stacking-Kontext ist eine Compositing Layer**.

```css
div {
  position: relative;
  z-index: 1; /* Stacking-Kontext */
}
```
Hier **wird ein Stacking-Kontext erstellt**, aber eine **Compositing Layer entsteht nicht unbedingt**.

Es gibt auch keine Garantie, dass `isolation: isolate` eine **Compositing Layer** erzeugt, aber es schafft einen neuen **Stacking-Kontext**.
Es ist sehr wahrscheinlich, dass sie auf eine separate Compositing Layer erhöht wird. Allerdings entscheidet **der Browser selbst** auf Grundlage seiner internen Heuristiken und der verfügbaren Ressourcen (z. B. GPU-Speicher).

Wenn Ihr Ziel nicht nur darin besteht, einen **Stacking-Kontext** zu erstellen, sondern auch die **Leistungsoptimierung** ist, und Sie dem Browser den Hinweis geben möchten, eine neue Compositing Layer zu erstellen, ist es besser, `will-change: transform` oder `will-change: opacity` zu verwenden. Dies sind eindeutigere „Hinweise“ für den Browser, die weniger Nebenwirkungen in der Semantik haben als `isolation`.