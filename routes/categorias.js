const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico

router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "El ID no es valido en la BD MongoDB").isMongoId(),
    check("id").custom(existeCategoria),
  ],
  validarCampos,
  obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un token valido

router.post(
  "/",
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos,
  crearCategoria
);

// Actualizar - privado - cualquiera con token valido

router.put(
  "/:id",
  [
    check("id", "El ID no es valido en la BD MongoDB").isMongoId(),
    check("id").custom(existeCategoria),
  ],
  validarJWT,
  validarCampos,
  actualizarCategoria
);

// Borrar una categoria - Admin
router.delete(
  "/:id",
  validarJWT,
  esAdminRole,
  [
    check("id", "El ID no es valido en la BD MongoDB").isMongoId(),
    check("id").custom(existeCategoria),
  ],
  validarCampos,
  borrarCategoria
);

module.exports = router;
