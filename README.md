less-plugin-ejs-import
========================

Adds the ability for less to import from ejs template files.

## lessc usage

Install with npm

```bash
npm install -g less-plugin-ejs-import
```

In less file:

```
@import "ejs://template.ejs";
```

In `template.ejs` file:

```
My Name: <%= myname %>
My Version: <%= myversion %>
```

Options:  
prefix - default: ejs://

## Command line usage

```
lessc --ejs-import file.less file.css
lessc --ejs-import="name=less-plugin-ejs-import version=1.0.0" file.less file.css
```

## Programmatic usage

```
var EjsImportPlugin = require("less-plugin-npm-import"),
    options = { plugins: [new EjsImportPlugin({name: 'less-plugin-ejs-import', version: '1.0.0'})] };
less.render(css, options)
    .then(...
```

## Browser usage

Browser usage is not supported.

Testing
-------

run the tests by running `node test`
You require the dev dependencies installed (which includes less)

## Note

This is code is heavily based on [`less-plugin-npm-import`](https://github.com/less/less-plugin-npm-import).

## License

MIT
