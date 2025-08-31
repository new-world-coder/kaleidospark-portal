from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime, date
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="KaleidoSpark API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Enums
class InterestType(str, Enum):
    general = "general"
    ai_strategy = "ai-strategy"
    automation = "automation"
    genai = "genai"
    data = "data"
    training = "training"

class SubmissionStatus(str, Enum):
    new = "new"
    contacted = "contacted"
    qualified = "qualified"
    closed = "closed"

class BookingStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"

class SubscriptionStatus(str, Enum):
    active = "active"
    unsubscribed = "unsubscribed"


# Define Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2)
    email: EmailStr
    company: str = Field(..., min_length=2)
    role: Optional[str] = None
    message: str = Field(..., min_length=10)
    interest: InterestType = InterestType.general
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: SubmissionStatus = SubmissionStatus.new

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    company: str = Field(..., min_length=2)
    role: Optional[str] = None
    message: str = Field(..., min_length=10)
    interest: InterestType = InterestType.general

class DiscoveryCallBooking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2)
    email: EmailStr
    company: str = Field(..., min_length=2)
    preferred_date: date
    preferred_time: str
    timezone: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: BookingStatus = BookingStatus.pending

class DiscoveryCallBookingCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    company: str = Field(..., min_length=2)
    preferred_date: date
    preferred_time: str
    timezone: str

    @validator('preferred_date')
    def validate_future_date(cls, v):
        if v <= date.today():
            raise ValueError('Preferred date must be in the future')
        return v

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    status: SubscriptionStatus = SubscriptionStatus.active

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class EventRegistration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    name: str = Field(..., min_length=2)
    email: EmailStr
    company: Optional[str] = None
    registered_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "registered"

class EventRegistrationCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    company: Optional[str] = None

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None


# API Routes
@api_router.get("/")
async def root():
    return {"message": "KaleidoSpark API is running", "version": "1.0.0"}

# Contact Form Endpoint
@api_router.post("/contact", response_model=ApiResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    try:
        # Create contact submission
        submission = ContactSubmission(**contact_data.dict())
        
        # Insert into database
        result = await db.contact_submissions.insert_one(submission.dict())
        
        if result.inserted_id:
            return ApiResponse(
                success=True,
                message="Thank you! We'll be in touch within 24 hours.",
                data={"submission_id": submission.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save submission")
            
    except Exception as e:
        logging.error(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

# Discovery Call Booking Endpoint
@api_router.post("/book-call", response_model=ApiResponse)
async def book_discovery_call(booking_data: DiscoveryCallBookingCreate):
    try:
        # Create booking
        booking = DiscoveryCallBooking(**booking_data.dict())
        
        # Insert into database
        result = await db.discovery_call_bookings.insert_one(booking.dict())
        
        if result.inserted_id:
            return ApiResponse(
                success=True,
                message="Discovery call booked! You'll receive a calendar invite shortly.",
                data={"booking_id": booking.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save booking")
            
    except Exception as e:
        logging.error(f"Booking error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to book discovery call")

# Newsletter Subscription Endpoint
@api_router.post("/newsletter/subscribe", response_model=ApiResponse)
async def subscribe_newsletter(subscription_data: NewsletterSubscriptionCreate):
    try:
        # Check if email already exists
        existing = await db.newsletter_subscriptions.find_one({"email": subscription_data.email})
        
        if existing:
            if existing.get("status") == "unsubscribed":
                # Reactivate subscription
                await db.newsletter_subscriptions.update_one(
                    {"email": subscription_data.email},
                    {"$set": {"status": "active", "subscribed_at": datetime.utcnow()}}
                )
                return ApiResponse(
                    success=True,
                    message="Successfully resubscribed to our newsletter!"
                )
            else:
                return ApiResponse(
                    success=True,
                    message="You're already subscribed to our newsletter!"
                )
        
        # Create new subscription
        subscription = NewsletterSubscription(**subscription_data.dict())
        
        # Insert into database
        result = await db.newsletter_subscriptions.insert_one(subscription.dict())
        
        if result.inserted_id:
            return ApiResponse(
                success=True,
                message="Successfully subscribed to our newsletter!"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save subscription")
            
    except Exception as e:
        logging.error(f"Newsletter subscription error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")

# Event Registration Endpoint
@api_router.post("/events/{event_id}/register", response_model=ApiResponse)
async def register_for_event(event_id: str, registration_data: EventRegistrationCreate):
    try:
        # Check if already registered
        existing = await db.event_registrations.find_one({
            "event_id": event_id,
            "email": registration_data.email
        })
        
        if existing:
            return ApiResponse(
                success=True,
                message="You're already registered for this event!"
            )
        
        # Create registration with event_id from URL
        registration_dict = registration_data.dict()
        registration_dict["event_id"] = event_id
        registration = EventRegistration(**registration_dict)
        
        # Insert into database
        result = await db.event_registrations.insert_one(registration.dict())
        
        if result.inserted_id:
            return ApiResponse(
                success=True,
                message="Successfully registered for the event!",
                data={"registration_id": registration.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save registration")
            
    except Exception as e:
        logging.error(f"Event registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to register for event")

# Admin endpoints (basic - for viewing submissions)
@api_router.get("/admin/contacts")
async def get_contact_submissions():
    try:
        submissions = await db.contact_submissions.find().sort("created_at", -1).to_list(100)
        return {"success": True, "data": submissions}
    except Exception as e:
        logging.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")

@api_router.get("/admin/bookings")
async def get_discovery_call_bookings():
    try:
        bookings = await db.discovery_call_bookings.find().sort("created_at", -1).to_list(100)
        return {"success": True, "data": bookings}
    except Exception as e:
        logging.error(f"Error fetching bookings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch bookings")

@api_router.get("/admin/subscribers")
async def get_newsletter_subscribers():
    try:
        subscribers = await db.newsletter_subscriptions.find({"status": "active"}).sort("subscribed_at", -1).to_list(1000)
        return {"success": True, "data": subscribers}
    except Exception as e:
        logging.error(f"Error fetching subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch subscribers")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
