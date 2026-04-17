# Groq API Setup Guide

This guide will help you set up the free Groq API for the AI chat feature in your Bill Split App.

## What is Groq?

Groq provides FREE access to fast AI models including Llama 3. No credit card required!

## Setup Steps

### 1. Get Your Free API Key

1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account (use Google/GitHub or email)
3. Go to [API Keys](https://console.groq.com/keys)
4. Click "Create API Key"
5. Give it a name (e.g., "BillSplit App")
6. Copy the API key (starts with `gsk_...`)

### 2. Add API Key to Your App

1. Open `src/config/keys.js`
2. Replace `'your_groq_api_key_here'` with your actual API key:

```javascript
export const GROQ_API_KEY = 'gsk_your_actual_key_here';
```

### 3. Test the Chat Feature

1. Start your app: `npm start`
2. Navigate to Home screen
3. Tap "Ask AI" button
4. Try one of the suggestion chips or type a question
5. You should get a response within 1-2 seconds!

## Features

✅ **Free Forever** - No credit card, no payment required
✅ **Fast Responses** - Groq is optimized for speed
✅ **Context Memory** - AI remembers conversation history
✅ **Simple Integration** - Just one API call with fetch()
✅ **Error Handling** - Friendly error messages if connection fails

## API Details

- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Model**: `llama3-8b-8192` (8B parameters, 8K context window)
- **Rate Limits**: 30 requests/minute (free tier)
- **Max Tokens**: 200 per response (keeps answers concise)

## How It Works

1. User types a message
2. App sends message + conversation history to Groq API
3. AI generates response based on system prompt
4. Response appears in chat bubble
5. Conversation history is maintained for context

## System Prompt

The AI is instructed to:
- Help with BillSplit app questions
- Answer in 2-3 sentences
- Focus on bill splitting and expense tracking
- Redirect off-topic questions back to the app

## Troubleshooting

### "Sorry, couldn't connect" Error

**Possible causes:**
1. No internet connection
2. Invalid API key
3. Rate limit exceeded (wait 1 minute)
4. Groq API is down (rare)

**Solutions:**
- Check your internet connection
- Verify API key in `src/config/keys.js`
- Wait a minute if you sent many requests
- Check [Groq Status](https://status.groq.com)

### API Key Not Working

1. Make sure you copied the full key (starts with `gsk_`)
2. Check for extra spaces or quotes
3. Regenerate a new key if needed

### Slow Responses

- Groq is usually very fast (< 2 seconds)
- If slow, check your internet speed
- Try again in a few minutes

## Example Conversations

**User**: "How do I split a bill?"
**AI**: "Tap 'Add Expense' on the home screen, enter the bill amount, select the people to split with, and the app will automatically calculate how much each person owes. You can also scan a bill using the camera for automatic detection."

**User**: "How do I create a group?"
**AI**: "Tap 'Create Group' from the home screen, give your group a name and emoji, then add members by typing their names. Once created, you can track all expenses for that group in one place."

## Privacy & Security

- API key is stored locally in your app
- Never commit `keys.js` to public repositories
- Add `src/config/keys.js` to `.gitignore`
- Conversations are not stored permanently (only in app memory)

## Free Tier Limits

- **30 requests/minute** - More than enough for normal use
- **14,400 requests/day** - Plenty for a college app
- **No expiration** - Free forever!

## Alternative Models

You can change the model in `src/utils/askAI.js`:

```javascript
const MODEL = 'llama3-8b-8192';  // Current (fast, good quality)
// const MODEL = 'llama3-70b-8192';  // Slower but smarter
// const MODEL = 'mixtral-8x7b-32768';  // Longer context (32K tokens)
```

## Support

- Groq Documentation: [https://console.groq.com/docs](https://console.groq.com/docs)
- Groq Discord: [https://groq.com/discord](https://groq.com/discord)

---

**Ready to chat!** 🚀 Your AI assistant is now powered by Groq's lightning-fast LLMs.
