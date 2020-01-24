## How to build an application?

* development

    ```bash
    npm run build
    ```

* production

    ```bash
    npm run build:production
    ```

_Open public/ directory in browser._

## How to develop an application?

```bash
npm run watch
```

_Open public/ directory in browser._

## Remove generated directory

If you would like to remove `public/dist` directory (created by Webpack):

```bash
npm run clear
```

If you would like to remove `node_modules/` and remove `public/dist/`

```bash
npm run clear:all
```

## Count LOC (Lines of Code)

If you would like to know how many lines of code you write:

```bash
npm run count
```

## Analysis of bundle file weight

If you would like to check how much a bundle file weight:

```bash
npm run build
npm run audit
```