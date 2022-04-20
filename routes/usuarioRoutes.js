import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, Registro y Confirmacion de Usuario

router.post("/", registrar); //Crea un nuevo usuario
router.post("/login", autenticar); //Autentica al usuario
router.get("/confirmar/:token", confirmar); //Confirmar cuenta de usuario
router.post("/olvide-password", olvidePassword); //Olvide Password
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;
