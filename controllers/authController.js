const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.autenticarUsuario = async (req, res, next) => {

  //TODO Revisar si hay errores

  // Buscar el password para ver si esta resistrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    res.status(401).json({ msg: 'El usuario no existe' });
    return next();
  }

  //TODO Verificar el password u autenticar el usuario
  if (bcrypt.compareSync(password, usuario.password)) {

    // Crear JWT


  } else {
    res.status(401).json({ msg: 'Password Incorrecto' });
    return next();
  }

}


exports.usuarioAutenticado = async (req, res) => {

}