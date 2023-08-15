const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/auth")

// Crear y Guardar Usuarios
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    return res.json(createdUser);
  } catch (error) {
    console.error("error al crear el usuario:", error);
    return res.status(500).json({ error: "error al crear el usuario" });
  }
};

// obtener los bootcamp de un usuario
exports.findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Bootcamp,
          as: "bootcamps",
          attributes: ["id", "title"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ msg: "usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("error al buscar el usuario:", error);
    res.status(500).json({ error: "error al buscar el usuario" });
  }
};

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Bootcamp,
          as: "bootcamps",
          attributes: ["id", "title"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.json(users);
  } catch (error) {
    console.error("error al buscar los usuarios:", error);
    res.status(500).json({ error: "error al buscar los usuarios" });
  }
};

// Actualizar usuarios
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  try {
    const [rowsUpdated] = await User.update(
      {
        firstName: firstName,

        lastName: lastName,
      },

      {
        where: {
          id: id,
        },
      }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json({ msg: "usuario editado" });
  } catch (error) {
    console.error("error al editar el usuario:", error);
    res.status(500).json({ error: "error al editar el usuario" });
  }
};

// Actualizar usuarios
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json({ msg: "usuario eliminado" });
  } catch (error) {
    console.error("error al eliminar el usuario:", error);
    res.status(500).json({ error: "error al eliminar el usuario" });
  }
};

//se debe crear un Token para poder iniciar sesión//
//El generador de token está en auth.js//

exports.loginUser = async(req, res)=>{
  const{email, password}= req.body
  try {
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "datos erroneos" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: "datos erroneos" });
    }
    const accessToken = authMiddleware.generateToken(user.id)
    const objUser = {
      id: user.id, 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: accessToken,
    }
      return res.status(200).json({user: objUser});
  } catch (error) {
    console.error("error al iniciar sesión:", error);
    res.status(500).json({ error: "error al iniciar sesión" });
  }
}