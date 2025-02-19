const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/create", UserController.createUser);
/*router.post("/Login", UserController.crearUsuario);
router.get("/getUser", UserController.crearUsuario);
router.get("/getUsers", UserController.crearUsuario);
router.put("/modify", UserController.crearUsuario);
router.delete("/delete", UserController.crearUsuario);*/


module.exports = router;