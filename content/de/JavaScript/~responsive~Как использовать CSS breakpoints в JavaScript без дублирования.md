---
create: 2025-03-28
idnote: lf371dOgkL
vault: dev
title: Wie man CSS-Breakpoints in JavaScript ohne Duplizierung verwendet
path:
tags:
  - responsive
  - js
  - media_queries
status:
rating:
published: 2025-05-26
symlink:
symlinkchapter: JavaScript
Language: de
---
![[Pasted image 20250526121010.png]]

Bei der Arbeit mit responsivem Design besteht oft die Notwendigkeit, dieselben **Breakpoints** sowohl in CSS als auch in JavaScript zu verwenden. 
Breakpoints separat in JavaScript und separat in CSS zu speichern, ist keineswegs der beste Ansatz. Der Grund dafür ist, dass dies zu Duplizierung führt: Breakpoints werden gleichzeitig in CSS und JS definiert, was zwei Einstiegspunkte schafft. Wenn sich die Breakpoints an einem Ort (z. B. in CSS) ändern, kann es sein, dass sie an einem anderen Ort (JavaScript) nicht aktualisiert werden.

Um solche Risiken zu vermeiden, verwenden wir **einen einzigen Einstiegspunkt**, an dem die Breakpoints an einem Ort in den CSS(SCSS)-Stilen definiert und dann in JavaScript als Objekt übergeben werden.

## Definieren von Breakpoints in SCSS

In SCSS erstellen wir eine Map mit Breakpoints. Eine Map in CSS ist ähnlich einem assoziativen Array in JavaScript, einfach ausgedrückt ein Objekt mit Schlüsseln und Werten.

```scss
$grid-breakpoints: (   
	xs: 0,   
	sm: 576px,   
	md: 768px,   
	lg: 992px,   
	xl: 1200px,  
	xxl: 1400px 
);
```

## Übergeben von Breakpoints in CSS über ein Pseudo-Element

Um Daten an JS zu übergeben, verwenden wir `::before` und betten die Zeichenfolge mit den Breakpoints in `content` ein.
Aber zuerst müssen wir die Map in eine Zeichenfolge umwandeln. Dazu schreiben wir eine SCSS-Funktion zur Umwandlung der Map.

```scss
@function map-to-string($map) {   
	$result: "";   
	@each $key, $value in $map {     
		$result: "#{$result}#{$key}: #{$value}, ";   
	}   
	@return $result; 
}
```

Dann wenden wir sie auf `body::before` an:

```css
body {   
	&::before {     
		content: map-to-string($grid-breakpoints);     
		display: none;   
	}
}
```

## Extrahieren der Zeichenfolge aus CSS in JavaScript

In JS können wir den Wert von `content` aus dem Pseudo-Element `::before` mit der JS-Methode `getComputedStyle` abrufen und in einer Variablen speichern.

```js
const rawBreakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
```

---

## Umwandeln der Zeichenfolge mit Breakpoints in ein Objekt

Um bequem mit unseren Breakpoints in JS zu interagieren, müssen wir sie in ein Objekt umwandeln.
Wir parsen die Zeichenfolge und verwandeln sie in ein Objekt:

```js
const breakpointsArray = rawBreakpoints.split(', ').map(item => item.split(': '));  
const breakpointsObject = Object.fromEntries(breakpointsArray);
```

Jetzt enthält die Variable `breakpointsObject` ein Objekt mit allen Breakpoints aus SCSS:

```js
console.log(breakpointsObject); // { xs: "0", sm: "576px", md: "768px", lg: "992px", xl: "1200px", xxl: "1400px" }
```

## Verwenden von `matchMedia`, um zu überprüfen, ob die Bildschirmbreite unseren Breakpoints entspricht

Wir verwenden die Eigenschaft `matchMedia` und übergeben die gewünschten Breakpoints aus dem Objekt `breakpointsObject`. 
Wir überwachen Änderungen der Medienabfrage: Wenn die Bildschirmbreite einem bestimmten Breakpoint entspricht, wird eine Callback-Funktion mit der für uns benötigten JavaScript-Logik für den bestimmten Breakpoint ausgelöst.  
In unserem Beispiel enthält diese Logik die Funktion `handleMinLg`. Diese Funktion wird angewendet, wenn die Medienabfrage dem Wert entspricht, der in `breakpointsObject.lg` gespeichert ist. In diesem Fall ist dies eine minimale Breite von `992px`.

```js
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
  
handleMinLg(breakpointMinLg); // wird beim ersten Laden der Seite ausgeführt
breakpointMinLg.addEventListener('change', handleMinLg); 
  
function handleMinLg (e) { 
	// wenn true zurückgegeben wird, entspricht die Bildschirmbreite der angegebenen Medienabfrage
    if (e.matches) {  	
		console.log('Die Bildschirmbreite ist größer oder gleich 992px');
    }  
}
```

## Zusammenfassung

Mit diesem Ansatz:
- Vermeiden wir die Duplizierung von Breakpoints zwischen CSS und JavaScript;
- Wird die Wartung einfacher und sicherer;
- Haben wir einen einzigen Einstiegspunkt für Breakpoints, die sowohl in CSS als auch in JavaScript verwendet werden.

Dies ist eine saubere und nachhaltige Lösung zur Synchronisierung von responsiven Punkten zwischen CSS und JavaScript.