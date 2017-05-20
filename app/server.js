require('ignore-styles');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const React = require('react');
const fs = require('fs');

const app = express();
app.use(express.static('./build'));
const { render, template } = require('rapscallion');

// Components
const Head = require('./src/js/Head');
const App = require('./src/js/App');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/app', (req, res) => {
  fs.readFile('./build/asset-manifest.json', 'utf8', (err, assetManifest) => {
    if (err) return err;
    // const props = req.body;
    const props = { $$appState: { defaultValue: ['injected'] } };
    const assets = JSON.parse(assetManifest);
    const responseRenderer = template`
      <html>
        ${render(React.createElement(Head))}
        <body>
            <div id='root'>
              ${render(React.createElement(App, props))}
            </div>
          <script>
            window.__data = ${JSON.stringify(props)};
          </script>
          <link rel="stylesheet" href=${assets['main.css']} />
          <script src=${assets['main.js']}></script>
        </body>
      </html>
    `;

    responseRenderer.toStream().pipe(res);
  });
});

app.listen(8001);
console.log('Go to http://localhost:8001');
module.exports = app;
