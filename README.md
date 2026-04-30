# Team Task Manager

A full-stack web application built for managing projects and tasks within a team.

## Features

- **Authentication:** JWT-based login and signup.
- **Role-Based Access Control:** 
  - **Admin:** Can create projects, add members, assign tasks, and delete items.
  - **Member:** Can view assigned projects and update task statuses.
- **Project Management:** Track projects with specific assigned members.
- **Task Management:** Board showing tasks, descriptions, statuses, and due dates.
- **Dashboard:** At-a-glance metrics of tasks.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS v4, React Router DOM, Axios, Lucide React
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt
- **Database:** MongoDB

---

## Local Development Setup

### 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.sample`:
   ```bash
   cp .env.sample .env
   ```
   *Make sure you have MongoDB running locally, or replace the `MONGODB_URI` with an Atlas connection string.*
4. Start the server:
   ```bash
   node index.js
   ```
   *The server will start on `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.sample` if you need to change the API URL (defaults to `http://localhost:5000/api` in code).
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The app will be available at `http://localhost:5173`.*

---

## Deployment on Railway

This monorepo can be deployed to Railway easily by creating two separate services within a Railway project.

### Step 1: Deploy Backend

1. Go to your Railway dashboard and create a new project from your GitHub repository.
2. Select your repository. By default, Railway might try to deploy the root. We need to specify the root directory.
3. Once the service is created, go to **Settings** > **Build**.
4. Set the **Root Directory** to `/backend`.
5. Under **Variables**, add the following environment variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: (Add a Railway MongoDB plugin or your MongoDB Atlas URI)
   - `JWT_SECRET`: (Your strong secret key)
6. Railway will automatically detect Node.js and build your backend.

### Step 2: Deploy Frontend

1. In the same Railway project, click **New** -> **GitHub Repo** and select the exact same repository.
2. Go to the **Settings** of this newly created service.
3. Under **Build**, set the **Root Directory** to `/frontend`.
4. Railway will automatically detect Vite. However, we need to tell it how to build and serve.
5. Under **Settings** -> **Deploy**, make sure the **Start Command** is set up, but for Vite it's better to serve static files. Alternatively, Railway's Nixpacks will usually auto-detect `npm run build` and serve the `dist` folder.
6. Under **Variables**, add the environment variable for your backend API URL if you use one (e.g., `VITE_API_URL` depending on how you configure Axios in production). By default, our code hardcodes `http://localhost:5000/api`, so **before deploying**, you should change `baseURL` in `frontend/src/api/axios.js` to point to your Railway backend URL!

Example update in `frontend/src/api/axios.js`:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://your-railway-backend-url.up.railway.app/api',
});
```

7. Deploy and enjoy your application!
