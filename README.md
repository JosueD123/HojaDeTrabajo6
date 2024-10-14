# API de Gestión de Usuarios

## Descripción
Esta API permite gestionar usuarios (crear, listar, actualizar y eliminar). Utiliza Node.js y Express para manejar las solicitudes.

### Endpoints

- **POST /users**: Crear un nuevo usuario.
  - **Parámetros en el cuerpo**: 
    - `dpi` (string, requerido)
    - `name` (string, requerido)
    - `email` (string, requerido)
    - `password` (string, requerido)
  - **Ejemplo de solicitud**:
    ```json
    {
        "dpi": "123456789",
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "password": "12345"
    }
    ```
  - **Respuesta**: Retorna el usuario creado o un error si el DPI ya está registrado.

- **GET /users**: Listar todos los usuarios registrados.
  - **Respuesta**: Retorna todos los usuarios en el sistema.

- **PUT /users/:dpi**: Actualizar un usuario existente.
  - **Parámetros en la URL**:
    - `dpi` (string, requerido)
  - **Parámetros en el cuerpo**: 
    - `name`, `email`, `password`, `newDpi` (opcionales)
  - **Respuesta**: Retorna el usuario actualizado o un error si el usuario no existe o el nuevo DPI ya está registrado.

- **DELETE /users/:dpi**: Eliminar un usuario.
  - **Parámetros en la URL**:
    - `dpi` (string, requerido)
  - **Respuesta**: Retorna `204 No Content` si el usuario fue eliminado, o un error si el usuario no existe.


## Instrucciones para ejecutar la API localmente

1. Clona el repositorio:
   ```bash
    https://github.com/JosueD123/HojaDeTrabajo6.git

2.  URL que proporciona RENDER para correrlo localmente 

https://api-usuarios-usuarios.onrender.com

## SIGUIENTE PARTE DERIVADO DE LA HOJA DE TRABAJO 6 A LA HOJA DE TRABAJO 7

## Endpoints

- **POST /login**: Iniciar sesión para obtener un token JWT.
  - **Parámetros en el cuerpo**: 
    - `email` (string, requerido)
    - `password` (string, requerido)
  - **Ejemplo de solicitud**:
    ```json
    {
        "email": "juan@example.com",
        "password": "12345"
    }
    ```
  - **Respuesta**: Retorna un token JWT válido por 30 segundos si las credenciales son correctas.

- **GET /users**: Listar todos los usuarios registrados (protegido).
- **PUT /users/:dpi**: Actualizar un usuario existente (protegido).
- **DELETE /users/:dpi**: Eliminar un usuario (protegido).

 URL que proporciona RENDER para correrlo localmente de la Hoja de Trabajo 7

 https://hojadetrabajo6-np1t.onrender.com

 ## SIGUIENTE PARTE DERIVADO DE LA HOJA DE TRABAJO 7 A LA HOJA DE TRABAJO 8

 ## Cambios Realizados para la Refactorización a TypeScript

 **Refactorización a TypeScript:** El código JavaScript original ha sido convertido a TypeScript, lo que introduce la adición de tipos explícitos para funciones y estructuras de datos. Esto mejora la detección de errores durante la compilación y facilita el desarrollo y mantenimiento.

**Interfaz de Usuario Definida:** Se han definido interfaces para representar los datos de los usuarios, haciendo el código más claro y seguro.

**Autenticación Mejorada:** Se implementó autenticación utilizando JWT (JSON Web Tokens) y bcryptjs para el hash de contraseñas, asegurando que solo usuarios autenticados puedan acceder a rutas protegidas.

**Middleware de Autenticación:** Se desarrolló un middleware para verificar los tokens de autenticación, asegurando que las rutas sensibles sean accesibles solo para usuarios autenticados.

## Instrucciones para Ejecutar la API Localmente

Clona el repositorio:

git clone https://github.com/JosueD123/HojaDeTrabajo6.git

Instala las dependencias:

npm install

Crea un archivo .env con las variables de entorno necesarias:

PORT=3000
JWT_SECRET=josh_andre_lopez_diaz_123456

Compila el código TypeScript:

npm run build

Inicia la API:

npm start

## Endpoints

## Autenticación

POST /login: Iniciar sesión para obtener un token JWT.
Parámetros en el cuerpo:
email (string, requerido)
password (string, requerido)
Ejemplo de solicitud:

{
    "email": "juan@example.com",
    "password": "12345"
}

Respuesta: Retorna un token JWT válido por 30 segundos si las credenciales son correctas.
Gestión de Usuarios
POST /users: Crear un nuevo usuario.

Parámetros en el cuerpo:
dpi (string, requerido)
name (string, requerido)
email (string, requerido)
password (string, requerido)

Ejemplo de solicitud:

{
    "dpi": "123456789",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "12345"
}

Respuesta: Retorna el usuario creado o un error si el DPI ya está registrado.
GET /users: Listar todos los usuarios registrados (protegido).

Respuesta: Retorna todos los usuarios en el sistema.
PUT /users/
: Actualizar un usuario existente (protegido).

Parámetros en la URL:
dpi (string, requerido)
Parámetros en el cuerpo:
name, email, password, newDpi (opcionales)
Respuesta: Retorna el usuario actualizado o un error si el usuario no existe o el nuevo DPI ya está registrado.
DELETE /users/
: Eliminar un usuario (protegido).

Parámetros en la URL:
dpi (string, requerido)
Respuesta: Retorna 204 No Content si el usuario fue eliminado, o un error si el usuario no existe.

## Ejecución Local de la API Desplegada en Render

URL de la API desplegada en Render (Hoja de Trabajo 7): https://hojadetrabajo8-o60b.onrender.com