const title = document.querySelector('#title');

let id = '';

const socket = io('http://localhost:3000/');
socket.on('connect', () => {
    id = socket.io.engine.id;
    title.innerHTML = `Socket.io ${id}`;
});
socket.on('msg', (message) => {
    showMessage(message);
});

function showMessage(message) {
    let msgLi = document.querySelector('#messages');
    let element = document.createElement('li');
    element.innerHTML = `[${new Date().toLocaleTimeString()}] ${message}`;
    element.style.listStyleType = 'none';
    msgLi.appendChild(element);
}

const messageInput = document.querySelector('#message');

function sendSocketMessage() {
    socket.emit('msg', `${id}: ${messageInput.value}`);
}
