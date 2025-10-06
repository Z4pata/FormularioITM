// Importar módulos necesarios
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configurar body-parser para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'bel5avamvsyg1jzc1bef-mysql.services.clever-cloud.com', // Cambia según tu configuración
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

    console.log('Conexión exitosa a la base de datos.');
});

// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Validar datos
    if (!name || !email) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Insertar datos en la base de datos
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).send('Error al guardar los datos.');
        }
        res.send('Datos guardados exitosamente.');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});