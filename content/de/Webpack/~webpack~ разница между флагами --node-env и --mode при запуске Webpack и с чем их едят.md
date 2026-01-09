---
create: 2025-08-10
idnote: lGhIky7VNh
vault: dev
title: Verständnis der Flags --mode und --node-env beim Start von Webpack
path:
tags:
  - webpack
status:
rating:
symlink:
symlinkchapter: Webpack
published: 2025-09-10
Language: de
---

![[Pasted image 20250810202457.png]]

Bei den Befehlen zum Starten von Webpack werden häufig das Flag **`--mode`** oder ein anderes Flag **`--node-env`** verwendet. Auf den ersten Blick scheinen sie ähnlich zu sein: Beide können die Umgebungsvariable **`NODE_ENV`** ändern und ermöglichen es, Bedingungen innerhalb der Webpack-Konfiguration zu erstellen.

Trotz ihrer Ähnlichkeit gibt es wichtige Unterschiede zwischen ihnen. Lassen Sie uns herausfinden, worin genau diese bestehen. Aber zuerst beginnen wir damit, was diese Variable `NODE_ENV` ist und wofür sie benötigt wird.

---

### Was ist `NODE_ENV` und wofür wird sie benötigt

**`NODE_ENV`** ist eine Umgebungsvariable, die die Ausführungsumgebung der Anwendung definiert.  
In der Praxis hat sie meistens folgende Werte:

- **`development`** — Entwicklungsmodus (Debugging, keine Minimierung, detaillierte Fehlermeldungen)
    
- **`production`** — Produktionsmodus (Optimierungen, Minimierung, Entfernen von ungenutztem Code)
    
- jeder andere Wert (z.B. **`test`**, **`staging`**) für benutzerdefinierte Szenarien
    

Diese Variable ermöglicht es, das Verhalten der Anwendung je nach Umgebung zu ändern — zum Beispiel verschiedene Plugins zu aktivieren oder die Build-Logik zu ändern.

---

### Wie funktioniert `--mode`

Wenn die Build-Varianten je nach Modus unterschiedlich sein sollen, wird das Flag **`--mode`** mit den Werten:

- `development`
- `production`
- `none`
    
verwendet.  
Dieses Flag setzt automatisch `process.env.NODE_ENV` auf den entsprechenden Wert und aktiviert eine vordefinierte Menge von Optimierungen für den gewählten Modus.

```js
module.exports = (env, argv) => {   
	const isProduction = argv.mode === 'production';    
	return {     
		entry: './src/index.js',     
		plugins: [ isProduction && new CleanWebpackPlugin()]   
	}; 
};
```

In diesem Beispiel wird die Variable `isProduction` über `argv.mode` definiert, die Webpack in die Konfiguration je nach angegebenem Wert des Flags `--mode` übergibt.


### Wie funktioniert `--node-env`


Das Flag **`--node-env`** setzt die Umgebungsvariable `process.env.NODE_ENV` direkt auf den angegebenen Wert.  
Im Gegensatz zu `--mode` ist es nicht auf `development` und `production` beschränkt. Man kann zum Beispiel `test` oder `staging` angeben.

Beispiel für den Startbefehl:

```js
webpack --node-env=test
```

**N.B.**
Man kann den Wert der Umgebungsvariable **`NODE_ENV`** auch ohne Verwendung des Flags `--node-env` festlegen, wie im folgenden Beispiel:
```bash
NODE_ENV=test webpack
```
Aber dies wird keine plattformübergreifende Lösung sein, da in Windows `set NODE_ENV=test && webpack` verwendet werden muss und in Unix-ähnlichen Systemen — `NODE_ENV=test webpack`. Daher ist es besser, das Flag `--node-env` für Plattformunabhängigkeit zu verwenden.

```js

Allerdings aktiviert `--node-env` **keine Optimierungen automatisch** — diese müssen manuell festgelegt werden.

```js

const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
plugins: [ isTest && new SomeTestPlugin()] 
};
```

In diesem Fall ist die Variable `isTest` an jedem Ort in der Konfiguration verfügbar, da `process.env.NODE_ENV` global ist.

N.B.
Wenn wir `--node-env` verwenden, aber dennoch möchten, dass bei der Erstellung die automatische Optimierung für die Produktion, wie bei der Verwendung des Flags `--mode` mit dem Wert `production`, aktiviert wird, müssen wir den Schlüssel `mode` in der Konfiguration explizit festlegen und seinen Wert auf `production` setzen:

```js
const isProd = process.env.NODE_ENV === 'production';  
module.exports = {  
    mode: isProd ? "production" : "development",
    ...
}
```


---

### Vergleichstabelle

|Kriterium|**`--mode`**|**`--node-env`**|
|---|---|---|
|**Verfügbare Werte**|`development`, `production`, `none`|Beliebig (`development`, `production`, `test`, `staging` usw.)|
|**Setzt `process.env.NODE_ENV`**|Ja|Ja|
|**Aktiviert Optimierungen**|Ja, für `production` (Minimierung, Tree-Shaking, Entfernen von ungenutztem Code)|Nein, muss manuell konfiguriert werden|
|**Wie man den Wert in der Konfiguration erhält**|Über `argv.mode` innerhalb der Funktion `module.exports`|Über `process.env.NODE_ENV` an jedem Ort der Datei|
|**Hauptverwendung**|Schnelles Umschalten der Builds zwischen Entwicklungs- und Produktionsmodus mit automatischen Optimierungen|Flexible Anpassung der Umgebung (Tests, Staging, benutzerdefinierte Szenarien)|
|**Beispielbefehl**|`webpack --mode production`|`webpack --node-env=test`|

---

### Zusammenfassung

- Verwenden Sie **`--mode`**, wenn Sie schnell zwischen Entwicklung und Produktion mit automatischen Optimierungen wechseln möchten.
- Verwenden Sie **`--node-env`**, wenn Sie einen benutzerdefinierten Umgebungswert (z.B. `test` oder `staging`) angeben und das Verhalten der Build manuell anpassen möchten.