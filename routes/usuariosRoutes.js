import express from "express";
import { registrar, autenticar } from "../controllers/usuarioController.js";

const router = express.Router();

//Autenticacion, Registro y Confirmacion de Usuario
router.post("/", registrar); //Crea un nuevo usuario
router.post("/login", autenticar); //Autentica al usuario

export default router;
