---
create: 2025-08-10
idnote: lGhIky7VNh
vault: dev
title: Verstehen der Flags --mode und --node-env beim Start von Webpack
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

In den Befehlen zum Start von Webpack werden oft das Flag **`--mode`** oder das Flag **`--node-env`** verwendet. Auf den ersten Blick scheinen sie ähnlich zu sein: Beide können die Umgebungsvariable **`NODE_ENV`** ändern, und mit ihnen können Bedingungen innerhalb der Webpack-Konfiguration erstellt werden.

Trotz ihrer Ähnlichkeit gibt es wichtige Unterschiede zwischen ihnen. Lassen Sie uns klären, worin genau diese bestehen. Aber zuerst beginnen wir mit der Frage, was diese Variable `NODE_ENV` ist und wozu sie benötigt wird.

---

### Was ist `NODE_ENV` und wozu wird es benötigt

**`NODE_ENV`** ist eine Umgebungsvariable, die die Ausführungsumgebung der Anwendung definiert.  
In der Praxis hat sie meist folgende Werte:

- **`development`** — Entwicklungsmodus (Debugging, keine Minifizierung, detaillierte Fehlermeldungen)
    
- **`production`** — Produktionsmodus (Optimierungen, Minifizierung, Entfernung nicht verwendeten Codes)
    
- jeder andere Wert (z.B. **`test`**, **`staging`**) für benutzerdefinierte Szenarien
    

Diese Variable ermöglicht es, das Verhalten der Anwendung abhängig von der Umgebung zu ändern — z.B. unterschiedliche Plugins zu laden oder die Build-Logik zu ändern.

---

### Wie funktioniert `--mode`

Wenn die Build-Logik je nach Modus unterschiedlich sein soll, wird das Flag **`--mode`** mit den Werten:

- `development`
- `production`
- `none`
    
verwendet.  
Dieses Flag setzt automatisch `process.env.NODE_ENV` auf den entsprechenden Wert und aktiviert eine vorgegebene Menge von Optimierungen für den gewählten Modus.


```js
module.exports = (env, argv) => {   
	const isProduction = argv.mode === 'production';    
	return {     
		entry: './src/index.js',     
		plugins: [ isProduction && new CleanWebpackPlugin()]   
	}; 
};
```

In diesem Beispiel wird die Variable `isProduction` über `argv.mode` definiert, das Webpack in die Konfiguration abhängig vom Wert, der im Flag `--mode` angegeben wurde, übergibt.


### Wie funktioniert `--node-env`



Das Flag **`--node-env`** setzt direkt die Umgebungsvariable `process.env.NODE_ENV` auf den angegebenen Wert.  
Im Gegensatz zu `--mode` ist er nicht nur auf `development` und `production` beschränkt. Es können beispielsweise auch `test` oder `staging` angegeben werden.

Beispiel eines Startbefehls:

```js
webpack --node-env=test
```

**N.B.**  
Sie können den Wert der Umgebungsvariable **`NODE_ENV`** festlegen, ohne das Flag `--node-env` zu verwenden, wie im folgenden Beispiel:
```bash
NODE_ENV=test webpack
```
Aber das ist keine plattformübergreifende Lösung, da in Windows `set NODE_ENV=test && webpack` verwendet werden muss, während in Unix-ähnlichen Systemen — `NODE_ENV=test webpack`. Daher ist es besser, das Flag `--node-env` für die Plattformübergreifende Verwendung zu nutzen.
``

```js

Allerdings **schließt `--node-env` keine Optimierungen automatisch ein** — diese müssen manuell hinzugefügt werden.

```js

const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
plugins: [ isTest && new SomeTestPlugin()] 
};
```

In diesem Fall ist die Variable `isTest` überall in der Konfiguration verfügbar, da `process.env.NODE_ENV` global ist.

N.B.  
Wenn wir `--node-env` verwenden, aber dennoch möchten, dass bei der Erstellung die automatischen Optimierungen für den Produktionsmodus so wie bei der Verwendung des Flags `--mode` mit dem Wert `production` funktionieren, müssen wir explizit den Schlüssel `mode` in der Konfiguration festlegen und seinen Wert auf `production` setzen:

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
|**Aktiviert Optimierungen**|Ja, für `production` (Minifizierung, Tree-Shaking, Entfernung nicht verwendeten Codes)|Nein, manuell konfigurieren|
|**Wie erhalte ich den Wert in der Konfiguration**|Über `argv.mode` innerhalb der Funktion `module.exports`|Über `process.env.NODE_ENV` an beliebiger Stelle der Datei|
|**Hauptanwendung**|Schneller Wechsel zwischen Entwicklungs- und Produktionsmodus mit voreingestellten Optimierungen|Flexible Konfiguration der Umgebung (Tests, Staging, benutzerdefinierte Szenarien)|
|**Beispielbefehl**|`webpack --mode production`|`webpack --node-env=test`|

---

### Zusammenfassend

- Verwenden Sie **`--mode`**, wenn Sie schnell zwischen Entwicklung und Produktion mit automatischen Optimierungen wechseln möchten.
- Verwenden Sie **`--node-env`**, wenn Sie einen benutzerdefinierten Wert für die Umgebung festlegen möchten (z.B. `test` oder `staging`) und das Verhalten der Erstellung manuell anpassen möchten.