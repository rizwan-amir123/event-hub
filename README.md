# Project Setup Guide

This guide covers the setup and usage of both the frontend and backend for your project. Please follow the steps carefully to get everything running smoothly.

## Prerequisites

* sequelize-cli for running migrations and seeders (`npm install -g sequelize-cli`)

## Frontend Setup

1.  Clone the repository:

    ```
    git clone git@github.com:rizwan-amir123/event-hub.git
    cd frontend
    ```
2.  Install dependencies:

    ```
    npm install
    ```
3.  Set up environment variables:

    * Copy the `.env.example` file to `.env` and fill in the required values.
4.  Run the development server:

    ```
    npm run dev
    ```
5.  Open your browser and visit the provided URL (typically http://localhost:5173).

## Backend Setup

1.  Clone the repository (if not done already):

    ```
    git clone <your-repo-url>
    cd backend
    ```
2.  Install dependencies:

    ```
    npm install
    ```
3.  Set up environment variables:

    * Copy the `.env.example` file to `.env` and fill in the required values.
4.  Run the database migrations and seeders:

    ```
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```
5.  Start the backend server:

    ```
    npm start
    ```
6.  Your backend should now be running, typically at http://localhost:3000.

## Test Logins

**Admin Login:** Use the following credentials:

* Email: admin@example.com
* Password: password123

**User Login:** Use the following credentials:

* Email: john.doe@example.com
* Password: password123

## Notes

### Tenant Scoping

Tenant scoping ensures that users only see the events of the tenant they belong to. When a user registers, the provided tenant is checked against existing tenants. If it exists, the user is associated with it; if not, a new tenant is created.

### Authentication

Authentication is handled via JWT tokens, ensuring secure and stateful user sessions. Admin users can only be created by changing their role directly in the database.

### Concurrency Handling

To prevent overbooking, Sequelize transactions are used to enforce capacity limits during event registration. This ensures that no two users can register for a fully booked event simultaneously.

### Notes
1. As far as input cleaning for forms is required I have left that out. Also, not displaying a relevant error in that case, a generic error is shown. It can be done using regex as we know.
2. Things like limiting heading in a card to 10 or so words and using ... have also been left out.

