import express from "express";
import { registrar } from "../controllers/usuarioController.js";

const router = express.Router();

//Autenticacion, Registro y Confirmacion de Usuario
router.post("/", registrar); //Crea un nuevo usuario

export default router;
