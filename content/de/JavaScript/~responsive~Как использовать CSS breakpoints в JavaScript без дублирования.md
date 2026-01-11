---
create: 2025-03-28
idnote: lf371dOgkL
vault: dev
title: So verwenden Sie CSS-Breakpoints in JavaScript ohne Duplizierung
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

Bei der Arbeit mit responsivem Design besteht oft die Notwendigkeit, dieselben **Breakpoints** sowohl in CSS als auch in JavaScript zu verwenden. Breakpoints separat in JavaScript und separat in CSS zu speichern, ist bei weitem nicht der beste Ansatz. Der Grund dafür ist, dass dies zu Duplizierung führt: Breakpoints werden gleichzeitig in CSS und JS angegeben, was zwei Einstiegspunkte schafft. Wenn sich die Breakpoints an einem Ort (zum Beispiel in CSS) ändern, können sie an einem anderen Ort (JavaScript) vergessen werden, aktualisiert zu werden.

Um solche Risiken zu vermeiden, verwenden wir einen **einzigen Einstiegspunkt**, an dem Breakpoints an einem Ort in den CSS (SCSS)-Stilen definiert und dann in JavaScript in Form eines Objekts übergeben werden.

## Definieren Sie Breakpoints in SCSS

In SCSS erstellen wir ein Map mit Breakpoints. Ein Map in CSS ist ähnlich wie ein assoziatives Array in JavaScript, einfach ausgedrückt ein Objekt mit Schlüsseln und Werten.

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

## Übertragen von Breakpoints in CSS über ein Pseudo-Element

Um Daten in JS zu übertragen, verwenden wir `::before` und betten den String mit Breakpoints in `content` ein.  
Aber zuerst müssen wir das Map in einen String umwandeln. Dazu schreiben wir eine SCSS-Funktion zur Umwandlung des Maps.

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

## Extrahieren des Strings aus CSS in JavaScript

In JS können wir den Wert von `content` aus dem Pseudo-Element `::before` mit der JavaScript-Methode `getComputedStyle` abrufen und in einer Variablen speichern.

```js
const rawBreakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
```

---

## Umwandeln des Strings mit Breakpoints in ein Objekt

Damit wir bequem mit unseren Breakpoints in JS arbeiten können, müssen wir sie in ein Objekt umwandeln.  
Wir parsen den String und verwandeln ihn in ein Objekt:

```js
const breakpointsArray = rawBreakpoints.split(', ').map(item => item.split(': '));  
const breakpointsObject = Object.fromEntries(breakpointsArray);
```

Jetzt enthält die Variable `breakpointsObject` ein Objekt mit allen Breakpoints aus SCSS:

```js
console.log(breakpointsObject); // { xs: "0", sm: "576px", md: "768px", lg: "992px", xl: "1200px", xxl: "1400px" }
```

## Verwenden Sie `matchMedia`, um zu überwachen, ob die Bildschirmbreite unseren Breakpoints entspricht

Verwenden Sie die Eigenschaft `matchMedia` und übergeben Sie die benötigten Breakpoints aus dem Objekt `breakpointsObj`.  
Wir überwachen Änderungen im Media-Query: Wenn die Bildschirmbreite beginnt, einem bestimmten Breakpoint zu entsprechen, wird eine Callback-Funktion mit der für uns erforderlichen JavaScript-Logik für den bestimmten Breakpoint gestartet.  
In unserem Beispiel enthält diese Logik die Funktion `handleMinLg`. Diese Funktion wird aufgerufen, wenn das Medienelement den Wert erreicht, der in `breakpointsObject.lg` eingetragen ist. In diesem Fall ist dies eine Mindestbreite von `992px`.

```js
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
  
handleMinLg(breakpointMinLg); // wird beim ersten Laden der Seite aufgerufen
breakpointMinLg.addEventListener('change', handleMinLg); 
  
function handleMinLg (e) { 
	// wenn true zurückgegeben wird, entspricht die Bildschirmbreite der angegebenen Medienanfrage
    if (e.matches) {  	
		console.log('Die Bildschirmbreite ist größer oder gleich 992px');
    }  
}
```

## Fazit

Mit diesem Ansatz:
- Vermeiden wir die Duplizierung von Breakpoints zwischen CSS und JavaScript;
- Wird die Wartung einfacher und sicherer;
- Haben wir einen einzigen Einstiegspunkt für Breakpoints, die sowohl in CSS als auch in JavaScript verwendet werden.

Dies ist eine saubere und robuste Lösung zur Synchronisierung von responsiven Punkten zwischen CSS und JavaScript.