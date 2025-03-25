// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import configureImageRoutes from './configimg.js';

// Configurar __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar aplicación Express
const app = express();

// Configurar middleware para JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar rutas para manejo de imágenes
configureImageRoutes(app);

// Ruta principal que sirve el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configurar puerto y arrancar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Imágenes disponibles en http://localhost:${PORT}/assets/img/`);
});