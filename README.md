# Employee Management System

A MERN employee management application with JWT authentication, protected React routes, and full employee CRUD operations.

## Setup

1. Install dependencies:
   ```bash
   npm run install:all
   ```
2. Start MongoDB locally or use a MongoDB Atlas connection string.
3. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and `JWT_SECRET`.
4. Start both applications:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173`.

The API runs on `http://localhost:5000`.

## Folder structure

```text
client/
  src/
    components/    Reusable UI and protected-route components
    context/       Authentication state
    pages/         Login, registration, and dashboard screens
    services/      Axios API configuration
    styles.css     Global black-and-green theme
server/
  src/
    middleware/    Authentication and error handling
    models/        Mongoose schemas
    routes/        Authentication and employee APIs
```

## API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`
