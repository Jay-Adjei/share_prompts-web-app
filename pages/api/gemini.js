import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat();

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();

    // Send JSON response
    res.status(200).json({ message: text });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ error: 'Failed to fetch response from Gemini API' });
  }
}
