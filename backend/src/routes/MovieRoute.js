import express from "express";
import MoviesController from "../controllers/MoviesController";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(MoviesController.getAll)
  .post(MoviesController.register);

router
  .route("/:id")
  .put(MoviesController.update)
  .delete(MoviesController.delete);

export default router;