const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La trontraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

// Mongoose le va añadir el prefijo "s" al nombre de la coleccion, en este caso si se le pone Usuario, mongoose le pondra como nombre a la coleccion "Usuarios"

module.exports = model("Usuario", UsuarioSchema);
