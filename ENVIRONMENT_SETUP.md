# Environment Configuration Guide

## Overview
The frontend application now uses environment variables for configuration instead of hardcoded values. This allows for easy configuration across different environments (development, staging, production).

## Environment File Setup

### 1. Create Environment File
Create a `.env` file in the root directory of your frontend project:

```bash
# Navigate to the frontend directory
cd credito-insight-dashboard-main

# Create the .env file
touch .env
```

### 2. Environment Variables

Add the following variables to your `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1

# Application Configuration
VITE_APP_NAME=Credito Insight Dashboard
VITE_APP_VERSION=1.0.0

# Environment Settings
VITE_APP_ENV=development

# Feature Flags (Optional)
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
```

## Configuration Details

### Required Variables

#### `VITE_API_BASE_URL`
- **Description**: Base URL for the backend API
- **Default**: `http://localhost:3000/api/v1`
- **Example**: `http://localhost:3000/api/v1`
- **Production**: `https://your-api-domain.com/api/v1`

### Optional Variables

#### `VITE_APP_NAME`
- **Description**: Application name displayed in the UI
- **Default**: `Credito Insight Dashboard`

#### `VITE_APP_VERSION`
- **Description**: Application version
- **Default**: `1.0.0`

#### `VITE_APP_ENV`
- **Description**: Environment type (development, staging, production)
- **Default**: `development`

#### `VITE_ENABLE_DEBUG`
- **Description**: Enable debug logging
- **Default**: `false`
- **Values**: `true` or `false`

#### `VITE_ENABLE_ANALYTICS`
- **Description**: Enable analytics tracking
- **Default**: `false`
- **Values**: `true` or `false`

## Environment-Specific Configurations

### Development Environment
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_ENV=development
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
```

### Staging Environment
```env
VITE_API_BASE_URL=https://staging-api.yourdomain.com/api/v1
VITE_APP_ENV=staging
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=true
```

### Production Environment
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_APP_ENV=production
VITE_ENABLE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
```

## Configuration Usage

### In Code
The configuration is accessed through the config object:

```typescript
import { config } from '@/config/env';

// Use API base URL
const apiUrl = config.API_BASE_URL;

// Check environment
if (config.APP_ENV === 'development') {
  console.log('Development mode');
}

// Use feature flags
if (config.ENABLE_DEBUG) {
  console.log('Debug logging enabled');
}
```

### Environment Validation
The application automatically validates required environment variables on startup:

```typescript
import { validateEnv } from '@/config/env';

// Validate environment variables
validateEnv();
```

## Backend Port Configuration

### Common Backend Ports
- **Development**: `http://localhost:3000`
- **Alternative**: `http://localhost:8080`
- **Custom**: `http://localhost:YOUR_PORT`

### Update Your .env File
If your backend runs on a different port, update the `VITE_API_BASE_URL`:

```env
# For backend running on port 8080
VITE_API_BASE_URL=http://localhost:8080/api/v1

# For backend running on port 5000
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Security Considerations

### 1. Never Commit .env Files
Add `.env` to your `.gitignore` file:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 2. Use .env.example
Create a `.env.example` file with placeholder values:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1

# Application Configuration
VITE_APP_NAME=Your App Name
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

### 3. Production Deployment
For production deployment, set environment variables in your hosting platform:

#### Vercel
```bash
vercel env add VITE_API_BASE_URL
```

#### Netlify
```bash
netlify env:set VITE_API_BASE_URL "https://your-api-domain.com/api/v1"
```

#### Docker
```dockerfile
ENV VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

## Troubleshooting

### 1. Environment Variables Not Loading
- Ensure the `.env` file is in the root directory
- Restart the development server after creating/updating `.env`
- Check that variable names start with `VITE_`

### 2. API Connection Issues
- Verify the `VITE_API_BASE_URL` is correct
- Ensure the backend is running on the specified port
- Check CORS configuration in your backend

### 3. Build Issues
- Environment variables are embedded at build time
- Update environment variables and rebuild for changes to take effect

## Quick Setup Commands

### 1. Create Environment File
```bash
# Create .env file
echo "VITE_API_BASE_URL=http://localhost:3000/api/v1" > .env
echo "VITE_APP_NAME=Credito Insight Dashboard" >> .env
echo "VITE_APP_VERSION=1.0.0" >> .env
echo "VITE_APP_ENV=development" >> .env
```

### 2. Verify Configuration
```bash
# Check if .env file exists
ls -la .env

# View .env file contents
cat .env
```

### 3. Start Development Server
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration Validation

The application includes automatic validation of environment variables. If required variables are missing, you'll see warnings in the console:

```
⚠️ Missing environment variables: ['VITE_API_BASE_URL']
⚠️ Please create a .env file with the required variables
```

## Next Steps

1. **Create your `.env` file** with the appropriate values
2. **Update the API base URL** to match your backend port
3. **Restart the development server** to load the new configuration
4. **Test the application** to ensure API connectivity works
5. **Set up production environment variables** when deploying

Your application is now properly configured to use environment variables instead of hardcoded values! 🎉
