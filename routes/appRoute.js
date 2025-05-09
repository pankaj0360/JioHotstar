const express = require('express');
const appRouter = express.Router();
const path = require('path');
const movierouter = require("./movieRoute");
appRouter.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "index.html"));
  });
appRouter.use("/home", movierouter);  // Use instead of get()

appRouter.get("/*", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "404.html"));
  });

module.exports = appRouter;