---
create: 2025-09-23
idnote: kPmDtkYXeS
vault: dev
title: Utility API und Utility-Klassen in Bootstrap 5
symlink:
symlinkchapter: CSS
path:
tags:
  - bootstrap
  - scss
  - utility
status:
rating:
published: 2025-09-23
Language: de
---
![[Pasted image 20250923150341.png]]
## Was ist Utility API und Utility-Klassen in Bootstrap

**Utility API** ist ein Sass-basiertes Werkzeug zur Erstellung von Utility-Klassen.  
**Utility-Klassen** sind kleine, zielgerichtete Klassen, die verwendet werden können, um schnell Stile auf HTML-Elemente anzuwenden, ohne benutzerdefiniertes CSS schreiben zu müssen.

Bootstrap hat `bootstrap/scss/utilities/api` und `bootstrap/scss/utilities`, die es ermöglichen, eigene Utilities (Higher-Order-Klassen) für schnelles Prototyping und responsives Design zu erstellen. Es ähnelt dem Prinzip von **Tailwind**, hat aber weniger Klassen und ein einfacheres System.

`$utilities` ist ein Array-ähnliches Objekt in SASS, das die Einstellungen zur Generierung von Utility-Klassen enthält. Es enthält eine Liste aller Utilities (Klassen), die im endgültigen CSS-Dokument generiert werden, sowie deren Einstellungen. Die Utilities API generiert Klassen basierend auf den Daten aus `$utilities`.

In `_utilities.scss` befindet sich das array-ähnliche Objekt `$utilities` mit einer Reihe von Eigenschaften und Daten zur Klassen-Generierung.

```scss
$utilities: (
...
  "opacity": (
    property: opacity,
    values: (
      0: 0,
      25: .25,
      50: .5,
      75: .75,
      100: 1,
    )
  )
...
);
```

Die generierten Utility-Klassen haben eine höhere Priorität als die Basis-Klassen von Bootstrap. Anhand der Namen der Utility-Klassen ist in der Regel klar, was diese Klasse bewirkt. Zum Beispiel: `.text-center` - zentriert den Text, `.m-3` - fügt Abstände hinzu, `.d-flex` - macht das Element zu einem Flex-Container usw.

Der Vorteil der Verwendung von Utility-Klassen liegt darin, dass sie es ermöglichen, schnell ein responsives Design zu erstellen, ohne viel benutzerdefiniertes CSS schreiben zu müssen.

**Grundprinzipien dieser Utility-Klassen:**
1. Atomare, unabhängige Klassen
2. Können miteinander kombiniert werden
3. Haben eine höhere Priorität als die Basis-Klassen von Bootstrap

**Nachteile:**
Die Größe der endgültigen CSS-Datei erhöht sich, da viele Klassen generiert werden, die möglicherweise im Projekt nicht verwendet werden. Zudem kann die Anpassung und Refaktorisierung schwieriger sein, da man mit einer Vielzahl von Klassen arbeiten muss. Zum Beispiel, wenn die Textfarbe geändert werden muss, muss man alle verwendetet Klassen `.text-*`, die im Projekt genutzt werden, finden und ersetzen, anstatt dies einmal in der CSS-Datei zu ändern. Ein weiterer Nachteil ist, dass die Vielzahl der Klassen für jedes Element das HTML-Markup komplizierter machen kann.

## Eigenschaften für jede Utility

