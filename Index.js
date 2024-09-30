const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Arreglo para almacenar usuarios
let users = [];

// Ruta raíz
app.get("/", (req, res) => {
    res.status(200).send("Bienvenido a la API de gestión de usuarios");
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

// Endpoint para listar todos los usuarios
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// Endpoint para actualizar un usuario existente
app.put("/users/:dpi", (req, res) => {
    const { dpi } = req.params;
    const { name, email, password } = req.body;

    // Validar que el usuario con el DPI proporcionado exista
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validar que el nuevo DPI no esté registrado en otro usuario
    if (req.body.dpi && req.body.dpi !== dpi) {
        const dpiExists = users.some(user => user.dpi === req.body.dpi);
        if (dpiExists) {
            return res.status(400).json({ message: "El DPI ya está registrado en otro usuario" });
        }
    }

    // Actualizar el usuario
    users[userIndex] = { ...users[userIndex], name, email, password };
    res.status(200).json({ message: "Usuario actualizado correctamente" });
});

// Endpoint para eliminar un usuario
app.delete("/users/:dpi", (req, res) => {
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
app.listen(3000, () => {
    console.log('API está corriendo en http://localhost:3000');
});
