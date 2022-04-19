import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(`(╯°□°）╯︵ ┻━┻ |>ERROR: ${error}`);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("Usuario no existe");
    return res.status(404).json({
      msg: error.message,
    });
  }

  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({
      msg: error.message,
    });
  }

  //Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es Incorrecto");
    return res.status(403).json({
      msg: error.message,
    });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const confirmarUsuario = await Usuario.findOne({ token });
  if (!confirmarUsuario) {
    const error = new Error("Token no valido");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    confirmarUsuario.confirmado = true;
    confirmarUsuario.token = "";
    await confirmarUsuario.save();
    res.json({
      msg: "Usuario Confirmado Correctamente",
    });
  } catch (error) {
    console.log(`(╯°□°）╯︵ ┻━┻ |>ERROR: ${error}`);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({
      msg: error.message,
    });
  }
  try {
    usuario.token = generarId();
    await usuario.save();
    res.json({
      msg: "Se ha enviado un correo para restablecer tu contraseña",
    });
  } catch (error) {
    console.log(`(╯°□°）╯︵ ┻━┻ |>ERROR: ${error}`);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res.json({
      msg: "Token valido y el Usuario existe",
    });
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({
      msg: error.message,
    });
  }
};

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken };
