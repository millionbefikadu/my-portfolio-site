const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const millionProfile = require('../data/memory'); // ✅ Import from memory.js

const getMillionGPTResponse = async (question) => {
  const prompt = `
You are MillionGPT, an AI version of Million Eshetu.

${millionProfile}

💬 Please respond as Million, using his real experience and voice.

User: ${question}
MillionGPT:
`;

 try {
  const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    }),
  }
);
    if (!response.ok) {
      const errText = await response.text();
      console.error('❌ Gemini API Error:', errText);
      return 'AI Error: Could not generate a response.';
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No meaningful response.';
  } catch (err) {
    console.error('❌ AI Exception:', err.message);
    return 'Internal server error. Please try again later.';
  }
};

module.exports = { getMillionGPTResponse };
