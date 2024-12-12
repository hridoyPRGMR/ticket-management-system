# Ticket Management System

A comprehensive ticket management system where users can register, log in, view available buses, and purchase tickets. Admins have enhanced capabilities to manage buses, tickets, and system data.

---

## Features

### User Authentication
- User registration, login, and logout.
- Secure password hashing and JWT-based authentication.
- Role-based authorization for Admin and User roles.

### Admin Functionalities
- Add, update, and delete bus information.
- Upload, update, and delete tickets for buses, specifying prices and time slots.

### User Functionalities
- View available buses and tickets.
- Purchase tickets for a specific bus at a chosen time.

---

## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/hridoyPRGMR/ticket-management-system.git
   cd ticket-management-system
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` File:**
   Create a `.env` file in the project root and configure the following environment variables:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   ```

4. **Start the Application:**
   For development:
   ```bash
   npm run dev
   ```
   The app will start at `http://localhost:5000`.

---

## Usage

- Navigate to `http://localhost:5000` to access the application.
- Use the user registration or login functionality to create or log in to an account.
- Admins can access management features through designated endpoints.

---

## Technologies Used

The project leverages the following technologies:

- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [Express.js](https://expressjs.com/) - Web application framework.

- **Database:**
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing buses, tickets, and user data.

- **Libraries:**
  - `bcrypt` - Secure password hashing.
  - `jsonwebtoken` - JWT-based authentication.
  - `dotenv` - Environment variable management.

---

## API Endpoints (Examples)

| Method | Endpoint              | Description                       |
|--------|-----------------------|-----------------------------------|
| POST   | `/auth/register`      | Register a new user               |
| POST   | `/auth/login`         | Log in a user                     |
| POST   | `/auth/logout`        | Logout a user                     |
| POST   | `/admin/bus`          | Add a new bus                     |
| PUT    | `/admin/bus/:id`      | Update a bus                      |
| DELETE | `/auth/bus/:id`       | Delete a bus                      |
| POST   | `/admin/ticket`       | Add a new ticket for a bus        |
| PUT    | `/admin/ticket/:id`   | Update a ticket                   |
| DELETE | `/admin/ricket/:id`   | Delete a ticket                   |
| GET    | `/buses`              | Get all available buses           |
| GET    | `/tickets`            | Get tickets of specific bus       |
| POST   | `/tickets/purchase`   | Purchase a ticket                 |

---

## Contribution

Contributions are welcome! If you would like to contribute:
- Fork the repository.
- Create a feature branch.
- Submit a pull request with detailed information on the changes.

---

## License

...

---

Thank you for using the Ticket Management System! If you encounter any issues or have suggestions, please open an issue on the [GitHub repository](https://github.com/hridoyPRGMR/ticket-management-system).

## postman documentation
(https://documenter.getpostman.com/view/40331456/2sAYHwL5Ju)

