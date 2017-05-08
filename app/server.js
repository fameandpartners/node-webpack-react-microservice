import 'ignore-styles';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import fs from 'fs';

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
    const props = { someStore: 'ahahhah' };
    const assets = JSON.parse(assetManifest);
    const responseRenderer = template`
      <html>
        ${render(<Head />)}
        <body>
            <div id='root'>
              ${render(<App {...props} />)}
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
export default app;
