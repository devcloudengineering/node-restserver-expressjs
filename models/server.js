const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
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

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor REST escuchando en el puerto", this.port);
    });
  }
}

module.exports = Server;
