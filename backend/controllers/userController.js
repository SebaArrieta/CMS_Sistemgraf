const db = require('../config/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { object, string, date } = require('yup');

/*
Input:
{   
    "Name": "usuario",
    "LastName": "usuario1",
    "Email": "mail@mail.com",
    "Password": "Pass2025",
    "Type": "Admin",
}
*/

let UserSchema = object({
    Name: string().required("Nombre es obligatorio"),
    LastName: string().required("Apellido es obligatorio"),
    Email: string().email("Email no es válido").required("Email obligatorio"),
    Password: string()
        .min(5, "La contraseña debe contener al menos 5 caracteres")
        .required("Contraseña es obligatoria")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
            "La contraseña debe tener al menos una letra mayúscula, una minúscula y un número"
        ),
    Type: string()
});

const createUser = async (req,res)=>{
    try {
        await UserSchema.validate(req.body, { abortEarly: false });

        bcrypt.hash(req.body.Password, 10).then((hash) => {
            const queryCreate = `INSERT INTO Users (Name, LastName, Email, Password, Type, State) VALUES (
                '${req.body.Name}',        
                '${req.body.LastName}',
                '${req.body.Email}',
                '${hash}',
                '${req.body.Type}',
                'Activo'
            );`;
            
            const queryEmail = `SELECT * FROM Users WHERE Email = "${req.body.Email}"`;
            
            db.query(queryEmail, async(err, result) => {
                if (err) {
                  console.error('Error:', err);
                  return res.status(500).json({ Error: 'Error en el servidor' });
                }
        
                if (result.length > 0) {
                    return res.status(500).json({ Email: 'Correo ya existe' });
                }
            });

            db.query(queryCreate, async(err, result) => {
                if (err) {
                    console.error('Error:', err);
                    return res.status(500).json({ Error: 'Error en el servidor' });
                }
                return res.status(200).json(result);
            });

        }).catch((err) => {
            console.log('Error:', err)
            res.status(500).json({error: 'Error en el servidor'});
        });
        
    } catch (err) {
        const formattedErrors = err.inner.reduce((acc, error) => {
            acc[error.path] = error.message; 
            return acc;
        }, {});

        return res.status(500).json(formattedErrors);
    }
}

const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ success: false, message: "Email y contraseña son obligatorios" });
        }

        db.query("SELECT * FROM Users WHERE Email = ?", [Email], async (err, results) => {
            try {
                if (err) throw err;

                if (results.length === 0) {
                    return res.status(404).json({ success: false, message: "Usuario no encontrado" });
                }

                const user = results[0];

                if (user.State !== "Activo") {
                    return res.status(403).json({ success: false, message: "Cuenta inactiva." });
                }

                const passwordMatch = await bcrypt.compare(Password, user.Password);
                if (!passwordMatch) {
                    return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
                }

                const token = jwt.sign(
                    { userId: user.ID, tipo: user.Type },
                    process.env.JWT_SECRET || "secret",
                    { expiresIn: "1h" }
                );

                return res.status(200).json({ token, tipo: user.Type });

            } catch (queryError) {
                console.error("Error en la consulta:", queryError);
                return res.status(500).json({ error: "Error en el servidor" });
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};


const getUser = async (req,res) => {
    console.log(req)
    const query = `SELECT * FROM Users WHERE ID = "${req.userId}"`;

    db.query(query, async (err, results) => {
        if (err) {
          console.log('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
        }

        return res.status(200).json(results)
    });
}

const getUsers = async (req,res) => {
    try {
        db.query("SELECT * FROM Users", async (err,results) => {
            if (err) return res.status(500).json({ error: "Error en la consulta" });
            return res.status(200).json(results);
        });
    } catch (error) {
        console.error("Error en getUsers:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = { createUser, login, getUser, getUsers };