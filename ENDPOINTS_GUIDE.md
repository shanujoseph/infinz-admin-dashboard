# Frontend Endpoints and Features Guide

## Overview
This guide documents the new frontend endpoints and components created to integrate with the CashMate backend API.

## New Pages and Components

### 1. Employment Details (`/employment-details`)
**Purpose**: Manage user employment and income information

**Features**:
- View current employment status
- Edit employment details (employment type, income, company info)
- Support for different employment types (salaried, self-employed, business-owner, etc.)
- Conditional fields based on employment type

**API Endpoints Used**:
- `GET /api/v1/employment-details/` - Fetch employment details
- `PUT /api/v1/employment-details/` - Update employment details

### 2. Business Management (`/business-management`)
**Purpose**: Manage business loan applications and business details

**Features**:
- View all business applications
- Create new business applications
- Edit existing business details
- Statistics dashboard (total businesses, loan amounts, etc.)
- Filter and search functionality

**API Endpoints Used**:
- `GET /api/v1/business/list` - Get all businesses
- `POST /api/v1/business/create` - Create new business
- `GET /api/v1/business/details/:id` - Get business by ID
- `PUT /api/v1/business/update/:id` - Update business

### 3. Leads Management (`/leads-management`)
**Purpose**: Manage loan application leads and track their progress

**Features**:
- View all leads with filtering and search
- Create new leads
- Edit lead information
- Status tracking (pending, approved, rejected, reviewing)
- Statistics dashboard
- Search by name, city, mobile number, or application number

**API Endpoints Used**:
- `GET /api/v1/leads/` - Get all leads
- `POST /api/v1/leads/create` - Create new lead
- `GET /api/v1/leads/:id` - Get lead by ID
- `PUT /api/v1/leads/:id` - Update lead
- `GET /api/v1/leads/mobile/:mobileNumber` - Get leads by mobile number
- `GET /api/v1/leads/application/:applicationNumber` - Get lead by application number

### 4. User Profile (`/user-profile`)
**Purpose**: Enhanced user profile management with comprehensive user information

**Features**:
- View complete user profile
- Edit personal information
- Account statistics (pending/completed loans)
- Verification status display
- Profile overview with avatar and key information

**API Endpoints Used**:
- `GET /api/v1/users/me` - Get user details
- `PUT /api/v1/users/me` - Update user profile
- `GET /api/v1/users/home` - Get user home page data

## API Service Layer

### Location: `src/lib/api.ts`

**Features**:
- Centralized API client with error handling
- TypeScript interfaces for all data types
- Automatic cookie-based authentication
- Request/response interceptors
- Organized API functions by feature

**Key Components**:
- `ApiClient` class for HTTP requests
- Individual API modules (`employmentApi`, `businessApi`, `leadsApi`, `userApi`)
- TypeScript interfaces for all data models
- Error handling and retry logic

## Navigation Updates

### Updated Sidebar Menu
The sidebar navigation now includes:
- Dashboard
- Users
- User Profile (new)
- Loan Requests
- Employment Details (new)
- Business Management (new)
- Leads Management (new)

## Data Types and Interfaces

### EmploymentDetails
```typescript
interface EmploymentDetails {
  _id?: string;
  userId: string;
  netMonthlyIncome: string;
  companyOrBusinessName?: string;
  companyPinCode?: string;
  salarySlipDocument?: string;
  paymentMode?: string;
  employmentType: 'salaried' | 'self-employed' | 'business-owner' | 'unemployed' | 'other';
  createdAt?: string;
  updatedAt?: string;
}
```

### Business
```typescript
interface Business {
  _id?: string;
  businessType: string;
  turnover: string;
  loanAmount: string;
  mobileNumber: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Lead
```typescript
interface Lead {
  _id?: string;
  name: string;
  city: string;
  pincode: string;
  loanType: string;
  amount: string;
  tenure: string;
  mobileNumber: string;
  status: string;
  applicationNumber: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## Environment Configuration

### Required Environment Variables
Create a `.env` file in the project root with:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Features Implemented

### 1. Real-time Data Loading
- All components use React Query for efficient data fetching
- Automatic cache invalidation on mutations
- Loading states and error handling

### 2. Form Management
- Controlled forms with validation
- Edit/view modes for data management
- Form state management with proper reset functionality

### 3. UI/UX Enhancements
- Modern card-based layouts
- Statistics dashboards with key metrics
- Search and filtering capabilities
- Responsive design for all screen sizes
- Loading states and error boundaries

### 4. Data Visualization
- Statistics cards showing key metrics
- Status badges with color coding
- Progress indicators and counters
- Date formatting and currency display

## Usage Instructions

### 1. Start the Backend
```bash
cd cashmate-backend
npm run dev
```

### 2. Start the Frontend
```bash
cd credito-insight-dashboard-main
npm run dev
```

### 3. Access the Application
- Navigate to `http://localhost:8080`
- Login with admin credentials
- Use the sidebar to navigate to different sections

## Authentication
The application uses cookie-based authentication. Make sure the backend is configured to accept requests from the frontend domain and includes proper CORS settings.

## Error Handling
- Network errors are handled gracefully
- User-friendly error messages
- Retry mechanisms for failed requests
- Fallback UI states for loading and error conditions

## Performance Optimizations
- React Query for efficient data caching
- Lazy loading of components
- Optimized re-renders with proper dependency arrays
- Debounced search inputs
- Pagination-ready data structures
