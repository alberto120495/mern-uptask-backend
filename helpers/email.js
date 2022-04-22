import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos💻" <cuentas@uptask.com',

    to: email,
    subject: "UpTask - Restablecer contraseña",
    text: "Restablece tu contraseña",
    html: `
    <h1>Hola: ${nombre}</h1>
    <p>Has solicitado restablecer tu contraseña</p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña</p>
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Cambiar contraseña</a>

    <p>Si tu no solicitaste esta email, puedes ignorar el mensaje</p>
    `,
  });
};
