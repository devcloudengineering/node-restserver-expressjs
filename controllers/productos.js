const { response } = require("express");
const { Producto, Categoria } = require("../models");

const crearProducto = async (req, res = response) => {
  const { estado, precio, descripcion, disponible } = req.body;
  const { _id } = req.usuarioAutenticado;
  const nombre = req.body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(409).json({
      msg: `El producto ${productoDB.nombre}, ya existe`,
    });
  }

  // Buscar id de categoria creada por ADMIN
  const categoria = await Categoria.findOne({ usuario: _id });

  try {
    // Generar la data a guardar
    const data = {
      nombre,
      estado,
      usuario: req.usuarioAutenticado._id,
      precio,
      categoria: categoria._id,
      descripcion,
      disponible,
    };

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();
    return res.status(201).json({
      msg: "Producto creado correctamente",
      producto,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error,
    });
  }
};

// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
  const params = req.query;
  const { limite = 5, desde = 0 } = params;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("categoria", "nombre"),
  ]);

  return res.status(200).json({
    total,
    productos,
  });
};

// obtenerProducto - populate {}
const obtenerProducto = async (req, res = response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    if (!producto) {
      return res.status(401).json({
        msg: `No existe producto para el id: ${id}`,
      });
    }

    return res.status(200).json({
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
// actualizarProducto
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, categoria, nombre, ...data } = req.body;
  const { _id } = req.usuarioAutenticado;
  console.log(req.body);
  data.nombre = nombre.toUpperCase();
  data.usuario = _id;
  data.categoria = await Categoria.findOne({
    nombre: categoria,
  });
  try {
    const productoUpdate = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    res.status(200).json({
      msg: "Producto actualizado correctamente",
      productoUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

// borrarProducto - estado:false

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  return res.status(200).json({
    msg: "Usuario eliminado",
    producto,
  });
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
