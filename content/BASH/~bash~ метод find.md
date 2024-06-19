---
symlink: 
symlinkchapter: BASH
---
 
#bash #find #done

## Формат(cинтаксис) команды find
The order of arguments is generally as such:
```bash
find {path} {options} {action}
```

The general pattern for using `-prune` is this:
```bash
find [path] [conditions to prune] -prune -o [your usual conditions] [actions to perform]
```
When we initially use _find_, we usually start with the expression part. This is the part that allows us to specify a filter that defines which files to select

N.B.
`-o` означает `-or` что означает или.
## Флаги (options) для компанды find
`-name` имя файла который ищешь, либо можно использовать регулярное выражение.
`-type d` искать только директории
`-type f ` искать только файлы
`-not -path` ".performance_test/prune_me*"  исключает какие то пути, которые не будут попадать под критерии поиска.

## Как все же происходит поиск файлов и каталогов

Команда `find .`  в консоле, означает поиск в данный момент всех файлов и папок в текущей директории, также будет к терминале выведена и сама текущая директория обозначенная `.`

![[Pasted image 20231103173611.png|800]]
**N.B.**
И как бы когда нас интересует какой то список, мы прописываем команды что бы эту точку убрать из выдачи один из вариантов это сделать `find . ! -name .`, что означает все файлы в текущей директории, кроме самой директории `.`

Для фильтрации поиска используется три флага `-type`, `-path` , `-name`.
![[Pasted image 20231103173438.png|900]]

#### ключ -type
отфильтровывает относительно того папка это или файл. Мы можем искать к примеру только файлы, или только папки, либо по умолчанию и папки и файлы.

#### ключ -path
Терминал выводит все файлы и папки вместе с их путями в виде строчек. Так вот при использовании флага `-path` должно быть понятно что терминал работает не с какой то структурой. а со списком строчек, каждая из которой состоит из пути и названия файла или директории. И следовательно  фильтровать мы будем строки. ==Это база, надо понять, что в терминале выводятся обыкновенные строки, а не структура.==

#### ключ -name
Если использовать этот ключ, то поиск осуществляется не относительно всей строчке, а только по названию файла или директории, независимо в какой директории они находятся. Другими словами,
ищаться вхождения только в той части подстроки, которая идет после последнего слэша в строке. Здесь обсалютно всеравно на структуру, файлы которые попадают под запрос могут находится в разных местах структуры, в разных папках. 


- [ ] #### Разница между флагом `-name` и флагом `-path`.
`-name`относится только к имени файла и папки  и работает только с ним(это его скоуп).  К примеру при переборе методом find всех файлом и папок в текущей директории, метод  name будет в этом случае обращать внимание в строке  `./.hidden/check/test.js`  только на  подстроку `test.js`. Флаг `-path`  в свою очередь будет работать со всей строкой `./.hidden/check/test.js`. Другими словам скоуп для работы флага name только имя файла или папки в строке, а для path скоуп вся строка(состоящая из пути и имени).
Если у нас будет к примеру в фильтре стоять `find . -type d -name 'test'`, то будут найдены и выведены папки названия которых совпадает с запросом, независимо от того где они находятся в текущей директории и на каком уровне в структуре.  К примеру папка `test` может находится как по пути `./folder1/test,` а также находится и в `./folder2/test`. И все эти cовпадения будут выведены в терминале.

Вот хороший пример использования метода name. Когда нам надо найти все места где лежат папки с именем 'node_modules' и исключить их содержимое из поиска
```bash
find . -type d -name 'node_modules' -prune -o -name '*.json' -print
```

### Использование регулярных выражений в методах `path` и `name`

==Знак `*` означает "ноль или более любых символов".==
И надо запомнить что спец символы отличаются немного, чем для регулярки например в js/
К примеру точка `.` не является спец. символом, а несет значение только точки, поэтому ее экранировать не надо.
В регулярке в js точка это любой символ звездочка это ноль или много раз идет.
В баше звездочка объединяет в себе эти два понятия любой символ и ноль или много раз.

N.B.
метод -name работатает только с именем, и когда мы вствляем регулярки они тоже распространяются только на имя

N.B.
Когда используется регулярка для значения  в флаге -path она применяется не как это происходит с флагом -name только к названию, а ко всему пути к примеру `./folder1/folder2/test` вот для всей это строки будет работать регулярка это ее область.

