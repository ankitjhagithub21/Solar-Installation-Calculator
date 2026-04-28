# Solar Installation Calculator

A full-stack MERN application that allows users to calculate solar installation costs by drawing roof polygons on interactive maps. The system combines geolocation services, real-time mapping, polygon drawing, area calculation, and cost estimation to provide comprehensive solar installation quotes.

## 🚀 Features

### User Management
- Create users with name, email
- Select users from an interactive list
- Global state management with Redux


### Drawing & Calculation
- Interactive polygon drawing on maps
- Minimum 3-point validation for area calculation
- Real-time area computation in square meters
- Comprehensive solar cost estimation

### Cost Analysis
- Panel requirements calculation
- Installation cost estimation
- Annual savings projection
- Payback period analysis

## 🏗️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Google Maps Services API** - Geolocation services

### Frontend
- **React 19** - UI framework
- **Redux Toolkit** - State management
- **Google Maps JavaScript API** - Interactive mapping
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Maps API Key
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Coding Round"
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the `backend` directory:
```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/solar-coding-round
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
ORIGIN=http://localhost:5173
```

#### Start Backend Server
```bash
npm run dev
```
The backend will run on `http://localhost:8000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Environment Configuration
Create a `.env` file in the `frontend` directory:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_API_BASE_URL=http://localhost:8000/api
```

#### Start Frontend Development Server
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`




## 🌐 API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Roof Drawings
- `POST /api/roof-drawings` - Create roof drawing and calculate costs


## 📁 Project Structure

```
Coding Round/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment config
│   │   ├── controllers/     # Business logic handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Express server setup
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── store/          # Redux store and slices
│   │   ├── main.jsx        # Application entry point
│   │   └── index.css       # Global styles
│   ├── .env                # Environment variables
│   └── package.json
└── README.md
```

## 🎯 Usage Guide

### 1. User Management
- Navigate to user management page
- Fill out user creation form with name, email, phone, and address
- Users appear in selection list after creation

### 2. Solar Calculator
- Select a user from the user list (optional)
- Choose a location from predefined addresses
- Map automatically centers on selected location
- Enable drawing mode and click points on the map to outline roof area
- Click "Calculate Area & Estimate" to get solar installation costs
- View comprehensive results including cost, panels, savings, and payback period

### 3. Navigation
- Use "Manage Users" button to access user management
- Use "Back to Calculator" button to return to main calculator

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with auto-reload
```

#### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🐛 Troubleshooting

### Common Issues

1. **"next is not a function" Error**
   - Ensure all controller functions accept the `next` parameter
   - Check Mongoose middleware for proper `next()` usage

2. **Google Maps Not Loading**
   - Verify API key is correct in both `.env` files
   - Ensure all required Google APIs are enabled
   - Check browser console for API errors

3. **Database Connection Issues**
   - Verify MongoDB is running (local) or connection string is correct (Atlas)
   - Check network connectivity for MongoDB Atlas
   - Ensure MongoDB URI format is correct

4. **CORS Errors**
   - Verify `ORIGIN` in backend `.env` matches frontend URL
   - Check if CORS middleware is properly configured

