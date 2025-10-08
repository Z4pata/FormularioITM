// Importar módulos necesarios
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// Crear una instancia de la aplicación Express
const app = express();
const port = 3000;

// Registro de middlewares para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'bel5avamvsyg1jzc1bef-mysql.services.clever-cloud.com', // Host de MySQL
    user: 'uvhk82ypr3uvh3rq',      // Usuario de MySQL
    password: 'rCHW62U2OEvm0dCeqZwV',      // Contraseña de MySQL
    database: 'bel5avamvsyg1jzc1bef' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    // Crear tabla para guardar envíos si no existe
    const createTable = `
        CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        main_type VARCHAR(50) NOT NULL,
        options JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    db.query(createTable, (err) => {
        if (err) throw new Error('Error creando tabla submissions: ' + err);
    });
    console.log('Conexión exitosa a la base de datos.');
});

// Ruta para manejar el envío del formulario
app.post('/submit', (request, response) => {
    const { mainType, options } = request.body;

    // Validar datos
    if (!mainType || options.length === 0) {
        return response.status(400).send('Todos los campos son obligatorios.');
    }

    // Insertar datos en la base de datos
    const query = 'INSERT INTO submissions (main_type, options) VALUES (?, ?)';
    db.query(query, [mainType, JSON.stringify(options)], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return response.status(500).send('Error al guardar los datos.');
        }
        response.send('ID del nuevo registro: ' + result.insertId);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});