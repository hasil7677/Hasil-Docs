

---

# Hasil Docs

Hasil Docs is a web application that functions as a document editor, allowing users to create, edit, and manage documents with a user-friendly interface. Built using modern web technologies, it ensures cross-platform compatibility, secure authentication, and efficient communication between frontend and backend services.

## Technologies Used

- **Frontend**: React.js (Vite), Tiptap (Rich Text Editor)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) 

## Features

- User registration and login with JWT-based authentication
- Responsive, easy-to-use text editor powered by Tiptap
- RESTful API for seamless communication between frontend and backend
- Cross-platform compatibility

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) >= 14.x
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/) for React.js

### Installation

#### Backend (Node.js + Express)

1. Clone the repository:
   ```bash
   git clone https://github.com/hasil7677/hasil-docs.git
   ```

2. Navigate to the backend folder:
   ```bash
   cd hasil-docs/backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the `backend` folder:
   ```plaintext
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend (React.js + Vite)

1. Navigate to the frontend folder:
   ```bash
   cd hasil-docs/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Usage

1. Visit the application in your browser at `http://localhost:3000` (or the configured port).
2. Start creating and managing documents through the rich text editor!

### API Endpoints

- **POST** `/auth/register`: Register a new user
- **POST** `/auth/login`: Login and receive a JWT token
- **GET** `/docs`: Get user documents
- **POST** `/docs`: Create a new document
- **PUT** `/docs/:id`: Update a document
- **DELETE** `/docs/:id`: Delete a document

### License

This project is licensed under the MIT License.

---

