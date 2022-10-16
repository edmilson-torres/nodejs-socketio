import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname + '/../public'));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

const clients: Array<any> = [];
const total = (clientsAmount: number) =>
    `\x1b[36mTotal:\x1b[0m ${clientsAmount}`;
const time = (date: Date) => `[${date.toLocaleTimeString()}]`;

io.on('connection', (client) => {
    clients.push(client);

    console.info(
        `${time(new Date())} \x1b[32mClient connected\x1b[0m - ${total(
            clients.length
        )}`
    );

    client.on('disconnect', () => {
        clients.splice(clients.indexOf(client), 1);

        console.info(
            `${time(new Date())} \x1b[31mClient disconnected\x1b[0m ${total(
                clients.length
            )}`
        );
    });
});

app.get('/send/', (req, res) => {
    const message = req.query.message || '';
    for (const client of clients) {
        client.emit('msg', `${message}`);
    }
    res.json({ data: 'message sent' });
});

httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
