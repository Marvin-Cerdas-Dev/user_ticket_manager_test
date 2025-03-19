# Configuraciones Previas para el Proyecto

## ⚙️ Configuración de la Terminal de Visual Studio Code

Para correr los comandos de `npm` en Visual Studio Code es necesario cambiar la política de ejecución de PowerShell.

1. Busca **"PowerShell"** en el menú de inicio, haz clic derecho y selecciona **"Ejecutar como administrador"**.
2. Ejecuta el siguiente comando para permitir la ejecución de scripts firmados:

```bash
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

3. Confirma con **Y** si te lo pide.
4. **Cierra Visual Studio Code** si lo tienes abierto y vuélvelo a abrir.

Para verificar si la política de ejecución de PowerShell fue modificada correctamente, ejecuta:

```bash
    npm -v
```

---

## 🛠️ Instalación de MongoDB de Manera Local

1. Dirígete a [MongoDB Community Edition](https://www.mongodb.com/try/download/community-kubernetes-operator) y descarga la versión correspondiente a tu sistema operativo.
2. Procede con la instalación, asegurándote de seleccionar la opción **"Run service as Network Service user"** en Windows.

   > **Nota**: Asegúrate de seleccionar esta opción para un correcto funcionamiento en tu sistema.

3. Luego, instala un terminal para gestionar MongoDB de forma más sencilla:

   - Visita [MongoDB Shell](https://www.mongodb.com/try/download/shell) y descarga la versión **MSI para Windows**.
   - Procede con la instalación.

4. Una vez completados estos pasos, abre la terminal (`cmd` o `PowerShell`) y ejecuta el siguiente comando para acceder a MongoDB:

```bash
   mongosh
```

Debería aparecer la información de la base de datos. Si tienes problemas con este paso, puedes seguir este [video tutorial](https://www.youtube.com/watch?v=gDOKSgqM-bQ) para repetir los pasos.

---

## 📦 Instalación de Dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
    npm install:all
```

---

## 🚀 Ejecutar el Proyecto

Una vez que todas las dependencias estén instaladas, puedes ejecutar el proyecto con el siguiente comando:

```bash
    npm start
```

---

¡Listo! Ahora deberías poder trabajar con el proyecto sin problemas. Si tienes alguna duda, no dudes en preguntar. 😊
