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

## Deployment on Render

This project is configured to be deployed easily using **Render** via a Blueprint (`render.yaml`). This approach deploys both the Node.js backend and the React frontend simultaneously.

### Steps to Deploy:

1. **Database Setup:** Render does not provide a free database. Create a free MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and get your connection string.
2. **Push to GitHub:** Push your entire project (including the `render.yaml` file) to a GitHub repository.
3. **Render Dashboard:** Log in to [Render](https://dashboard.render.com/) and click **New > Blueprint**.
4. **Connect Repository:** Connect your GitHub account and select your repository.
5. **Environment Variables:** Render will read the `render.yaml` file and prompt you for the necessary secrets:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A strong, random secret key for your sessions.
6. **Deploy:** Click apply. Render will automatically build the frontend, build the backend, and link them together!

*(Alternatively, you can deploy the `frontend` folder to **Vercel** and the `backend` folder to **Render** as a web service. Just remember to add the `VITE_API_URL` environment variable to your Vercel project pointing to your deployed backend URL).*
