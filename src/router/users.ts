import express from "express";
import { getAllUsers, deleteUser } from "../controllers/users";
import { isAuthenticated } from "../middlewares";

const router = express.Router();

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.delete("/users/:id", deleteUser);

  return router;
};
