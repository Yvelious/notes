---
create: 2025-03-28
idnote: lf371dOgkL
vault: dev
title: Wie man CSS-Breakpoints in JavaScript ohne Duplikation verwendet
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

Bei der Arbeit mit responsive Design ist es oft notwendig, dieselben **Breakpoints** sowohl in CSS als auch in JavaScript zu verwenden. 
Breakpoints getrennt in JavaScript und in CSS zu speichern, ist nicht der beste Ansatz. Der Grund dafür ist, dass dies zu Duplikationen führt: Breakpoints werden sowohl in CSS als auch in JS definiert, was zwei Einstiegspunkte schafft. Wenn sich die Breakpoints an einem Ort (zum Beispiel in CSS) ändern, kann es sein, dass sie am anderen Ort (JavaScript) nicht aktualisiert werden.

Um solche Risiken zu vermeiden, verwenden wir **einen einzigen Einstiegspunkt**, an dem die Breakpoints an einem Ort in den CSS(SCSS) Stilen definiert und dann in Form eines Objekts nach JavaScript übergeben werden.

## Definieren der Breakpoints in SCSS

In SCSS erstellen wir ein Map mit Breakpoints. Ein Map in CSS ist ähnlich einem assoziativen Array in JavaScript, einfach gesagt, ein Objekt mit Schlüsseln und Werten.

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

## Übergeben der Breakpoints an CSS über ein Pseudo-Element

Um Daten in JS zu übergeben, verwenden wir `::before` und betten die Zeichenkette mit den Breakpoints in `content` ein. 
Zunächst müssen wir das Map in eine Zeichenkette umwandeln. Dazu schreiben wir eine SCSS-Funktion zur Umwandlung des Maps.

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

## Extrahieren der Zeichenkette aus CSS in JavaScript

In JS können wir den Wert von `content` aus dem Pseudo-Element `::before` mit der JS-Methode `getComputedStyle` abrufen und in einer Variablen speichern.

```js
const rawBreakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
```

---

## Umwandeln der Zeichenkette mit Breakpoints in ein Objekt

Damit wir bequem mit unseren Breakpoints in JS interagieren können, müssen wir sie in ein Objekt umwandeln. 
Wir parsen die Zeichenkette und verwandeln sie in ein Objekt:

```js
const breakpointsArray = rawBreakpoints.split(', ').map(item => item.split(': '));  
const breakpointsObject = Object.fromEntries(breakpointsArray);
```

Jetzt enthält die Variable `breakpointsObject` ein Objekt mit allen Breakpoints aus SCSS:

```js
console.log(breakpointsObject); // { xs: "0", sm: "576px", md: "768px", lg: "992px", xl: "1200px", xxl: "1400px" }
```

## Verwenden von `matchMedia`, um zu überwachen, ob die Bildschirmbreite unseren Breakpoints entspricht

Wir verwenden die Eigenschaft `matchMedia` und übergeben ihr die benötigten Breakpoints aus dem Objekt `breakpointsObj`. 
Wir überwachen die Änderungen der Medienanfragen: Wenn die Bildschirmbreite mit einem bestimmten Breakpoint übereinstimmt, wird eine Callback-Funktion mit der für uns erforderlichen JavaScript-Logik für diesen bestimmten Breakpoint ausgeführt.  
In unserem Beispiel enthält diese Logik die Funktion `handleMinLg`, die angewendet wird, wenn die Medienanfrage dem in `breakpointsObject.lg` festgelegten Wert entspricht. In diesem Fall ist dies eine Mindestbreite von `992px`.

```js
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
  
handleMinLg(breakpointMinLg); // wird bei der ersten Seitenladung ausgeführt
breakpointMinLg.addEventListener('change', handleMinLg); 
  
function handleMinLg (e) { 
	// wenn true zurückgegeben wird, bedeutet das, dass die Bildschirmbreite dem angegebenen Medienanfrage entspricht
    if (e.matches) {  	
		console.log('Die Bildschirmbreite ist größer oder gleich 992px');
    }  
}
```

## Zusammenfassung

Mit diesem Ansatz:
- Vermeiden wir die Duplikation von Breakpoints zwischen CSS und JavaScript;
- Wird die Wartung einfacher und sicherer;
- Haben wir einen einzigen Einstiegspunkt für Breakpoints, die sowohl in CSS als auch in JavaScript verwendet werden.

Dies ist eine saubere und nachhaltige Lösung zur Synchronisierung von responsiven Punkten zwischen CSS und JavaScript.





