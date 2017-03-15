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

// Components
var Head = require('./src/js/Head');
var startup = require('./src/js/startup/app');
var Footer = require('./src/js/Footer');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/app', function(req, res){
  fs.readFile('./build/asset-manifest.json', 'utf8', function (err, assetManifest) {
    if (err) return err;
    const { props } = req.body;
    const assets = JSON.parse(assetManifest);
    const responseRenderer = template`
      <html>
        ${render(<Head/>)}
        <body>
          <div class='root'>
            ${startup({props, shouldReturnComponent: true})}
          </div>
          ${render(<Footer/>)}
          <link rel="stylesheet" href=${assets["main.css"]} />
          <script src=${assets["main.js"]}></script>
          <script>
            var startup = require('./startup/app');
            var payload = {}; // we can fill the hash here
            startup(payload);
          </script>
        </body>
      </html>
    `;

    responseRenderer.toStream().pipe(res);
  });
});

app.listen(8001);
console.log('Go to http://localhost:8001');
export default app;
