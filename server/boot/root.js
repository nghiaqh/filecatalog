const request = require('request');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());

  // proxy for images
  router.get('/mnt/d/*', (req, res) => {
    var host = 'http://192.168.0.6';
    const url = host + req.originalUrl.replace('/mnt/d/', '/img/');
    request(url).pipe(res);
  });

  server.use(router);
};
