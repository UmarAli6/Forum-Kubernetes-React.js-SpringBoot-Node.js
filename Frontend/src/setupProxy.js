const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api/v1/users/',
    createProxyMiddleware({
      target: 'http://host.docker.internal:8082',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/posts/',
    createProxyMiddleware({
      target: 'http://host.docker.internal:8081',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/messages',
    createProxyMiddleware({
      target: 'http://host.docker.internal:8083',
      changeOrigin: true,
    })
  );

};