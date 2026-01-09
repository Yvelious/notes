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

**Utility API** ist ein auf Sass basierendes Werkzeug zur Erstellung von Utility-Klassen.
**Utility-Klassen** sind kleine, zielgerichtete Klassen, die verwendet werden können, um schnell Stile auf HTML-Elemente anzuwenden, ohne benutzerdefiniertes CSS schreiben zu müssen.

Bootstrap verfügt über `bootstrap/scss/utilities/api` und `bootstrap/scss/utilities`, die es ermöglichen, eigene Utilities (höhere Klassen) für schnelles Prototyping und responsives Design zu erstellen. Prinzipiell ähnelt es **tailwind**, hat jedoch weniger Klassen und ein einfacheres System.

`$utilities` ist ein arrayähnliches Objekt in SASS, das die Einstellungen zur Generierung von Utility-Klassen enthält. Es enthält eine Liste aller Utilities (Klassen), die im endgültigen CSS-Datei generiert werden sollen, sowie deren Einstellungen.
Die Utilities API generiert Klassen basierend auf den Daten aus `$utilities`.

In `_utilities.scss` befindet sich das arrayähnliche Objekt `$utilities` mit einer Sammlung von Eigenschaften und Daten zur Generierung von Utility-Klassen.

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

Die generierten Utility-Klassen haben eine höhere Priorität als die Basis-Klassen von Bootstrap. Aus den Namen der Utility-Klassen ist in der Regel ersichtlich, was diese Klasse bewirkt. Zum Beispiel zentriert `.text-center` Text, `.m-3` fügt Abstände hinzu, `.d-flex` macht ein Element zum Flex-Container usw.

Der Vorteil der Verwendung von Utility-Klassen besteht darin, dass sie es ermöglichen, schnell ein responsives Design zu erstellen, ohne viel benutzerdefiniertes CSS schreiben zu müssen.

**Grundprinzipien solcher Utility-Klassen:**
1. Atomare, unabhängige Klassen
2. Kombination untereinander möglich
3. Höhere Priorität als die Basis-Klassen von Bootstrap

**Nachteile:**
Die Größe der endgültigen CSS-Datei nimmt zu, da viele Klassen generiert werden, die im Projekt möglicherweise nicht verwendet werden. Auch die Anpassung und Refaktorisierung kann komplexer sein, da man mit einer großen Anzahl von Klassen arbeiten muss. Zum Beispiel, wenn die Textfarbe geändert werden muss, müsste man alle Klassen `.text-*` finden und ersetzen, die im Projekt verwendet werden, anstatt dies einmal in der CSS-Datei zu ändern. Ein weiterer Nachteil ist, dass die Vielzahl von Klassen für jedes Element das HTML-Markup komplizieren kann.

## Eigenschaften für jede Utility

|Option|Typ|Beschreibung|
|---|---|---|
|`property`|**Erforderlich**|Name der Eigenschaft, dies kann ein String oder ein Array von Strings sein (z. B. horizontale Padding oder Margins).|
|`values`|**Erforderlich**|Liste von Werten oder Map, falls der Klassenname nicht mit dem Wert übereinstimmen soll. Wenn als Schlüssel der Map `null` verwendet wird, wird er nicht kompiliert.|
|`class`|Optional|Variable für den Klassennamen, falls dieser nicht mit der Eigenschaft übereinstimmen soll. Wenn der Schlüssel `class` nicht angegeben ist und der Schlüssel `property` ein Array von Strings ist, wird der Klassenname das erste Element des Arrays `property` sein.|
|`state`|Optional|Liste von Pseudo-Klassen wie `:hover` oder `:focus`, die für die Utility generiert werden sollen. Standardmäßig ist dies nicht gesetzt.|
|`responsive`|Optional|Boolescher Wert, der angibt, ob responsive Klassen generiert werden sollen. Standardmäßig ist `false`.|
|`rfs`|Optional|Boolescher Wert zur Aktivierung von fluid rescaling. Weitere Informationen finden Sie auf der Seite [RFS](https://getbootstrap.com/docs/5.0/getting-started/rfs/). Standardmäßig ist `false`.|
|`print`|Optional|Boolescher Wert, der angibt, ob Klassen für den Druck generiert werden sollen. Standardmäßig ist `false`.|
|`rtl`|Optional|Boolescher Wert, der angibt, ob die Utility in RTL unterstützt werden soll. Standardmäßig ist `true`.|

**N.B.**
Alle durch die API generierten Utility-Klassen enthalten `!important`, um sicherzustellen, dass sie die Komponenten und Modifikator-Klassen wie vorgesehen überschreiben. Sie können diese Einstellung global über die Variable `$enable-important-utilities` umschalten (standardmäßig `true`).

## Utilities können erweitert werden.

Dazu verwenden wir die Sass-Funktion `map-merge()`, die es ermöglicht, zwei Maps in eine zu kombinieren.

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

Wichtig ist die Reihenfolge, zuerst muss `$utilities` deklariert werden und dann erweitert werden, und danach wird `utilities/api` initialisiert.

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

## Vorhandene Utilities können modifiziert werden.
Dazu verwenden wir ebenfalls `map-merge()`, aber mit einer bestehenden Utility und `map-get()`, um die gewünschten Eigenschaften abzurufen.

Zum Beispiel `10%` zur Utility `width` hinzufügen.

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

## Responsiveness zu einer bestehenden Utility-Klasse hinzufügen.

In **Bootstrap 5** können alle Utilities an Breakpoints "angepasst" werden.

```
{property}{sides?}-{breakpoint?}-{value}
```

**Beispiel:**
 `d-flex, d-sm-flex, d-md-flex, d-lg-flex`

```html
<div class="d-lg-flex">
  Responsives Höhenblock
</div>
```

Bootstrap 5 unterstützt jedoch nicht alle **Utilities** standardmäßig mit responsive Breakpoints. 
- Bei **margin, padding, display, flex, grid, text, color** — ja, sie funktionieren mit `-sm-`, `-md-` usw.
- Für **height/width (`h-*`, `w-*`)** sind responsive Versionen **nicht standardmäßig** vorhanden. Deshalb wird `h-md-100` nicht funktionieren.
- 
Es gibt jedoch die Möglichkeit, die Unterstützung für responsiveness zu bestehenden Utilities hinzuzufügen, beispielsweise zu `height` und `width`.
Indem man die Eigenschaft `responsive: true` in die Beschreibung der Utility in `$utilities` hinzufügt.

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

Alternativ kann auch eine bestimmte Utility-Klasse, wie `border`, gezielt umgeschrieben werden.

```scss
$utilities: map-merge(
  $utilities, (
    "border": map-merge(
      map-get($utilities, "border"),
      ( responsive: true ),
    ),
  )
)
```

## Umbenennung von Utility-Klassen
Dies ist ebenfalls möglich, wenn der Standardklassennamen nicht zusagt. Dafür ist die Eigenschaft `class` verantwortlich.

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

## Entfernen spezifischer Utility-Klassen aus der CSS-Generierung
Entfernen Sie beliebige Utilities standardmäßig, indem Sie den Gruppenschlüssel auf `null` setzen. Zum Beispiel siehe unten, wie die Utility width entfernt wird.

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