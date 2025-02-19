const db = require('../config/database');
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const createUser = async (req,res)=>{
    console.log(req.body)
    return res.status(200).json(req.body);
}

module.exports = { createUser }