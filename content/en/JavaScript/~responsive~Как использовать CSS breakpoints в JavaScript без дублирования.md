---
create: 2025-03-28
idnote: lf371dOgkL
vault: dev
title: How to Use CSS Breakpoints in JavaScript Without Duplication
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

When working with responsive layouts, there is often a need to use the same **breakpoints** in both CSS and JavaScript. 
Keeping breakpoints separately in JavaScript and CSS is far from the best approach. The reason is that it leads to duplication: breakpoints are defined in both CSS and JS, creating two entry points. If breakpoints change in one place (for example, in CSS), they may be forgotten to be updated in the other place (JavaScript).

To avoid such risks, we will use a **single entry point**, where breakpoints are defined in one place in CSS (SCSS) styles and then passed to JavaScript as an object.

## Define Breakpoints in SCSS

In SCSS, we create a map with breakpoints. A map in SCSS is similar to an associative array in JavaScript, simply put, an object with keys and values.

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

## Pass Breakpoints to CSS via Pseudo-element

To pass data to JS, we will use `::before` and embed a string with breakpoints in `content`.
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

Then we apply it to `body::before`:

```css
body {   
	&::before {     
		content: map-to-string($grid-breakpoints);     
		display: none;   
	}
}
```

## Extract the String from CSS in JavaScript

In JS, we can get the value of `content` from the pseudo-element `::before` using the JS method `getComputedStyle` and store it in a variable.

```js
const rawBreakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
```

---

## Convert the String with Breakpoints to an Object 

To conveniently interact with our breakpoints in JS, we need to convert it into an object.
We parse the string and turn it into an object:

```js
const breakpointsArray = rawBreakpoints.split(', ').map(item => item.split(': '));  
const breakpointsObject = Object.fromEntries(breakpointsArray);
```

Now the variable `breakpointsObject` contains an object with all breakpoints from SCSS:

```js
console.log(breakpointsObject); // { xs: "0", sm: "576px", md: "768px", lg: "992px", xl: "1200px", xxl: "1400px" }
```

## Use `matchMedia` to Track Whether the Screen Width Matches Our Breakpoints

We use the `matchMedia` property and pass the necessary breakpoints from the `breakpointsObject`. 
We track changes in the media query: when the screen width starts to match a certain breakpoint, a callback function is triggered with the necessary JavaScript logic for that specific breakpoint.  
In our example, this logic is contained in the `handleMinLg` function. This function is applied when the media query matches the value recorded in `breakpointsObject.lg`. In this case, it is a minimum width of `992px`.

```js
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
  
handleMinLg(breakpointMinLg); // runs on the first page load
breakpointMinLg.addEventListener('change', handleMinLg); 
  
function handleMinLg (e) { 
	// if true is returned, it means the screen width matches the specified media query
    if (e.matches) {  	
		console.log('Screen width is greater than or equal to 992px');
    }  
}
```

## In Summary

With this approach:
- We avoid duplicating breakpoints between CSS and JavaScript;
- Maintenance becomes easier and safer;
- We have a single entry point for breakpoints used in both CSS and JavaScript.

This is a clean and sustainable solution for synchronizing responsive points between CSS and JavaScript.