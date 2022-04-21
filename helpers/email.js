import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c0470ad9c6f1b3",
      pass: "0c5f05fb14bd65",
    },
  });

  //Informacion del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos💻" <cuentas@uptask.com',

    to: email,
    subject: "UpTask - Confirmacion de registro",
    text: "Comprueba tu cuenta en UpTask",
    html: `
    <h1>Hola: ${nombre}</h1>
    <p>Gracias por registrarte en nuestra aplicacion</p>
    <p>Tu cuenta ya esta casi lista</p>
    <p>Para confirmar tu cuenta haz click en el siguiente enlace</p>
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>

    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};
