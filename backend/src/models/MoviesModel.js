/*
    Campos:
        titulo
        descripcion
        director
        genero
        anio
        duracion
        imagen
*/

import { Schema, model } from "mongoose";

const moviesSchema = new Schema(
  {
    titulo: {
      type: String,
      require: true,
    },

    descripcion: {
      type: String,
    },

    director: {
      type: Date,
      require: true,
    },

    genero: {
      type: String,
    },

    anio: {
      type: String,
    },

    duracion: {
      type: String,
      require: true,
    },

    isVerified: {
      type: Boolean,
    },
  }
);

export default model("movies", moviesSchema);
