# c20-87-php-react

# **Innovabank** 🚀

**Innovabank** es una fintech diseñada para ofrecer soluciones bancarias digitales a usuarios que buscan un enfoque moderno y accesible para la gestión de sus finanzas. El proyecto incluye funcionalidades como la solicitud de préstamos, gestión de cuentas, transferencias y un dashboard personalizado para cada tipo de usuario.

---

## ✨ **Características principales**

- 🏦 **Solicitud de préstamos**: Solicita préstamos de manera rápida y sencilla, con una interfaz amigable.
- 💼 **Gestión de cuentas**: Administra tus cuentas, revisa saldos y visualiza transacciones.
- 🔄 **Transferencias**: Realiza transferencias bancarias seguras.
- 👥 **Perfiles de usuario**: Cliente, Empresa y Administrador, cada uno con permisos y funcionalidades específicas.
- 🔔 **Notificaciones**: Notificaciones en tiempo real para mantener a los usuarios informados sobre sus transacciones.

---

## 🛠️ **Tecnologías utilizadas**

- **Frontend**: `React`, `Next.js`, `Material-UI (MUI)`
- **Backend**: `Laravel`, `CodeIgniter`
- **Base de datos**: `MySQL`
- **Autenticación**: `Laravel Passport` para autenticación OAuth2
- **Notificaciones**: `WebSockets`
- **Integraciones**: APIs de servicios bancarios y financieros externos

---

## ⚙️ **Instalación**

### **Requisitos previos**

- `Node.js`
- `PHP >= 7.4`
- `Composer`
- `MySQL`
- `Redis` (opcional, para colas y notificaciones en tiempo real)

### **Pasos para la instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/No-Country-simulation/c20-87-php-react.git
   ```
2. Instala las dependencias del backend:
      ```bash
   cd backend
   composer install
   ```

3. Configura el archivo `.env` en la carpeta `backend` con tus credenciales de base de datos.
4. Instala las dependencias del frontend:
    ```bash
     cd ../frontend
     npm install
     ```
5. Configura el archivo .env.local en la carpeta frontend.
6. Corre las migraciones de base de datos:
    ```bash
     cd backend
     php artisan migrate
     ```
7. Ejecuta los servidores de desarrollo:
   ```bash
    cd backend
    php artisan serve
      
    cd ../frontend
    npm run dev```

---
## **🧑‍💻 Uso**
- Crea una cuenta o inicia sesión como cliente o administrador.
- Explora las funcionalidades según tu perfil.
- Realiza operaciones como solicitudes de préstamos y transferencias.
