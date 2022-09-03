const express = require('express');
const axios = require('axios');
const responseTime = require('response-time');
const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient({
    legacyMode: true,
    socket: {
        port: 6379,
        host: 'redis'
    }
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await client.connect();
})();

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

const app = express();

app.use(responseTime());

app.get('/character',async (req,res) => {
    try{
        // Response from cache
        const reply = await GET_ASYNC('characters');
        if(reply){
            return res.json(JSON.parse(reply));
        }

        // Response from API
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        await SET_ASYNC('characters',JSON.stringify(response.data));
        res.json(response.data);

    }catch(error){
        return res.status(error.response.status).json({messages:error.message});
    }
});

app.get('/character/:id',async(req,res) => {
    try{
        // Response from cache
        const reply = await GET_ASYNC(req.params.id);
        if(reply){
            return res.json(JSON.parse(reply));
        }

        // Response from API
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${req.params.id}`);
        await SET_ASYNC(req.params.id,JSON.stringify(response.data));
        res.json(response.data);
    }catch(error){
        return res.status(error.response.status).json({messages:error.message});
    }
});

app.listen(3000);
console.log('Server on port 3000');