### Скорость работы при исключении с помощью метода ! или prune
Почему `! -name` и `! -path` работают медленней когда мы хотим что то исключить из поиска. Потому что метод find всеравно индексирует(ищет)  все файлы и папки, а лишь после этого отфильтровывает по заданным критериям.
Если используется метод -prune. Он просто перекрывает доступ на структурном уровне к индексации файлов и папок находящихся в директории, которую мы хотим исключить. Получается программа туда даже не зайдет индексирвать файлы. Поэтому этот способ гораздо быстрей когда надо что то исключить и фильтрануть в выдаче.
Prune работает не со строками, а со структурой, запрещает индексировать содержимое папки.

N.B.
```bash
find . ! -name '.hidden'
```
В их выдаче уберется название папки .hidden, но не ее содержимое, просто в выдаче к примеру не будет `./.hidden`, но при этом `./.hidden/test` показываться в выдаче будет.


------


### Полезные примеры

Пример исключит из поиска содержимое папок название которых содержит в себе выражение '.git' и выведет все остальные файлы ноходящиеся в текущей дирректории
```bash
find . -type d -name '.git*' -prune -o -type f -print 
```

N.B.
Нужно понимать что метод find ищет все файлы и папки независимо от вложений и как бы делает флэт, убирая структуру и выводя строки состоящие из путей и названий.


Примерно тоже самое но с папкой `node_modules` и плюс вместо `-print` используется `-false`, но действие одинаково помогает не выводит саму папку `node_modules`, а не только ее содержимое

```Bash
find . -type d -name 'node_modules' -prune -false -o -type f
```

Вот пример, который не сработает, как планировалось и я объясню ниже почему
```bash
find . -type d -name '.*' -prune -o -type f
```
`.*` это регулярка говорит что название начинается с точки. Под это подходит текущая директори и prune все остально содержимое отсекает. Поэтому ничего и нет в выдаче
![[Pasted image 20231105010134.png | 400]]


**N.B.**
В конструкции с prune нельзя применить флаг -delete, но можно использовать такую конструкцию для удаление `-exec rm -rf {} \;` instead of `-delete`.

**In contrast, the _-exec_ action allows us to execute commands on the resulting paths.**
-exec bash -c 'echo $0' {} \;


## Performance
### Хорошие примеры исключения папок и файлов 3-мя разными способами с замерами по performance

```Bash
----------------------------------------------
# of files/dirs in level one directories
.performance_test/prune_me     702702    
.performance_test/other        2         
----------------------------------------------

> find ".performance_test" -path ".performance_test/prune_me" -prune -o -exec bash -c 'echo "$0"' {} \;
.performance_test
.performance_test/other
.performance_test/other/foo
  [# of files] 3 [Runtime(ns)] 23513814

> find ".performance_test" -not \( -path ".performance_test/prune_me" -prune \) -exec bash -c 'echo "$0"' {} \;
.performance_test
.performance_test/other
.performance_test/other/foo
  [# of files] 3 [Runtime(ns)] 10670141

> find ".performance_test" -not -path ".performance_test/prune_me*" -exec bash -c 'echo "$0"' {} \;
.performance_test
.performance_test/other
.performance_test/other/foo
  [# of files] 3 [Runtime(ns)] 864843145

```





-not -path(! -path) медленнее чем -prune так как всеравно обходит все директории даже те что исключили.
А еще быстрее вариант когда используется такая конструкция

```bash
find ".performance_test" -not \( -path ".performance_test/prune_me" -prune \) -exec bash -c 'echo "$0"' {} \;
```
Сначала выполняется то что в скобках, мы отсекаем все что в директории `.performance_test/prune_me` после этого выполняется уже основное условие `-not -path .performance_test/prune_me` и у нас получается что мы убираем из выборки саму папку `.performance_test/prune_me`


**-prune**
-prune означает исключить. 
`-prune` stops `find` from descending into a directory. Just specifying `-not -path` will still descend into the _skipped_ directory, but `-not -path` will be false whenever `find` tests each file. It tells the find command to **not** explore that directory.

Есть задача когда нам надо исключить дирректорию по конкретному пути.
А есть задача когда нам надо исключить все дирректории с определенным именем без указания конкретного пути нахождения этих дирректорий.



Здесь мы исключаем дирректорию по конкретному пути
```bash
find . -path './misc' -prune -o -name '*.txt' -print
```

