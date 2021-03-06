const path = require('path');
const { Router } = require('express');
const mountMiddlewares = require('./mountMiddlewares');
const mountRoutes = require('./mountRoutes');

module.exports = function(
  root,
  { cwd = process.cwd(), viewExtensions = [] } = {}
) {
  root = path.resolve(cwd, root);
  // The base router that'll hold everything
  const router = Router();

  // First mount the middlewares
  const routesFromMiddlewares = mountMiddlewares(router, root, { cwd });

  // And then the actual routes
  mountRoutes(router, root, { routes: routesFromMiddlewares, viewExtensions });

  return router;
};
