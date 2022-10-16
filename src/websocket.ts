import { io } from './app';

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
