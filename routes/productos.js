const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");
const { existeProducto } = require("../helpers/db-validators");

const router = Router();

// Obtener todas los productos - publico

router.get("/", obtenerProductos);

// Obtener un producto por id - publico
router.get(
  "/:id",
  [
    check("id", "El ID no es valido en la BD MongoDB").isMongoId(),
    check("id").custom(existeProducto),
  ],
  validarCampos,
  obtenerProducto
);

// Crear producto - privado - cualquier persona con un token valido

router.post(
  "/",
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos,
  crearProducto
);

// Actualizar - privado - cualquiera con token valido

router.put(
  "/:id",
  [
    check("id", "El ID no es valido en la BD MongoDB").isMongoId(),
    check("id").custom(existeProducto),
  ],
  validarJWT,
  validarCampos,
  actualizarProducto
);

// Borrar un producto - Admin
router.delete(
  "/:id",
  validarJWT,
  esAdminRole,
  [
    check("id", "El ID no es valido en la BD MongoDB").isMongoId(),
    check("id").custom(existeProducto),
  ],
  validarCampos,
  borrarProducto
);

module.exports = router;
