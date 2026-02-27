/**
 * AI Service for communicating with OpenRouter (Liquid/LFM Model)
 * STRICT ENFORCEMENT: No fear, no absolute predictions, no medical/legal advice.
 */

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Default System Prompt
const SYSTEM_PROMPT = `
You are a calm, mystical, and supportive AI Palm Reader and Astrologer. 
Your goal is to provide spiritual guidance, self-reflection, and symbolic interpretation.

STRICT RULES:
1. NEVER predict death, severe illness, legal outcomes, or lottery numbers.
2. NEVER give medical, legal, or financial advice.
3. ALWAYS use soft, empowering, and metaphorical language (e.g., "energy," "potential," "path").
4. If a user asks a dangerous question, gently redirect to self-reflection.
5. Your tone must be: Mystical, Ancient, yet Modern and Empathetic.
6. Provide long-form, structured answers (3-4 paragraphs minimum).
7. Format output with clear sections if applicable.

Focus on: Personal growth, emotional insight, and cosmic possibilities.
`;

/**
 * Send a text-based prompt to the AI.
 * @param {string} userMessage - The user's question or context.
 * @param {string} language - The user's selected language (e.g., 'en', 'hi').
 * @param {object} userContext - Basic user info (Name, Zodiac) for personalization.
 */
export const getAiGuidance = async (userMessage, language = 'en', userContext = {}) => {
  if (!API_KEY) {
    console.error("Missing OpenRouter API Key");
    return "The stars are currently clouded (API Key Missing). Please try again later.";
  }

  const userContextString = `
    User Name: ${userContext.name || 'Seeker'}
    Zodiac: ${userContext.zodiacSign || 'Unknown'}
    Language: ${language} (Reply in this language only)
  `;

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "system", content: `Context: ${userContextString}` },
    { role: "user", content: userMessage }
  ];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, 
        "X-Title": "AI Palm Reader PWA"
      },
      body: JSON.stringify({
        model: "liquid/lfm-2.5-1.2b-thinking:free", // Using free reasoning model
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`AI API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("AI Guidance Error:", error);
    return "The cosmic connection is weak right now. Please breathe and try again in a moment.";
  }
};
