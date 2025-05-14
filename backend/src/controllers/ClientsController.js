const clienteController = {};
import ClienteModel from "../models/cliente.js";

// SELECT
clienteController.getClientes = async (req, res) => {
  try {
    const clientes = await ClienteModel.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error });
  }
};

// INSERT 
clienteController.createCliente = async (req, res) => {
  try {
    const { nombre, correo, contrasenia, telefono, direccion, activo } = req.body;
    const nuevoCliente = new ClienteModel({
      nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      activo,
    });

    await nuevoCliente.save();
    res.json({ message: "Cliente guardado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar el cliente", error });
  }
};

// DELETE
clienteController.deleteCliente = async (req, res) => {
  try {
    const clienteEliminado = await ClienteModel.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};

// UPDATE
clienteController.updateCliente = async (req, res) => {
  try {
    const { nombre, correo, contrasenia, telefono, direccion, activo } = req.body;
    const clienteActualizado = await ClienteModel.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        activo,
      },
      { new: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el cliente", error });
  }
};

export default clienteController;
