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


## Was ist ein Stacking Context

In CSS ist ein **Stacking Context** ein Konzept, das die Überlappungsreihenfolge von Elementen auf der Seite entlang der Z-Achse definiert (d.h. welches Element über welchem anderen liegt). Einfach gesagt, ist es ein „Container“ für Elemente, in dem deren **z-index** und Anzeigereihenfolge verwaltet werden.

**Eigenschaften des Stacking Context**
- Jeder **Stacking Context** bildet sein eigenes „Schichtensystem“.
- Elemente innerhalb eines Stacking Context überlappen sich in der Reihenfolge von **z-index** (oder dem natürlichen Fluss, wenn kein z-index angegeben ist).
- Elemente aus verschiedenen Stacking Context konkurrieren nicht direkt — die Reihenfolge zwischen ihnen wird durch die übergeordneten Kontexte bestimmt.

Das ist keine Leistungsoptimierung, sondern eine semantische Regel, die beeinflusst, wie Elemente übereinander liegen.

## Wann wird ein Stacking Context erstellt?

Ein Stacking Context (Überlagerungskontext) wird für ein Element in CSS erstellt, wenn:

1. Das Element hat einen ausdrücklich angegebenen `z-index`, der von `auto` abweicht (und dabei ist es `positioned` → `relative`, `absolute`, `fixed`, `sticky`).
2. Das Element hat eine `opacity < 1`.
3. Das Element hat `transform`, `filter`, `perspective`, `clip-path`, `mask`, `contain` und eine Reihe anderer Eigenschaften.
4. Flex- oder Grid-Element mit einem `z-index`, der von auto abweicht.
5. Wenn das Element `isolation: isolate` gesetzt hat.


## Wo kann das nützlich sein:

1. Wenn innerhalb eines Containers Mischmodi (`mix-blend-mode` oder `filter`) verwendet werden und deren Wirkungsbereich auf nur diesen Container beschränkt werden muss.
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
	isolation: isolate; /* neuer Stacking Context wird erstellt */ 
}  
.child {   
	mix-blend-mode: multiply; 
}
```

Ohne `isolation: isolate` wird das Kind mit **dem gesamten Hintergrund der Seite** vermischt, während es mit `isolate` nur mit dem Hintergrund von `.parent` vermischt wird. Wenn Sie `isolation: isolate` setzen, erstellen Sie einen "isolierten" Container, und alle Mischmodi (Blending) innerhalb dieses Containers werden nicht über dessen Grenzen hinauswirken und Elemente außerhalb dieses Containers nicht beeinflussen.

## position: relative ≠ Stacking Context.  

Die Eigenschaft `position: relative` **erzeugt keinen Stacking Context**.  
Sie ermöglicht lediglich das Festlegen eines `z-index`. Solange `z-index: auto` → kein Stacking Context erstellt wird, bleibt das Element Teil des allgemeinen Überlappungsflusses des übergeordneten Elements. Nur in Kombination dieser beiden Eigenschaften `z-index` und `position: relative` wird ein separater Stacking Context erstellt; wenn nur `position: relative` festgelegt wird, wird kein Stacking Context erstellt.

## isolation: isolate = Stacking Context

Die Eigenschaft **`isolation`** in CSS steuert die **Isolation** eines Elements. Wenn ihr Wert auf **`isolate`** gesetzt wird, erstellt sie einen **neuen Stacking Context** für dieses Element und dessen Nachkommen. Dies isoliert die Nachkommen vom Rest der Seite.

- `isolation: auto;` (Standardwert)  
    → Element **erstellt keinen** neuen Stacking Context von sich aus (nur wenn es Eigenschaften hat, die dies tun — z.B. `position: fixed`, `z-index` usw.).
    
- `isolation: isolate;`  
    → Element **erzeugt immer** einen neuen Stacking Context, auch wenn es keinen `z-index` oder andere Eigenschaften hat.

## Stacking Context ≠ Compositing Layer
**Stacking Context** → ist eine logische Gruppe von Elementen zur Steuerung der Überlappung (`z-index`).
**Compositing Layer** → ist eine separate GPU-Schicht für das Rendern.

Browser verwenden **`Compositing Layer`** als internes Optimierungsmechanismus. Wenn der Browser sieht, dass sich ein Element häufig ändert oder eine komplexe Neuzeichnung erfordert (z.B. aufgrund von Animationen, 3D-Transformationen oder, in unserem Fall, der Erstellung eines neuen Überlagerungskontextes), kann er entscheiden, dieses Element auf eine separate Schicht zu "heben". Dies ermöglicht es dem Browser, nur diese Schicht neu zu zeichnen und zu animieren, ohne die gesamte Seite zu betreffen, was die Leistung erheblich steigert.

**Jede Compositing Layer ist ein Stacking Context, aber nicht jeder Stacking Context ist eine Compositing Layer**.

```css
div {
  position: relative;
  z-index: 1; /* Stacking Context */
}
```
Hier **wird ein Stacking Context erstellt**, aber **eine Compositing Layer muss nicht unbedingt** erstellt werden.

Es besteht auch keine Garantie, dass `isolation: isolate` eine **Compositing Layer** erstellt, aber es erstellt einen neuen **Stacking Context.** Es ist ziemlich wahrscheinlich, dass sie auf eine separate Compositing Layer angehoben wird. Diese Entscheidung trifft jedoch **der Browser selbst** auf der Grundlage seiner internen Heuristiken und der verfügbaren Ressourcen (z.B. GPU-Speicher).

Wenn Ihr Ziel nicht nur darin besteht, einen **Stacking Context** zu erstellen, sondern auch die **Leistung zu optimieren**, und Sie dem Browser empfehlen möchten, eine neue Compositing Layer zu erstellen, verwenden Sie am besten `will-change: transform` oder `will-change: opacity`. Dies sind klarere "Hinweise" für den Browser, die weniger seitliche semantische Effekte haben als `isolation`.