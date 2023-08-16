const express = require("express");
const middleware = require("../middleware/index");
const authMiddleware = middleware.authMiddleware;
const verifySignUpMiddleware = middleware.verifySignUpMiddleware;
const userController = require("../controllers/user.controller");

const routerUser = express.Router();

routerUser.post(
  "/api/signUp",
  verifySignUpMiddleware.verifySignUp,
  userController.createUser
);
//falta definir: crear funcion en el controlador
routerUser.post("/api/signIn", userController.loginUser);

routerUser.get(
  "/api/user/:id",
  authMiddleware.verifyToken,
  userController.findUserById
);

routerUser.get(
  "/api/user/",
  authMiddleware.verifyToken,
  userController.findAll
);
routerUser.put(
  "/api/user/:id",
  authMiddleware.verifyToken,
  userController.updateUserById
);

routerUser.delete(
  "/api/user/:id",
  authMiddleware.verifyToken,
  userController.deleteUserById
);

module.exports = routerUser;
