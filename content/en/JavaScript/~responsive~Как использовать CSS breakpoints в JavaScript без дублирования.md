---
create: 2025-03-28
idnote: lf371dOgkL
vault: dev
title: How to use CSS breakpoints in JavaScript without duplication
path:
tags:
  - responsive
  - js
  - media_queries
status:
rating:
published: 2025-05-26
symlink:
symlinkchapter: JavaScript
Language: en
---
![[Pasted image 20250526121010.png]]

When working with responsive design, there often arises a need to use the same **breakpoints** in both CSS and JavaScript. 
Keeping breakpoints separately in JavaScript and CSS is not the best approach. The reason is that it leads to duplication: breakpoints are specified in both CSS and JS simultaneously, creating two entry points. If breakpoints change in one place (for example, in CSS), they may be forgotten to update in the other place (JavaScript).

To avoid such risks, we will use a **single entry point**, where breakpoints are defined in one place in the CSS (SCSS) styles and then passed to JavaScript as an object.

## Define breakpoints in SCSS

In SCSS, create a map with breakpoints. A map in CSS is similar to an associative array in JavaScript, in simple terms, an object with keys and values.

```scss
$grid-breakpoints: (   
	xs: 0,   
	sm: 576px,   
	md: 768px,   
	lg: 992px,   
	xl: 1200px,  
	xxl: 1400px 
);
```

## Pass breakpoints to CSS through a pseudo-element

To pass data to JS, we will use `::before` and embed the string with breakpoints in `content`.
But first, we need to convert the map into a string. For this, we will write an SCSS function to convert the map.

```scss
@function map-to-string($map) {   
	$result: "";   
	@each $key, $value in $map {     
		$result: "#{$result}#{$key}: #{$value}, ";   
	}   
	@return $result; 
}
```

Then we will apply it to `body::before`:

```css
body {   
	&::before {     
		content: map-to-string($grid-breakpoints);     
		display: none;   
	}
}
```

## Extract the string from CSS into JavaScript

In JS, we can get the value of `content` from the `::before` pseudo-element using the JS method `getComputedStyle` and assign it to a variable.

```js
const rawBreakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
```

---

## Convert the string of breakpoints into an object 

In order to conveniently interact with our breakpoints in JS, we need to convert it into an object.
We parse the string and turn it into an object:

```js
const breakpointsArray = rawBreakpoints.split(', ').map(item => item.split(': '));  
const breakpointsObject = Object.fromEntries(breakpointsArray);
```

Now the variable `breakpointsObject` contains an object with all the breakpoints from SCSS:

```js
console.log(breakpointsObject); // { xs: "0", sm: "576px", md: "768px", lg: "992px", xl: "1200px", xxl: "1400px" }
```

## Use `matchMedia` to track if the screen width matches our breakpoints

We will use the `matchMedia` property and pass the required breakpoints from the `breakpointsObj` object into it. 
We monitor changes in the media query: when the screen width starts matching a certain breakpoint, a callback function is triggered with the desired JavaScript logic for that particular breakpoint.  
In our example, this logic is contained in the function `handleMinLg`. This function is applied when the media query matches the value recorded in `breakpointsObject.lg`. In this case, it’s a minimum width of `992px`.

```js
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
  
handleMinLg(breakpointMinLg); // run on first page load
breakpointMinLg.addEventListener('change', handleMinLg); 
  
function handleMinLg (e) { 
	// if true is returned, it means the screen width matches the specified media query
    if (e.matches) {  	
		console.log('Screen width is greater than or equal to 992px');
    }  
}
```

## In summary

With this approach:
- We avoid duplication of breakpoints between CSS and JavaScript;
- Support becomes easier and safer;
- We have a single entry point for breakpoints, which are used in both CSS and JavaScript.

This is a clean and sustainable solution for synchronizing responsive breakpoints between CSS and JavaScript.

