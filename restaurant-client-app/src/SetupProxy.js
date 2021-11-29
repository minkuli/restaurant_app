const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/item",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
