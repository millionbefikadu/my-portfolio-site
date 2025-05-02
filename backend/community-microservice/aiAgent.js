const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const CommunityPost = require('./models/CommunityPost');
const Interaction = require('./models/Interaction');
require('dotenv').config();


const API_KEY = process.env.GEMINI_API_KEY;

// Helper: Generate context from community posts
const buildContext = async () => {
  const posts = await CommunityPost.find();
  return posts.map(post =>
    `Title: ${post.title}\nContent: ${post.content}\nCategory: ${post.category}`
  ).join('\n\n');
};

// AI Main Function
async function runCommunityAI(userInput) {
  try {
    const context = await buildContext();

    const prompt = `
You are a helpful AI assistant for a local community platform.
Use the following community discussions to answer the user's question in a meaningful way.
If you can't find a relevant post, respond politely and ask for clarification.

Community Posts:
${context}

User Question: ${userInput}
AI Answer:
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return {
        text: `AI Error: ${errText}`,
        suggestedQuestions: [],
        retrievedPosts: []
      };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No meaningful response.";

    return {
      text,
      suggestedQuestions: [
        "What events are happening nearby?",
        "How can I volunteer in my neighborhood?",
        "What are common concerns in recent posts?"
      ],
      retrievedPosts: [] // You can later push matched posts here if needed
    };
  } catch (err) {
    console.error('AI Exception:', err.message);
    return {
      text: 'Internal server error. Please try again later.',
      suggestedQuestions: [],
      retrievedPosts: []
    };
  }
}

module.exports = { runCommunityAI };
