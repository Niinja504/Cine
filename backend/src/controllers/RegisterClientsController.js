import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientsModel from "../models/ClientsModel.js";
import { config } from "../config.js";

// Creamos un array de funciones
const registerClientsController = {};

// REGISTRO DEL CLIENTE
registerClientsController.register = async (req, res) => {
  const { nombre, correo, contrasenia, telefono, direccion } = req.body;

  try {
    // Verificamos si el cliente ya existe
    const existsClient = await clientsModel.findOne({ correo });
    if (existsClient) {
      return res.json({ message: "El cliente ya existe" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(contrasenia, 10);

    // Crear nuevo cliente
    const newClient = new clientsModel({
      nombre,
      correo,
      contrasenia: passwordHash,
      telefono,
      direccion,
      activo: false, // Se activa cuando verifica el correo
    });

    await newClient.save();

    // Generar código de verificación
    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Crear token con el código y correo
    const tokenCode = jsonwebtoken.sign(
      { correo, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("VerificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    // Configurar y enviar correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    const mailOptions = {
      from: config.email.email_user,
      to: correo,
      subject: "Verificación de correo",
      text: `Para verificar tu correo, utiliza el siguiente código: ${verificationCode}. Este código vence en 2 horas.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.json({ message: "Error al enviar el correo" });

      console.log("Correo enviado: " + info.response);
    });

    res.json({
      message:
        "Cliente registrado. Por favor verifica tu correo con el código enviado.",
    });
  } catch (error) {
    res.json({ message: "Error: " + error });
  }
};

// VERIFICAR CÓDIGO DE CORREO
registerClientsController.verifyCodeEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const token = req.cookies.VerificationToken;

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { correo, verificationCode: storedCode } = decoded;

    if (verificationCode !== storedCode) {
      return res.json({ message: "Código inválido" });
    }

    const client = await clientsModel.findOne({ correo });
    client.activo = true; // Activamos el cliente
    await client.save();

    res.clearCookie("VerificationToken");
    res.json({ message: "Correo verificado correctamente" });
  } catch (error) {
    res.json({ message: "Error: " + error });
  }
};

export default registerClientsController;