А если у нас есть задача что нужно исключить конкретную дирректорию к примеру node_modules и  не важно где в каталогах лежит эта папка, надо что бы все эти папки в каталоге были исключены, тогда используем конструкцию не с path

```bash
find . -type d -name 'node_modules' -prune -o -name '*.js' -print
```

### Ну вот мы сделали выборку отфильтровали то что нам нужно а дальше что?

Вот пример моего скрипта как я дальше использую выборку. Из полученной выборки редактирую файл с помощью метода -sed  вырезаю ненужные мне части текста используя паттерн.
И потом удаляю файлы которые мне  не нужны, а это архива *.bak

```bash
find . -type d -path ".obsidian"  -prune -false -o -name '*.md' -exec sed -i.bak 's///g' {} \;
find . -type d -path ".obsidian" -prune -false -o -name '*.bak' -exec rm -f {} \;

```


Так же немного про сами паттерны
Исключит контент папки dir_to_exclude на любом уровне в текущем каталоге
````bash
find -not -path "*/dir_to_exclude/*"
````

Исключит файлы и папки которые в названии имеют dir_to_exclude на любом уровне
```bash
find -not -path "*/dir_to_exclude*"
```

Исключит все файлы и папки которые содержут в себе 'dir_to_exclude' на верхнем уровне текущего каталога
```bash
find -not -path "./dir_to_exclude*"
```


**Объяснение зачем выражение {} \;  в таких вырожениях с выражение -exec rm -i {} \;`**

Как я понял {} эта штука что то типа внутреннего скопа, которая подставляет нужное значение(в нашем случае имя файла) в команду которые прописаны посл -exec. К примеру у нас 

-exec bash -c 'echo $0' {} \;   в макосе просто так -exec echo $0 {} \;
Что  вот вывести имя к примеру  файла через переменную $0 нужно добавить {} что бы это переменную попала информация. Это как бы как когда у нас есть функция   test(arg) и аргументы переденные данные которые мы можем использовать в функции, так вот этим как раз и занимается эта команда  {}.


`{}` is replaced by each file name found in the executed command.

When using `find -exec`, `{}` is expanded to each result found.

For example, if you have a directory `example` containing 3 files `a.txt`, `b.txt` and `c.txt`, `find example/ -exec rm -i {} \;` will expand to:

```bash
find example/ -exec rm -i example/a.txt \;
find example/ -exec rm -i example/b.txt \;
find example/ -exec rm -i example/c.txt \;
```

The `\;` at the end is simple an escaped `;` to indicate the end of the exec pattern. Otherwise, it would be interpreted by shell itself.


Пример где используется не  -exec а цикл но суть одна и таже 

```bash
#!/usr/bin/env 

for file in `find /path/to/your/directory/ -type f -name "*"` 
do 
	echo -E -- ${file} -- && cat -- ${file} ; 
done > /path_to_your_new_file/nameFile.txt
```


При перезаписи данных в файле спомощью sed нужно добавлять -i флаг и указать расширение для бэкапа.
Так просто нельзя переписать тот же файл который, только вот с такими дополнениями. Потому надо будет еще дописать команду что бы удалить бэкапы


```bash
sed -i.bak s/STRING_TO_REPLACE/STRING_TO_REPLACE_IT/g index.html
```

Альтернативный вариант без -i

```bash
sed -e 's/scrippt/script/g' index.html > index.html.tmp && mv index.html.tmp index.html
```
Не используется i. пишут что файл резервной копии не остается не понял правад почему
mv index.html.tmp index.html как бы переименование файла произйдет а тот файл удалиться

mv test1 test2   останется файл с названием test2 но  содержимым от test1. Как бы мы test1 переименовали и что бы не было дублирования файл с одинаковым именем удалили.

## Cards
----
[[~cards~ Flash Cards for bash find method]]

## Links
-------
[[ ~bash~ Удалить все html тэги]]
[[~bash~ Различия между использования -prune и использования -not -path]]

## References
------
https://stackoverflow.com/questions/4210042/how-do-i-exclude-a-directory-when-using-find
https://www.diskinternals.com/linux-reader/bash-find-command/
https://www.cyberciti.biz/faq/find-command-exclude-ignore-files/
https://www.baeldung.com/linux/find-exec-command
https://www.theunixschool.com/2012/07/find-command-15-examples-to-exclude.html
https://adamtheautomator.com/bash-find/#Finding_Files_by_File_or_Directory_Name

## Zero-link
-----
[[00 Bash]]
