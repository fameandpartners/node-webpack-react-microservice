import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import csshook from 'css-modules-require-hook/preset';
import fs from 'fs';

const app = express();
app.use(express.static('./build'))
const { render, template } = require("rapscallion");

var Head = require('./src/js/Head');
var App = require('./src/js/App');
var Footer = require('./src/js/Footer');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/app', function(req, res){
  fs.readFile('./build/asset-manifest.json', 'utf8', function (err, assetManifest) {
    if (err) return err;
    const assets = JSON.parse(assetManifest);
    const responseRenderer = template`
      <html>
        ${render(<Head/>)}
        <body>
          ${render(<App store={{}}/>)}
          ${render(<Footer/>)}
          <script>
          // Expose initial state to client store bootstrap code.
          // TODO: Attach checksum to the component's root element.
          // document.querySelector("#id-for-component-root")")
          // Bootstrap your application here...
          </script>
          <link rel="stylesheet" href=${assets["main.css"]} />
          <script async defer src=${assets["main.js"]} />
        </body>
      </html>
    `;

    responseRenderer.toStream().pipe(res);
  });
});

app.listen(8001);
console.log('Go to http://localhost:8001');
export default app;
