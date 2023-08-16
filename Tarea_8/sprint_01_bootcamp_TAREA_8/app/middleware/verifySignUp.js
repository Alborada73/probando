const db = require("../models/index");
const User = db.users

module.exports.verifySignUp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existedUser = await User.findByEmail(email);
    if (existedUser) {
      return res.status(400).json({ msg: "el correo ya está registrado" });
    }
    next();
  } catch (error) {
    console.error("error al verificar registro:", error);
    return res.status(500).json({ error: "error al verificar el registro" });
  }
};
