# Expense Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking personal income and expenses. This project uses React with Vite for the frontend and is styled with Tailwind CSS.

## Features

* **Full CRUD:** Create, Read, Update, and Delete transactions.
* **Dashboard:** View a summary of your total balance, total income, and total expenses.
* **Transaction History:** See a detailed list of all past transactions.
* **Category Breakdown:** View a summary of your spending grouped by category.

## Tech Stack

* **Frontend:** React, React Router, React Context API, Axios, Tailwind CSS
* **Backend:** Node.js, Express, Mongoose
* **Database:** MongoDB

## Project Structure
```
  ├── client/ # React Frontend (Vite) 
  ├── server/ # Node.js/Express Backend 
  ├── .gitignore 
  └── README.md
```

## How to Run This Project

You will need to run two separate processes: one for the backend server and one for the frontend client.

### 1. Backend (Server)

1.  **Navigate to the server directory:**
    ```sh
    cd server
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Create an environment file:**
    Create a file named `.env` in the `/server` directory.
4.  **Add your MongoDB Connection String to `.env`:**
    ```
    MONGO_URI=your_mongodb_connection_string_here
    ```
5.  **Start the backend server:**
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

### 2. Frontend (Client)

1.  **Open a new terminal.**
2.  **Navigate to the client directory:**
    ```sh
    cd client
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Start the frontend development server:**
    ```sh
    npm run dev
    ```
    The app will open and run on `http://localhost:5173` (or the next available port).