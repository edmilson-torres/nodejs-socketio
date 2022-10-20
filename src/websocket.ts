import { io } from './app';

const users: string[] = [];

const total = (clientsAmount: number) =>
    `\x1b[36mTotal:\x1b[0m ${clientsAmount}`;
const time = (date: Date) => `[${date.toLocaleTimeString()}]`;

interface Message {
    room: string;
    nickname: string;
    message: string;
}

io.on('connection', (socket) => {
    socket.on('room', (data: string) => {
        socket.join(data);
    });

    socket.on('msg', (data: Message) => {
        io.to(data.room).emit('msg', {
            nickname: data.nickname,
            message: data.message,
        });
    });

    users.push(socket.id);
    console.info(
        `${time(new Date())} \x1b[32mClient connected\x1b[0m - ${total(
            users.length
        )}`
    );

    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.id), 1);
        console.info(
            `${time(new Date())} \x1b[31mClient disconnected\x1b[0m ${total(
                users.length
            )}`
        );
    });
});
