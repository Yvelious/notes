---
create: 2025-03-28
idnote: lf371dOgkL
vault: dev
title: Wie man CSS Breakpoints in JavaScript ohne Duplikate verwendet
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

Bei der Arbeit mit responsivem Design tritt häufig die Notwendigkeit auf, dieselben **Breakpoints** sowohl in CSS als auch in JavaScript zu verwenden. 
Die Breakpoints getrennt in JavaScript und in CSS zu speichern, ist nicht der beste Ansatz. Der Grund dafür ist, dass dies zu Duplikationen führt: Breakpoints werden gleichzeitig in CSS und JS definiert, was zwei Einstiegspunkte schafft. Wenn die Breakpoints an einem Ort geändert werden (zum Beispiel in CSS), könnte man vergessen, sie an einem anderen Ort (JavaScript) zu aktualisieren.

Um solche Risiken zu vermeiden, werden wir **einen einheitlichen Einstiegspunkt** nutzen, bei dem die Breakpoints an einer Stelle in den CSS(SCSS)-Stilen definiert und dann in JavaScript als Objekt übergeben werden.

## Breakpoints in SCSS definieren

In SCSS erstellen wir eine Map mit Breakpoints. Eine Map in CSS ist ähnlich wie ein assoziatives Array in JavaScript, einfach gesagt, ein Objekt mit Schlüsseln und Werten.

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

## Breakpoints über einen Pseudo-Element in CSS übergeben

Um Daten an JS zu übertragen, verwenden wir `::before` und betten die Zeile mit den Breakpoints in `content` ein. 
Aber zuerst müssen wir die Map in einen String umwandeln. Dazu schreiben wir eine SCSS-Funktion zur Umwandlung der Map.

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

## Den String aus CSS in JavaScript extrahieren

In JS können wir den Wert von `content` aus dem Pseudo-Element `::before` mit der JS-Methode `getComputedStyle` abrufen und in einer Variablen speichern.

```js
const rawBreakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
```

---

## Den String mit Breakpoints in ein Objekt umwandeln

Um bequem mit unseren Breakpoints in JS zu interagieren, müssen wir ihn in ein Objekt umwandeln. 
Wir parsen den String und verwandeln ihn in ein Objekt:

```js
const breakpointsArray = rawBreakpoints.split(', ').map(item => item.split(': '));  
const breakpointsObject = Object.fromEntries(breakpointsArray);
```

Jetzt enthält die Variable `breakpointsObject` ein Objekt mit allen Breakpoints aus SCSS:

```js
console.log(breakpointsObject); // { xs: "0", sm: "576px", md: "768px", lg: "992px", xl: "1200px", xxl: "1400px" }
```

## `matchMedia` verwenden, um zu überwachen, ob die Bildschirmbreite unseren Breakpoints entspricht

Verwenden Sie die Eigenschaft `matchMedia` und übergeben Sie ihm die benötigten Breakpoints aus dem Objekt `breakpointsObject`. 
Überwachen Sie die Änderungen der Medienabfrage: Wenn die Bildschirmbreite einem bestimmten Breakpoint entspricht, wird eine Callback-Funktion mit der für uns benötigten JavaScript-Logik für den bestimmten Breakpoint ausgeführt.  
In unserem Beispiel enthält diese Logik die Funktion `handleMinLg`. Diese Funktion wird angewendet, wenn die Medienabfrage dem Wert entspricht, der in `breakpointsObject.lg` gespeichert ist. In diesem Fall ist das die minimale Breite von `992px`.

```js
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
  
handleMinLg(breakpointMinLg); // bei der ersten Seitenlade start aktivieren
breakpointMinLg.addEventListener('change', handleMinLg); 
  
function handleMinLg (e) { 
	// wenn true zurückgegeben wird, bedeutet das, dass die Bildschirmbreite der angegebenen Medienabfrage entspricht
    if (e.matches) {  	
		console.log('Die Bildschirmbreite ist größer oder gleich 992px');
    }  
}
```

## Zusammenfassung

Mit diesem Ansatz:
- Vermeiden wir Duplikationen der Breakpoints zwischen CSS und JavaScript;
- Wird die Wartung einfacher und sicherer;
- Haben wir einen einheitlichen Einstiegspunkt für Breakpoints, die sowohl in CSS als auch in JavaScript verwendet werden.

Dies ist eine saubere und nachhaltige Lösung zur Synchronisierung der responsiven Punkte zwischen CSS und JavaScript.