var app = require('../app');
var debug = require('debug')('node-rest:server');
const http = require("http");

const port = process.env.APP_PORT || "3000";
const host = process.env.APP_HOST || "localhost";

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

app.set("port", port);
app.set("host", host);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
