const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });


module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (authHeader) {
    // Obtener el Token
    const token = authHeader.split(' ')[1];

    // Comprobar el JWT
    try {
      const usuario = jwt.verify(token, process.env.SECRETA);
      req.usuario = usuario;

    } catch (error) {
      console.log('JWT No válido');
      console.log(error);
    }
  }

  return next();
}