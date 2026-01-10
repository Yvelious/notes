---
create: 2025-08-27
idnote: OUH4rf47Af
vault: dev
title: Stacking-Kontext in CSS
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

In CSS ist ein **Stacking-Kontext** ein Konzept, das die Reihenfolge der Überlagerung von Elementen auf der Seite entlang der Z-Achse definiert (d.h. welches Element über welchem liegt). Einfach gesagt, ist es ein „Container“ für Elemente, innerhalb dessen ihr **z-index** und die Anzeige-Reihenfolge verwaltet werden.

**Besonderheiten des Stacking-Kontexts**
- Jeder **Stacking-Kontext** bildet sein eigenes „Schichtsystem“.
- Elemente innerhalb eines Stacking-Kontexts überlagern sich in der Reihenfolge des **z-index** (oder des natürlichen Flusses, wenn kein z-index angegeben ist).
- Elemente aus verschiedenen Stacking-Kontexten konkurrieren nicht direkt — die Reihenfolge zwischen ihnen wird durch die übergeordneten Kontexte bestimmt.

Dies ist keine Leistungsoptimierung, sondern eine semantische Regel, die beeinflusst, wie Elemente übereinander liegen.

## Wann wird ein Stacking-Kontext erstellt?

Ein Stacking-Kontext (Überlagerungskontext) wird für ein Element in CSS erstellt, wenn:

1. Das Element hat einen expliziten `z-index`, der von `auto` abweicht (und es ist `positioned` → `relative`, `absolute`, `fixed`, `sticky`).
2. Das Element hat `opacity < 1`.
3. Das Element hat `transform`, `filter`, `perspective`, `clip-path`, `mask`, `contain` und eine Reihe anderer Eigenschaften.
4. Ein Flex- oder Grid-Element mit einem `z-index`, der von `auto` abweicht.
5. Wenn das Element `isolation: isolate` hat.


## Wo kann das nützlich sein:

1. Wenn innerhalb eines Containers Mischmodi (`mix-blend-mode` oder `filter`) verwendet werden und deren Wirkung auf diesen Container beschränkt werden soll.
2. Wenn sichergestellt werden muss, dass der z-index der Nachkommen nicht mit externen Elementen in Konflikt gerät.

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
Wenn Sie `isolation: isolate` festlegen, erstellen Sie einen "isolierten" Container, und alle Mischmodi (Blending) innerhalb davon werden nicht über dessen Grenzen hinaus wirken und keine Elemente außerhalb dieses Containers beeinflussen.

## position: relative ≠ Stacking-Kontext.  

Die Eigenschaft `position: relative` **erstellt keinen Stacking-Kontext**.  
Sie ermöglicht lediglich die Festlegung eines `z-index`. Aber solange `z-index: auto` → wird kein Stacking-Kontext erstellt, das Element nimmt am allgemeinen Überlagerungsfluss des übergeordneten Elements teil. Nur in Kombination dieser beiden Eigenschaften `z-index` und `position: relative` wird ein separater Stacking-Kontext erstellt; wenn nur `position: relative` festgelegt wird, wird kein Stacking-Kontext erstellt.

## isolation: isolate = Stacking-Kontext

Die Eigenschaft **`isolation`** in CSS steuert die **Isolation** eines Elements. Wenn ihr Wert auf **`isolate`** gesetzt ist, erstellt sie einen **neuen Überlagerungskontext (Stacking-Kontext)** für dieses Element und seine Nachkommen. Dies isoliert die Nachkommen vom Rest der Seite.

- `isolation: auto;` (Standardwert)  
    → das Element **erstellt keinen** neuen Stacking-Kontext von sich aus (nur wenn es Eigenschaften hat, die dies tun — z.B. `position: fixed`, `z-index` usw.).
    
- `isolation: isolate;`  
    → das Element **erstellt immer** einen neuen Stacking-Kontext, selbst wenn es keinen `z-index` oder andere Eigenschaften hat.

## Stacking-Kontext ≠ Compositing-Schicht
**Stacking-Kontext** → ist eine logische Gruppe von Elementen zur Steuerung der Überlagerung (`z-index`).
**Compositing-Schicht** → ist eine separate GPU-Schicht für das Rendering.

Browser verwenden **`Compositing-Schichten`** als internes Optimierungsmechanismus. Wenn der Browser sieht, dass ein Element häufig geändert wird oder eine komplexe Neuzeichnung erfordert (z.B. aufgrund von Animationen, 3D-Transformationen oder in unserem Fall der Erstellung eines neuen Überlagerungskontexts), kann er entscheiden, dieses Element auf eine separate Schicht zu „verschieben“. Dies ermöglicht es dem Browser, nur diese Schicht neu zu zeichnen und zu animieren, ohne die gesamte Seite zu beeinflussen, was die Leistung erheblich steigert.

**Jede Compositing-Schicht ist ein Stacking-Kontext, aber nicht jeder Stacking-Kontext ist eine Compositing-Schicht**.

```css
div {
  position: relative;
  z-index: 1; /* Stacking-Kontext */
}
```
Hier **wird ein Stacking-Kontext erstellt**, aber **eine Compositing-Schicht muss nicht unbedingt** erstellt werden.

Es gibt auch keine Garantie, dass `isolation: isolate` **Compositing-Schichten** erstellt, aber es erstellt einen neuen **Stacking-Kontext**.
Es ist sehr wahrscheinlich, dass es auf eine separate Compositing-Schicht erhöht wird. Diese Entscheidung trifft jedoch **der Browser selbst** basierend auf seinen internen Heuristiken und verfügbaren Ressourcen (z.B. GPU-Speicher).

Wenn Ihr Ziel nicht nur darin besteht, einen **Stacking-Kontext** zu erstellen, sondern auch die **Leistung zu optimieren**, und Sie dem Browser einen Hinweis geben möchten, eine neue Compositing-Schicht zu erstellen, ist es besser, `will-change: transform` oder `will-change: opacity` zu verwenden. Dies sind klarere „Hinweise“ für den Browser, die weniger Nebenwirkungen in der Semantik haben als `isolation`.