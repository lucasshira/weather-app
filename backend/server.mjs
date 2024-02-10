dotenv.config();
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de previsão do tempo.');
});

app.post('/weather', async (req, res) => {
    const { city } = req.body;

    try {
        const apiKey = process.env.API_KEY;
        const accessKey = process.env.ACCESS_KEY;
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const response = await fetch(apiWeatherURL);

        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        const responseData = await response.json();

        const imageUrlResponse = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`)
        const imageUrlData = await imageUrlResponse.json();
        const imageUrl = imageUrlData.results[0].urls.regular;

        res.json({ ...responseData, imageUrl });
    } catch (error) {
        console.error(error);

        // Retornar um JSON formatado mesmo em caso de erro
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.use('/weather', express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