> [!raw-hidden]-
> If we want to use breakpoints from CSS for working with Media Query in JavaScript, we first need to extract them from CSS and pass them into JS.
>
> Of course, we can write breakpoints manually directly in JavaScript, but this is far from the best approach. Such a method increases the risk of errors and complicates code maintenance. The reason is that it leads to duplication: breakpoints are specified simultaneously in CSS and JS, creating two entry points. If breakpoints change in one place (for example, in CSS), they may be forgotten to be updated in another place (JS).
>
> To avoid such problems, it's better to create a single entry point. This will allow us to synchronize breakpoints between CSS and JS, simplifying maintenance and reducing the likelihood of errors.
>
> Our goal is to pass breakpoints from CSS to JavaScript while keeping them in an object for further use in JavaScript.
>
> For example, we have an SCSS variable that contains a map of breakpoints:
> ```scss
> $grid-breakpoints: (  
>   xs: 0,  
>   sm: 576px,  
>   md: 768px,  
>   lg: 992px,  
>   xl: 1200px,  
>   xxl: 1400px  
> )
> ```
>
> First, we need to pass them to the `::before` pseudo-element in CSS so we can later extract them in JavaScript.
> To do this, we need to convert the SCSS map to a string and pass it to the `content` property. For converting to a string, I use the `map-to-string` function.
>
> ```scss
> body {
> 	&::before {  
> 	    content: map-to-string($grid-breakpoints);  
> 	    display: none;  
> 	}
> }
>
> @function map-to-string($map) {  
>    $result: "";  
>    @each $key, $value in $map {  
>      $result: "#{$result}#{$key}: #{$value}, ";  
>    }  
>    @return $result;  
> }
> ```
>
> Now, we need to extract the string with breakpoint data from CSS and pass it into JavaScript. For this, we can use `getComputedStyle`.
> As a result, we extracted the string with all breakpoints from the content property and saved it in the variable `breakpoints`:
>
> ```js
> const breakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
> ```
> 
> Next, we need to convert this string into an object.
> 
> ```js
> const breakpointsArray = breakpoints.split(', ').map(item => item.split(': '));  
> const breakpointsObj = Object.fromEntries(breakpointsArray);
> ```
> 
> Ultimately, we get the `breakpointsObj` object with all the breakpoints from CSS, which we can now use in JavaScript.
>
> Now we can use these breakpoints in JavaScript for working with Media Query.
> For this, we will use the `matchMedia` property and pass the breakpoints from the `breakpointsObj` object into it. 
>
> We listen for changes in the breakpoint, and when the current screen width matches the specified media query, we execute the callback function. In this case, my function is `handleMinLg`.
>
> ```js
> const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
>   
> handleMinLg(breakpointMinLg); // run on first page load
> breakpointMinLg.addEventListener('change', handleMinLg); 
>   
> function handleMinLg (e) { 
>     if (e.matches) {  	// if true is returned, it means the screen width matches the specified media query
> 		console.log('Screen width is greater than or equal to 992px');
>     }  
> }
> ```
> 
> Thus, we can use breakpoints from CSS in JavaScript, avoiding code duplication and simplifying maintenance.
>

> [!hidden-in-public]-
> ## Alternative Titles
> ---
> Importing CSS Breakpoints Into JavaScript
> Synchronizing CSS breakpoints in JavaScript
> Using CSS Breakpoints in JavaScript Without Duplication
> 
> ## Prompts
> -----
> get CSS Variables in JavaScript
> ## Links
> ----------
> [[~responsive~ Responsive JavaScript and the matchMedia Method]]
> ## References
> ------------
> https://zellwk.com/blog/2023-12-05-css-vars-javascript/
> https://vueschool.io/articles/vuejs-tutorials/how-to-update-root-css-variable-with-javascript/
> https://css-tricks.com/how-to-get-all-custom-properties-on-a-page-in-javascript/
> https://johnkavanagh.co.uk/articles/responsive-javascript-and-the-matchmedia-method/
> https://kinsta.com/blog/javascript-media-query/
> 
> ## Zero-links
> ----
> [[00 Responsive]]