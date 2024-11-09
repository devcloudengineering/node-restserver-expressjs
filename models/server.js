const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");
const fileUpload = require("express-fileupload");
const { socketController } = require("../sockets/controller.js");

class Server {
  constructor() {
    this.app = express(); // Servidor de express
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app); // Servidor de Sockets
    this.io = require("socket.io")(this.server);
    this.path = {
      usuarios: "/api/usuarios",
      auth: "/api/auth",
      categorias: "/api/categorias",
      productos: "/api/productos",
      buscar: "/api/buscar",
      uploads: "/api/uploads",
    };

    // DB conexion
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Directorio publico
    this.app.use(express.static("public"));
    // Lectura y parseo
    this.app.use(express.json());
    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.path.auth, require("../routes/auth.js"));
    this.app.use(this.path.usuarios, require("../routes/usuarios.js"));
    this.app.use(this.path.categorias, require("../routes/categorias.js"));
    this.app.use(this.path.productos, require("../routes/productos.js"));
    this.app.use(this.path.buscar, require("../routes/buscar.js"));
    this.app.use(this.path.uploads, require("../routes/uploads.js"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor REST escuchando en el puerto", this.port);
    });
  }
}

module.exports = Server;
