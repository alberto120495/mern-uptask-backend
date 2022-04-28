import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//Configuracion de CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      //No puede consultar la API
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Socket.io
import { Server } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 6000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log("CONECTADO a socket.io");

  //Definir los eventos de socket io

  socket.on("prueba", (nombre) => {
    console.log("prueba desde socket", nombre);
  });
});
