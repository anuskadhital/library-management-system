# Library Management System

A full-stack Library Management System developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

This application allows users to manage library books, track availability, check out books, return borrowed books, and add new books through a web interface.

## Technologies Used

- **Frontend:** React.js, Vite, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Version Control:** Git, GitHub

## Features

- View all available library books.
- View checked-out books with borrower information and due dates.
- Add new books with title, author, publisher, and ISBN.
- Check out available books by entering a borrower's name and due date.
- Return borrowed books and update their availability.
- Automatically refresh book lists after changes.
- Display books in a responsive card layout.
- Store and manage book information in MongoDB.

## Book Information

Each book contains the following fields:

| Field | Description |
|---|---|
| Title | Name of the book |
| Author | Author's name |
| Publisher | Publishing company |
| ISBN | Unique book identifier |
| Status | Available or checked out |
| Checked Out By | Name of the borrower |
| Due Date | Expected return date |

## Project Structure

```text
library-management-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seedBooks.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/anuskadhital/library-management-system.git
cd library-management-system
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
node server.js
```

The backend runs on `http://localhost:5001`.

### 3. Set up the frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, typically `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books/available` | Retrieve available books |
| GET | `/api/books/checked-out` | Retrieve borrowed books |
| POST | `/api/books` | Add a new book |
| POST | `/api/books/:id/checkout` | Check out a book |
