const {
  setImagesRoute,
  setAuthorsRoute
} = require('../components/api');

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/status', server.loopback.status());

  // /mnt/d/* - proxy for images
  setImagesRoute(router);

  // /api/v2/authors
  setAuthorsRoute(router);

  server.use(router);
};
