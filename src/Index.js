const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(cors());
app.use(express.json());

// Arreglo para almacenar usuarios
let users = [];

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // No autorizado

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token no válido
        req.user = user;
        next();
    });
};

// Ruta raíz
app.get("/", (req, res) => {
    res.status(200).send("Bienvenido a la API de gestión de usuarios");
});

// Endpoint para el login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario por email y verificar contraseña
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar token JWT válido por 30 segundos
    const token = jwt.sign({ email: user.email, dpi: user.dpi }, process.env.JWT_SECRET, { expiresIn: '30s' });
    res.json({ token });
});

// Endpoint para crear un nuevo usuario
app.post("/users", (req, res) => {
    const { dpi, name, email, password } = req.body;

    // Validar que el DPI no esté registrado previamente
    const userExists = users.some(user => user.dpi === dpi);
    if (userExists) {
        return res.status(400).json({ message: "El usuario con este DPI ya está registrado" });
    }

    // Agregar el nuevo usuario
    users.push({ dpi, name, email, password });
    res.status(201).json({ message: "Usuario creado correctamente" });
});

// Endpoint para listar todos los usuarios (protegido)
app.get("/users", authenticateToken, (req, res) => {
    res.status(200).json(users);
});

// Endpoint para actualizar un usuario existente (protegido)
app.put("/users/:dpi", authenticateToken, (req, res) => {
    const { dpi } = req.params;
    const { name, email, password } = req.body;

    // Validar que el usuario con el DPI proporcionado exista
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el usuario
    users[userIndex] = { ...users[userIndex], name, email, password };
    res.status(200).json({ message: "Usuario actualizado correctamente" });
});

// Endpoint para eliminar un usuario (protegido)
app.delete("/users/:dpi", authenticateToken, (req, res) => {
    const { dpi } = req.params;

    // Validar que el usuario con el DPI proporcionado exista
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    users.splice(userIndex, 1);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API está corriendo en http://localhost:${PORT}`);
});
