const jsonServer = require("json-server");
const serverless = require("serverless-http");
const path = require("path");

// Buat instance server json-server
const server = jsonServer.create();

// Arahkan router ke file db.json Anda
const router = jsonServer.router(path.join(__dirname, "..", "..", "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Bungkus server dengan serverless-http untuk diekspor
module.exports.handler = serverless(server);
