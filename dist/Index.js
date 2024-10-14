"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let users = [];
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // No autorizado  
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token no válido  
        }
        req.user = user;
        next();
    });
};
app.get("/", (req, res) => {
    return res.status(200).send("Bienvenido a la API de gestión de usuarios");
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email, dpi: user.dpi }, process.env.JWT_SECRET, { expiresIn: '30s' });
    return res.json({ token });
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dpi, name, email, password } = req.body;
    if (!dpi || !name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const userExists = users.some(user => user.dpi === dpi);
    if (userExists) {
        return res.status(400).json({ message: "El usuario con este DPI ya está registrado" });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    users.push({ dpi, name, email, password: hashedPassword });
    return res.status(201).json({ message: "Usuario creado correctamente" });
}));
app.get("/users", authenticateToken, (req, res) => {
    return res.status(200).json(users.map((_a) => {
        var { password } = _a, user = __rest(_a, ["password"]);
        return user;
    }));
});
app.put("/users/:dpi", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dpi } = req.params;
    const { name, email, password } = req.body;
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    users[userIndex] = Object.assign(Object.assign(Object.assign(Object.assign({}, users[userIndex]), (name !== undefined && { name })), (email !== undefined && { email })), (password !== undefined && { password: yield bcryptjs_1.default.hash(password, 10) }));
    return res.status(200).json({ message: "Usuario actualizado correctamente" });
}));
app.delete("/users/:dpi", authenticateToken, (req, res) => {
    const { dpi } = req.params;
    users = users.filter(user => user.dpi !== dpi);
    return res.status(204).send(); // No content  
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
