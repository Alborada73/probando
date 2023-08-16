const express = require("express");
const middleware = require("../middleware/index");
const authMiddleware = middleware.authMiddleware;
const verifySignUpMiddleware = middleware.verifySignUpMiddleware;
const bootcampController = require("../controllers/bootcamp.controller");

const routerBootcamp = express.Router();

routerBootcamp.post(
  "/api/bootcamp",
  authMiddleware.verifyToken,
 bootcampController.createBootcamp
);
routerBootcamp.post(
  "/api/bootcamp/addUser",
  authMiddleware.verifyToken,
 bootcampController.addUser
);
routerBootcamp.get(
  "/api/bootcamp/:id",
  authMiddleware.verifyToken,
 bootcampController.findById
);
routerBootcamp.get(
  "/api/bootcamp",
  authMiddleware.verifyToken,
 bootcampController.findAll
);






module.exports = routerUser;
