const { Categoria, Usuario, Producto } = require("../models/index.js");
const Role = require("../models/role");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

// Verificar si el correo existe
const existeEmail = async (correo = "") => {
  const email = await Usuario.findOne({ correo });
  if (email) {
    throw new Error(`El correo ${correo} ya esta registrado en la bbdd`);
  }
};

// Verificar si el id existe en modelo Usuario
const existeID = async (id = "") => {
  const existeId = await Usuario.findById(id);
  if (!existeId) {
    throw new Error(`El id ${id} no esta registrado en la bbdd`);
  }
};

// verificar si el id existe en modelo Categorias
const existeCategoria = async (id = "") => {
  const existeCategoriaID = await Categoria.findById(id);
  if (!existeCategoriaID) {
    throw new Error(`El id ${id} no esta registrado en la bbdd`);
  }
};

const existeProducto = async (id = "") => {
  const existeProductoID = await Producto.findById(id);
  if (!existeProductoID) {
    throw new Error(`El id ${id} no esta registrado en la bbdd`);
  }
};

module.exports = {
  esRolValido,
  existeEmail,
  existeID,
  existeCategoria,
  existeProducto,
};
