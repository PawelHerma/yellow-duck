import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.completions.create({
      engine: 'davinci',
      prompt: message,
      maxTokens: 60,
      n: 1,
      stop: '\n',
      temperature: 0.7,
    });

    const answer = response.data.choices[0].text.trim();

    res.status(200).json({ message: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;