# Blog-App (Frontend/Backend)

Una plataforma/red social, donde usuarios pueden compartir pensamientos, experiencias, etc. 

---

## 📜 Sobre el Proyecto

Este proyecto lo llevé a cabo para demostrarme que podia hacer un CRUD de manera profesional, y queria implementar NestJS para el backend

---

## ✨ Funcionalidades Clave

* **Autenticación de Usuarios:** Registro e inicio de sesión con JWT para proteger rutas y acciones.
* **Gestión de Perfiles:** Los usuarios pueden editar sus perfiles, incluyendo nombre, biografía y foto.
* **CRUD de Artículos:** Sistema completo para Crear, Leer, Actualizar y Borrar artículos.
* **Editor de Texto Enriquecido:** Formulario para crear/editar artículos con opciones de formato (negrita, cursiva, etc.).
* **Interacción Social:** Sistema de Likes/Dislikes y sección de comentarios en cada artículo.
* **Autorización:** Los usuarios solo pueden editar o eliminar su propio contenido (artículos y comentarios).
* **Diseño Responsivo:** Interfaz adaptable a diferentes tamaños de pantalla con un tema oscuro.

---

## 🛠️ Tecnologías Utilizadas

Lista las tecnologías principales que usaste.

#### **Frontend**
* Angular
* TypeScript
* RxJS
* Angular Material
* ngx-editor

#### **Backend**
* NestJS
* TypeScript
* MongoDB con Mongoose
* Passport.js (para autenticación JWT)
* Class-validator

---

## 🚀 Cómo Empezar

Instrucciones para que otro desarrollador pueda ejecutar tu proyecto en su máquina local.

### **Prerrequisitos**

* Node.js (v18 o superior)
* NPM
* Angular CLI (solo para el frontend: `npm install -g @angular/cli`)
* Una base de datos de MongoDB (local o en la nube como MongoDB Atlas)

### **Instalación**

1.  Clona el repositorio:
    ```sh
    git clone [https://github.com/HasanAshee/blog-frontend.git](https://github.com/HasanAshee/blog-frontend.git)
    ```
2.  Navega a la carpeta del proyecto:
    ```sh
    cd NOMBRE_DEL_REPO
    ```
3.  Instala las dependencias:
    ```sh
    npm install
    ```
4.  **(Solo para el Backend)** Crea un archivo `.env` en la raíz y añade tus variables de entorno:
    ```
    DATABASE_URL=TU_CADENA_DE_CONEXION_DE_MONGODB
    JWT_SECRET=UN_SECRETO_LARGO_Y_DIFICIL
    ```
5.  Inicia el servidor de desarrollo:
    * **Frontend:** `ng serve`
    * **Backend:** `npm run start:dev`

---

## 📝 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.
