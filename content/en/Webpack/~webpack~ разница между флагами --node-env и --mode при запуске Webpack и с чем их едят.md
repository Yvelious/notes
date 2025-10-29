---
create: 2025-08-10
idnote: lGhIky7VNh
vault: dev
title: Understanding the --mode and --node-env Flags When Starting Webpack
path:
tags:
  - webpack
status:
rating:
symlink:
symlinkchapter: Webpack
published: 2025-09-10
Language: en
---

![[Pasted image 20250810202457.png]]

In commands to start Webpack, the **`--mode`** flag or the **`--node-env`** flag is often used. At first glance, they seem similar: both can change the **`NODE_ENV`** environment variable, and they can create conditions within the Webpack configuration.

Despite their similarities, there are important differences between them. Let’s figure out what those differences are. But first, let's start with what the `NODE_ENV` variable is and why it is needed.

---

### What is `NODE_ENV` and Why is it Needed

**`NODE_ENV`** is an environment variable that defines the runtime environment of the application.  
In practice, it most often takes the following values:

- **`development`** — development mode (debugging, no minification, detailed error messages)
    
- **`production`** — production mode (optimizations, minification, removal of unused code)
    
- any other value (e.g., **`test`**, **`staging`**) for custom scenarios
    

This variable allows changing the application's behavior based on the environment—such as loading different plugins or modifying the build logic.

---

### How `--mode` Works

If you need the build to behave differently depending on the mode, the **`--mode`** flag is used with the following values:

- `development`
- `production`
- `none`
    
This flag automatically sets `process.env.NODE_ENV` to the corresponding value and enables a predefined set of optimizations for the selected mode.


```js
module.exports = (env, argv) => {   
	const isProduction = argv.mode === 'production';    
	return {     
		entry: './src/index.js',     
		plugins: [ isProduction && new CleanWebpackPlugin()]   
	}; 
};
```

In this example, the variable `isProduction` is determined through `argv.mode`, which Webpack passes to the config based on the value specified in the `--mode` flag.


### How `--node-env` Works

The **`--node-env`** flag directly sets the environment variable `process.env.NODE_ENV` to the specified value.  
Unlike `--mode`, it is not limited to just `development` and `production`. You can specify values like `test` or `staging`.

Example of a startup command:

```js
webpack --node-env=test
```

**N.B.**
You can assign a value to the **`NODE_ENV`** environment variable without using the `--node-env` flag, as in the example below:
```bash
NODE_ENV=test webpack
```
However, this will not be a cross-platform solution since on Windows, you need to use `set NODE_ENV=test && webpack`, while on Unix-like systems, you use `NODE_ENV=test webpack`. Therefore, it's better to use the `--node-env` flag for cross-platform compatibility.

```js

However, `--node-env` **does not automatically include optimizations** — they need to be specified manually.

```js

const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
plugins: [ isTest && new SomeTestPlugin()] 
};
```

In this case, the variable `isTest` is available anywhere in the configuration since `process.env.NODE_ENV` is global.

N.B.
If we use `--node-env` and still want automatic optimization for production during the build as if we used the `--mode` flag with the value `production`, we must explicitly specify the `mode` key in the configuration and set its value to `production`:

```js
const isProd = process.env.NODE_ENV === 'production';  
module.exports = {  
    mode: isProd ? "production" : "development",
    ...
}
```

---

### Comparative Table

|Criterion|**`--mode`**|**`--node-env`**|
|---|---|---|
|**Available Values**|`development`, `production`, `none`|Any (`development`, `production`, `test`, `staging`, etc.)|
|**Sets `process.env.NODE_ENV`**|Yes|Yes|
|**Includes Optimizations**|Yes, for `production` (minification, tree-shaking, removal of unused code)|No, needs manual configuration|
|**How to Get Value in Config**|Through `argv.mode` inside the `module.exports` function|Through `process.env.NODE_ENV` anywhere in the file|
|**Main Use Case**|Quickly switch builds between development and production with ready-made optimizations|Flexible environment configuration (tests, staging, custom scenarios)|
|**Example Command**|`webpack --mode production`|`webpack --node-env=test`|

---

### In Summary

- Use **`--mode`** if you need to quickly switch between development and production with automatic optimizations.
- Use **`--node-env`** if you want to set a custom environment value (like `test` or `staging`) and manually configure the build behavior.