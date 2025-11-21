import express from 'express';
import dotenv from 'dotenv';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import { auth } from './lib/auth.js';
dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3001', 
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
)

app.all('/api/auth/*splat', toNodeHandler(auth));
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/api/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: req.headers
    })
    return res.json(session);
});

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});