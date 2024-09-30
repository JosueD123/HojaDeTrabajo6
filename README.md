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

