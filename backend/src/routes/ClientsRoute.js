import express from "express";
import ClientsController from "../controllers/ClientsController";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(ClientsController.getcustomers)
  .post(ClientsController.createcustomers);

router
  .route("/:id")
  .put(ClientsController.updatecustomers)
  .delete(ClientsController.deletecustomers);

export default router;