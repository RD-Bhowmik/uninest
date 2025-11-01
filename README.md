# UniNest - Full-Stack Accommodation Platform

A comprehensive full-stack web application built with Node.js, Express.js, and React for managing accommodation bookings and place listings. The platform provides a complete solution for users to discover, book, and manage accommodations with real-time updates and secure user authentication.

## 🌟 Key Features

### User Management

- **User Registration & Authentication**: Secure user registration and login system
- **JWT Authentication**: JSON Web Token-based authentication for secure API access
- **User Profiles**: Complete user profile management with personal information
- **Password Security**: Bcrypt password hashing for secure password storage

### Accommodation Management

- **Place Listings**: Create, update, and manage accommodation listings
- **Image Upload**: Multiple image upload functionality with Multer
- **Place Details**: Comprehensive place information including location, amenities, and pricing
- **Search & Filter**: Advanced search and filtering capabilities for accommodations

### Booking System

- **Booking Management**: Complete booking creation and management system
- **Booking History**: User booking history and status tracking
- **Real-time Updates**: Live booking status updates and notifications
- **Date Management**: Check-in and check-out date management

### Admin Features

- **Admin Dashboard**: Comprehensive admin panel for platform management
- **User Management**: Admin tools for user account management
- **Content Moderation**: Place listing approval and moderation
- **Analytics**: Platform usage statistics and insights

## 🛠️ Technical Architecture

### Backend Technologies

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

### Frontend Technologies

- **React 18** - User interface library
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Date-fns** - Date manipulation library

### Database

- **MongoDB** - Document-based NoSQL database
- **Mongoose ODM** - Object Document Mapper
- **Schema Design** - Optimized data models for scalability

## 📁 Project Structure

```
uninest/
├── api/                        # Backend API
│   ├── models/                 # Database models
│   │   ├── User.js            # User model
│   │   ├── Place.js           # Place model
│   │   └── Booking.js         # Booking model
│   ├── index.js               # Main server file
│   ├── package.json           # Backend dependencies
│   └── uploads/               # File upload directory
├── client/                     # Frontend React app
│   ├── src/                   # Source code
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   └── App.jsx           # Main App component
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── tailwind.config.js    # Tailwind CSS config
├── package.json              # Root package.json
└── README.md                 # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 16.x or higher
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to API directory**

   ```bash
   cd api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Create .env file
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/uninest
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📊 Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Place Model

```javascript
{
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number
}
```

### Booking Model

```javascript
{
  place: ObjectId (ref: Place),
  user: ObjectId (ref: User),
  checkIn: Date,
  checkOut: Date,
  numberOfGuests: Number,
  name: String,
  phone: String,
  price: Number
}
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Places

- `GET /api/places` - Get all places
- `POST /api/places` - Create new place
- `GET /api/places/:id` - Get place by ID
- `PUT /api/places/:id` - Update place
- `DELETE /api/places/:id` - Delete place

### Bookings

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## 🎯Project Summary

### Project Title

**UniNest - Full-Stack Accommodation Booking Platform**

### Project Description

Developed a comprehensive full-stack web application using Node.js, Express.js, and React for managing accommodation bookings and place listings. The platform features secure user authentication, real-time booking management, image upload functionality, and responsive design, providing a complete solution for accommodation discovery and booking.

### Key Achievements

- **Full-Stack Development**: Built complete web application with Node.js backend and React frontend
- **Database Design**: Created MongoDB schema with Mongoose ODM for scalable data management
- **Authentication System**: Implemented JWT-based authentication with bcrypt password hashing
- **File Upload**: Developed image upload functionality using Multer middleware
- **API Development**: Created RESTful API with Express.js and proper error handling
- **Frontend Development**: Built responsive React application with modern UI components
- **State Management**: Implemented efficient state management and data flow
- **Real-time Features**: Developed real-time booking updates and status management

### Technical Skills Demonstrated

- **Backend Development**: Node.js, Express.js, RESTful API design, Middleware development
- **Frontend Development**: React 18, Vite, Component architecture, State management
- **Database Management**: MongoDB, Mongoose ODM, Schema design, Query optimization
- **Authentication**: JWT tokens, Bcrypt hashing, Session management, Security
- **File Handling**: Multer middleware, Image upload, File management
- **API Integration**: Axios, HTTP requests, Error handling, Data fetching
- **UI/UX Design**: Tailwind CSS, Responsive design, Modern interface
- **Development Tools**: Vite, npm/yarn, Git, Environment configuration

### Technologies Used

**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Multer
**Frontend**: React 18, Vite, Axios, React Router, Tailwind CSS, Date-fns
**Database**: MongoDB, Mongoose ODM
**Tools**: npm/yarn, Git, Environment variables

## 📈 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Payment integration (Stripe, PayPal)
- [ ] Advanced search and filtering
- [ ] Map integration for location services
- [ ] Mobile app development (React Native)
- [ ] Email notification system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Review and rating system

## 🐛 Known Issues

- File upload size limits may need configuration
- CORS settings may need adjustment for production
- Environment variables need proper configuration

## 👨‍💻 Author

**RD-Bhowmik**
**ProdiptoPantho**
**Ek0Fahim**

- GitHub: [@RD-Bhowmik](https://github.com/RD-Bhowmik)

---

_This project demonstrates full-stack JavaScript development skills, modern web technologies, database design capabilities, and user interface development - making it an excellent showcase of full-stack development expertise for software developer positions._


