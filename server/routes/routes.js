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
    const {message } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"],
    });

    console.log(response);
    const answer = response.data.choices[0];
    console.log(answer)

    res.status(200).json({ message: answer.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

export default router;
