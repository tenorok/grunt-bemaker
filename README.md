# grunt-bemaker

> Grunt-плагин для сборки БЭМ-проекта с помощью [bemaker](https://github.com/tenorok/bemaker)

## Приступая к работе

Если вы не использовали [Grunt](http://gruntjs.com/) раньше, то можете ознакомиться с [вступительной инструкцией](http://gruntjs.com/getting-started), в которой объясняется, как добавить [Gruntfile](http://gruntjs.com/sample-gruntfile) в проект.

Установить этот плагин можно следующей командой:

```shell
npm install grunt-bemaker
```

После установки, можно будет подключить плагин в вашем Gruntfile:

```js
grunt.loadNpmTasks('grunt-bemaker');
```

## Использование

Для запуска сборки проекта, достаточно выполнить команду: `grunt bemaker`.

Сборка осуществляется с помощью [bemaker](https://github.com/tenorok/bemaker).

### Опции

#### Опция `verbose`

Тип: `string[]`

В процессе сборки выводятся различные типы сообщений.

По умолчанию выводятся все типы сообщений.
Опция `verbose` позволяет настроить вывод только некоторых типов.

Выводимые сообщения делятся на следующие типы:

1. `log` — информация о процессе сборки (синим цветом)
2. `info` — сообщение о результате сборки (зелёным)
3. `warn` — предупреждения (жёлтым)
4. `error` — ошибки (красным)

Следующий пример будет выводить только предупреждения и ошибки:

```js
{
    verbose: ['warn', 'error']
}
```


#### Опция `directories`

Тип: `string[]`

_Обязательный_

Опция указывает расположение директорий с блоками.

Сборщик ничего не соберёт без указания расположения блоков.

Следующий пример задаёт сборку блоков из директорий `common` и `phone`:

```js
{
    directories: ['common', 'phone']
}
```

#### Опция `outname`

Тип: `string`

Опция указывает имя сохраняемых файлов.

По умолчанию файлы сохраняются без имени, только с расширением.

Следующий пример задаёт сохраняемым файлам имя `all`:

```js
{
    outname: 'all'
}
```

#### Опция `outdir`

Тип: `string`

Опция указывает директорию для сохраняемых файлов.

По умолчанию файлы сохраняются в текущую директорию.

Следующий пример задаёт директорию `bundle` для сохраняемых файлов:

```js
{
    outdir: 'bundle'
}
```

#### Опция `extensions`

Тип: `string[]`

Опция указывает расширения для сохраняемых файлов.

По умолчанию сохраняются все найденные расширения.

Следующий пример задаёт к сохранению расширения `.js` и `.css`:

```js
{
    extensions: ['.js', '.css']
}
```

#### Опция `blocks`

Тип: `string[]`

Опция указывает имена блоков, которые необходимо собрать.

По умолчанию в сборку включаются все найденные блоки.

Следующий пример задаёт к сборке только блоки `button` и `input`:

```js
{
    blocks: ['button', 'input']
}
```

#### Опция `dependext`

Тип: `string`

Опция указывает расширение файлов, в которых
сборщику следует искать зависимости блоков.

По умолчанию поиск зависимостей осуществляется в файлах с расширением `.js`.

Следующий пример задаёт поиск зависимостей в файлах `.deps.js`:

```js
{
    dependext: '.deps.js'
}
```

#### Опция `jsdoctag`

Тип: `string`

Опция указывает имя JSDoc-тега, в котором сборщику следует
читать зависимости блоков.

По умолчанию чтение зависимостей осуществляется в теге `@bemaker`.

Следующий пример задаёт чтение зависимостей в теге `@deps`:

```js
{
    jsdoctag: 'deps'
}
```

#### Опция `before`

Тип: `boolean`

Опция отменяет установку комментария перед содержимым каждого файла.

По умолчанию в собранном файле перед содержимым каждого файла устанавливается такого вида комментарий:

```css
/* before: blocks/button/button.css */
```

Следующий пример отменяет установку комментария:

```js
{
    before: false
}
```

#### Опция `after`

Тип: `boolean`

Опция отменяет установку комментария после содержимого каждого файла.

По умолчанию в собранном файле после содержимого каждого файла устанавливается такого вида комментарий:

```css
/* after: blocks/button/button.css */
```

Следующий пример отменяет установку комментария:

```js
{
    after: false
}
```
