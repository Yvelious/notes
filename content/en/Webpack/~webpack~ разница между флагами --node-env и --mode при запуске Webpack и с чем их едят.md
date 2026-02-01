---
create: 2025-08-10
idnote: lGhIky7VNh
vault: dev
title: Understanding the `--mode` and `--node-env` Flags When Running Webpack
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

When running Webpack, the flags **`--mode`** and **`--node-env`** are often used. At first glance, they seem similar: both can modify the environment variable **`NODE_ENV`**, and they can be used to create conditions within the Webpack configuration.

Despite these similarities, there are important differences between them. Let's clarify what those are. But first, let's start with understanding what the `NODE_ENV` variable is and why it is needed.

---

### What is `NODE_ENV` and Why is it Needed

**`NODE_ENV`** is an environment variable that defines the execution environment of an application.  
In practice, it usually takes the following values:

- **`development`** — development mode (debugging, no minification, detailed error messages)
- **`production`** — production mode (optimizations, minification, removal of unused code)
- any other value (such as **`test`**, **`staging`**) for custom scenarios

This variable allows changing the behavior of the application depending on the environment — for instance, connecting different plugins or modifying the build logic.

---

### How `--mode` Works

If you need the build to behave differently depending on the mode, the **`--mode`** flag is used with the following values:

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

In this example, the `isProduction` variable is defined through `argv.mode`, which Webpack passes to the config depending on the value specified in the `--mode` flag.


### How `--node-env` Works

The **`--node-env`** flag directly sets the environment variable `process.env.NODE_ENV` to the specified value.  
Unlike `--mode`, it is not limited to just `development` and `production`. You can specify, for instance, `test` or `staging`.

Example command:

```js
webpack --node-env=test
```

**N.B.**  
You can assign a value to the **`NODE_ENV`** environment variable without using the `--node-env` flag, as shown in the example below:

```bash
NODE_ENV=test webpack
```

However, this will not be a cross-platform solution, as in Windows you would need to use `set NODE_ENV=test && webpack`, while in Unix-like systems — `NODE_ENV=test webpack`. Therefore, it's better to use the `--node-env` flag for cross-platform compatibility.

However, `--node-env` **does not automatically include optimizations** — you need to specify them manually.

```js
const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
	plugins: [ isTest && new SomeTestPlugin()] 
};
```

In this case, the `isTest` variable is available anywhere in the configuration, as `process.env.NODE_ENV` is global.

N.B.  
If we use `--node-env`, but still want to trigger automatic production optimizations as if we used the `--mode` flag with the value `production`, we need to explicitly define the `mode` key in the configuration and set its value to `production`:

```js
const isProd = process.env.NODE_ENV === 'production';  
module.exports = {  
    mode: isProd ? "production" : "development",
    ...
}
```

---

### Comparison Table

| Criterion | **`--mode`** | **`--node-env`** |
|-----------|--------------|-------------------|
| **Available Values** | `development`, `production`, `none` | Any (e.g., `development`, `production`, `test`, `staging`, etc.) |
| **Sets `process.env.NODE_ENV`** | Yes | Yes |
| **Includes Optimizations** | Yes, for `production` (minification, tree-shaking, removal of unused code) | No, must be configured manually |
| **How to Obtain Value in Config** | Through `argv.mode` inside `module.exports` function | Through `process.env.NODE_ENV` anywhere in the file |
| **Main Use Case** | Quickly switch the build between development and production with ready-made optimizations | Flexible environment setup (testing, staging, custom scenarios) |
| **Example Command** | `webpack --mode production` | `webpack --node-env=test` |

---

### In Summary

- Use **`--mode`** if you need to quickly switch between development and production with automatic optimizations.
- Use **`--node-env`** if you want to set a custom environment value (like `test` or `staging`) and manually configure the build behavior.

