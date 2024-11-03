const { response } = require("express");
const { Categoria } = require("../models");

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  try {
    // Generar la data a guardar
    const data = {
      nombre,
      usuario: req.usuarioAutenticado._id,
    };

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();
    res.status(201).json({
      msg: "Categoria creada correctamente",
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
  const params = req.query;
  const { limite = 5, desde = 0 } = params;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
  ]);

  res.status(200).json({
    ok: true,
    msg: "get API - controlador",
    total,
    categorias,
  });
};

// obtenerCategoria - populate {}
const obtenerCategoria = async (req, res = response) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );
    if (!categoria) {
      return res.status(401).json({
        msg: `No existe categoria para el id: ${id}`,
      });
    }

    res.status(200).json({
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
// actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuarioAutenticado._id;
  try {
    const categoriaUpdate = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({
      msg: "Categoria actualizada correctamente",
      categoriaUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

// borrarCategoria - estado:false

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.status(200).json({
    msg: "Usuario eliminado",
    categoria,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
