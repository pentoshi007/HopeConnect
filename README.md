# HopeConnect - NGO Volunteer Management Portal

A modern, responsive web application built with the MERN stack for managing NGO volunteer applications. Features a beautiful glassmorphic design with comprehensive admin dashboard and seamless user experience.

![Project Status](https://img.shields.io/badge/Status-Ready%20for%20Deployment-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## 🌟 Features

### � **Modern UI/UX**

- Beautiful glassmorphic design with gradient backgrounds
- Fully responsive mobile-first design
- Smooth animations and transitions
- Professional color scheme and typography

### 👥 **Volunteer Registration**

- Comprehensive registration form with validation
- 12 different volunteer interest categories
- Real-time form validation with Zod schema
- Success celebration with confetti animation

### � **Admin Dashboard**

- Secure JWT-based authentication
- Interactive analytics with Chart.js
- Real-time search and filtering
- CSV export functionality (bulk and individual)
- Mobile-optimized admin interface

### � **Analytics & Reports**

- Application trends over time
- Interest area distribution charts
- Weekly growth statistics
- Exportable volunteer data

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Hook Form + Zod** - Form management with schema validation
- **Chart.js + React Chart.js 2** - Interactive data visualization
- **Lucide React** - Beautiful icon library
- **Canvas Confetti** - Celebration animations

### Backend

- **Node.js 20+** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database solution
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Server-side validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd ngo-internship
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Environment Setup

#### Server Environment (.env)

Create `server/.env` file:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/hopeconnect
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
PORT=3001
NODE_ENV=development
ADMIN_EMAIL=admin@hopeconnect.org
ADMIN_PASSWORD=your_secure_admin_password
CORS_ORIGIN=http://localhost:5173
```

#### Client Environment (.env)

Create `client/.env` file:

```env
VITE_API_URL=http://localhost:3001
```

### 4. Database Setup

The application will automatically:

- Connect to MongoDB Atlas
- Create necessary collections
- Set up the admin user on first run

### 5. Run Development Servers

#### Option 1: Run both servers simultaneously

```bash
npm run dev
```

#### Option 2: Run servers separately

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

Visit http://localhost:5173 to see the application.

## 📁 Project Structure

```
ngo-internship/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/           # React context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/             # Custom hooks
│   │   │   └── useScrollAnimation.js
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ThankYou.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js backend
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   │   ├── authController.js
│   │   │   └── applicantController.js
│   │   ├── middleware/         # Custom middleware
│   │   │   └── auth.js
│   │   ├── models/            # MongoDB models
│   │   │   ├── AdminUser.js
│   │   │   └── Applicant.js
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.js
│   │   │   └── applicantRoutes.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── package.json               # Root package file
```

## 🎯 Available Scripts

### Root Level

- `npm run dev` - Run both client and server
- `npm run install:all` - Install all dependencies
- `npm run build` - Build client for production
- `npm start` - Start production server

### Client Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts

- `npm run dev` - Start with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 API Endpoints

### Public Routes

- `POST /api/applicants` - Submit volunteer application
- `GET /health` - Health check endpoint

### Protected Admin Routes

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/applicants` - Get all applications (admin only)

## 🎨 Volunteer Interest Categories

The application supports 12 volunteer interest areas:

- Education & Literacy
- Rural Development
- Women Empowerment
- Child Welfare
- Healthcare & Sanitation
- Environmental Conservation
- Skill Development & Training
- Elderly Care
- Disaster Relief
- Digital Literacy
- Arts & Culture
- Food Security & Nutrition

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation (client and server-side)
- CORS protection
- Rate limiting
- Security headers with Helmet
- Environment variable protection

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints:
  - `sm:` 640px and up
  - `md:` 768px and up
  - `lg:` 1024px and up
  - `xl:` 1280px and up

## 🚀 Deployment

### Production Environment Variables

#### Server

```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret_32_chars_minimum
PORT=3001
NODE_ENV=production
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_secure_password
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Client

```env
VITE_API_URL=https://your-backend-domain.com
```

### Recommended Deployment Platforms

#### Frontend (Client)

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

#### Backend (Server)

- **Railway** (Recommended)
- **Render**
- **Heroku**
- **DigitalOcean App Platform**

#### Database

- **MongoDB Atlas** (Recommended)
- **MongoDB Cloud**

### Build Commands

#### Frontend Build

```bash
cd client
npm run build
```

#### Production Start

```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Created with ❤️ for NGO volunteer management

## 📞 Support

For support and questions:

- Email: support@hopeconnect.org
- Phone: +91 98765 43210

---

**Note**: Make sure to update the MongoDB connection string, JWT secret, and other environment variables before deploying to production.
cd ngo-internship

````

2. **Install dependencies**
```bash
npm run install:all
````

3. **Set up environment variables**

   ```bash
   # Copy and configure server environment
   cp server/.env.example server/.env

   # Update server/.env with your MongoDB URI and secrets
   # Update client/.env if needed for API URL
   ```

4. **Start development servers**

   ```bash
   npm run dev
   ```

   This will start:

   - Client at `http://localhost:5173`
   - Server at `http://localhost:3001`

## Environment Variables

### Server (.env)

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=3001
NODE_ENV=development
ADMIN_EMAIL=admin@ngo.com
ADMIN_PASSWORD=admin123
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)

```env
VITE_API_URL=http://localhost:3001
```

## Project Structure

```
ngo-internship/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   └── assets/         # Static assets
│   ├── public/
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── app.js          # Express app
│   ├── server.js           # Server entry point
│   └── package.json
└── package.json            # Root package.json
```

## API Endpoints

### Public Endpoints

- `POST /api/applicants` - Submit internship application
- `POST /api/auth/login` - Admin login
- `GET /health` - Health check

### Protected Endpoints (Admin Only)

- `GET /api/applicants` - List all applicants (with search/filter)
- `GET /api/applicants/:id` - Get specific applicant
- `GET /api/auth/me` - Get current admin user
- `POST /api/auth/logout` - Admin logout

## Admin Access

Default admin credentials:

- **Email:** admin@ngo.com
- **Password:** admin123

⚠️ **Important:** Change the admin password in production!

## Design System

### Color Palette

- `--bg-main`: #F7F9FC (Main background)
- `--bg-glass`: rgba(255,255,255,0.15) (Glass effect)
- `--text-primary`: #0F172A (Primary text)
- `--accent`: #6366F1 (Accent color)
- `--accent-light`: #A5B4FC (Light accent)
- `--error`: #EF4444 (Error color)

### Glassmorphism Effects

- Backdrop blur: 20px
- Border radius: 16px
- Semi-transparent backgrounds
- Subtle borders and shadows

## Available Scripts

### Root Directory

- `npm run dev` - Start both client and server in development
- `npm run install:all` - Install all dependencies
- `npm run build` - Build client for production
- `npm run lint` - Lint both client and server
- `npm run format` - Format code with Prettier

### Client Directory

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - ESLint
- `npm run format` - Prettier

### Server Directory

- `npm run dev` - Start with nodemon
- `npm start` - Start production server
- `npm run lint` - ESLint
- `npm run format` - Prettier

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-api-domain.com`

### Backend (Render)

1. Push to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`

### Database

- Use MongoDB Atlas (free tier available)
- Whitelist your deployment server IPs
- Use connection string in `MONGODB_URI`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions, please open an issue on GitHub.

---

Built with ❤️ using modern web technologies
