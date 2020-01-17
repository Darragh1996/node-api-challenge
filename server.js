const express = require("express");
const projectsRouter = require("./routers/projects-router");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("<h1>Site is Working!</h1>");
});

function logger(req, res, next) {
  console.log(`METHOD: ${req.method} URL: ${req.url} ${new Date()}`);
  next();
}

module.exports = server;
