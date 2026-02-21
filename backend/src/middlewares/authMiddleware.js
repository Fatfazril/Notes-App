const jwt = require("jsonwebtoken");
const User = require("../models/Users");

module.exports = async (req, res, next) => {
  try {
    //minta data dari header
    const authHeader = req.headers.authorization;

    //cek apakah ada token dan formatnya
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized",
      });
    }

    //ambil token kemudian dipisahkan dari "Bearer" lewat array index 1
    const token = authHeader.split(" ")[1];

    //verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //cari user berdasarkan id
    const user = await User.findById(decoded.id).select("-password");

    //cek apakah user ada
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    //simpan user ke request
    req.user = user;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Token expired",
      });
    }

    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};