import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello From CodeX',
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 2000,
            n: 1,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });

        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

// OpenAI API integration code
// paste the code you got from OpenAI here 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
