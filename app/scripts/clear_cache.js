if (process.env.RAIL_SERVERS) {
  clearRailsCache();
}


function clearRailsCache() {
  var server_urls = process.env.RAIL_SERVERS.split(',');
  var https = require('https');
  var http = require('http');


  

  server_urls.forEach(function(url) {
    if (process.env.RAIL_SERVERS) {
      var options = {
        host: url,
        port: 3000,
        path: '/api/v1/rails_cache?systems_key=f3UwF9ftw',
        method: 'DELETE' 
      }
      var req = http.request(options, function(res) {
        console.warn('Cache Clear Status: ' + res.statusCode);
      });
      req.end();
      req.on('error', function(e) {
        console.error(e);
      });      

    } else {
      var options = {
        host: url,
        port: 443,
        auth: 'fandpstaging:auth4fandpstaging',
        path: '/api/v1/rails_cache?systems_key=f3UwF9ftw',
        method: 'DELETE'
      }
      var req = https.request(options, function(res) {
        console.warn('Cache Clear Status: ' + res.statusCode);
      });
      req.end();
      req.on('error', function(e) {
        console.error(e);
      });      
    }
  });
}
