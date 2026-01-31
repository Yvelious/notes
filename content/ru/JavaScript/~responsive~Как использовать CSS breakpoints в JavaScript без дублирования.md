---
create: 2025-03-28
idnote: lf371dOgkL
vault: dev
title: Как использовать CSS breakpoints в JavaScript без дублирования
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
Language: ru
---
![[Pasted image 20250526121010.png]]

При работе с адаптивной версткой часто возникает необходимость использовать одни и те же **breakpoints** как в CSS, так и в JavaScript. 
Хранить breakpoints отдельно в JavaScript и отдельно в CSS это далеко не лучший подход.  Причина в тому, что это приводит к дублированию: breakpoints прописываются одновременно в CSS и JS, создавая две точки входа. Если breakpoints изменятся в одном месте (например в CSS), в другом месте (JavaScript) их могут забыть обновить.

Чтобы избежать таких рисков,  мы будем использовать **единую точку входа**, где breakpoints определяются в одном месте в СSS(SCSS) стилях, и затем передаются в JavaScript в виде объекта.

## Определяем breakpoints в SCSS

В SCSS создаём map с breakpoints. Map в СSS это подобие ассоциативного массива в Javascript, простыми словами объект с ключами и значениями

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

## Передаём breakpoints в CSS через псевдоэлемент

Для передачи данных в JS мы воспользуемся `::before` и встроим строку с breakpoints в `content`.
Но для начала нам надо преобразовать map в строку в строку. Для этого напишем SCSS-функцию для преобразования map

```scss
@function map-to-string($map) {   
	$result: "";   
	@each $key, $value in $map {     
		$result: "#{$result}#{$key}: #{$value}, ";   
	}   
	@return $result; 
}
```

Затем применим её к `body::before`:

```css
body {   
	&::before {     
		content: map-to-string($grid-breakpoints);     
		display: none;   
	}
}
```

## Извлекаем строку из СSS в JavaScript

В JS мы можем получить значение `content` из псевдо-элемента `::before` с помощью js метода `getComputedStyle` и записать в переменную.

```js
const rawBreakpoints = getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/\"/g, '').trim();
```

---

## Преобразуем строку с breakpoints  в объект 

Что бы мы могли удобно взаимодествовать с нашими breakpoints в JS и надо преобразовать в объект.
Парсим строку и превращаем её в объект:

```js
const breakpointsArray = rawBreakpoints.split(', ').map(item => item.split(': '));  
const breakpointsObject = Object.fromEntries(breakpointsArray);
```

Теперь переменная `breakpointsObject` содержит объект со всеми breakpoints из SCSS:

```js
console.log(breakpointsObject); // { xs: "0", sm: "576px", md: "768px", lg: "992px", xl: "1200px", xxl: "1400px" }
```

## Используем `matchMedia` для отслеживания, соответствует ли ширина экрана нашим breakpoints

Использовать свойство `matchMedia` и передаем в него нужные нам breakpoints из объекта `breakpointsObj`. 
Отслеживаем изменения медиазапроса: когда ширина экрана начинает соответствовать определённому breakpoint, запускается callback-функция с нужной для нас JavaScript-логикой для определенного breakpoint.  
В нашем примере эту логику содержит функция `handleMinLg`. А применяется эта функция когда медиазапрос соответствует значению записаного в `breakpointsObject.lg`. В данном случае это минимальная ширина `992px`

```js
const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
  
handleMinLg(breakpointMinLg); // запускаем при первой загрузке страницы
breakpointMinLg.addEventListener('change', handleMinLg); 
  
function handleMinLg (e) { 
	// если возвращается true, значит ширина экрана соответствует заданному медиа-запросу
    if (e.matches) {  	
		console.log('Ширина экрана больше или равна 992px');
    }  
}
```

## Резюмирую

