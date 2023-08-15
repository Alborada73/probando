const { users, bootcamps } = require("../models");
const db = require("../models");
const Bootcamp = db.bootcamps;
const User = db.users;

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = async (req, res) => {
  const { title, cue, description } = req.body;
  try {
    const createdBootcamp = await Bootcamp.create({
      title: bootcamp.title,
      cue: bootcamp.cue,
      description: bootcamp.description,
    });
    return res.json(createdBootcamp);
  } catch (error) {
    console.error("error al crear el bootcamp:", error);
    return res.status(500).json({ error: "error al crear el bootcamp" });
  }
};

// Agregar un Usuario al Bootcamp
exports.addUser = async (req, res) => {
  const { bootcampId, userId } = req.body;
  try {
    const bootcamp = Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      return res.status(404).json({ msg: "No se encontró el Bootcamp!" });
    }
    const user = User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ msg: "No se encontró el usuario!" });
    }
    await bootcamp.addUser(user);
    return res.json({ msg: "usuario agregado con éxito" });
  } catch (error) {
    console.error("error al agregar el usuario:", error);
    return res.status(500).json({ error: "error al crear el bootcamp" });
  }
};

// obtener los bootcamp por id
exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    const bootcamp = await Bootcamp.findByPk(id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "firstName", "lastName"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!bootcamp) {
      return res.status(404).json({ msg: "bootcamp no encontrado" });
    }
    res.json(bootcamp);
  } catch (error) {
    console.error("error al buscar el bootcamp:", error);
    res.status(500).json({ error: "error al buscar el bootcamp" });
  }
};
// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "firstName", "lastName"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.json(bootcamps);
  } catch (error) {
    console.error("error al buscar los bootcamps:", error);
    res.status(500).json({ error: "error al buscar los bootcamps" });
  }
};
