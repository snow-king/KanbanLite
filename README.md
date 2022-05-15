# KanbanLite

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Требования
Требования:
:heavy_check_mark: Использовать Vue.js
:heavy_check_mark: Количество столбцов фиксированное.
:heavy_check_mark: Хранить состояние с помощью vuex. При обновлении страницы состояние должно сохраняться.
:heavy_check_mark: Использовать API для сохранения всех карточек - https://trello.backend.tests.nekidaem.ru/redoc/
:heavy_check_mark: Для добавления карточек необходимо зарегистрироваться и авторизоваться через API
:heavy_check_mark: Вывести возле названия списка количество карточек в списке. Количество должно меняться при перетаскивании карточек между списками.
:heavy_check_mark: Сделать возможность добавления и удаление карточек (есть в API)
:heavy_check_mark: Можно использовать готовые библиотеки JS и Vue, но в то же самое время не использовать готовые UI фреймворки. Например, https://vuetifyjs.com/en/ 
:heavy_check_mark: Верстка должна быть адаптивная.

Большим плюсом будет реализация пунктов:
:heavy_check_mark: Использование https://pinia.vuejs.org/ вместо vuex.
:heavy_check_mark: Использование vue3, nuxt.js
:heavy_check_mark: Реализация страниц авторизации и регистрации.
:heavy_check_mark: Обработка ошибок, валидация. 
:heavy_check_mark: :heavy_check_mark: На странице доски сделать хедер с кнопкой “выход”. При адаптиве кнопка “выход” должна уходить в меню "бургер".


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
