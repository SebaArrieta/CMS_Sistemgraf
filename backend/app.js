const express = require("express");

const app = express();

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), async ()=>{
    console.log(`Servidor en el puerto ${app.get("port")}`)
})