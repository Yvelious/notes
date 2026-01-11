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
**Utility-Klassen** sind kleine, zielgerichtete Klassen, die verwendet werden können, um Styles schnell auf HTML-Elemente anzuwenden, ohne benutzerdefiniertes CSS schreiben zu müssen.

Bootstrap enthält `bootstrap/scss/utilities/api` und `bootstrap/scss/utilities`, die es ermöglichen, eigene Utilities (High-Level-Klassen) für schnelles Prototyping und responsives Design zu erstellen. Prinzipiell ähnelt es **Tailwind**, hat jedoch weniger Klassen und ein einfacheres System.

`$utilities` ist ein array-ähnliches Objekt in SASS, das Einstellungen zur Generierung von Utility-Klassen enthält. Es beinhaltet eine Liste aller Utilities (Klassen), die im finalen CSS-Dateiformat generiert werden und deren Einstellungen. Die Utilities API generiert Klassen basierend auf den Daten aus `$utilities`.

In `_utilities.scss` befindet sich das array-ähnliche Objekt `$utilities` mit einer Reihe von Eigenschaften und Daten zur Generierung der Utility-Klassen.

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

Die generierten Utility-Klassen haben eine höhere Priorität als die Basisklassen von Bootstrap. Aus den Namen der Utility-Klassen ist normalerweise klar, was diese Klasse tut. Zum Beispiel zentriert die Klasse `.text-center` den Text, `.m-3` fügt Margen hinzu, `.d-flex` verwandelt ein Element in einen Flex-Container usw.

Der Vorteil der Verwendung von Utility-Klassen liegt darin, dass sie schnelles responsives Design ermöglichen, ohne dass viel benutzerdefiniertes CSS geschrieben werden muss.

**Grundprinzipien solcher Utility-Klassen:**
1. Atomare, unabhängige Klassen
2. Sie können miteinander kombiniert werden
3. Sie haben eine höhere Priorität als die Basisklassen von Bootstrap

**Nachteile:**
Die Dateigröße des finalen CSS wird erhöht, da viele Klassen generiert werden, die im Projekt möglicherweise nicht verwendet werden. Auch die Anpassung und Refaktorierung kann schwieriger sein, da man mit einer großen Anzahl von Klassen arbeiten muss. Wenn zum Beispiel die Textfarbe geändert werden muss, muss man alle Klassen `.text-*` finden und ersetzen, anstatt dies einmal in der CSS-Datei zu ändern. Außerdem kann die Vielzahl von Klassen für jedes Element das HTML-Markup komplizierter machen.

## Eigenschaften für jede Utility

|Option|Typ|Beschreibung|
|---|---|---|
|`property`|**Erforderlich**|Name der Eigenschaft, dies kann ein String oder ein Array von Strings sein (z.B. horizontale Padding- oder Margin-Werte).|
|`values`|**Erforderlich**|Liste von Werten oder ein Map, wenn der Klassenname nicht mit dem Wert übereinstimmen soll. Wenn `null` als Schlüssel des Maps verwendet wird, wird es nicht kompiliert.|
|`class`|Optional|Variable für den Klassennamen, wenn dieser nicht mit der Eigenschaft übereinstimmen soll. Wenn der Schlüssel `class` nicht angegeben ist und der Schlüssel `property` ein Array von Strings ist, wird der Klassenname das erste Element des Arrays `property` sein.|
|`state`|Optional|Liste von Pseudoklassen wie `:hover` oder `:focus`, die für die Utility generiert werden sollen. Der Standardwert ist nicht gesetzt.|
|`responsive`|Optional|Ein boolescher Wert, der angibt, ob responsive Klassen generiert werden sollen. Standardmäßig `false`.|
|`rfs`|Optional|Ein boolescher Wert zur Aktivierung der fluiden Skalierung. Weitere Informationen finden Sie auf der Seite [RFS](https://getbootstrap.com/docs/5.0/getting-started/rfs/). Standardmäßig `false`.|
|`print`|Optional|Ein boolescher Wert, der angibt, ob Klassen für den Druck generiert werden sollen. Standardmäßig `false`.|
|`rtl`|Optional|Ein boolescher Wert, der angibt, ob die Utility im RTL unterstützt werden soll. Standardmäßig `true`.|

**N.B.**
Alle Utility-Klassen, die von der API generiert werden, enthalten `!important`, um sicherzustellen, dass sie Komponenten und Modifikator-Klassen nach ihrer Bestimmung überschreiben. Sie können diese Einstellung global über die Variable `$enable-important-utilities` umschalten (Standardwert `true`).

## Utilities können erweitert werden.

Hierfür verwenden wir die Sass-Funktion `map-merge()`, die es ermöglicht, zwei Maps zu einer zu kombinieren.

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

Die Reihenfolge ist wichtig, zuerst muss `$utilities` deklariert werden, und danach kann es erweitert werden, gefolgt von der Initialisierung von `utilities/api`.

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
Hier verwenden wir ebenfalls `map-merge()`, aber nun mit einer bestehenden Utility und `map-get()`, um die benötigten Eigenschaften zu erhalten.

Beispielsweise könnte man `10%` zur Utility `width` hinzufügen.

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

In **Bootstrap 5** können alle Utilities an Breakpoints „angepasst“ werden.

```
{property}{sides?}-{breakpoint?}-{value}
```

**Beispiel:**
 `d-flex, d-sm-flex, d-md-flex, d-lg-flex`

```html
<div class="d-lg-flex">
  Responsives Höhe-Element
</div>
```

Aber Bootstrap 5 unterstützt nicht alle **Utilities** von Haus aus mit responsive Breakpoints. 
- Für **margin, padding, display, flex, grid, text, color** - ja, sie unterstützen `-sm-`, `-md-` usw.
- Für **height/width (`h-*`, `w-*`)** gibt es jedoch **standardmäßig keine** responsive Versionen. Daher funktioniert `h-md-100` nicht.
- 
Es besteht jedoch die Möglichkeit, bestehende Utilities wie `height` und `width` mit responsive Unterstützungen zu versehen, indem man die Eigenschaft `responsive: true` in der Beschreibung der Utility in `$utilities` hinzufügt.

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

Alternativ könnte man auch eine spezifische Utility-Klasse, wie z.B. `border`, gezielt umschreiben.
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
Dies ist ebenfalls möglich, wenn der Standardname der Klasse nicht gefällt. Dafür verantwortlich ist die Eigenschaft `class`.

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
Um Utilities standardmäßig zu entfernen, setzen Sie den Gruppenschlüssel auf `null`. Zum Beispiel, hier ist ein Beispiel, wie die Utility `width` entfernt wird.

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