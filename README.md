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

## Deployment on Vercel (Free)

This project has been uniquely configured to deploy both the frontend React application and the backend Node.js API to **Vercel** completely for free, using Vercel's Serverless Functions. Both will run on the exact same domain.

### Steps to Deploy:

1. **Database Setup:** You still need a database! Create a free MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and copy your connection string.
2. **Push to GitHub:** Commit and push this entire repository to your own GitHub account.
3. **Vercel Dashboard:** Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
4. **Import Repository:** Select your GitHub repository.
5. **Configuration:** 
   - Vercel will automatically detect the configuration. Leave the Build Command and Output Directory as they are (it will read the root `package.json`).
   - Open the **Environment Variables** dropdown and add:
     - `MONGODB_URI`: Your MongoDB Atlas connection string.
     - `JWT_SECRET`: A strong, random secret key for your sessions.
6. **Deploy:** Click **Deploy**. Vercel will build the frontend and set up the backend serverless functions automatically!
