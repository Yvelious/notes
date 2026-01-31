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

In den Befehlen zum Start von Webpack werden oft die Flaggen **`--mode`** oder die Flagge **`--node-env`** verwendet. Auf den ersten Blick sind sie ähnlich: Beide können die Umgebungsvariable **`NODE_ENV`** ändern, und mit ihnen können Bedingungen in der Webpack-Konfiguration erstellt werden.

Trotz ihrer Ähnlichkeit gibt es wichtige Unterschiede zwischen ihnen. Lassen Sie uns klären, worin genau diese bestehen. Aber zuerst beginnen wir mit der Frage, was die Variable `NODE_ENV` ist und wozu sie dient.

---

### Was ist `NODE_ENV` und wozu dient sie

**`NODE_ENV`** ist eine Umgebungsvariable, die die Laufzeitumgebung der Anwendung definiert.  
In der Praxis hat sie häufig die folgenden Werte an:

- **`development`** — Entwicklungsmodus (Debugging, keine Minimierung, detaillierte Fehlermeldungen)

- **`production`** — Produktionsmodus (Optimierungen, Minimierung, Entfernung von ungenutztem Code)

- Jeder andere Wert (zum Beispiel **`test`**, **`staging`**) für benutzerdefinierte Szenarien

Diese Variable ermöglicht es, das Verhalten der Anwendung je nach Umgebung zu ändern — zum Beispiel, verschiedene Plugins zu laden oder die Logik der Build-Prozesse zu ändern.

---

### Wie funktioniert `--mode`

Wenn die Build sich je nach Modus unterschiedlich verhalten soll, wird das Flag **`--mode`** mit den Werten verwendet:

- `development`
- `production`
- `none`

Dieses Flag stellt automatisch `process.env.NODE_ENV` auf den entsprechenden Wert ein und aktiviert ein festgelegtes Set an Optimierungen für den gewählten Modus.

```js
module.exports = (env, argv) => {   
	const isProduction = argv.mode === 'production';    
	return {     
		entry: './src/index.js',     
		plugins: [ isProduction && new CleanWebpackPlugin()]   
	}; 
};
```

In diesem Beispiel wird die Variable `isProduction` über `argv.mode` definiert, das Webpack abhängig vom im Flag `-mode` angegebenen Wert in die Konfiguration übergibt.

### Wie funktioniert `--node-env`

Das Flag **`--node-env`** stellt direkt die Umgebungsvariable `process.env.NODE_ENV` auf den angegebenen Wert ein.  
Im Gegensatz zu `--mode` ist es nicht auf `development` und `production` beschränkt. Es können auch Werte wie `test` oder `staging` angegeben werden.

Beispiel für einen Startbefehl:

```js
webpack --node-env=test
```

**N.B.**  
Es ist möglich, den Wert der Umgebungsvariable **`NODE_ENV`** ohne Verwendung des Flags `--node-env` zu vergeben, wie im folgenden Beispiel:

```bash
NODE_ENV=test webpack
```

Aber dies ist keine plattformübergreifende Lösung, da in Windows `set NODE_ENV=test && webpack` verwendet werden muss, während in Unix-ähnlichen Systemen `NODE_ENV=test webpack` verwendet wird. Daher ist es besser, das Flag `--node-env` für die Plattformunabhängigkeit zu verwenden.

```js

Allerdings beinhaltet `--node-env` **keine Optimierungen automatisch** — diese müssen manuell festgelegt werden.

```js

