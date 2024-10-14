import express, { Request, Response, NextFunction } from 'express';  
import cors from 'cors';  
import jwt from 'jsonwebtoken';  
import dotenv from 'dotenv';  
import bcrypt from 'bcryptjs';  

dotenv.config();  

const app = express();  
app.use(cors());  
app.use(express.json());  

interface User {  
    dpi: string;  
    name: string;  
    email: string;  
    password: string;  
}  

interface CustomRequest extends Request {  
    user?: { email: string; dpi: string }; // Define el tipo para user  
}  

let users: User[] = [];  

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {  
    const authHeader = req.headers['authorization'];  
    const token = authHeader && authHeader.split(' ')[1];  

    if (!token) {  
        return res.sendStatus(401); // No autorizado  
    }  

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {  
        if (err) {  
            return res.sendStatus(403); // Token no válido  
        }  
        req.user = user as { email: string; dpi: string };  
        next();  
    });  
};  

app.get("/", (req: Request, res: Response) => {  
    return res.status(200).send("Bienvenido a la API de gestión de usuarios");  
});  

app.post("/login", async (req: Request, res: Response) => {  
    const { email, password } = req.body;  

    const user = users.find(u => u.email === email);  
    if (!user || !(await bcrypt.compare(password, user.password))) {  
        return res.status(401).json({ message: "Credenciales incorrectas" });  
    }  

    const token = jwt.sign({ email: user.email, dpi: user.dpi }, process.env.JWT_SECRET as string, { expiresIn: '30s' });  
    return res.json({ token });  
});  

app.post("/users", async (req: Request, res: Response) => {  
    const { dpi, name, email, password } = req.body as User;  

    if (!dpi || !name || !email || !password) {  
        return res.status(400).json({ message: "Todos los campos son requeridos" });  
    }  

    const userExists = users.some(user => user.dpi === dpi);  
    if (userExists) {  
        return res.status(400).json({ message: "El usuario con este DPI ya está registrado" });  
    }  

    const hashedPassword = await bcrypt.hash(password, 10);  
    users.push({ dpi, name, email, password: hashedPassword });  
    return res.status(201).json({ message: "Usuario creado correctamente" });  
});  

app.get("/users", authenticateToken, (req: CustomRequest, res: Response) => {  
    return res.status(200).json(users.map(({ password, ...user }) => user));  
});  

app.put("/users/:dpi", authenticateToken, async (req: CustomRequest, res: Response) => {  
    const { dpi } = req.params;  
    const { name, email, password } = req.body as Partial<User>;  

    const userIndex = users.findIndex(user => user.dpi === dpi);  
    if (userIndex === -1) {  
        return res.status(404).json({ message: "Usuario no encontrado" });  
    }  

    users[userIndex] = {  
        ...users[userIndex],  
        ...(name !== undefined && { name }),  
        ...(email !== undefined && { email }),  
        ...(password !== undefined && { password: await bcrypt.hash(password, 10) }),  
    };  

    return res.status(200).json({ message: "Usuario actualizado correctamente" });  
});  

app.delete("/users/:dpi", authenticateToken, (req: CustomRequest, res: Response) => {  
    const { dpi } = req.params;  
    users = users.filter(user => user.dpi !== dpi);  
    return res.status(204).send(); // No content  
});  

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {  
    console.error(err.stack);  
    res.status(500).send('Algo salió mal!');  
});  

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
    console.log(`Servidor corriendo en el puerto ${PORT}`);  
});  
