const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
    const { text, targetLang } = req.body;
    const apiKey = process.env.DEEPL_API_KEY;
    const url = `https://api-free.deepl.com/v2/translate`;
    const formData = new URLSearchParams();
    formData.append('auth_key', apiKey);
    formData.append('text', text);
    formData.append('target_lang', targetLang);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            return res.status(response.status).send(await response.text());
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching translation:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