С помощью этого подхода:
- Мы избегаем дублирование breakpoints между CSS и JavaScript;
- Поддержка становится проще и безопаснее;
- У нас единая точка входа для breakpoints, которые используестя как в СSS так и JavaScript.

Это чистое и устойчивое решение для синхронизации адаптивных точек между СSS и JavaScript.





> [!raw-hidden]-
> Если мы хотим использовать breakpoints из CSS для работы с Media Query в JavaScript, сначала нужно извлечь их из CSS и передать в JS.
> 
> Можно, конечно, прописать breakpoints вручную прямо в JavaScript, но это далеко не лучший подход. Такой метод увеличивает риск ошибок и усложняет поддержку кода. Причина в том, что это приводит к дублированию: breakpoints прописываются одновременно в CSS и JS, создавая две точки входа. Если breakpoints изменятся в одном месте (например, в CSS), в другом месте (JS) их могут забыть обновить.
> 
> Чтобы избежать таких проблем, лучше создать единую точку входа. Это позволит синхронизировать breakpoints между CSS и JS, упрощая поддержку и снижая вероятность ошибок.
> 
> Наша цель передать breakpoints из CSS в JavaScript сохранив их в объекте, для дальнейшего использования в Javascript.
> 
> К примеру у нас есть переменная SCSS, которая содержит map breakpoints:
> ```scss
> $grid-breakpoints: (  
>   xs: 0,  
>   sm: 576px,  
>   md: 768px,  
>   lg: 992px,  
>   xl: 1200px,  
>   xxl: 1400px  
> )
> 
> ```
> 
> Для начала нам надо их передать в псевдоэлемент `::before` в CSS, чтобы потом извлечь их в JavaScript.
> Для этого надо перевести SCSS map в строку и передать их в свойство `content`. Для перевода в строку я использую функцию `map-to-string`.
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
> Теперь нам надо извлечь строку с данными о breakpoints из CSS и передать в JavaScript.  Для этого можно использовать `getComputedStyle` .
> В итоге мы извлекли строку со всеми breakpoint из свойства content и сохранили в переменной `breakpoints`:
> 
> ```js
> const breakpoints = getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/\"/g, '').trim();
> ```
> 
> Затем нам надо данную строку преобразовать в объект.
> 
> ```js
> const breakpointsArray = breakpoints.split(', ').map(item => item.split(': '));  
> const breakpointsObj Object.fromEntries(breakpointsArray);
> ```
> 
> В итоге мы получаем объект `breakpointsObj` со всеми брэйкпоинтами из CSS, которые теперь мы можем использовать в JavaScript
> 
> 
> Теперь мы можем использовать эти брэйкпоинты в JavaScript для работы с Media Query.
> Для этого мы будем использовать свойство `matchMedia` и передавать в него брэйкпоинты из объекта `breakpointsObj`. 
> 
> Слушаем изменения брэйкпоинта и когда текущая ширина экрана соответствует заданному медиа-запрос выполняем сallback функцию. В данном случае у меня эта функция handleMinLg.
> 
> ```js
> const breakpointMinLg = window.matchMedia(`(min-width: ${breakpointsObject.lg})`);  
>   
> handleMinLg(breakpointMinLg); // запускаем при первой загрузке страницы
> breakpointMinLg.addEventListener('change', handleMinLg); 
>   
> function handleMinLg (e) { 
>     if (e.matches) {  	// если возвращается true, значит ширина экрана соответствует заданному медиа-запросу
> 		console.log('Ширина экрана больше или равна 992px');
>     }  
> }
> ```
> 
> Таким образом, мы можем использовать брэйкпоинты из CSS в JavaScript, избегая дублирования кода и упрощая поддержку.
>

> [!hidden-in-public]-
> ## Альтернативные заголовки
> ---
> Importing CSS Breakpoints Into JavaScript
> Cинхронизация CSS breakpoints в Javascript
> Using CSS Breakpoints in JavaScript Without Duplication
> 
> 
> ## Promts
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