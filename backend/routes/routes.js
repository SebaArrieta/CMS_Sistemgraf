const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const verifyToken = require('../middleware/Auth');

// 👤 Usuarios
router.post("/create", UserController.createUser);
router.post("/Login", UserController.login);
router.get("/getUser", verifyToken, UserController.getUser);
router.get("/getUsers", UserController.getUsers);
/*router.put("/modify", UserController.crearUsuario);
router.delete("/delete", UserController.crearUsuario);*/

// 📑 Servicios


// 🗃️ Entradas a Blog


module.exports = router;