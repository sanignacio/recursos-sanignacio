![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

# 📚 Recursos San Ignacio

Recursos San Ignacio es una web que permite solicitar impresiones y laptops desde el celular. Los administradores pueden preparar las solicitudes para que los materiales estén listos al retirarlos.

## 🚀 Despliegue

Para ejecutar este proyecto ejecute

```bash
  pnpm run build
  pnpm start
```

## ⚙️ Funciones

- Modo Claro/Oscuro
- Inicio de sesión
- Enviar archivos para imprimir y guardar
- Los administradores pueden ver la lista de tareas, descargar archivos para imprimir y marcarlos como completados.
- Enviar correos electrónicos para restablecer contraseñas, autenticación de dos factores (A2FA) y verificación de correo electrónico.

## 🏠 Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/0-Sandy/recursos-sanignacio
```

Ir al directorio del proyecto

```bash
  cd recursos-sanignacio
```

Instalar dependencias

```bash
  pnpm install
```

Iniciar el servidor

```bash
  pnpm start
```

## 🛠️ Herramientas usadas

- **Next.js** – Framework principal para la aplicación web.
- **React** – Librería para la construcción de la interfaz de usuario.
- **React Compiler** – Compilador automático de React 19 que optimiza el rendimiento.
- **NextAuth.js** – Manejo de autenticación, incluyendo inicio de sesión con Google.
- **Google** – Proveedor de inicio de sesión con OAuth.
- **Resend** – Servicio para envío de correos electrónicos desde la app.
- **Prisma** – ORM para la gestión de la base de datos.
- **Tailwind CSS** – Estilos y utilidades CSS.
- **Radix UI** – Componentes accesibles para React (Avatar, Dialog, Dropdown, etc.).
- **React Hook Form** – Manejo de formularios y validaciones.
- **Zod** – Validación de esquemas y datos.
- **Lucide React / React Icons** – Iconografía para la interfaz.
- **React Spinners** – Indicadores de carga.
- **Sonner** – Notificaciones y toasts.
- **UUID** – Generación de IDs únicas.
- **Bcryptjs** – Hasheo de contraseñas.
- **Tailwind Merge / Tailwindcss Animate** – Utilidades y animaciones para Tailwind.
- **React Email / @react-email/components** – Componentes para correos electrónicos.

## 🔑 Variables de entorno

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env, podes copiar el .env.example

`DATABASE_URL`,

`AUTH_URL`, `AUTH_SECRET`,

`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`,

`RESEND_API_KEY`

## 📚 Referencia de la API

#### Envía un código 200 si eres administrador, de lo contrario envía un 403

```http
GET /api/admin
```

---

#### Mostrar todas las tareas (solo para administradores)

```http
GET /api/tasks
```

---

#### Agregar una tarea

```http
POST /api/tasks
```

| Parámetro              | Tipo     | Descripción                                                                     | Dónde |
| :--------------------- | :------- | :------------------------------------------------------------------------------ | :---- |
| `taskId`               | `string` | **Opcional**. Sobrescribe el valor aleatorio de la tarea.                       | URL   |
| `file(s)`              | `File`   | **Requerido**. Archivo(s) a subir.                                              | BODY  |
| `engrampado-<archivo>` | `string` | **Opcional**. `"true"` o `"false"`. Indica si el archivo debe estar engrampado. | BODY  |

---

#### Eliminar una tarea

```http
DELETE /api/tasks
```

| Parámetro | Tipo     | Descripción                                                                     | Dónde |
| :-------- | :------- | :------------------------------------------------------------------------------ | :---- |
| `taskId`  | `string` | **Requerido**. ID de la tarea a eliminar.                                       | URL   |
| `userId`  | `string` | **Opcional**. Si no se indica, se asume el ID del usuario que hace la petición. | URL   |

---

#### Descargar un archivo específico

```http
GET /api/tasks/download
```

| Parámetro  | Tipo     | Descripción                                                       | Dónde |
| :--------- | :------- | :---------------------------------------------------------------- | :---- |
| `userId`   | `string` | **Requerido**. ID del usuario que subió la tarea.                 | URL   |
| `taskId`   | `string` | **Requerido**. ID de la tarea a la que pertenece el archivo.      | URL   |
| `fileName` | `string` | **Requerido**. Nombre exacto del archivo que se quiere descargar. | URL   |

---

#### Obtener item por ID

```http
GET /api/items/${id}
```

| Parámetro | Tipo     | Descripción                           | Dónde |
| :-------- | :------- | :------------------------------------ | :---- |
| `id`      | `string` | **Requerido**. ID del item a obtener. | URL   |

## 👥 Autores

- [Martin](https://github.com/0-Sandy)
- [Máximo](#)
- [Facundo](https://github.com/facuandy)
- [Alejandro](#)
