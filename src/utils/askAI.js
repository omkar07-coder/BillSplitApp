import { GROQ_API_KEY } from '../config/keys';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama3-8b-8192';

const SYSTEM_PROMPT = `You are a helpful assistant for BillSplit, an app that helps Indian college students split bills and track expenses with friends.

Answer questions simply in 2-3 sentences. If asked anything unrelated to the app or finance, politely redirect back to the app.`;

/**
 * Send a message to Groq AI and get a response
 * @param {string} userMessage - The user's message
 * @param {Array} conversationHistory - Array of previous messages [{role: 'user'|'assistant', content: string}]
 * @returns {Promise<string>} - The AI's response
 */
export async function askAI(userMessage, conversationHistory = []) {
  console.log('=== DEBUG: Starting askAI function ===');
  console.log('User message:', userMessage);
  console.log('API Key exists:', !!GROQ_API_KEY);
  console.log('API Key length:', GROQ_API_KEY?.length);
  console.log('API Key starts with gsk_:', GROQ_API_KEY?.startsWith('gsk_'));
  
  // Check if running on web
  const isWeb = typeof window !== 'undefined' && window.document;
  
  if (isWeb) {
    console.warn('⚠️ Running on web platform - API calls may be blocked by CORS');
    console.warn('💡 For full functionality, test on Android/iOS: npm run android');
    
    // Return a helpful demo response for web testing
    return `I'm your AI assistant for BillSplit! 

Note: You're testing on web browser. Due to CORS restrictions, the actual Groq API cannot be called from localhost.

To test the real AI:
• Run on Android: npm run android
• Run on iOS: npm run ios

For now, I can help you understand the app:
• Tap "Add Expense" to split a bill
• Use "Create Group" to organize friends
• "Scan Bill" uses your camera for quick entry
• Track balances in "Activity"

What would you like to know?`;
  }
  
  try {
    // Check if API key is configured
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
      console.error('❌ Groq API key not configured');
      return "API key not configured. Please add your Groq API key in src/config/keys.js";
    }

    console.log('✅ API key validated');
    
    // Build messages array with system prompt, history, and new message
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    console.log('📤 Sending request to:', GROQ_API_URL);
    console.log('Model:', MODEL);
    console.log('Messages count:', messages.length);

    const requestBody = {
      model: MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 200,
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('❌ Error response data:', JSON.stringify(errorData, null, 2));
      } catch (e) {
        console.error('❌ Could not parse error response');
        errorData = { message: 'Unknown error' };
      }
      
      if (response.status === 401) {
        console.error('❌ 401 Unauthorized - Invalid API key');
        return "Invalid API key. Please check your Groq API key.";
      }
      
      if (response.status === 429) {
        console.error('❌ 429 Rate limit exceeded');
        return "Too many requests. Please wait a minute and try again.";
      }
      
      if (response.status === 400) {
        console.error('❌ 400 Bad request');
        return "Invalid request. Please try again.";
      }
      
      throw new Error(`API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('✅ Response received successfully');
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid response format:', data);
      throw new Error('Invalid response format');
    }

    const aiResponse = data.choices[0].message.content.trim();
    console.log('✅ AI Response:', aiResponse);
    console.log('=== DEBUG: askAI completed successfully ===');
    
    return aiResponse;
  } catch (error) {
    console.error('❌ ERROR in askAI:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
      if (isWeb) {
        return "⚠️ CORS Error: Cannot call API from web browser.\n\nTo test the real AI, run on mobile:\n• npm run android\n• npm run ios\n\nThe AI chat works perfectly on actual devices!";
      }
      return "Network error. Please check your internet connection.";
    }
    
    return "Sorry, couldn't connect. Check your internet and try again.";
  }
}
