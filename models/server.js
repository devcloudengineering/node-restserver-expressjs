const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = "/api/usuarios";

    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion

    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Directorio publico
    this.app.use(express.static("public"));
    // Lectura y parseo
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor REST escuchando en el puerto", this.port);
    });
  }
}

module.exports = Server;
