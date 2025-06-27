// File: api/index.js

// Impor library yang dibutuhkan
const jsonServer = require("json-server");
const path = require("path");

// Buat instance server json-server
const server = jsonServer.create();

// Arahkan router ke file db.json Anda yang ada di root folder
// '__dirname' akan berada di dalam folder /api, jadi kita perlu kembali satu level ('..')
const router = jsonServer.router(path.join(__dirname, "..", "db.json"));

// Gunakan middleware default dari json-server (untuk logging, dll.)
const middlewares = json - server.defaults();

server.use(middlewares);

// Aturan ini penting agar request seperti /api/dosen bisa diterjemahkan
// menjadi /dosen oleh json-server
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);

// Ekspor server agar bisa dijalankan oleh Vercel
module.exports = server;
