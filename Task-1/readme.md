# DATA REPORT

### Instalaion

```go get github.com/gofiber/fiber/v2```

```go get github.com/xuri/excelize/v2```

This is old or renamed: ```go install github.com/cosmtrek/air@latest```

This is new: ```go install github.com/air-verse/air@latest```

### Installation

1. **Create Project Folders:**

   ```bash
   mkdir backend
   mkdir frontend
   ```

2. **Set up the Frontend:**

   - Create a new Vite project:

     ```bash
     npm create vite@latest note-app
     ```

   - Install dependencies:

     ```bash
     cd note-app
     npm install
     npm install react-router-dom react-icons react-modal axios moment
     ```

3. **Set up the Backend:**

   - Initialize a new Node.js project:

     ```bash
     npm init
     ```

   - Install dependencies:

     ```bash
     npm install express mongoose jsonwebtoken dotenv cors nodemon
     ```

### Running the Application

1. **Run the Frontend:**

   ```bash
   cd frontend/note-app
   npm run dev
   ```

2. **Run the Backend (Server):**

   ```bash
   cd backend
   npm start
   ```
