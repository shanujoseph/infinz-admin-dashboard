# Environment Variables Troubleshooting Guide

## Issue: Environment Variables Not Loading

If your `.env` file values are not being picked up by the application, follow these troubleshooting steps:

## 🔍 **Step 1: Verify .env File Location**

The `.env` file must be in the **root directory** of your frontend project:

```
credito-insight-dashboard-main/
├── .env                    ← Must be here (root directory)
├── package.json
├── src/
├── public/
└── ...
```

**❌ Wrong locations:**
- `src/.env` (inside src folder)
- `credito-insight-dashboard-main/credito-insight-dashboard-main/.env` (nested folder)

## 🔍 **Step 2: Check .env File Format**

Your `.env` file should look exactly like this:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Credito Insight Dashboard
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

**❌ Common mistakes:**
- Missing `VITE_` prefix
- Extra spaces around `=`
- Quotes around values (not needed)
- Comments on same line as variables

## 🔍 **Step 3: Restart Development Server**

After creating/updating `.env` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

**Important:** Environment variables are loaded when the server starts, so you must restart!

## 🔍 **Step 4: Check Browser Console**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for these messages:

**✅ Success messages:**
- No environment variable warnings
- API calls working correctly

**❌ Error messages:**
- "Missing environment variables: ['VITE_API_BASE_URL']"
- Network errors with wrong API URL

## 🔍 **Step 5: Use Debug Component**

I've added a debug component that shows environment info in the bottom-right corner. It will display:

- Current API Base URL
- App configuration
- Raw environment variables
- Whether variables are loaded

## 🔍 **Step 6: Verify File Contents**

Check your `.env` file contents:

```bash
# Navigate to frontend directory
cd credito-insight-dashboard-main

# View .env file contents
cat .env

# Or on Windows
type .env
```

## 🔍 **Step 7: Check for Hidden Characters**

Sometimes `.env` files have hidden characters. Recreate the file:

```bash
# Delete existing .env
rm .env

# Create new .env file
echo "VITE_API_BASE_URL=http://localhost:3000/api/v1" > .env
echo "VITE_APP_NAME=Credito Insight Dashboard" >> .env
echo "VITE_APP_VERSION=1.0.0" >> .env
echo "VITE_APP_ENV=development" >> .env
```

## 🔍 **Step 8: Check Vite Configuration**

Ensure your `vite.config.ts` doesn't override environment variables:

```typescript
// vite.config.ts should NOT have hardcoded API URLs
export default defineConfig({
  // ... other config
  // Don't override env vars here
});
```

## 🔍 **Step 9: Test Environment Loading**

Add this temporary code to test if environment variables are loading:

```typescript
// Add this to any component temporarily
console.log('Environment check:', {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  allEnv: import.meta.env
});
```

## 🔍 **Step 10: Check Network Tab**

1. Open browser DevTools
2. Go to Network tab
3. Try to login or make an API call
4. Check if the request URL is correct

**Expected:** `http://localhost:3000/api/v1/admin/login`
**Wrong:** `http://localhost:8085/api/v1/admin/login` (old hardcoded value)

## 🛠️ **Common Solutions**

### Solution 1: File Location Issue
```bash
# Make sure you're in the right directory
cd credito-insight-dashboard-main
ls -la .env  # Should show the file exists
```

### Solution 2: Restart Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Solution 3: Clear Cache
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Solution 4: Recreate .env File
```bash
# Remove old file
rm .env

# Create new file with correct content
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Credito Insight Dashboard
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
EOF
```

## 🔍 **Debug Steps Summary**

1. ✅ Check `.env` file is in root directory
2. ✅ Verify file format (VITE_ prefix, no spaces)
3. ✅ Restart development server
4. ✅ Check browser console for errors
5. ✅ Use debug component to see current values
6. ✅ Verify file contents with `cat .env`
7. ✅ Check Network tab for correct API URLs

## 🚨 **Emergency Fix**

If nothing works, temporarily hardcode the URL in the config file:

```typescript
// src/config/env.ts - TEMPORARY FIX
export const config = {
  API_BASE_URL: 'http://localhost:3000/api/v1', // Hardcoded temporarily
  // ... rest of config
};
```

Then fix the environment loading issue and remove the hardcoded value.

## 📞 **Still Not Working?**

If you're still having issues:

1. **Share your .env file contents** (remove sensitive data)
2. **Share browser console errors**
3. **Share the debug component output**
4. **Confirm your backend is running on the correct port**

The debug component I added will help identify exactly what's happening with your environment variables!
