const { Router } = require("express");
const {
  getUsuario,
  postUsuario,
  deleteUsuario,
  patchUsuario,
  putUsuario,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsuario);
router.put("/:id", putUsuario);
router.post("/", postUsuario);
router.delete("/", deleteUsuario);
router.patch("/", patchUsuario);

module.exports = router;
