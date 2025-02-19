const mysql = require('mysql2');

// Configura los parámetros de la base de datos
const connection = mysql.createConnection({
  host: 'database-sistemgraf.ch2yuc0o2s91.sa-east-1.rds.amazonaws.com', // Endpoint de tu instancia RDS
  user: 'admin',      // Nombre de usuario de la base de datos
  password: 'ImQu7fp1AQV9nF37x9Kj',  // Contraseña de la base de datos
  database: 'sistemgraf-db'   // Nombre de la base de datos
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL en RDS');
});

module.exports = connection;