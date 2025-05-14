import MovieModel from "../models/MoviesModel.js";
import { config } from "../config.js";

const MoviesController = {};

// CREATE - Registrar una nueva película
MoviesController.register = async (req, res) => {
  const {
    titulo,
    descripcion,
    director,
    genero,
    anio,
    duracion,
    imagen,
    isVerified,
  } = req.body;

  try {
    if (!titulo || !director || !duracion) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const newMovie = new MovieModel({
      titulo,
      descripcion,
      director,
      genero,
      anio,
      duracion,
      imagen,
      isVerified: isVerified || false,
    });

    await newMovie.save();

    res.status(201).json({
      message: "Película registrada con éxito",
      movie: newMovie,
    });
  } catch (error) {
    console.error("Error al registrar película:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// READ - Obtener todas las películas
MoviesController.getAll = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.json(movies);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// UPDATE - Actualizar una película existente
MoviesController.update = async (req, res) => {
  const { titulo, descripcion, director, genero, anio, duracion, imagen, isVerified } = req.body;

  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion,
        imagen,
        isVerified,
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json({
      message: "Película actualizada con éxito",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error("Error al actualizar película:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// DELETE - Eliminar una película
MoviesController.delete = async (req, res) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json({ message: "Película eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar película:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default MoviesController;