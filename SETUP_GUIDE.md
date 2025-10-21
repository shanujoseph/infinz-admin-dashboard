# Login Implementation Setup Guide

## Overview
The login functionality has been implemented to connect with your CashMate backend API. This guide will help you set up and use the authentication system.

## Backend Configuration

### 1. Environment Variables
Make sure your backend `.env` file contains the admin credentials:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-admin-password
```

### 2. Backend Endpoints Used
- `POST /api/v1/admin/login` - Admin authentication
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/loans` - Get all loans
- `GET /api/v1/admin/dashboard-stats` - Get dashboard statistics

## Frontend Configuration

### 1. Environment Variables
Create a `.env` file in the frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 2. Authentication Flow
1. **Login Process**:
   - User enters admin email and password
   - Frontend sends credentials to `/api/v1/admin/login`
   - Backend validates against `ADMIN_EMAIL` and `ADMIN_PASSWORD`
   - On success, backend returns JWT token
   - Frontend stores token in localStorage as `adminToken`

2. **Token Usage**:
   - All subsequent API requests include the token in Authorization header
   - Format: `Authorization: Bearer <token>`
   - Token expires after 7 days (configurable in backend)

3. **Protected Routes**:
   - All dashboard pages require authentication
   - If no token is found, user is redirected to login
   - Token is checked on app initialization

## Features Implemented

### 1. Login Page (`/login`)
- **Real API Integration**: Connects to backend admin login endpoint
- **Form Validation**: Validates email and password fields
- **Loading States**: Shows spinner during authentication
- **Error Handling**: Displays user-friendly error messages
- **Success Flow**: Redirects to dashboard on successful login

### 2. Dashboard (`/dashboard`)
- **Real Data**: Fetches statistics from backend
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Displays error message if data fetch fails
- **Statistics Cards**: Shows total users, pending requests, approved loans, total amount

### 3. Users Page (`/users`)
- **Real User Data**: Fetches users from backend API
- **Search & Filter**: Filter by name, email, phone number
- **Status Display**: Shows user verification status
- **User Details**: Displays real user information from database

### 4. API Service Layer
- **Centralized Authentication**: All API calls include auth token
- **Error Handling**: Consistent error handling across all requests
- **TypeScript Support**: Fully typed API responses
- **Retry Logic**: Automatic retry on failed requests

## Usage Instructions

### 1. Start Backend
```bash
cd cashmate-backend
npm run dev
```

### 2. Start Frontend
```bash
cd credito-insight-dashboard-main
npm run dev
```

### 3. Access Application
1. Navigate to `http://localhost:8080`
2. You'll be redirected to login page
3. Enter the admin credentials from your backend `.env` file
4. Click "Sign In"
5. You'll be redirected to the dashboard with real data

## Security Features

### 1. Token-Based Authentication
- JWT tokens with 7-day expiration
- Secure token storage in localStorage
- Automatic token inclusion in API requests

### 2. Protected Routes
- All dashboard pages require authentication
- Automatic redirect to login if not authenticated
- Token validation on app initialization

### 3. Error Handling
- Graceful handling of authentication failures
- User-friendly error messages
- Automatic retry mechanisms

## Troubleshooting

### 1. Login Issues
- **Check Backend**: Ensure backend is running on correct port
- **Check Credentials**: Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in backend `.env`
- **Check CORS**: Ensure backend allows requests from frontend domain
- **Check Network**: Verify API base URL in frontend `.env`

### 2. Data Loading Issues
- **Check Authentication**: Ensure you're logged in with valid token
- **Check Backend**: Verify backend endpoints are working
- **Check Console**: Look for error messages in browser console
- **Check Network Tab**: Verify API requests are being made

### 3. Common Errors
- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Insufficient permissions
- **500 Internal Server Error**: Backend server error
- **Network Error**: Backend not running or CORS issues

## API Response Format

### Login Success Response
```json
{
  "success": true,
  "status": 200,
  "message": "Admin login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login Error Response
```json
{
  "success": false,
  "status": 401,
  "message": "Invalid admin credentials"
}
```

## Next Steps

1. **Customize Admin Credentials**: Change the default admin email and password
2. **Add Role-Based Access**: Implement different permission levels
3. **Add Session Management**: Implement token refresh mechanism
4. **Add Logout**: Implement proper logout functionality
5. **Add Password Reset**: Implement admin password reset feature

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify backend is running and accessible
3. Check network requests in browser dev tools
4. Ensure all environment variables are set correctly
