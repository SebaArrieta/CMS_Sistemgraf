const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), async ()=>{
    console.log(`Servidor en el puerto ${app.get("port")}`)
})