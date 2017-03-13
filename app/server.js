var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var App = require('./src/js/App');
var ReactDOMServer = require('react-dom/server');
var React = require('react');
var fs = require('fs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/app', function(req, res){
  const html = ReactDOMServer.renderToString(
      <App/>
    );
    fs.readFile('./public/index.html', 'utf8', function (err, file) {
      if (err) {
        return console.log(err);
      }
      const document = file.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
      res.send(document);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('<html>error</html>');
});

app.listen(3001);
console.log('Go to http://localhost:3001');
module.exports = app;
