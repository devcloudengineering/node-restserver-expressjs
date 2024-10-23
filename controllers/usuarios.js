const { response, request } = require("express");

const getUsuario = (req = request, res = response) => {
  // parametros de query
  // http://localhost:3000/api/usuarios?q='Hola'&edad=27
  // parseo de query (parametros opcionales en get)
  //   {
  //     "ok": true,
  //     "msg": "get API - controlador",
  //     "params": {
  //         "q": "'Hola'",
  //         "edad": "27"
  //     }
  // }
  const params = req.query;
  res.status(403).json({
    ok: true,
    msg: "get API - controlador",
    params,
  });
};

const postUsuario = (req, res = response) => {
  //   const body = req.body;
  const { nombre, edad } = req.body;
  res.status(403).json({
    ok: true,
    msg: "post API - controlador",
    nombre,
    edad,
  });
};

const putUsuario = (req, res = response) => {
  // parametros de segmento
  //   http://localhost:3000/api/usuarios/27
  // {
  //     "ok": true,
  //     "msg": "put API - controlador",
  //     "id": "27"
  // }
  const id = req.params.id;
  res.status(403).json({
    ok: true,
    msg: "put API - controlador",
    id,
  });
};

const patchUsuario = (req, res = response) => {
  res.status(403).json({
    ok: true,
    msg: "patch API - controlador",
  });
};

const deleteUsuario = (req, res = response) => {
  res.status(403).json({
    ok: true,
    msg: "delete API - controlador",
  });
};

module.exports = {
  getUsuario,
  deleteUsuario,
  patchUsuario,
  postUsuario,
  putUsuario,
};
