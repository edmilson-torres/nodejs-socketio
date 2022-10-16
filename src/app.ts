import path from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));

const httpServer = http.createServer(app);

const io = new Server(httpServer);

app.get('/send/', (req, res) => {
    const message = req.query.message || '';
    io.emit('msg', `${message}`);

    res.json({ data: 'message sent' });
});

export { httpServer, io };
