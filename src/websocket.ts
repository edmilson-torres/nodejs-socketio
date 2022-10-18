import { Socket } from 'socket.io';
import { io } from './app';

const users: Array<any> = [];
const total = (clientsAmount: number) =>
    `\x1b[36mTotal:\x1b[0m ${clientsAmount}`;
const time = (date: Date) => `[${date.toLocaleTimeString()}]`;

io.on('connection', (socket) => {
    users.push(socket);
    console.info(
        `${time(new Date())} \x1b[32mClient connected\x1b[0m - ${total(
            users.length
        )}`
    );

    socket.on('msg', (data) => {
        io.emit('msg', data);
    });

    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket), 1);

        console.info(
            `${time(new Date())} \x1b[31mClient disconnected\x1b[0m ${total(
                users.length
            )}`
        );
    });
});
