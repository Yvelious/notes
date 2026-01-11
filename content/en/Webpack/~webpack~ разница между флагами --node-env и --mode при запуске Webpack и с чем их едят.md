---
create: 2025-08-10
idnote: lGhIky7VNh
vault: dev
title: Understanding the `--mode` and `--node-env` Flags When Launching Webpack
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

When launching Webpack, the flags **`--mode`** and **`--node-env`** are often used. At first glance, they seem similar: both can change the environment variable **`NODE_ENV`**, and you can use them to create conditions within the Webpack configuration.

Despite the similarities, there are important differences between them. Let's figure out what they are. But first, let's start with what the `NODE_ENV` variable is and why it is needed.

---

### What is `NODE_ENV` and why is it needed

**`NODE_ENV`** is an environment variable that defines the execution environment of the application.  
In practice, it most often takes the following values:

- **`development`** — development mode (debugging, no minification, detailed error messages)

- **`production`** — production mode (optimizations, minification, removal of unused code)

- any other value (for example, **`test`**, **`staging`**) for custom scenarios

This variable allows changing the application's behavior depending on the environment — for example, loading different plugins or modifying the build logic.

---

### How `--mode` works

If you need the build to behave differently depending on the mode, the **`--mode`** flag is used with the values:

- `development`
- `production`
- `none`

This flag automatically sets `process.env.NODE_ENV` to the corresponding value and enables a ready-made set of optimizations for the selected mode.

```js
module.exports = (env, argv) => {   
	const isProduction = argv.mode === 'production';    
	return {     
		entry: './src/index.js',     
		plugins: [ isProduction && new CleanWebpackPlugin()]   
	}; 
};
```

In this example, the variable `isProduction` is defined through `argv.mode`, which Webpack passes to the config based on the value specified in the `--mode` flag.

### How `--node-env` works

The **`--node-env`** flag directly sets the environment variable `process.env.NODE_ENV` to the specified value.  
Unlike `--mode`, it is not limited to just `development` and `production`. You can specify, for example, `test` or `staging`.

Example of a launch command:

```bash
webpack --node-env=test
```

**N.B.**
You can also assign a value to the environment variable **`NODE_ENV`** without using the `--node-env` flag, as shown in the example below:

```bash
NODE_ENV=test webpack
```

However, this will not be a cross-platform solution, as in Windows you would need to use `set NODE_ENV=test && webpack`, while in Unix-like systems you would do `NODE_ENV=test webpack`. Therefore, it's better to use the `--node-env` flag for cross-platform compatibility.

```js
However, `--node-env` **does not automatically enable optimizations** — they need to be specified manually.

```js
const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
	plugins: [ isTest && new SomeTestPlugin()] 
};
```

In this case, the variable `isTest` is available anywhere in the configuration, as `process.env.NODE_ENV` is global.

N.B.
If we use `--node-env` but still want the automatic production optimizations to apply as if we used the `--mode` flag with the value `production`, we need to explicitly specify the `mode` key in the configuration and set its value to `production`:

```js
const isProd = process.env.NODE_ENV === 'production';  
module.exports = {  
    mode: isProd ? "production" : "development",
    ...
}
```

---

### Comparison Table

|Criterion|**`--mode`**|**`--node-env`**|
|---|---|---|
|**Available values**|`development`, `production`, `none`|Any (`development`, `production`, `test`, `staging`, etc.)|
|**Sets `process.env.NODE_ENV`**|Yes|Yes|
|**Enables optimizations**|Yes, for `production` (minification, tree-shaking, removal of unused code)|No, must be configured manually|
|**How to obtain the value in the config**|Through `argv.mode` inside the `module.exports` function|Through `process.env.NODE_ENV` anywhere in the file|
|**Main use case**|Quickly switching builds between development and production modes with built-in optimizations|Flexible environment configuration (tests, staging, custom scenarios)|
|**Example command**|`webpack --mode production`|`webpack --node-env=test`|

---

### In summary

- Use **`--mode`** if you need to quickly switch between development and production with automatic optimizations.
- Use **`--node-env`** if you want to set a custom environment value (e.g., `test` or `staging`) and manually configure the build behavior.