> [!raw-hidden]-
> Wenn wir Breakpoints aus CSS für die Arbeit mit Media Queries in JavaScript verwenden möchten, müssen wir sie zuerst aus CSS extrahieren und nach JS übergeben.
> 
> Man könnte natürlich Breakpoints manuell direkt in JavaScript schreiben, aber das ist bei weitem nicht der beste Ansatz. Diese Methode erhöht das Risiko von Fehlern und erschwert die Wartung des Codes. Der Grund ist, dass dies zu Duplikation führt: Breakpoints werden sowohl in CSS als auch in JS definiert, wodurch zwei Einstiegspunkte entstehen. Wenn sich die Breakpoints an einem Ort (z.B. in CSS) ändern, können sie im anderen Ort (JS) vergessen werden zu aktualisieren.
> 
> Um solche Probleme zu vermeiden, ist es besser, einen einzigen Einstiegspunkt zu schaffen. Dies ermöglicht die Synchronisation der Breakpoints zwischen CSS und JS und vereinfacht die Wartung und verringert die Wahrscheinlichkeit von Fehlern.
> 
> Unser Ziel ist es, die Breakpoints aus CSS in JavaScript zu übergeben und sie in einem Objekt zu speichern, um sie später in JavaScript zu verwenden.
> 
> Zum Beispiel haben wir eine SCSS-Variable, die ein Map mit Breakpoints enthält:
> ```scss
> $grid-breakpoints: (  
>   xs: 0,  
>   sm: 576px,  
>   md: 768px,  
>   lg: 992px,  
>   xl: 1200px,  
>   xxl: 1400px  
> )
> 
> ```
> 
> Zunächst müssen wir sie in das Pseudo-Element `::before` in CSS übertragen, damit wir sie später in JavaScript extrahieren können. 
> Dazu müssen wir das SCSS-Map in eine Zeichenkette umwandeln und in die Eigenschaft `content` übergeben. Für die Umwandlung in eine Zeichenkette verwende ich die Funktion `map-to-string`.
> 
> ```scss
> body {
> 	&::before {  
> 	    content: map-to-string($grid-breakpoints);  
> 	    display: none;  
> 	}
> }
> 
> @function map-to-string($map) {  
>    $result: "";  
>    @each $key, $value in $map {  
>      $result: "#{$result}#{$key}: #{$value}, ";  
>    }  
>    @return $result;  
> }
> ```
> 
> Jetzt müssen wir die Zeichenkette mit den Informationen über die Breakpoints aus CSS extrahieren und nach JavaScript übergeben. Dazu können wir `getComputedStyle` verwenden.
> Schließlich haben wir die Zeichenkette mit allen Breakpoints aus der `content`-Eigenschaft extrahiert und in der Variablen `breakpoints` gespeichert:
> 
> ```js
> const breakpoints = getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/\"/g, '').trim();
> ```
> 
> Danach müssen wir diese Zeichenkette in ein Objekt umwandeln.
> 
> ```js
> const breakpointsArray = breakpoints.split(', ').map(item => item.split(': '));  
> const breakpointsObj = Object.fromEntries(breakpointsArray);
> ```
> 
> Auf diese Weise erhalten wir das Objekt `breakpointsObj` mit allen Breakpoints aus CSS, die wir jetzt in JavaScript verwenden können.
> 
> Jetzt können wir diese Breakpoints in JavaScript zur Arbeit mit Media Queries verwenden.
> Dazu verwenden wir die Eigenschaft `matchMedia` und übergeben die Breakpoints aus dem Objekt `breakpointsObj`. 
> 
> Wir hören auf Änderungen des Breakpoints, und wenn die aktuelle Bildschirmbreite dem angegebenen Medienanfrage entspricht, führen wir die Callback-Funktion aus. In diesem Fall ist die Funktion `handleMinLg` definiert.
> 
> ```js
> const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
>   
> handleMinLg(breakpointMinLg); // läuft bei der ersten Seitenladung
> breakpointMinLg.addEventListener('change', handleMinLg); 
>   
> function handleMinLg (e) { 
>     if (e.matches) {  	// wenn true zurückgegeben wird, bedeutet das, dass die Bildschirmbreite dem angegebenen Medienanfrage entspricht
> 		console.log('Die Bildschirmbreite ist größer oder gleich 992px');
>     }  
> }
> ```
> 
> Auf diese Weise können wir Breakpoints aus CSS in JavaScript verwenden, um Duplikationen im Code zu vermeiden und die Wartung zu vereinfachen.
>

> [!hidden-in-public]-
> ## Alternative Überschriften
> ---
> Importieren von CSS-Breakpoints in JavaScript
> Synchronisierung von CSS-Breakpoints in JavaScript
> Verwendung von CSS-Breakpoints in JavaScript ohne Duplikation
> 
> 
> ## Prompts
> -----
> CSS-Variablen in JavaScript abrufen
> ## Links
> ----------
> [[~responsive~ Responsive JavaScript und die matchMedia Methode]]
> ## Referenzen
> ------------
> https://zellwk.com/blog/2023-12-05-css-vars-javascript/
> https://vueschool.io/articles/vuejs-tutorials/how-to-update-root-css-variable-with-javascript/
> https://css-tricks.com/how-to-get-all-custom-properties-on-a-page-in-javascript/
> https://johnkavanagh.co.uk/articles/responsive-javascript-and-the-matchmedia-method/
> https://kinsta.com/blog/javascript-media-query/
> 
> ## Zero-Links
> ----
> [[00 Responsive]]