# FormularioITM 🚍

FormularioITM es una aplicación web desarrollada con **Express**, **HTML**, **CSS** y **MySQL**, diseñada para recopilar información sobre los medios de transporte que utilizan los estudiantes de la Universidad ITM para llegar a clases.

## 📌 Objetivo

Recolectar datos de movilidad estudiantil para apoyar decisiones institucionales relacionadas con transporte, infraestructura y sostenibilidad.

## 🛠 Tecnologías utilizadas

- [Express](https://expressjs.com/) – Framework para Node.js
- [MySQL](https://www.mysql.com/) – Base de datos relacional
- [dotenv](https://www.npmjs.com/package/dotenv) – Manejo de variables de entorno
- [body-parser](https://www.npmjs.com/package/body-parser) – Parseo de datos enviados desde formularios

## 📦 Instalación

1. Clona el repositorio:
   ```bash
    git clone https://github.com/Z4pata/FormularioITM.git
    cd formularioitm
   ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Crea un archivo .env en la raíz del proyecto con tus variables de entorno:
    ```bash
    cp .env.example .env
    ```

4. Ejecuta la app en modo desarrollo:
    ```bash
    npm run dev
    ```

📋 Estructura del proyecto
```Codigo
FormularioITM/
├── App.js
├── public/ 
│   └── index.html
├── .env
├── package.json
├── .gitignore
└── README.md
```

🧪 <strong>Uso</strong>

Al acceder a la aplicación, los estudiantes pueden completar un formulario indicando cómo se transportan hasta la universidad. Los datos se almacenan en una base de datos MySQL para su posterior análisis.

<h3>🧠 <strong>Autores</strong></h3>

- Juan José Peña
- Samuel Ducuara
- David Montoya
- Juan José Zapata