const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
	plugins: [ isTest && new SomeTestPlugin()] 
};
```

In diesem Fall ist die Variable `isTest` überall in der Konfiguration verfügbar, da `process.env.NODE_ENV` global ist.

**N.B.**  
Wenn wir `--node-env` verwenden, aber dennoch möchten, dass die automatische Optimierung für die Produktion bei der Erstellung funktioniert, als ob wir das Flag `--mode` mit dem Wert `production` verwendet hätten, müssen wir den Schlüssel `mode` ausdrücklich in der Konfiguration angeben und seinen Wert auf `production` setzen:

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
|**Aktiviert Optimierungen**|Ja, für `production` (Minimierung, Tree-Shaking, Entfernung von ungenutztem Code)|Nein, muss manuell konfiguriert werden|
|**Wie man den Wert in der Konfiguration erhält**|Über `argv.mode` innerhalb der Funktion `module.exports`|Über `process.env.NODE_ENV` an jeder Stelle der Datei|
|**Hauptanwendung**|Schnelles Umschalten zwischen Entwicklungs- und Produktionsmodus mit automatischen Optimierungen|Flexible Umgebungsanpassungen (Tests, Staging, benutzerdefinierte Szenarien)|
|**Beispielkommando**|`webpack --mode production`|`webpack --node-env=test`|

---

### Zusammenfassend

- Verwenden Sie **`--mode`**, wenn Sie schnell zwischen Entwicklung und Produktion mit automatischen Optimierungen wechseln möchten.
- Verwenden Sie **`--node-env`**, wenn Sie einen benutzerdefinierten Wert für die Umgebung (z. B. `test` oder `staging`) festlegen und das Verhalten der Build manuell anpassen möchten.

> [!raw-hidden]-
> In den Befehlen zum Start von Webpack werden oft die Flaggen **`--mode`** oder die Flagge **`--node-env`** verwendet. Diese Flags sind sich ähnlich, sie können beide die Umgebungsvariable **`NODE_ENV`** ändern, und mit beiden können Bedingungen in der Webpack-Konfiguration erstellt werden. Trotz ihrer Ähnlichkeit gibt es wichtige Unterschiede zwischen diesen Flags. Und jetzt werden wir dies klären!
> 
> **Beginnen wir mit der Frage, was diese Variable `NODE_ENV` ist und wozu sie dient.**  
> **`NODE_ENV`** ist eine Umgebungsvariable, die verwendet wird, um die Laufzeitumgebung der Anwendung zu definieren. Sie kann Werte wie **`development`**, **`production`** und jede andere Bedeutung annehmen. Diese Variable ermöglicht es Entwicklern, das Verhalten der Anwendung je nach Umgebung zu konfigurieren.
> 
> **Jetzt schauen wir uns an, wie beide Flags funktionieren:**
> 
> Wenn Sie die Konfiguration so anpassen müssen, dass sie sich je nach Modus (Entwicklung oder Produktion) unterschiedlich verhält, verwenden Sie das Flag **--mode** mit den Werten **`development`** oder **`production`**. Dieses Flag setzt automatisch die Variable **`process.env.NODE_ENV`** auf den entsprechenden Wert. Sie können diese Variable verwenden, um Plugins und Optionen bedingt ein- oder auszuschalten, indem Sie bedingte Konstruktionen in der Webpack-Konfiguration schreiben.
> 
> Die Flagge **`--node-env`** wird verwendet, um die Umgebungsvariable `process.env.NODE_ENV` festzulegen, aber im Gegensatz zur Flagge **`--mode`** kann sie jeden Wert annehmen. Beispielsweise können Sie sie verwenden, um `NODE_ENV` auf den Wert `test` oder jeden anderen, den Sie benötigen, zu setzen. Das Flag `--mode` ist auf die Werte `development` und `production` beschränkt, während `--node-env` jeden Wert annehmen kann.
> 
> Außerdem bestehen Unterschiede darin, dass das Flag **`--mode`** automatisch Optimierungen für die Produktions-Build einfügt, wie z. B. Code-Minimierung und Entfernung ungenutzter Codes. Das Flag **`--node-env`** beinhaltet diese Optimierungen nicht, und Sie müssen sie manuell in der Webpack-Konfiguration konfigurieren.
> 
> Wahrscheinlich ist dies der wichtigste Unterschied zwischen diesen Flags.
> 
> Auch die Unterschiede in der Struktur zur Erstellung von Bedingungen in der Webpack-Konfiguration sind bemerkenswert:
> 
> Für `mode` wird eine solche Struktur verwendet:
> 
> ```js
> 
> module.exports = (env, argv) => {
>   const isProduction = argv.mode === 'production';
> 
>   return {
>     entry: './src/index.js',
>     plugins: [
>       // Dieses Plugin wird nur im Produktionsmodus verwendet
>       isProduction && new CleanWebpackPlugin()
>     ]
>   };
> };
> ```
> 
> Das Modul exportiert eine Funktion, die zwei Argumente annimmt: `env` und `argv`. Das Argument `argv` enthält Informationen über den Build-Modus, der beim Start von Webpack angegeben wurde. Wir überprüfen, ob der Modus produktiv ist, und setzen auf dieser Grundlage die Variable `isProduction`.
> Wie Sie sehen, wird die Variable `isProduction` basierend auf dem Wert von `argv.mode` gesetzt, der von Webpack automatisch je nach dem angegebenen Flag **`--mode`** festgelegt wird. Innerhalb des Moduls wird der Build-Modus festgelegt und auf dieser Grundlage können Plugins und andere Einstellungen aktiviert oder deaktiviert werden.
> 
> 
> Für `node-env` wird eine Struktur verwendet:
> 
> Wir können die Variable `isProduction` basierend auf dem Wert `process.env.NODE_ENV` deklarieren, die beim Start von Webpack mit dem Flag **`--node-env`** festgelegt wird. Diese Variable kann über dem Modul-Export deklariert werden, um sie in der Webpack-Konfiguration zu verwenden.
> 
> ```js
> const isTest = process.env.NODE_ENV === 'test';
> 
> module.exports = {
>   // ...
>   plugins: [
>     // Das Plugin wird nur im Testmodus hinzugefügt
>     isTest && new SomeTestPlugin()
>   ]
> };
> ```
>
> Zusammenfassend.  
> Die Unterschiede zwischen den Flags **`--mode`** und **`--node-env`** bestehen darin:
> 1. `--node-env` kann jeden Wert annehmen, während `--mode` auf die Werte `development` und `production` beschränkt ist.
> 2. Das Flag `--mode` aktiviert automatisch Optimierungen für die Produktions-Build, während `--node-env dies nicht tut.
> 3. Der Wert kann aus der Option `--mode` über `argv.mode` innerhalb der Funktion, die aus dem Modul exportiert wird, zugewiesen werden, während für `--node-env` `process.env.NODE_ENV`, das an jedem Ort in der Konfiguration verfügbar ist, verwendet wird.
> 4. Die Struktur zur Erstellung von Bedingungen in der Webpack-Konfiguration unterscheidet sich: für **`--mode`** wird `argv.mode` verwendet, während für **`--node-env`** `process.env.NODE_ENV` verwendet wird.
> 5. 

> [!hidden-in-public]-
> ## Flash-Karten
> -----
> 
> ## Links
> ----------
> 
> ## Referenzen
> ------------
> https://webpack.js.org/api/cli/#node-env
> 
> ## Null-Links
> ----
> [[00 WEBPACK]]