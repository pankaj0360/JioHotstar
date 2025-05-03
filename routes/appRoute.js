const express = require('express');
const appRouter = express.Router();
const path = require('path');
appRouter.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "index.html"));
  });
appRouter.get("/*", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "404.html"));
  });

module.exports = appRouter;