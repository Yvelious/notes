---
create: 2025-08-10
idnote: lGhIky7VNh
vault: dev
title: Understanding the flags --mode and --node-env when starting Webpack
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

In commands to start Webpack, the flag **`--mode`** or another flag **`--node-env`** is often used. At first glance, they are similar: both can change the environment variable **`NODE_ENV`**, and they can create conditions within the Webpack configuration.

Despite their similarities, there are important differences between them. Let’s break it down. But first, let’s start with what this `NODE_ENV` variable is and why it is needed.

---

### What is `NODE_ENV` and why is it needed

**`NODE_ENV`** is an environment variable that defines the runtime environment of the application.  
In practice, it most often takes the following values:

- **`development`** — development mode (debugging, no minification, detailed error messages)
    
- **`production`** — production mode (optimizations, minification, removal of unused code)
    
- any other value (e.g., **`test`**, **`staging****) for custom scenarios
    

This variable allows changing the behavior of the application depending on the environment — for example, to enable different plugins or change the build logic.

---

### How `--mode` works

If you want the build to behave differently depending on the mode, the **`--mode`** flag is used with the following values:

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

In this example, the `isProduction` variable is defined through `argv.mode`, which Webpack passes to the config based on the value specified in the `--mode` flag.


### How `--node-env` works

The **`--node-env`** flag directly sets the environment variable `process.env.NODE_ENV` to the specified value.  
Unlike `--mode`, it is not limited to just `development` and `production`. You can specify, for example, `test` or `staging`.

Example start command:

```bash
webpack --node-env=test
```

**N.B.**
You can assign a value to the **`NODE_ENV`** environment variable without using the `--node-env` flag, as in the example below:
```bash
NODE_ENV=test webpack
```
But this will not be a cross-platform solution, as on Windows you need to use `set NODE_ENV=test && webpack`, while on Unix-like systems you would use `NODE_ENV=test webpack`. Therefore, it is better to use the `--node-env` flag for cross-platform compatibility.

```js

However, `--node-env` **does not automatically enable optimizations** — they need to be specified manually.

```js
const isTest = process.env.NODE_ENV === 'test';  
module.exports = {   
	plugins: [ isTest && new SomeTestPlugin()] 
};
```

In this case, the `isTest` variable is accessible anywhere in the configuration since `process.env.NODE_ENV` is global.

**N.B.**
If we use `--node-env`, but still want the automatic optimizations for production build that would occur if we used the `--mode` flag with the value `production`, we need to explicitly specify the `mode` key in the configuration and set its value to `production`:

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
|**Available values**|`development`, `production`, `none`|Any (`development`, `production`, `test`, `staging`, etc.)|
|**Sets `process.env.NODE_ENV`**|Yes|Yes|
|**Enables optimizations**|Yes, for `production` (minification, tree-shaking, removal of unused code)|No, needs to be configured manually|
|**How to get value in config**|Through `argv.mode` inside the `module.exports` function|Through `process.env.NODE_ENV` anywhere in the file|
|**Main use**|Quickly toggle build between development and production with ready-made optimizations|Flexible environment configuration (tests, staging, custom scenarios)|
|**Example command**|`webpack --mode production`|`webpack --node-env=test`|

---

### In Summary

- Use **`--mode`** when you need to quickly switch between development and production with automatic optimizations.
- Use **`--node-env`** if you want to set a custom environment value (like `test` or `staging`) and customize the build behavior manually.



> [!raw-hidden]-
> In commands to start Webpack, the flags **`--mode`** or another flag **`--node-env`** are often used. These flags are similar in that they can both change the environment variable **`NODE_ENV`**, and with either, you can create conditions within the Webpack configuration. Despite their similarities, there are important differences between these flags. And now we will figure this out!
> 
> **Let’s start with what this `NODE_ENV` variable is and why it is needed.**
> **`NODE_ENV`** is an environment variable that is used to define the runtime environment of the application. It can take values such as **`development`**, **`production`**, and any other value. This variable allows developers to configure the behavior of the application depending on the environment.
> 
> **Now, let’s explore how both flags work:**
> 
> If you need to configure the setup to behave differently depending on whether the build is happening in development or production mode, the **`--mode`** flag with the values **`development`** or **`production`** is used. This flag automatically sets the **`process.env.NODE_ENV`** variable to the corresponding value. You can use this variable to conditionally enable or disable plugins and options by writing conditional statements in the Webpack configuration.
> 
> The **`--node-env`** flag is used to set the `process.env.NODE_ENV` variable, but unlike the **`--mode`** flag, it can take any value. For example, you can use it to set `NODE_ENV` to `test` or any other value you need. The `--mode` flag is limited to the values of `development` and `production`, while `--node-env` can take any value.
> 
> Additionally, the differences between them are that the **`--mode`** flag automatically includes optimizations for production build, such as code minification and removal of unused code. The **`--node-env`** flag does not include these optimizations, and you will need to manually configure them in the Webpack configuration.
> 
> Perhaps this is the main nuance between these flags.
> 
> There are also differences in the very construction used to create conditions in the Webpack configuration:
> 
> For mode, the following structure is used:
> 
> ```js
> 
> module.exports = (env, argv) => {
>   const isProduction = argv.mode === 'production';
> 
>   return {
>     entry: './src/index.js',
>     plugins: [
>       // This plugin will be used only in production mode
>       isProduction && new CleanWebpackPlugin()
>     ]
>   };
> };
> ```
> 
> The module exports a function that takes two arguments: `env` and `argv`. The `argv` argument contains information about the build mode specified when launching Webpack. We check if the mode is production, and based on this, we set the `isProduction` variable. 
> As you can see, the `isProduction` variable is set based on the value of `argv.mode`, which Webpack automatically sets depending on the **`--mode`** flag. Inside the module, the build mode is established, and based on this, plugins and other settings can be enabled or disabled.
> 
> For `node-env`, the structure is as follows:
> 
> We can declare the `isProduction` variable based on the value of `process.env.NODE_ENV`, which is set when Webpack is started with the **`--node-env`** flag. This variable can be declared above the module export so it can be used in the Webpack configuration.
> 
> ```js
> const isTest = process.env.NODE_ENV === 'test';
> 
> module.exports = {
>   // ...
>   plugins: [
>     // The plugin will be added only in test mode
>     isTest && new SomeTestPlugin()
>   ]
> };
> ```
> 
> 
> In summary.
> The differences between the **`--mode`** and **`--node-env`** flags are as follows:
> 1. **`--node-env`** can take any value, while **`--mode`** is limited to `development` and `production`.
> 2. The **`--mode`** flag automatically enables optimizations for the production build, while **`--node-env`** does not.
> 3. The value from the **`--mode`** option can be assigned through `argv.mode` inside the function exported from the module, while for **`--node-env`**, `process.env.NODE_ENV` is used, which is available anywhere in the configuration.
> 4. The construction for creating conditions in the Webpack configuration differs: **`--mode`** uses `argv.mode`, while **`--node-env`** uses `process.env.NODE_ENV`.
> 5. 



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