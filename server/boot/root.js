const {
  setupImageProxy,
  setupAuthorsRoute
} = require('../components/api');

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/status', server.loopback.status());

  // /mnt/d/* - proxy for images
  setupImageProxy(router);

  // /api/v2/authors
  setupAuthorsRoute(router);

  server.use(router);
};
