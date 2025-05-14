// controllers/employeeController.js

import employeeModel from "../models/employee.js";

const employeeController = {};

// SELECT - Obtener todos los empleados
employeeController.getemployee = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los empleados", error: err });
  }
};

// INSERT - Crear nuevo empleado
employeeController.createemployee = async (req, res) => {
  try {
    const {
      nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
      activo,
    } = req.body;

    const newEmployee = new employeeModel({
      nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
      activo,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Empleado guardado correctamente" });
  } catch (err) {
    res.status(400).json({ message: "Error al guardar el empleado", error: err });
  }
};

// DELETE - Eliminar empleado por ID
employeeController.deleteemployee = async (req, res) => {
  try {
    const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ message: "Empleado eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el empleado", error: err });
  }
};

// UPDATE - Actualizar empleado por ID
employeeController.updateemployee = async (req, res) => {
  try {
    const {
      nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
      activo,
    } = req.body;

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        activo,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado actualizado correctamente" });
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar el empleado", error: err });
  }
};

export default employeeController;
