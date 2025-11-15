# WFL Backend

## Error Codes Documentation

### ERR_001: Internal Server Error
- **Description**: Error interno del servidor al crear el jugador
- **Details**: Ocurrió un error inesperado durante la creación del jugador
- **HTTP Status**: 500 Internal Server Error

### ERR_002: Validation Error
- **Description**: Error de validación en los datos enviados
- **Details**: Los datos proporcionados no cumplen con los requisitos de validación
- **HTTP Status**: 400 Bad Request

### ERR_003: Database Connection Error
- **Description**: Error de conexión a la base de datos
- **Details**: No se pudo establecer conexión con la base de datos
- **HTTP Status**: 500 Internal Server Error

### ERR_004: File Upload Error
- **Description**: Error al subir archivo
- **Details**: Ocurrió un error durante la subida del archivo
- **HTTP Status**: 500 Internal Server Error

### ERR_005: Authentication Error
- **Description**: Error de autenticación
- **Details**: Token inválido o expirado
- **HTTP Status**: 401 Unauthorized

### ERR_006: Authorization Error
- **Description**: Error de autorización
- **Details**: No tienes permisos para realizar esta acción
- **HTTP Status**: 403 Forbidden

### ERR_007: Not Found Error
- **Description**: Recurso no encontrado
- **Details**: El recurso solicitado no existe
- **HTTP Status**: 404 Not Found

### ERR_008: Conflict Error
- **Description**: Conflicto de datos
- **Details**: Ya existe un registro con esos datos
- **HTTP Status**: 409 Conflict

### ERR_009: Bad Request
- **Description**: Solicitud incorrecta
- **Details**: Los parámetros de la solicitud son inválidos
- **HTTP Status**: 400 Bad Request

### ERR_010: Service Unavailable
- **Description**: Servicio no disponible
- **Details**: El servicio no está disponible temporalmente
- **HTTP Status**: 503 Service Unavailable
