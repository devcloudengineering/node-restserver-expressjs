const validaJWT = require("./validar-jwt");
const validaRoles = require("./validar-roles");
const validaCampos = require("./validar-campos");
const validaArchivos = require("./validar-archivo");

module.exports = {
  ...validaJWT,
  ...validaRoles,
  ...validaCampos,
  ...validaArchivos,
};
