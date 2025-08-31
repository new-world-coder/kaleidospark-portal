# KaleidoSpark Backend API Contracts

## Overview
This document outlines the API contracts, data models, and integration plan for the KaleidoSpark website backend implementation.

## Current Mock Data (mockData.js)
The frontend currently uses these mock data structures:

### 1. Services
- **Structure**: id, title, description, icon, color, outcomes[], proof
- **Usage**: Services listing, service detail pages
- **Static Data**: Pre-defined 5 services (AI Strategy, Process Transformation, GenAI, Data/MLOps, Training)

### 2. Industries  
- **Structure**: id, name, description, icon, color, challenges[], solutions[], outcomes[], proof
- **Usage**: Industries listing, industry detail pages
- **Static Data**: Pre-defined 5 industries (Retail, Manufacturing, Healthcare, Real Estate, Fintech)

### 3. Case Studies
- **Structure**: id, title, industry, challenge, approach, outcome, testimonial, client, metrics[]
- **Usage**: Case studies listing with filtering
- **Static Data**: 3 detailed case studies

### 4. Team Members
- **Structure**: id, name, role, bio, image, linkedin, expertise[]
- **Usage**: Team page display
- **Static Data**: 3 leadership profiles

### 5. Resources
- **Structure**: id, title, description, type, downloadUrl, category
- **Usage**: Resources page with filtering
- **Static Data**: 3 downloadable resources

### 6. Events
- **Structure**: id, title, date, time, type, description, registrationUrl
- **Usage**: Events listing and registration
- **Static Data**: 2 upcoming events

## Backend Implementation Plan

### 1. Database Models (MongoDB)

#### Contact Submissions
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  company: String (required),
  role: String,
  message: String (required),
  interest: String (enum: general, ai-strategy, automation, genai, data, training),
  createdAt: Date,
  status: String (enum: new, contacted, qualified, closed)
}
```

#### Discovery Call Bookings
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  company: String (required),
  preferredDate: Date (required),
  preferredTime: String (required),
  timezone: String (required),
  createdAt: Date,
  status: String (enum: pending, confirmed, completed, cancelled)
}
```

#### Newsletter Subscriptions
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  subscribedAt: Date,
  status: String (enum: active, unsubscribed),
  preferences: {
    aiInsights: Boolean,
    events: Boolean,
    resources: Boolean
  }
}
```

#### Event Registrations
```javascript
{
  _id: ObjectId,
  eventId: String (required),
  name: String (required),
  email: String (required),
  company: String,
  registeredAt: Date,
  status: String (enum: registered, attended, no-show)
}
```

#### Resource Downloads (Optional - for analytics)
```javascript
{
  _id: ObjectId,
  resourceId: String (required),
  email: String,
  downloadedAt: Date,
  userAgent: String
}
```

### 2. API Endpoints

#### Contact & Communication
- `POST /api/contact` - Submit contact form
- `POST /api/book-call` - Book discovery call
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `GET /api/contact` - Get contact submissions (admin)
- `GET /api/bookings` - Get call bookings (admin)

#### Events
- `GET /api/events` - Get all events (public data only)
- `POST /api/events/:id/register` - Register for event
- `GET /api/events/registrations` - Get event registrations (admin)

#### Resources (Optional)
- `POST /api/resources/:id/download` - Track resource downloads
- `GET /api/resources/analytics` - Download analytics (admin)

#### Static Content (Keep as frontend constants)
- Services, Industries, Case Studies, Team Members will remain as frontend constants
- These don't change frequently and don't require database storage

### 3. Frontend Integration Changes

#### Remove Mock Functions
- Remove `submitContactForm()` from mockData.js
- Remove `bookDiscoveryCall()` from mockData.js  
- Remove `subscribeNewsletter()` from mockData.js

#### Add API Integration
- Create `/src/services/api.js` for API calls
- Use axios for HTTP requests to backend
- Handle loading states and error messages
- Show success notifications using sonner

#### Form Updates
- Contact form: POST to `/api/contact`
- Discovery call form: POST to `/api/book-call`
- Newsletter form: POST to `/api/newsletter/subscribe`
- Event registration: POST to `/api/events/:id/register`

### 4. Response Formats

#### Success Response
```javascript
{
  success: true,
  message: "Thank you! We'll be in touch within 24 hours.",
  data: { /* optional response data */ }
}
```

#### Error Response
```javascript
{
  success: false,
  message: "Error message for user",
  errors: [ /* validation errors */ ]
}
```

### 5. Validation Rules

#### Contact Form
- name: required, min 2 chars
- email: required, valid email format
- company: required, min 2 chars
- message: required, min 10 chars
- interest: optional, must be valid enum value

#### Discovery Call
- name: required, min 2 chars
- email: required, valid email format
- company: required, min 2 chars
- preferredDate: required, must be future date
- preferredTime: required, valid time format
- timezone: required, valid timezone

#### Newsletter
- email: required, valid email format, unique

### 6. Business Logic

#### Contact Submissions
- Store in database
- Send email notification to admin
- Auto-respond to user
- Set status to 'new'

#### Discovery Call Bookings
- Store in database
- Check availability (basic validation)
- Send calendar invite
- Set status to 'pending'

#### Newsletter Subscriptions
- Check if email already exists
- Store with active status
- Send welcome email

### 7. Email Integration (Future Enhancement)
- SMTP configuration for notifications
- Email templates for responses
- Calendar integration for bookings

## Implementation Priority
1. **Phase 1**: Contact form, discovery call booking, newsletter
2. **Phase 2**: Event registration tracking
3. **Phase 3**: Admin dashboard for managing submissions
4. **Phase 4**: Email automation and calendar integration

## Testing Strategy
- Test all form submissions
- Verify data storage in MongoDB
- Test error handling and validation
- Verify frontend integration works properly