#  Webpack/Babel Blank Preact-Template

## How to Docker
1. enter the docker directory on the command line.
2. Ensure you have docker. If you do not, run `install-docker.sh` to install docker on the Raspberry Pi.
3. To launch the server in the background, run `./start.sh`. To quit, run `./stop.sh`.
  a. the build process is a part of start.sh. The first launch will take a while.
4. Place decks in the docker/decks folder. You may need to restart the docker server to refresh.

## How to build
You will need node installed (preferably node10 or higher).

1. From this directory `yarn install`. if you do not have yarn, `npm install --global yarn` or `npm install`
2. `npm run build`

Thats it.

## Development
`npm run build:dll` to generate a file containing static-never-changing libraries. This speeds up rebuild time.
Use `npm start` to initialize a hot-reloading server at `localhost:3000`.

## Linting
```
npm install \
  redux-saga \
  babel-eslint \
  eslint \
  eslint-plugin-react \
  eslint-plugin-redux-saga \
  eslint-plugin-jsx-a11y \
  eslint-config-airbnb\
  eslint-plugin-import
```
Note: If you get errors, try installing without the -g flag. Eslint may not see alias resolution from the global installation. (eg: react is aliased to preact)

## Anki Deck Conversion
To convert Anki decks to the appropriate format, download Anki for desktop, download the decks you want to convert and install this extension: https://ankiweb.net/shared/info/1589071665. This extension is not made by me but will get the deck in a format that the converter will read. Export to "JSON" with only _____ selected in the export options.

Be sure to edit internals/anki2json/index.js. Lines 7-19 describe how you want to map the fields of the anki deck to this new deck. Both front/back.

Then run `node internals/anki2json/index.js`. The input file will be "sample.json" by default. Does not accept parameters passed in at this time.

...

## Todo
* Alias react to preact but work with eslint

## Dev Notes
##### Optional Chaining
VSCode's TS/JS Validator freaks out when you optionally chain. (ex: window?.location?.href). So the TS/JS validator has been disabled for the time being. This is not ideal. However, Microsoft refuses to work further on this support until the ES committee finalizes TC39. If you need TS/JS validation, re-enable in local .vscode settings and don't use optional chaining. Easy as that :). PS: the setting is `"javascript.validate.enable": false`

Be sure to disable linting for the line that has optional chaining. Isn't using proposed features fun??

## Dev Notes
node_modules/sequelize-cli/lib/sequelize db:migrate
node_modules/sequelize-cli/lib/sequelize db:seed:all