|Option|Typ|Beschreibung|
|---|---|---|
|`property`|**Erforderlich**|Name der Eigenschaft, dies kann ein String oder ein Array von Strings sein (z.B. horizontale Padding oder Margins).|
|`values`|**Erforderlich**|Liste von Werten oder eine Karte, wenn Sie nicht möchten, dass der Klassenname mit dem Wert übereinstimmt. Wenn der Schlüssel der Karte `null` ist, wird er nicht kompiliert.|
|`class`|Optional|Variable für den Klassennamen, wenn Sie möchten, dass dieser nicht mit der Eigenschaft übereinstimmt. Wenn der Schlüssel `class` nicht angegeben ist und der Schlüssel `property` ein Array von Strings ist, wird der Klassenname das erste Element des Arrays `property` sein.|
|`state`|Optional|Liste von Pseudoklassen wie `:hover` oder `:focus`, die für die Utility generiert werden müssen. Der Standardwert ist nicht vorhanden.|
|`responsive`|Optional|Boolean-Wert, der angibt, ob responsive Klassen generiert werden sollen. Standard ist `false`.|
|`rfs`|Optional|Boolean-Wert zum Aktivieren des fluid rescaling. Details finden Sie auf der Seite [RFS](https://getbootstrap.com/docs/5.0/getting-started/rfs/). Standard ist `false`.|
|`print`|Optional|Boolean-Wert, der angibt, ob Klassen für den Druck generiert werden sollen. Standard ist `false`.|
|`rtl`|Optional|Boolean-Wert, der angibt, ob die Utility im RTL unterstützt werden soll. Standard ist `true`.|

**N.B.**
Alle von der API generierten Utility-Klassen enthalten `!important`, um sicherzustellen, dass sie Komponenten und Modifier-Klassen wie vorgesehen überschreiben. Sie können diese Einstellung global über die Variable `$enable-important-utilities` umschalten (Standard ist `true`).

## Utilities können erweitert werden.

Dazu verwenden wir die Sass-Funktion `map-merge()`, die es ermöglicht, zwei Maps zu einer zu kombinieren.

```scss
$utilities: map-merge(
	$utilities,
	(
		"custom-utility": (
			property: custom-property,
			class: custom-class,
			values: (
				key1: value1,
				key2: value2,
			)
		)
	)
);
```

Die Reihenfolge ist wichtig, zuerst muss `$utilities` deklariert werden, und dann kann es erweitert werden, anschließend wird `utilities/api` initialisiert.

```scss
@import "bootstrap/scss/utilities";  
$utilities: map-merge(  
   $utilities,  
   (  
   "height": (  
     property: height,  
     class: h,  
     responsive: true,  
     values: (  
       25: 25%,  
       50: 50%,  
       75: 75%,  
       100: 100%  
     )  
   )  
   )  
);  
@import "bootstrap/scss/utilities/api";
```

## Bestehende Utilities können modifiziert werden.
Dazu verwenden wir ebenfalls `map-merge()`, jedoch mit einer bestehenden Utility sowie `map-get()`, um die benötigten Eigenschaften zu erhalten.

Zum Beispiel, um `10%` zur Utility `width` hinzuzufügen.

```scss
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/utilities";

$utilities: map-merge(
  $utilities,
  (
    "width": map-merge(
      map-get($utilities, "width"),
      (
        values: map-merge(
          map-get(map-get($utilities, "width"), "values"),
          (10: 10%),
        ),
      ),
    ),
  )
);
```

## Responsive zu einer bestehenden Utility-Klasse hinzufügen.

In **Bootstrap 5** können alle Utilities an Breakpoints angepasst werden.

```
{property}{sides?}-{breakpoint?}-{value}
```

**Beispiel:**  
 `d-flex, d-sm-flex, d-md-flex, d-lg-flex'

```html
<div class="d-lg-flex">
  Responsive height block
</div>
```

In Bootstrap 5 unterstützen jedoch nicht alle **Utilities** responsive Breakpoints „out of the box“. 
- Für **margin, padding, display, flex, grid, text, color** — ja, sie funktionieren mit `-sm-`, `-md-` usw.
- Für **height/width (`h-*`, `w-*`)** gibt es standardmäßig **keine** responsive Version. Daher wird `h-md-100` nicht funktionieren.

Es gibt jedoch die Möglichkeit, die Unterstützung für Responsive zu bestehenden Utilities, wie z. B. `height` und `width`, hinzuzufügen. Indem Sie die Eigenschaft `responsive: true` in der Beschreibung der Utility in `$utilities` hinzufügen.

```scss
$utilities: map-merge(  
   $utilities,  
   (  
   "height": (  
     property: height,  
     class: h,  
     responsive: true,  
     values: (  
       25: 25%,  
       50: 50%,  
       75: 75%,  
       100: 100%  
     )  
   )  
   )  
);
```

Alternativ können Sie auch gezielt eine bestimmte Utility-Klasse, wie z.B. `border`, umschreiben.

```scss
$utilities: map-merge(
  $utilities, (
    "border": map-merge(
      map-get($utilities, "border"),
      ( responsive: true ),
    ),
  )
);
```

## Utility-Klassen umbenennen
Das ist auch möglich, wenn Ihnen der Standardklassenname nicht gefällt. Dafür ist die Eigenschaft `class` verantwortlich.

```scss
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/utilities";

$utilities: map-merge(
  $utilities, (
    "margin-start": map-merge(
      map-get($utilities, "margin-start"),
      ( class: ml ),
    ),
  )
);
```

## Bestimmte Utility-Klassen aus der CSS-Generierung entfernen
Entfernen Sie alle Utilities standardmäßig, indem Sie den Schlüssel der Gruppe auf `null` setzen. Zum Beispiel, hier ein Beispiel, wie man die Utility width entfernt.

```scss
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/utilities";

$utilities: map-merge(
  $utilities,
  (
    "width": null
  )
);
```

> [!hidden-in-public]-
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> https://getbootstrap.com/docs/5.3/utilities/api/
> 
> ## Zero-links
> ----
> [[00 BOOTSTRAP]]