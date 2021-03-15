const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {

  // Mostrar mensajes de error de express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }

  // Crear un objeto de Enlace
  const { nombre_original } = req.body;

  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;


  // Si el usuario está autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;

    // Asignar a enlace el número de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }

    // Asignar un password + hasheo
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    // Asignar el Autor
    enlace.autor = req.usuario.id
  }

  // Almacenar en la base de datos
  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();

  } catch (error) {
    console.log(error);
  }

}