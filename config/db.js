import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connection.connection.host}/${connection.connection.port}`;
    console.log(`Conectado a la base de datos: ${url}`);
  } catch (error) {
    console.log("(╯°□°）╯︵ ┻━┻ |> ERROR:", error.message);
    process.exit(1);
  }
};

export default conectarDB;
