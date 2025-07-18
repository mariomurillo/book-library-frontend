# Book Library Frontend

This project is a frontend application for a book library, built with React, Vite, and other modern technologies.

## Features

*   Display a list of books
*   View detailed information about a book
*   Add a new book (form)
*   Edit an existing book
*   Delete a book (with confirmation)

## Tech Stack

*   **React Framework:** Vite
*   **UI/UX:** ShadCN UI + Tailwind CSS
*   **Routing:** React Router
*   **Backend Calls:** axios
*   **State Management and Data Fetching:** TanStack Query
*   **Forms + Validation:** React Hook Form + zod

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/book-library-frontend.git
    cd book-library-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application in your browser:**
    [http://localhost:5173](http://localhost:5173)

## Backend API

This frontend application expects a backend API running on `http://localhost:8080`. The API should expose the following endpoints:

*   `GET /books`
*   `GET /books/:id`
*   `POST /books`
*   `PUT /books/:id`
*   `DELETE /books/:id`
