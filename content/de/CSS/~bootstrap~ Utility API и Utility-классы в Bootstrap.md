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
## Was ist die Utility API und Utility-Klassen in Bootstrap

**Utility API** ist ein auf Sass basierendes Werkzeug zur Erstellung von Utility-Klassen.  
**Utility-Klassen** sind kleine, zielgerichtete Klassen, die verwendet werden können, um Stile schnell auf HTML-Elemente anzuwenden, ohne benutzerdefiniertes CSS schreiben zu müssen.

Bootstrap bietet `bootstrap/scss/utilities/api` und `bootstrap/scss/utilities`, die es ermöglichen, eigene Utilities (höhere Klassen) für schnelles Prototyping und responsives Design zu erstellen. Prinzipiell ähnelt es **Tailwind**, jedoch mit weniger Klassen und einem einfacheren System.

`$utilities` ist ein array-ähnliches Objekt in SASS, das Einstellungen zur Generierung von Utility-Klassen enthält. Es enthält eine Liste aller Utilities (Klassen), die im endgültigen CSS-Datei generiert werden, sowie deren Einstellungen.  
Die Utilities API generiert Klassen basierend auf den Daten aus `$utilities`.

In `_utilities.scss` befindet sich das array-ähnliche Objekt `$utilities` mit einer Sammlung von Eigenschaften und Daten zur Generierung von Utility-Klassen.

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

Die generierten Utility-Klassen haben eine höhere Priorität als die Basis-Klassen von Bootstrap. Aus den Namen der Utility-Klassen ist normalerweise klar, was diese Klasse tut. Zum Beispiel zentriert `.text-center` den Text, `.m-3` fügt Abstände hinzu, `.d-flex` macht das Element zu einem Flex-Container usw.

Der Vorteil der Verwendung von Utility-Klassen besteht darin, dass sie es ermöglichen, schnell ein responsives Design zu erstellen, ohne viel benutzerdefiniertes CSS schreiben zu müssen.

**Die grundlegenden Prinzipien solcher Utility-Klassen:**
1. Atomare, unabhängige Klassen
2. Können miteinander kombiniert werden
3. Haben eine höhere Priorität als die Basis-Klassen von Bootstrap

**Nachteile:**
Die Größe der endgültigen CSS-Datei nimmt zu, da viele Klassen generiert werden, die möglicherweise im Projekt nicht verwendet werden. Auch die Anpassung und das Refactoring können schwieriger sein, da man mit einer großen Anzahl von Klassen arbeiten muss. Zum Beispiel, wenn die Textfarbe geändert werden muss, muss man alle Klassen `.text-*` finden und ersetzen, die im Projekt verwendet werden, anstatt dies einmal in der CSS-Datei zu ändern. Ein weiterer Nachteil ist, dass die Vielzahl von Klassen für jedes Element das HTML-Markup komplizieren kann.

## Eigenschaften für jede Utility

|Option|Typ|Beschreibung|
|---|---|---|
|`property`|**Erforderlich**|Der Name der Eigenschaft, dies kann eine Zeichenfolge oder ein Array von Zeichenfolgen sein (z. B. horizontale Padding oder Margins).|
|`values`|**Erforderlich**|Eine Liste von Werten oder eine Karte, wenn der Klassenname nicht mit dem Wert übereinstimmen soll. Wenn `null` als Schlüssel der Karte verwendet wird, wird es nicht kompiliert.|
|`class`|Optional|Eine Variable für den Klassennamen, wenn dieser nicht mit der Eigenschaft übereinstimmen soll. Wenn der Schlüssel `class` nicht angegeben ist und der Schlüssel `property` ein Array von Zeichenfolgen ist, wird der Klassenname das erste Element des Arrays `property` sein.|
|`state`|Optional|Eine Liste von Pseudoklassen wie `:hover` oder `:focus`, die für die Utility generiert werden sollen. Der Standardwert ist nicht vorhanden.|
|`responsive`|Optional|Ein boolescher Wert, der angibt, ob responsive Klassen generiert werden sollen. Standardmäßig `false`.|
|`rfs`|Optional|Ein boolescher Wert zur Aktivierung des fluid rescaling. Weitere Informationen finden Sie auf der Seite [RFS](https://getbootstrap.com/docs/5.0/getting-started/rfs/). Standardmäßig `false`.|
|`print`|Optional|Ein boolescher Wert, der angibt, ob Klassen für den Druck generiert werden sollen. Standardmäßig `false`.|
|`rtl`|Optional|Ein boolescher Wert, der angibt, ob die Utility in RTL unterstützt werden soll. Standardmäßig `true`.|

**N.B.**  
Alle Utility-Klassen, die von der API generiert werden, enthalten `!important`, um sicherzustellen, dass sie Komponenten und Modifikator-Klassen nach Bedarf überschreiben. Diese Einstellung kann global mit der Variable `$enable-important-utilities` umgeschaltet werden (standardmäßig `true`).

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

Die Reihenfolge ist wichtig, zuerst muss `$utilities` deklariert werden, dann kann es erweitert werden, und danach wird `utilities/api` initialisiert.

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
Dazu verwenden wir ebenfalls `map-merge()`, jedoch mit einer bestehenden Utility, sowie `map-get()`, um die benötigten Eigenschaften zu erhalten.

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

In **Bootstrap 5** können alle Utilities an Breakpoints „angepasst“ werden.

```
{property}{sides?}-{breakpoint?}-{value}
```

**Beispiel:**  
 `d-flex, d-sm-flex, d-md-flex, d-lg-flex`

```html
<div class="d-lg-flex">
  Responsives Höhen-Block
</div>
```

Aber Bootstrap 5 unterstützt nicht alle **Utilities** standardmäßig responsive Breakpoints „out of the box“.  
- Für **margin, padding, display, flex, grid, text, color** — ja, funktionieren `-sm-`, `-md-` usw.
- Für **height/width (`h-*`, `w-*`)** gibt es standardmäßig **keine** responsive Version. Daher wird `h-md-100` nicht funktionieren.

Es gibt jedoch die Möglichkeit, die Unterstützung für Responsiveness zu bestehenden Utilities hinzuzufügen, beispielsweise für `height` und `width`.  
Indem man die Eigenschaft `responsive: true` in der Beschreibung der Utility in `$utilities` hinzufügt.

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

Alternativ kann auch gezielt eine bestimmte Utility-Klasse, z.B. `border`, umgeschrieben werden.

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

## Umbenennung von Utility-Klassen
Dies ist ebenfalls möglich, wenn der Standardname der Klasse nicht gefällt. Dafür ist die Eigenschaft `class` verantwortlich.

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
Entfernen Sie beliebige Utilities standardmäßig, indem Sie den Gruppenschlüssel auf `null` setzen. Zum Beispiel, um die Utility width zu entfernen.

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