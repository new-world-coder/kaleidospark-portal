# KaleidoSpark - AI Consulting Platform

KaleidoSpark is a comprehensive AI consulting platform that helps businesses navigate their AI transformation journey. Our platform offers strategic consulting, implementation services, and ongoing support to ensure successful AI adoption.

## Features

### Core Platform
- **Homepage** with hero section and service overview
- **Services** page with detailed AI consulting offerings
- **Industries** page showcasing sector-specific expertise
- **Resources** page with whitepapers, case studies, and insights
- **Events** page with upcoming webinars and workshops
- **Contact** forms and discovery call booking
- **Team** page highlighting our AI experts

### Advanced Features
- **Admin Dashboard** for managing contacts, bookings, and analytics
- **Global Search** functionality across all content
- **AI Readiness Assessment** tool for lead generation
- **Client Testimonials** slider
- **Newsletter Subscription** system
- **Google Analytics** integration

## Technology Stack

### Frontend
- **React 19** with modern hooks and components
- **Tailwind CSS** for responsive design
- **Radix UI** for accessible component primitives
- **Lucide React** for consistent iconography
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Python Flask** REST API
- **CORS** enabled for cross-origin requests
- **JSON** data persistence
- **Form validation** and error handling

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Python 3.8+ (for backend)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kaleidospark
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Start the backend (in a separate terminal)**
   ```bash
   cd backend
   python server.py
   ```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## Project Structure

```
kaleidospark/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Radix UI components
│   │   ├── Header.js       # Main navigation
│   │   ├── Footer.js       # Site footer
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── Home.js         # Homepage
│   │   ├── Services.js     # Services overview
│   │   └── ...
│   ├── services/           # API integration
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── backend/                # Python Flask API
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## Admin Dashboard

Access the admin dashboard at `/admin/login` with the following credentials:
- **Username:** admin
- **Password:** admin123

### Admin Features
- View and manage contact submissions
- Track discovery call bookings
- Monitor newsletter subscribers
- View analytics and conversion metrics
- Export data for reporting

## API Endpoints

The backend provides the following REST API endpoints:

- `POST /api/contact` - Submit contact form
- `POST /api/discovery-call` - Book discovery call
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/event-registration` - Event registration
- `GET /api/admin/*` - Admin dashboard data
- `POST /api/admin/login` - Admin authentication

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GA_TRACKING_ID=your-google-analytics-id
```

## Deployment

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `build` folder to your hosting provider

### Backend Deployment
1. Ensure Python dependencies are installed
2. Configure environment variables
3. Deploy to your preferred Python hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For technical support or questions about KaleidoSpark, please contact our development team.

---

**KaleidoSpark** - Transforming businesses through intelligent AI solutions.