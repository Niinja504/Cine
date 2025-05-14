import Employee from "../models/EmployeeModel.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const {
    nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
  } = req.body;

  try {
    // Verificar si el empleado ya existe por su correo
    const existEmployee = await Employee.findOne({ correo });
    if (existEmployee) {
      return res.status(400).json({ message: "El empleado ya existe" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(contrasenia, 10);

    // Crear nuevo empleado con datos del esquema
    const newEmployee = new Employee({
      nombre,
      correo,
      contrasenia: passwordHash,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
    });

    await newEmployee.save();

    // Generar token de autenticación
    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.error("Error al generar token:", error);
          return res.status(500).json({ message: "Error al generar token" });
        }
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // solo en https en producción
        });
        res.status(201).json({ message: "Empleado registrado correctamente" });
      }
    );
  } catch (error) {
    console.error("Error al registrar empleado:", error);
    res.status(500).json({ message: "Error al registrar empleado" });
  }
};

export default registerEmployeesController;
