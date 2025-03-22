# Management System

## Pre-Project Configurations ⚙️

Before running the project, some initial configurations must be completed.

### Configuring the Visual Studio Code Terminal 🖥️

To execute `npm` commands in Visual Studio Code, it is necessary to modify the PowerShell execution policy.

1. Search for **"PowerShell"** in the Start menu, right-click it, and select **"Run as Administrator"**.
2. Execute the following command to allow the execution of signed scripts:

   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Confirm by typing **Y** when prompted.
4. **Close Visual Studio Code** if it's open and restart it.
5. To verify if the execution policy has been successfully modified, run:

   ```bash
   npm -v
   ```

---

## 🛠️ Installing MongoDB Locally

1. Go to [MongoDB Community Edition](https://www.mongodb.com/try/download/community-kubernetes-operator) and download the version appropriate for your operating system.
2. Proceed with the installation, ensuring that you select the **"Run service as Network Service user"** option on Windows.

   > **Note**: Selecting this option ensures proper functionality on your system.

3. Install a terminal to manage MongoDB more efficiently:

   - Visit [MongoDB Shell](https://www.mongodb.com/try/download/shell) and download the **MSI version for Windows**.
   - Complete the installation.

4. Once these steps are completed, open the `cmd` or `PowerShell` terminal and run:

   ```bash
   mongosh
   ```

   This should display the database information. If you encounter any issues, refer to [this video tutorial](https://www.youtube.com/watch?v=gDOKSgqM-bQ) for assistance.

---

## 📦 Installing Dependencies

To install all project dependencies, execute the following command:

```bash
npm run install:all
```

---

## 🚀 Running the Project

Once all dependencies are installed, the project can be started with:

```bash
npm start
```

---

That's it! You should now be able to work with the project without any issues. If you have any questions, feel free to ask. 😊
