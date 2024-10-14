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

  ## Cambios Realizados
- **Refactorización a TypeScript:** Se ha convertido el código JavaScript a TypeScript, lo que incluye la adición de tipos explícitos para las funciones y las estructuras de datos, mejorando así la detección de errores en tiempo de compilación.
- **Autenticación Mejorada:** Implementación de un sistema de autenticación utilizando JWT (JSON Web Tokens) y bcrypt para el hash de contraseñas.
- **Interfaz de Usuario Definida:** Se han creado interfaces para definir los tipos de datos de los usuarios, lo que hace que el código sea más fácil de entender y mantener.
- **Middleware de Autenticación:** Se ha creado un middleware para verificar los tokens de autenticación en las rutas protegidas.


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