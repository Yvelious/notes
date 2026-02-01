---
create: 2025-08-10
idnote: lGhIky7VNh
vault: dev
title: Verständnis der Flags --mode und --node-env beim Starten von Webpack
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

Bei den Befehlen zum Starten von Webpack werden häufig das Flag **`--mode`** oder das andere Flag **`--node-env`** verwendet. Auf den ersten Blick scheinen sie ähnlich zu sein: Beide können die Umgebungsvariable **`NODE_ENV`** ändern und mit ihrer Hilfe können Bedingungen innerhalb der Webpack-Konfiguration erstellt werden.

Trotz der Ähnlichkeiten gibt es wichtige Unterschiede zwischen ihnen. Lassen Sie uns untersuchen, worin diese genau bestehen. Zunächst beginnen wir mit der Frage, was diese Variable `NODE_ENV` ist und wozu sie dient.

---

### Was ist `NODE_ENV` und wozu dient sie

**`NODE_ENV`** ist eine Umgebungsvariable, die die Ausführungsumgebung der Anwendung definiert.  
In der Praxis nimmt sie meistens die folgenden Werte an:

- **`development`** — Entwicklungsmodus (Debugging, keine Minifizierung, ausführliche Fehlermeldungen)
    
- **`production`** — Produktionsmodus (Optimierungen, Minifizierung, Entfernen ungenutzten Codes)
    
- Jeder andere Wert (zum Beispiel **`test`**, **`staging**`) für benutzerdefinierte Szenarien
     

Diese Variable ermöglicht es, das Verhalten der Anwendung je nach Umgebung zu ändern — zum Beispiel, unterschiedliche Plugins zu laden oder die Build-Logik zu ändern.

---

### Wie funktioniert `--mode`

Wenn die Build-Verhalten je nach Modus unterschiedlich sein soll, wird das Flag **`--mode`** mit den Werten:

- `development`
- `production`
- `none`
    
Dieses Flag setzt automatisch `process.env.NODE_ENV` auf den entsprechenden Wert und aktiviert einen ausgereiften Satz von Optimierungen für den gewählten Modus.


```js
module.exports = (env, argv) => {   
	const isProduction = argv.mode === 'production';    
	return {     
		entry: './src/index.js',     
		plugins: [ isProduction && new CleanWebpackPlugin()]   
	}; 
};
```

In diesem Beispiel wird die Variable `isProduction` über `argv.mode` definiert, das Webpack je nach Wert des angegebenen Flags `-mode` an die Konfiguration übergibt.


### Wie funktioniert `--node-env`



Das Flag **`--node-env`** setzt die Umgebungsvariable `process.env.NODE_ENV` direkt auf den angegebenen Wert.  
Im Gegensatz zu `--mode` ist es nicht nur auf `development` und `production` beschränkt. Man kann zum Beispiel `test` oder `staging` angeben.

Beispiel für den Startbefehl:

```bash
webpack --node-env=test
```

**N.B.**
Man kann den Wert der Umgebungsvariable **`NODE_ENV`** auch ohne Verwendung des Flags `--node-env` zuweisen, wie im folgenden Beispiel:
```bash
NODE_ENV=test webpack
```
Dies ist jedoch keine plattformunabhängige Lösung, da in Windows `set NODE_ENV=test && webpack` verwendet werden muss, während in Unix-ähnlichen Systemen — `NODE_ENV=test webpack`. Daher ist es besser, das Flag `--node-env` für Plattformunabhängigkeit zu verwenden.

```js

Allerdings **enthält `--node-env` keine Optimierungen automatisch** — diese müssen manuell festgelegt werden.

```js

const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
	plugins: [ isTest && new SomeTestPlugin()] 
};
```

In diesem Fall ist die Variable `isTest` an jedem Ort der Konfiguration verfügbar, da `process.env.NODE_ENV` global ist.

N.B.
Wenn wir `--node-env` verwenden, aber dennoch möchten, dass die automatische Optimierung für die Produktion wie bei Verwendung des Flags `--mode` mit dem Wert `production` funktioniert, dann müssen wir in der Konfiguration explizit den Schlüssel `mode` festlegen und seinen Wert auf `production` setzen:

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
|**Verfügbare Werte**|`development`, `production`, `none`|Jeder Wert (`development`, `production`, `test`, `staging` usw.)|
|**Setzt `process.env.NODE_ENV`**|Ja|Ja|
|**Aktiviert Optimierungen**|Ja, für `production` (Minifizierung, Tree-Shaking, Entfernen ungenutzten Codes)|Nein, muss manuell konfiguriert werden|
|**Wie man den Wert in der Konfiguration erhält**|Über `argv.mode` innerhalb der Funktion `module.exports`|Über `process.env.NODE_ENV` an jedem Ort der Datei|
|**Hauptanwendung**|Schnelles Umschalten zwischen Entwicklungs- und Produktionsmodus mit automatischen Optimierungen|Flexible Konfiguration der Umgebung (Tests, Staging, benutzerdefinierte Szenarien)|
|**Beispielbefehl**|`webpack --mode production`|`webpack --node-env=test`|

---

### Zusammenfassend

- Verwenden Sie **`--mode`**, wenn Sie schnell zwischen Entwicklung und Produktion mit automatischen Optimierungen umschalten möchten.
- Verwenden Sie **`--node-env`**, wenn Sie einen benutzerdefinierten Wert für die Umgebung (zum Beispiel `test` oder `staging`) festlegen und das Verhalten der Build manuell anpassen möchten.