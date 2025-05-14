/*
    Colección: Cliente

    Campos:
        nombre
        correo
        contrasenia
        telefono
        direccion
        activo
*/

import { Schema, model } from "mongoose";

const clienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      //Funcion para validar que contenga el @
      validate: {
        validator: function (v) {
          return /.+@.+\..+/.test(v); 
        },
        message: props => `${props.value} no es un correo electrónico válido.`,
      },
    },
    contrasenia: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
    },
    direccion: {
      type: String,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("clients", clienteSchema);
