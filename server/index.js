import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import chatbotRoutes from './routes/routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api", chatbotRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from Chatbot" });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server has started on port ${port}`));
