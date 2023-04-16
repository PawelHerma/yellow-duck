import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);
router.route('/').get((req,res)=>{
  res.status(200).json({message:"Routes"})
  })
router.post('/chat', async (req, res) => {
  try {
    const prompt = req.body;
    
    const response = await openai.createCompletion({
      model: "text-ada-001",
      prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    const answer = response.data.data[0].text.trim();

    res.status(200).json({ message: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

export default router;
