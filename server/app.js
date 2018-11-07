import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import jsend from 'jsend';

dotenv.config();
const app = express();
const urlencoded = bodyParser.urlencoded({
  extended: false
});
const json = bodyParser.json();
const port = parseInt(process.env.PORT, 10) || 8000;

// USE CORS TO AVOID CROSS ORIGIN CONFLICT
app.use(cors());

app.use(jsend.middleware);

app.use(json);
app.use(urlencoded);

app.get('/', (req, res) => res.status(200).jsend.success({
  message: 'Hello World'
}));

app.listen(port, () => console.log(`server is running on port ${port}`));

export default app;