const request = require('request');

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/status', server.loopback.status());

  // proxy for images
  const ips = getServerIPv4();
  router.get('/mnt/d/*', (req, res) => {
    const host = `http://${ips[0]}`;
    const url = host + req.originalUrl.replace('/mnt/d/', '/img/');
    request(url).pipe(res);
  });

  server.use(router);
};


function getServerIPv4() {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  const ips = [];

  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(iface => {
      if (iface.family === 'IPv4' && iface.internal === false) {
        ips.push(iface.address);
      }
    });
  });

  return ips;
}
