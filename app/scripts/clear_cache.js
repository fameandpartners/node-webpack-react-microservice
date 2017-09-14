clearRailsCache();


function clearRailsCache() {
  var server_urls = process.env.RAIL_SERVERS.split(',');
  var https = require('https');

  server_urls.forEach(function(url) {
    var options = {
      host: url,
      port: 443,
      auth: 'fandpstaging:auth4fandpstaging',
      path: '/api/v1/rails_cache?systems_key=f3UwF9ftw',
      method: 'DELETE'
    }

    var req = https.request(options, function(res) {
      console.log('Cache Clear Status: ' + res.statusCode);
    });
    req.end();
    req.on('error', function(e) {
      console.error(e);
    });
  });
}