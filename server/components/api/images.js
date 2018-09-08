const os = require('os');
const request = require('request');

function getServerIPv4() {
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

function setImagesRoute(router) {
  const ips = getServerIPv4();

  return router.get('/mnt/d/*', (req, res) => {
    const host = `http://${ips[0]}`;
    const url = host + req.originalUrl.replace('/mnt/d/', '/img/');
    request(url).pipe(res);
  });
}

module.exports = { setImagesRoute }