> [!raw-hidden]-
> When running Webpack, the flags **`--mode`** and **`--node-env`** are often used. These flags are similar in that they both can affect the **`NODE_ENV`** environment variable, and both allow for conditional statements within the Webpack configuration. However, there are important differences between these flags, and we will clarify that now.
> 
> **Let's start with understanding what the `NODE_ENV` variable is and why it is important.**
> **`NODE_ENV`** is an environment variable used to define the execution environment of an application. It can take values such as **`development`**, **`production`**, and any other value you may need. This variable allows developers to customize application behavior based on the environment.
> 
> **Now, let's look at how both flags work:**
> 
> If you need your configuration to behave differently based on whether the build is in development or production mode, you use the **`--mode`** flag with values like **`development`** or **`production`**. This flag will automatically set the **`process.env.NODE_ENV`** variable to the appropriate value, allowing you to use this variable for conditional inclusion or exclusion of plugins and options by writing conditional statements in your Webpack configuration.
> 
> The **`--node-env`** flag is used to set the `process.env.NODE_ENV` variable, but unlike the **`--mode`** flag, it can take any value. For example, you can use it to set `NODE_ENV` to `test` or any other value that you require. The **`--mode`** flag is limited to the values `development` and `production`, while **`--node-env`** can take any value.
> 
> There is also a difference in that the **`--mode`** flag automatically enables optimizations for production builds, such as code minification and removal of unused code. The **`--node-env`** flag does not automatically enable these optimizations, and you will need to configure them manually in your Webpack setup.
> 
> Perhaps this is the most significant nuance between these flags.
> 
> Additionally, there are differences in the way conditions are constructed in the Webpack configuration:
> 
> For `--mode`, the following structure is used:
> 
> ```js
> 
> module.exports = (env, argv) => {
>   const isProduction = argv.mode === 'production';
> 
>   return {
>     entry: './src/index.js',
>     plugins: [
>       // This plugin will only be used in production mode
>       isProduction && new CleanWebpackPlugin()
>     ]
>   };
> };
> ```
> 
> The module exports a function that takes two arguments: `env` and `argv`. The `argv` argument contains information about the build mode specified when running Webpack. We check if the mode is `production`, and based on that, set the `isProduction` variable.
> 
> As you can see, the `isProduction` variable is set based on the value of `argv.mode`, which is automatically set by Webpack depending on the **`--mode`** flag. Inside the module, the build mode is established, and based on this, plugins and other configurations can be enabled or disabled.
> 
> 
> For `--node-env`, we use the following structure:
> 
> We can declare the `isProduction` variable based on the value of `process.env.NODE_ENV`, which is set when running Webpack with the **`--node-env`** flag. This variable can be declared above the module export, allowing it to be used in the Webpack configuration.
> 
> ```js
> const isTest = process.env.NODE_ENV === 'test';
> 
> module.exports = {
>   // ...
>   plugins: [
>     // This plugin will be added only in test mode
>     isTest && new SomeTestPlugin()
>   ]
> };
> ```
> 
> In summary,
> the differences between the **`--mode`** and **`--node-env`** flags are as follows:
> 1. `--node-env` can take any value, while `--mode` is limited to `development` and `production`.
> 2. The `--mode` flag automatically enables optimizations for production builds, while `--node-env` does not.
> 3. The value from the `--mode` option can be accessed via `argv.mode` inside the function exported from the module, whereas for `--node-env`, `process.env.NODE_ENV` is used, which is accessible anywhere in the configuration.
> 4. The structure for creating conditions in the Webpack configuration differs: for **`--mode`**, `argv.mode` is used, while for **`--node-env`**, `process.env.NODE_ENV` is used.
> 

> [!hidden-in-public]-
> ## Flash-cards
> -----
> 
> ## Links
> ----------
> 
> ## References
> ------------
> https://webpack.js.org/api/cli/#node-env
> 
> ## Zero-links
> ----
> [[00 WEBPACK]]