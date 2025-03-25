// Configimg.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener la ruta actual del directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir la ruta donde se guardarán las imágenes
const imgPath = path.join(__dirname, 'public', 'assets', 'img');

// Asegurar que el directorio de imágenes exista
if (!fs.existsSync(imgPath)) {
    fs.mkdirSync(imgPath, { recursive: true });
}

// Configuración de Multer para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imgPath); // Guardar en la carpeta img dentro de assets
    },
    filename: function(req, file, cb) {
        // Crear nombre de archivo único usando timestamp + nombre original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, 'producto-' + uniqueSuffix + extension);
    }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    // Aceptar solo archivos de tipo imagen
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('El archivo debe ser una imagen válida.'), false);
    }
};

// Crear middleware de multer con la configuración
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limitar a 5MB
    }
});

// Función para configurar rutas de manejo de imágenes en Express
const configureImageRoutes = (app) => {
    // Ruta para subir imágenes
    app.post('/api/upload-image', upload.single('imagen'), (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
            }
            
            // Construir la URL relativa para acceder a la imagen
            const imageUrl = `/assets/img/${req.file.filename}`;
            
            // Devolver la URL de la imagen para su uso en el frontend
            return res.status(200).json({ 
                success: true,
                message: 'Imagen subida correctamente',
                imageUrl: imageUrl
            });
        } catch (error) {
            console.error('Error al subir imagen:', error);
            return res.status(500).json({ 
                error: 'Error al procesar la imagen',
                details: error.message
            });
        }
    });

    // Ruta para eliminar imágenes (opcional, por si necesitas esta funcionalidad)
    app.delete('/api/delete-image/:filename', (req, res) => {
        try {
            const filename = req.params.filename;
            const filePath = path.join(imgPath, filename);
            
            // Verificar que el archivo existe
            if (fs.existsSync(filePath)) {
                // Eliminar el archivo
                fs.unlinkSync(filePath);
                return res.status(200).json({ 
                    success: true,
                    message: 'Imagen eliminada correctamente' 
                });
            } else {
                return res.status(404).json({ 
                    error: 'La imagen no existe' 
                });
            }
        } catch (error) {
            console.error('Error al eliminar imagen:', error);
            return res.status(500).json({ 
                error: 'Error al eliminar la imagen',
                details: error.message
            });
        }
    });
};

export default configureImageRoutes;