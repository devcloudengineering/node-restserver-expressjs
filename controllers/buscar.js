const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Producto, Categoria, Usuario } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUR
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    res.json({
      results: usuario ? [usuario] : [],
    });
  }
  const regex = new RegExp(termino, "i"); // Expresion regular para anular el caseSentive y encontrar coincidencias

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    results: usuarios, // Retorna arreglo vacio find si no encuentra, no es necesario el ternario () : []
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true });
  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const producto = await Producto.findById(termino);
    res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ estado: true }],
  }).populate("categoria", "nombre");
  res.json({
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Esta busqueda no esta implementada",
      });
  }
};

module.exports = {
  buscar,
};
