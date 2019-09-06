const express = require("express");

// const actionRouter = require("./routes/actionRoute");
const projectRouter = require("./routes/projectRoute");

const server = express();
server.use(express.json(), express.Router());

// server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

server.get("/", (request, response) => {
  response.status(200).json({ api: "up" });
});

module.exports = server;
