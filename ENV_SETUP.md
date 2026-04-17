# Environment Variables Setup Guide

This guide explains how to set up environment variables for your Bill Split App.

## 📁 File Structure

```
BillSplitApp/
├── .env                    # Environment variables (NOT committed to git)
├── .env.example           # Example template (committed to git)
├── .gitignore             # Ignores .env file
└── src/
    └── config/
        └── keys.js        # Imports env variables
```

## 🔧 Setup Steps

### Step 1: Create .env File

A `.env` file has already been created in your project root. Open it and add your API key:

```bash
# .env
EXPO_PUBLIC_GROQ_API_KEY=gsk_your_actual_key_here
```

**Important Notes:**
- In Expo, environment variables MUST start with `EXPO_PUBLIC_` to be accessible
- No quotes needed around the value
- No spaces around the `=` sign
- Keep this file secret (already added to .gitignore)

### Step 2: Get Your Groq API Key

1. Visit [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for free (no credit card needed)
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)
5. Paste it in your `.env` file

### Step 3: Restart Your Development Server

**Important:** After adding/changing environment variables, you MUST restart:

```bash
# Stop the current server (Ctrl+C)
# Then restart with cache clear
npm start -- --reset-cache

# Or with Expo CLI
expo start -c
```

### Step 4: Verify It Works

1. Open the app
2. Tap "Ask AI" button
3. Send a message
4. You should get a response!

## 📝 Two Ways to Add API Key

### Method 1: Environment Variable (Recommended)

**Pros:**
- Secure (not committed to git)
- Easy to change without editing code
- Different keys for dev/production

**Setup:**
```bash
# .env file
EXPO_PUBLIC_GROQ_API_KEY=gsk_your_key_here
```

The `src/config/keys.js` file automatically reads this:
```javascript
export const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;
```

### Method 2: Hardcode in keys.js (Quick Testing)

**Pros:**
- Quick for testing
- No need to restart server

**Cons:**
- Less secure
- Easy to accidentally commit to git

**Setup:**
```javascript
// src/config/keys.js
export const GROQ_API_KEY = 'gsk_your_actual_key_here';
```

## 🔒 Security Best Practices

### ✅ DO:
- Add `.env` to `.gitignore` (already done)
- Use `EXPO_PUBLIC_` prefix for Expo apps
- Restart server after changing `.env`
- Create `.env.example` for team members

### ❌ DON'T:
- Commit `.env` file to git
- Share your API key publicly
- Hardcode keys in production
- Use keys without `EXPO_PUBLIC_` prefix in Expo

## 📋 .env.example Template

Create this file to help team members:

```bash
# .env.example
# Copy this to .env and add your actual keys

EXPO_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

## 🐛 Troubleshooting

### "API Key is undefined"

**Cause:** Environment variable not loaded

**Solutions:**
1. Check `.env` file exists in project root
2. Verify key starts with `EXPO_PUBLIC_`
3. Restart dev server with `npm start -- --reset-cache`
4. Check for typos in variable name

### "Invalid API Key" Error

**Cause:** Wrong or expired API key

**Solutions:**
1. Verify you copied the full key from Groq console
2. Check for extra spaces or quotes
3. Generate a new key if needed

### Changes Not Reflecting

**Cause:** Server cache

**Solution:**
```bash
# Always restart after changing .env
npm start -- --reset-cache
```

## 🌍 Multiple Environments

For different environments (dev, staging, production):

```bash
# .env.development
EXPO_PUBLIC_GROQ_API_KEY=gsk_dev_key_here

# .env.production
EXPO_PUBLIC_GROQ_API_KEY=gsk_prod_key_here
```

Then use:
```bash
# Development
EXPO_PUBLIC_ENV=development npm start

# Production
EXPO_PUBLIC_ENV=production npm start
```

## 📱 Platform-Specific Notes

### iOS
- Environment variables work automatically
- No extra configuration needed

### Android
- Environment variables work automatically
- No extra configuration needed

### Web
- Environment variables work automatically
- Accessible via `process.env.EXPO_PUBLIC_*`

## 🔍 Checking Environment Variables

Add this to any component to debug:

```javascript
console.log('API Key:', process.env.EXPO_PUBLIC_GROQ_API_KEY);
console.log('All env vars:', process.env);
```

## 📦 Alternative: expo-constants

If you need more complex configuration:

```bash
npm install expo-constants
```

Then use `app.json`:
```json
{
  "expo": {
    "extra": {
      "groqApiKey": "your_key_here"
    }
  }
}
```

Access in code:
```javascript
import Constants from 'expo-constants';
const apiKey = Constants.expoConfig.extra.groqApiKey;
```

## ✅ Verification Checklist

- [ ] `.env` file created in project root
- [ ] API key added with `EXPO_PUBLIC_` prefix
- [ ] `.env` added to `.gitignore`
- [ ] Development server restarted
- [ ] Chat feature tested and working

## 🆘 Still Having Issues?

1. Check [GROQ_API_SETUP.md](./GROQ_API_SETUP.md) for API-specific help
2. Verify your Groq API key is valid at [console.groq.com](https://console.groq.com)
3. Check console logs for error messages
4. Try hardcoding the key temporarily to isolate the issue

---

**Your API key is now secure and ready to use!** 🔐
