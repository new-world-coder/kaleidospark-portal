#!/usr/bin/env python3
"""
KaleidoSpark Backend API Test Suite
Tests all backend API endpoints for functionality, validation, and data persistence.
"""

import requests
import json
import uuid
from datetime import datetime, date, timedelta
import sys
import os

# Get backend URL from frontend .env file
BACKEND_URL = "https://spark-strategy.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}=== {test_name} ==={Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✓ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}✗ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠ {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ {message}{Colors.ENDC}")

class KaleidoSparkAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.test_results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }

    def log_result(self, test_name, success, message=""):
        if success:
            self.test_results['passed'] += 1
            print_success(f"{test_name}: {message}")
        else:
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"{test_name}: {message}")
            print_error(f"{test_name}: {message}")

    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        print_test_header("Health Check Endpoint")
        
        try:
            response = self.session.get(f"{API_BASE}/")
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_result("Health Check", True, f"API is running - {data['message']}")
                    return True
                else:
                    self.log_result("Health Check", False, "Response missing required fields")
            else:
                self.log_result("Health Check", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_result("Health Check", False, f"Exception: {str(e)}")
            
        return False

    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        print_test_header("Contact Form - Valid Submission")
        
        valid_payload = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "company": "Test Corp",
            "role": "CEO",
            "message": "This is a test message with more than 10 characters for validation",
            "interest": "ai-strategy"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/contact", json=valid_payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "submission_id" in data.get("data", {}):
                    self.log_result("Contact Form Valid", True, "Contact form submitted successfully")
                    return data["data"]["submission_id"]
                else:
                    self.log_result("Contact Form Valid", False, "Invalid response format")
            else:
                self.log_result("Contact Form Valid", False, f"Status code: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("Contact Form Valid", False, f"Exception: {str(e)}")
            
        return None

    def test_contact_form_validation(self):
        """Test POST /api/contact with invalid data"""
        print_test_header("Contact Form - Validation Tests")
        
        # Test missing required fields
        invalid_payloads = [
            ({}, "Empty payload"),
            ({"name": "John"}, "Missing email, company, message"),
            ({"name": "A", "email": "john@example.com", "company": "Test", "message": "Short"}, "Name too short, message too short"),
            ({"name": "John Doe", "email": "invalid-email", "company": "Test Corp", "message": "This is a valid message"}, "Invalid email format"),
            ({"name": "John Doe", "email": "john@example.com", "company": "A", "message": "This is a valid message"}, "Company name too short")
        ]
        
        for payload, description in invalid_payloads:
            try:
                response = self.session.post(f"{API_BASE}/contact", json=payload)
                
                if response.status_code == 422:  # Validation error
                    self.log_result(f"Contact Validation ({description})", True, "Validation error returned correctly")
                else:
                    self.log_result(f"Contact Validation ({description})", False, f"Expected 422, got {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Contact Validation ({description})", False, f"Exception: {str(e)}")

    def test_discovery_call_valid(self):
        """Test POST /api/book-call with valid data"""
        print_test_header("Discovery Call - Valid Booking")
        
        future_date = (date.today() + timedelta(days=7)).isoformat()
        valid_payload = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "company": "Tech Corp",
            "preferred_date": future_date,
            "preferred_time": "14:00",
            "timezone": "EST"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/book-call", json=valid_payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "booking_id" in data.get("data", {}):
                    self.log_result("Discovery Call Valid", True, "Discovery call booked successfully")
                    return data["data"]["booking_id"]
                else:
                    self.log_result("Discovery Call Valid", False, "Invalid response format")
            else:
                self.log_result("Discovery Call Valid", False, f"Status code: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("Discovery Call Valid", False, f"Exception: {str(e)}")
            
        return None

    def test_discovery_call_validation(self):
        """Test POST /api/book-call with invalid data"""
        print_test_header("Discovery Call - Validation Tests")
        
        past_date = (date.today() - timedelta(days=1)).isoformat()
        today_date = date.today().isoformat()
        
        invalid_payloads = [
            ({"name": "Jane", "email": "jane@example.com", "company": "Tech", "preferred_date": past_date, "preferred_time": "14:00", "timezone": "EST"}, "Past date"),
            ({"name": "Jane", "email": "jane@example.com", "company": "Tech", "preferred_date": today_date, "preferred_time": "14:00", "timezone": "EST"}, "Today's date"),
            ({"name": "A", "email": "jane@example.com", "company": "Tech Corp", "preferred_date": "2025-12-25", "preferred_time": "14:00", "timezone": "EST"}, "Name too short"),
            ({"name": "Jane Smith", "email": "invalid-email", "company": "Tech Corp", "preferred_date": "2025-12-25", "preferred_time": "14:00", "timezone": "EST"}, "Invalid email")
        ]
        
        for payload, description in invalid_payloads:
            try:
                response = self.session.post(f"{API_BASE}/book-call", json=payload)
                
                if response.status_code == 422:  # Validation error
                    self.log_result(f"Discovery Call Validation ({description})", True, "Validation error returned correctly")
                else:
                    self.log_result(f"Discovery Call Validation ({description})", False, f"Expected 422, got {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Discovery Call Validation ({description})", False, f"Exception: {str(e)}")

    def test_newsletter_subscription_valid(self):
        """Test POST /api/newsletter/subscribe with valid data"""
        print_test_header("Newsletter Subscription - Valid")
        
        valid_payload = {
            "email": f"newsletter.{uuid.uuid4().hex[:8]}@example.com"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=valid_payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_result("Newsletter Subscription Valid", True, "Newsletter subscription successful")
                    return valid_payload["email"]
                else:
                    self.log_result("Newsletter Subscription Valid", False, "Invalid response format")
            else:
                self.log_result("Newsletter Subscription Valid", False, f"Status code: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("Newsletter Subscription Valid", False, f"Exception: {str(e)}")
            
        return None

    def test_newsletter_duplicate_subscription(self):
        """Test duplicate newsletter subscription"""
        print_test_header("Newsletter Subscription - Duplicate Test")
        
        email = f"duplicate.{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": email}
        
        try:
            # First subscription
            response1 = self.session.post(f"{API_BASE}/newsletter/subscribe", json=payload)
            
            if response1.status_code == 200:
                # Second subscription (duplicate)
                response2 = self.session.post(f"{API_BASE}/newsletter/subscribe", json=payload)
                
                if response2.status_code == 200:
                    data = response2.json()
                    if data.get("success") and "already subscribed" in data.get("message", "").lower():
                        self.log_result("Newsletter Duplicate", True, "Duplicate subscription handled correctly")
                    else:
                        self.log_result("Newsletter Duplicate", False, "Duplicate not detected properly")
                else:
                    self.log_result("Newsletter Duplicate", False, f"Second subscription failed: {response2.status_code}")
            else:
                self.log_result("Newsletter Duplicate", False, f"First subscription failed: {response1.status_code}")
                
        except Exception as e:
            self.log_result("Newsletter Duplicate", False, f"Exception: {str(e)}")

    def test_newsletter_validation(self):
        """Test POST /api/newsletter/subscribe with invalid data"""
        print_test_header("Newsletter Subscription - Validation")
        
        invalid_payloads = [
            ({}, "Empty payload"),
            ({"email": "invalid-email"}, "Invalid email format"),
            ({"email": ""}, "Empty email")
        ]
        
        for payload, description in invalid_payloads:
            try:
                response = self.session.post(f"{API_BASE}/newsletter/subscribe", json=payload)
                
                if response.status_code == 422:  # Validation error
                    self.log_result(f"Newsletter Validation ({description})", True, "Validation error returned correctly")
                else:
                    self.log_result(f"Newsletter Validation ({description})", False, f"Expected 422, got {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Newsletter Validation ({description})", False, f"Exception: {str(e)}")

    def test_event_registration_valid(self):
        """Test POST /api/events/{event_id}/register with valid data"""
        print_test_header("Event Registration - Valid")
        
        event_id = "test-event-2025"
        valid_payload = {
            "name": "Bob Johnson",
            "email": f"bob.{uuid.uuid4().hex[:8]}@example.com",
            "company": "AI Corp"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/events/{event_id}/register", json=valid_payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "registration_id" in data.get("data", {}):
                    self.log_result("Event Registration Valid", True, "Event registration successful")
                    return data["data"]["registration_id"]
                else:
                    self.log_result("Event Registration Valid", False, "Invalid response format")
            else:
                self.log_result("Event Registration Valid", False, f"Status code: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("Event Registration Valid", False, f"Exception: {str(e)}")
            
        return None

    def test_event_registration_duplicate(self):
        """Test duplicate event registration"""
        print_test_header("Event Registration - Duplicate Test")
        
        event_id = "test-event-duplicate"
        email = f"duplicate.event.{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Bob Johnson",
            "email": email,
            "company": "AI Corp"
        }
        
        try:
            # First registration
            response1 = self.session.post(f"{API_BASE}/events/{event_id}/register", json=payload)
            
            if response1.status_code == 200:
                # Second registration (duplicate)
                response2 = self.session.post(f"{API_BASE}/events/{event_id}/register", json=payload)
                
                if response2.status_code == 200:
                    data = response2.json()
                    if data.get("success") and "already registered" in data.get("message", "").lower():
                        self.log_result("Event Registration Duplicate", True, "Duplicate registration handled correctly")
                    else:
                        self.log_result("Event Registration Duplicate", False, "Duplicate not detected properly")
                else:
                    self.log_result("Event Registration Duplicate", False, f"Second registration failed: {response2.status_code}")
            else:
                self.log_result("Event Registration Duplicate", False, f"First registration failed: {response1.status_code}")
                
        except Exception as e:
            self.log_result("Event Registration Duplicate", False, f"Exception: {str(e)}")

    def test_admin_endpoints(self):
        """Test admin endpoints for data retrieval"""
        print_test_header("Admin Endpoints")
        
        admin_endpoints = [
            ("/admin/contacts", "Contact Submissions"),
            ("/admin/bookings", "Discovery Call Bookings"),
            ("/admin/subscribers", "Newsletter Subscribers")
        ]
        
        for endpoint, description in admin_endpoints:
            try:
                response = self.session.get(f"{API_BASE}{endpoint}")
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and "data" in data:
                        self.log_result(f"Admin {description}", True, f"Retrieved {len(data['data'])} records")
                    else:
                        self.log_result(f"Admin {description}", False, "Invalid response format")
                else:
                    self.log_result(f"Admin {description}", False, f"Status code: {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Admin {description}", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all test suites"""
        print(f"{Colors.BOLD}{Colors.BLUE}KaleidoSpark Backend API Test Suite{Colors.ENDC}")
        print(f"Testing API at: {API_BASE}")
        print("=" * 60)
        
        # Test health check first
        if not self.test_health_check():
            print_error("Health check failed - API may not be accessible")
            return False
        
        # Test all endpoints
        self.test_contact_form_valid()
        self.test_contact_form_validation()
        
        self.test_discovery_call_valid()
        self.test_discovery_call_validation()
        
        self.test_newsletter_subscription_valid()
        self.test_newsletter_duplicate_subscription()
        self.test_newsletter_validation()
        
        self.test_event_registration_valid()
        self.test_event_registration_duplicate()
        
        self.test_admin_endpoints()
        
        # Print summary
        self.print_summary()
        
        return self.test_results['failed'] == 0

    def print_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 60)
        print(f"{Colors.BOLD}TEST SUMMARY{Colors.ENDC}")
        print("=" * 60)
        
        total_tests = self.test_results['passed'] + self.test_results['failed']
        
        if self.test_results['failed'] == 0:
            print_success(f"All {total_tests} tests passed! ✨")
        else:
            print_error(f"{self.test_results['failed']} out of {total_tests} tests failed")
            
            print(f"\n{Colors.RED}{Colors.BOLD}Failed Tests:{Colors.ENDC}")
            for error in self.test_results['errors']:
                print(f"  • {error}")
        
        print(f"\n{Colors.GREEN}Passed: {self.test_results['passed']}{Colors.ENDC}")
        print(f"{Colors.RED}Failed: {self.test_results['failed']}{Colors.ENDC}")
        print(f"{Colors.BLUE}Total: {total_tests}{Colors.ENDC}")

if __name__ == "__main__":
    tester = KaleidoSparkAPITester()
    success = tester.run_all_tests()
    
    if not success:
        sys.exit(1)
    else:
        print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 All tests completed successfully!{Colors.ENDC}")