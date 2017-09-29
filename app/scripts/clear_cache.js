const https = require('https');

export default function clearRailsCache() {
  if (!process.env.RAIL_SERVERS) { return; }
  const serverUrls = process.env.RAIL_SERVERS.split(',');

  serverUrls.forEach((url) => {
    const options = {
      host: url,
      port: 443,
      auth: 'fandpstaging:auth4fandpstaging',
      path: '/api/v1/rails_cache?systems_key=f3UwF9ftw',
      method: 'DELETE',
    };

    const req = https.request(options, (res) => {
      console.warn(`Cache Clear Status: ${res.statusCode}`);
    });
    req.end();
    req.on('error', (e) => {
      console.error(e);
    });
  });
}
