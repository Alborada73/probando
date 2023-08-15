//Aquí van los importadores//
const express = require("express");
const db = require("./app/models");
const userRouter = require("./app/routes/user.routes");

//definir funciones y constantes que son variables que nunca cambian//
const app = express();
const port = 3000;
app.use(express.json());
app.use(userRouter);
db.sequelize
  .sync({
    force: false,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor Express funcionando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("error al conectar a la base de datos:", error);
  });
