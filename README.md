# Job Portal MERN Application

A full-stack Job Portal application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Authentication
- User & Admin registration
- Role-based login
- JWT authentication
- Protected routes

### Admin Features
- Create job postings
- Edit job postings
- Delete job postings
- View applications for each job
- Update application status (Applied, Reviewed, Rejected)

### User Features
- Browse jobs
- View job details
- Apply to jobs
- Resume upload support

## Tech Stack

Frontend:
- React
- React Router
- Axios
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## Installation

### Backend

cd server  
npm install  
npm run dev  

### Frontend

cd client  
npm install  
npm run dev  

## Environment Variables

Create a `.env` file in the server folder:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

This project demonstrates full-stack development, authentication, CRUD operations, role-based access control, and REST API design.
